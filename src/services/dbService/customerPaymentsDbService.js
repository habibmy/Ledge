"use server";

import prisma from "@/lib/prismaClient";

export const addPayment = async ({ amount, paymentDate, note, customerId }) => {
  try {
    const payment = await prisma.CustomerPayment.create({
      data: {
        amount,
        paymentDate,
        note,
        customerId,
      },
    });

    await prisma.customer.update({
      where: { id: customerId },
      data: {
        balance: {
          decrement: amount, // Subtract payment from balance
        },
      },
    });
    return payment;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const updatePayment = async ({
  id,
  amount,
  paymentDate,
  note,
  customerId,
}) => {
  try {
    const oldPayment = await prisma.CustomerPayment.findUnique({
      where: { id },
    });

    const payment = await prisma.CustomerPayment.update({
      where: {
        id,
      },
      data: {
        amount,
        paymentDate,
        note,
        customerId,
      },
    });

    const balanceChange = amount - oldPayment.amount;
    await prisma.customer.update({
      where: { id: customerId },
      data: {
        balance: {
          decrement: balanceChange, // Adjust balance based on the difference
        },
      },
    });

    return payment;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getPayments = async (page = 1, pageSize = 20) => {
  try {
    const skip = (page - 1) * pageSize;
    const payments = await prisma.CustomerPayment.findMany({
      skip,
      take: pageSize,
      orderBy: {
        paymentDate: "desc", // Ensure sorted by payment date
      },
      include: {
        customer: true,
      },
    });
    const totalPayments = await prisma.CustomerPayment.count();
    return {
      payments,
      totalPayments,
    };
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

// export const getPayments = async () => {
//   try {
//     const payments = await prisma.CustomerPayment.findMany({
//       include: {
//         customer: true,
//       },
//     });
//     return payments;
//   } catch (error) {
//     console.error(error);
//     return Promise.reject(error);
//   }
// };

export const getPayment = async (id) => {
  try {
    const payment = await prisma.CustomerPayment.findUnique({
      where: {
        id,
      },
      include: {
        customer: true,
      },
    });
    return payment;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
