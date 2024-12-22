import React from "react";
import { getVendors } from "@/services/dbService";
import UpdatePurchaseForm from "./form";
import { getpurchase } from "@/services/purchaseService";

const UpdatePurchasePage = async ({ params }) => {
  const { purchaseId } = params;
  let vendors = [];
  let purchase = null;
  try {
    vendors = await getVendors();
    purchase = await getpurchase(Number(purchaseId));
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <h3 className="text-3xl font-semibold text-center">Update Purchase</h3>
      <UpdatePurchaseForm vendors={vendors} purchase={purchase} />
    </div>
  );
};

export default UpdatePurchasePage;
