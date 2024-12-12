"use server";

import prisma from "@/lib/prismaClient";

// add a customer to db
export const addCustomer = async ({
  name,
  address,
  phone,
  customRates, // {rate,size}[]
}) => {
  const customerData = {
    name,
    address,
    phone,
  };
  if (customRates) {
    customerData.customRates = {
      create: customRates,
    };
  }
  try {
    const customer = await prisma.customer.create({
      data: customerData,
    });
    return customer;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getCustomers = async () => {
  try {
    const customers = await prisma.customer.findMany();
    return customers;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

// get customers name and id
export const getCustomersWithRates = async () => {
  try {
    let customers = await prisma.customer.findMany({
      select: {
        id: true,
        name: true,
        rates: true,
      },
    });
    customers = customers.map(async (customer) => {
      return {
        ...customer,
        rates: await customer.rates(),
      };
    });
    return Promise.all(customers);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getCustomer = async (id) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
      include: {
        customRates: true,
      },
    });
    console.log(customer);
    return customer;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

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
export const getSales = async () => {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        customer: true,
      },
    });
    return sales;
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

export const addPayment = async ({ amount, paymentDate, note, customerId }) => {
  try {
    const payment = await prisma.payment.create({
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
    const oldPayment = await prisma.payment.findUnique({ where: { id } });

    const payment = await prisma.payment.update({
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

export const getPayments = async () => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        customer: true,
      },
    });
    return payments;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getPayment = async (id) => {
  try {
    const payment = await prisma.payment.findUnique({
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
