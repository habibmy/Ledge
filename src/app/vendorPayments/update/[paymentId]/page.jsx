import React from "react";
import { getVendors } from "@/services/dbService";
import PaymentForm from "@/components/paymentForm";
import { getVendorPayment } from "@/services/paymentService";

const UpdatePaymentPage = async ({ params }) => {
  const { paymentId } = params;
  let vendors = [];
  let payment = null;
  try {
    vendors = await getVendors();
    payment = await getVendorPayment(Number(paymentId));
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <h3 className="text-3xl font-semibold text-center">Update payment</h3>
      {payment && (
        <PaymentForm
          vendors={vendors}
          payment={payment}
          entityType={"vendor"}
        />
      )}
    </div>
  );
};

export default UpdatePaymentPage;
