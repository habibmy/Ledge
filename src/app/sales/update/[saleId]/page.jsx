"use server";
import React from "react";
import { getCustomersWithRates, getSale } from "@/services/dbService";
import UpdateSaleForm from "./form";

const UpdateSalePage = async ({ params }) => {
  const { saleId } = params;
  let customers = [];
  let sale = null;
  try {
    customers = await getCustomersWithRates();
    sale = await getSale(Number(saleId));
    console.log(customers);
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <h3 className="text-3xl font-semibold text-center">Update sale</h3>
      {sale && <UpdateSaleForm customers={customers} sale={sale} />}
    </div>
  );
};

export default UpdateSalePage;
