import React from "react";
import { getCustomers, getPayment } from "@/services/dbService";
import UpdatePaymentForm from "./form";

const UpdatePaymentPage = async ({ params }) => {
  const { paymentId } = params;
  let customers = [];
  let payment = null;
  try {
    customers = await getCustomers();
    payment = await getPayment(Number(paymentId));
    console.log(customers);
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <h3 className="text-3xl font-semibold text-center">Update payment</h3>
      {payment && <UpdatePaymentForm customers={customers} payment={payment} />}
    </div>
  );
};

export default UpdatePaymentPage;
