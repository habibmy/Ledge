"use server";

import prisma from "@/lib/prismaClient";

export const addVendorPayment = async ({
  amount,
  paymentDate,
  note,
  vendorId,
}) => {
  try {
    const payment = await prisma.VendorPayment.create({
      data: {
        amount,
        paymentDate,
        note,
        vendorId,
      },
    });

    await prisma.vendor.update({
      where: { id: vendorId },
      data: {
        balance: {
          decrement: amount, // Subtract payment from balance
        },
      },
    });
    if (payment) {
      payment.amount = payment.amount.toNumber();
    }
    return payment;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getVendorPayments = async (page = 1, pageSize = 10) => {
  try {
    const skip = (page - 1) * pageSize;
    const payments = await prisma.VendorPayment.findMany({
      skip,
      take: pageSize,
      orderBy: {
        paymentDate: "desc", // Ensure sorted by payment date
      },
      include: {
        vendor: true,
      },
    });
    const totalPayments = await prisma.VendorPayment.count();
    if (payments) {
      payments.forEach((payment) => {
        payment.amount = payment.amount.toNumber();
      });
    }
    return {
      payments,
      totalPayments,
    };
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getVendorPayment = async (id) => {
  try {
    const payment = await prisma.VendorPayment.findUnique({
      where: {
        id,
      },
      include: {
        vendor: true,
      },
    });
    if (payment) {
      payment.amount = payment.amount.toNumber();
    }
    return payment;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const updateVendorPayment = async ({
  id,
  amount,
  paymentDate,
  note,
  vendorId,
}) => {
  try {
    const oldPayment = await prisma.VendorPayment.findUnique({
      where: { id },
    });

    const payment = await prisma.VendorPayment.update({
      where: {
        id,
      },
      data: {
        amount,
        paymentDate,
        note,
        vendorId,
      },
    });

    const balanceChange = amount - oldPayment.amount;
    await prisma.vendor.update({
      where: { id: vendorId },
      data: {
        balance: {
          decrement: balanceChange, // Adjust balance based on the difference
        },
      },
    });
    if (payment) {
      payment.amount = payment.amount.toNumber();
    }
    return payment;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

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
    if (payment) {
      payment.amount = payment.amount.toNumber();
    }
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
    if (payment) {
      payment.amount = payment.amount.toNumber();
    }

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
    if (payments) {
      payments.forEach((payment) => {
        payment.amount = payment.amount.toNumber();
      });
    }
    return {
      payments,
      totalPayments,
    };
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

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
    if (payment) {
      payment.amount = payment.amount.toNumber();
    }
    return payment;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
