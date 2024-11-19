const { Prisma } = require("@prisma/client");

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
    const customer = await Prisma.customer.create({
      data: customerData,
    });
    return customer;
  } catch (error) {
    console.error(error);
    return new Promise.reject(error);
  }
};

export const getCustomers = async () => {
  try {
    const customers = await Prisma.customer.findMany();
    return customers;
  } catch (error) {
    console.error(error);
    return new Promise.reject(error);
  }
};

export const getCustomer = async (id) => {
  try {
    const customer = await Prisma.customer.findUnique({
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
    return new Promise.reject(error);
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
    const sale = await Prisma.sale.create({
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
    return new Promise.reject(error);
  }
};

// Get sales with customer name
export const getSales = async () => {
  try {
    const sales = await Prisma.sale.findMany({
      include: {
        customer: true,
      },
    });
    return sales;
  } catch (error) {
    console.error(error);
    return new Promise.reject(error);
  }
};

export const getSale = async (id) => {
  try {
    const sale = await Prisma.sale.findUnique({
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
    return new Promise.reject(error);
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
    const sale = await Prisma.sale.update({
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
    return new Promise.reject(error);
  }
};
