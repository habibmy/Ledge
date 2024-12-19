import React from "react";
import { getVendors } from "@/services/dbService";
import PaymentForm from "@/components/paymentForm";

const AddPaymentPage = async () => {
  let vendors = [];
  try {
    vendors = await getVendors();
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <h3 className="text-3xl font-semibold text-center">Add a payment</h3>
      <PaymentForm vendors={vendors} entityType={"vendor"} />
    </div>
  );
};

export default AddPaymentPage;
