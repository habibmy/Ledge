import React from "react";
import AddPaymentForm from "./form";
import { getCustomers } from "@/services/dbService";

const AddPaymentPage = async () => {
  let customers = [];
  try {
    customers = await getCustomers();
    console.log(customers);
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <h3 className="text-3xl font-semibold text-center">Add a payment</h3>
      <AddPaymentForm customers={customers} />
    </div>
  );
};

export default AddPaymentPage;
