"use server";

import prisma from "@/lib/prismaClient";

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
