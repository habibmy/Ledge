"use server";

import prisma from "@/lib/prismaClient";

export const addCustomer = async ({
  name,
  address,
  phone,
  balance,
  customRates, // {rate,size}[]
}) => {
  const customerData = {
    name,
    address,
    phone,
    balance,
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
    customers = await Promise.all(customers);
    customers = JSON.parse(JSON.stringify(customers));
    return customers;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getCustomer = async (id) => {
  try {
    const customer = await prisma.customer.findUnique({
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        balance: true,
        customRates: true,
      },
      where: {
        id,
      },
    });
    if (customer.customRates) {
      customer.customRates.forEach((each) => {
        each.rate = each.rate.toNumber();
      });
    }
    return customer;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const updateCustomer = async (updatedFields) => {
  const { id, name, address, phone, balance, customRates } = updatedFields;

  try {
    const customerData = {
      ...(name && { name }),
      address: address || null,
      phone: phone || null,
      ...(balance !== undefined && { balance }), // Allow 0 or negative balances
    };

    // Handle updating custom rates if provided
    if (customRates) {
      customerData.customRates = {
        deleteMany: {}, // Deletes all existing custom rates for the customer
        create: customRates, // Re-creates the custom rates from the input
      };
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: customerData,
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        balance: true,
        customRates: true,
      },
    });
    if (updatedCustomer.customRates) {
      updatedCustomer.customRates.forEach((each) => {
        each.rate = each.rate.toNumber();
      });
    }

    return updatedCustomer;
  } catch (error) {
    console.error("Error updating customer:", error);
    return Promise.reject(error);
  }
};
