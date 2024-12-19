"use server";

import prisma from "@/lib/prismaClient";

export const createSale = async ({
  amount,
  size,
  quantity,
  rate,
  date,
  description,
  customerId,
}) => {
  try {
    const sale = await prisma.sale.create({
      data: {
        amount,
        date,
        description,
        customerId,
        size,
        quantity,
        rate,
      },
    });

    await prisma.customer.update({
      where: { id: customerId },
      data: {
        balance: {
          increment: amount, // Add sale amount to balance
        },
      },
    });
    return sale;
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

export const getSales = async (page = 1, pageSize = 20) => {
  const skip = (page - 1) * pageSize;

  try {
    const sales = await prisma.sale.findMany({
      skip,
      take: pageSize,
      include: {
        customer: true, // Include related customer data
      },
      orderBy: {
        date: "desc", // Order by the sale date
      },
    });

    const totalSales = await prisma.sale.count(); // Get total sales count for pagination

    return {
      sales,
      totalSales,
    };
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getSale = async (id) => {
  try {
    const sale = await prisma.sale.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
      },
    });
    return sale;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const updateSale = async ({
  id,
  amount,
  size,
  quantity,
  rate,
  date,
  description,
  customerId,
}) => {
  try {
    const oldSale = await prisma.sale.findUnique({ where: { id } });

    const sale = await prisma.sale.update({
      where: {
        id,
      },
      data: {
        amount,
        date,
        description,
        customerId,
        size,
        quantity,
        rate,
      },
    });

    const balanceChange = amount - oldSale.amount;
    await prisma.customer.update({
      where: { id: customerId },
      data: {
        balance: {
          increment: balanceChange, // Adjust balance based on the difference
        },
      },
    });

    return sale;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
