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
