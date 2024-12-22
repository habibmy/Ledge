import React from "react";
import AddPurchaseForm from "../add/form";
import { getVendors } from "@/services/dbService";

const AddPurchasePage = async () => {
  let vendors = [];
  try {
    vendors = await getVendors();
    console.log(vendors);
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <h3 className="text-3xl font-semibold text-center">Record a purchase</h3>
      <AddPurchaseForm vendors={vendors} />
    </div>
  );
};

export default AddPurchasePage;
