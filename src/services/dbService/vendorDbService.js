"use server";

import prisma from "@/lib/prismaClient";
export const addVendor = async ({ name, address, phone, balance }) => {
  const vendorData = {
    name,
    address,
    phone,
    balance,
  };
  try {
    const vendor = await prisma.vendor.create({
      data: vendorData,
    });
    return vendor;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getVendors = async () => {
  try {
    const vendors = await prisma.vendor.findMany();
    return vendors;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getVendor = async (id) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        id,
      },
    });
    return vendor;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const updateVendor = async (updatedFields) => {
  const { id, name, address, phone, balance } = updatedFields;

  try {
    const vendorData = {
      ...(name && { name }),
      address: address || null,
      phone: phone || null,
      ...(balance !== undefined && { balance }), // Allow 0 or negative balances
    };

    const updatedVendor = await prisma.vendor.update({
      where: { id },
      data: vendorData,
    });

    return updatedVendor;
  } catch (error) {
    console.error("Error updating customer:", error);
    return Promise.reject(error);
  }
};
