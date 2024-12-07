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
    console.log(Promise.all(customers));
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
    return sale;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
