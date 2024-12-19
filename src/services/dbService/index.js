"use server";
import { createSale, getSale, updateSale, getSales } from "./saleDbService";
import {
  addCustomer,
  getCustomers,
  getCustomersWithRates,
} from "./customersDbService";
import { addVendor, addVendorPayment } from "./vendorDbService";
import {
  addPayment,
  updatePayment,
  getPayments,
  getPayment,
} from "./customerPaymentsDbService";

export {
  createSale,
  getSale,
  updateSale,
  getSales,
  addCustomer,
  getCustomers,
  getCustomersWithRates,
  addVendor,
  addPayment,
  updatePayment,
  getPayments,
  getPayment,
  addVendorPayment,
};
