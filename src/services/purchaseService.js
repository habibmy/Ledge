"use server";

import prisma from "@/lib/prismaClient";
import { Prisma } from "@prisma/client";

export const createPurchase = async ({
  amount,
  products,
  date,
  description,
  vendorId,
}) => {
  try {
    const purchase = await prisma.purchase.create({
      data: {
        amount,
        date,
        description,
        vendorId,
        products: {
          create: products.map((product) => ({
            product: product.product,
            quantity: product.quantity,
            rate: product.rate,
            amount: product.amount,
          })),
        },
      },
    });

    // Update vendor balance by adding purchase amount
    await prisma.vendor.update({
      where: { id: vendorId },
      data: {
        balance: {
          increment: amount, //Add the purchase amount to vendor's balance
        },
      },
    });
    return purchase;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

// Get sales with customer name
// export const getSales = async () => {
//   try {
//     const sales = await prisma.sale.findMany({
//       include: {
//         customer: true,
//       },
//     });
//     return sales;
//   } catch (error) {
//     console.error(error);
//     return Promise.reject(error);
//   }
// };

export const getPurchases = async (page = 1, pageSize = 10) => {
  const skip = (page - 1) * pageSize;

  try {
    const purchases = await prisma.purchase.findMany({
      skip,
      take: pageSize,
      include: {
        vendor: true, // Include related vendor data
        products: true, // Include related products data
      },
      orderBy: {
        date: "desc", // Order by the purchase date
      },
    });

    const totalPurchases = await prisma.purchase.count(); // Get total sales count for pagination

    return {
      purchases,
      totalPurchases,
    };
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getpurchase = async (id) => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        id,
      },
      include: {
        vendor: true,
        products: true,
      },
    });
    return purchase;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const updatePurchase = async ({
  id,
  amount,
  products, // Array of product details to update
  description,
  date,
  vendorId,
}) => {
  try {
    const oldPurchase = await prisma.purchase.findUnique({ where: { id } });

    const purchase = await prisma.purchase.update({
      where: {
        id,
      },
      data: {
        amount: new Prisma.Decimal(amount),
        date,
        description,
        vendorId,
        products: {
          deleteMany: {}, // Delete all previous products
          create: products.map((product) => ({
            product: product.product,
            quantity: product.quantity,
            rate: product.rate,
            amount: product.amount,
          })),
        },
      },
    });

    const balanceChange = amount - parseFloat(oldPurchase.amount.toString());
    await prisma.vendor.update({
      where: { id: vendorId },
      data: {
        balance: {
          increment: balanceChange, // Adjust balance based on the difference
        },
      },
    });

    return purchase;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
