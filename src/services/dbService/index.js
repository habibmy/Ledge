"use server";
import { createSale, getSale, updateSale, getSales } from "./saleDbService";
import {
  addCustomer,
  getCustomers,
  getCustomersWithRates,
} from "./customersDbService";
import { addVendor, getVendors } from "./vendorDbService";

export {
  createSale,
  getSale,
  updateSale,
  getSales,
  addCustomer,
  getCustomers,
  getCustomersWithRates,
  addVendor,
  getVendors,
};
