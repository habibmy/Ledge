import React from "react";
import { getCustomers } from "@/services/dbService";
import PaymentForm from "@/components/paymentForm";

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
      <PaymentForm customers={customers} entityType={"customer"} />
    </div>
  );
};

export default AddPaymentPage;
