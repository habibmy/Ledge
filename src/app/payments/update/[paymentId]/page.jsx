import React from "react";
import { getCustomers } from "@/services/dbService";
import PaymentForm from "@/components/paymentForm";
import { getPayment } from "@/services/paymentService";

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
      {payment && (
        <PaymentForm
          customers={customers}
          payment={payment}
          entityType={"customer"}
        />
      )}
    </div>
  );
};

export default UpdatePaymentPage;
