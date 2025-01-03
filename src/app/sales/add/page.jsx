import React from "react";
import AddSaleForm from "../add/form";
import { getCustomersWithRates } from "@/services/dbService";

const AddSalePage = async () => {
  let customers = [];
  try {
    customers = await getCustomersWithRates();
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <h3 className="text-3xl font-semibold text-center">Add a sale</h3>
      <AddSaleForm customers={customers} />
    </div>
  );
};

export default AddSalePage;
