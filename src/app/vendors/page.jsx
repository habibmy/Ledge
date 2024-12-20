import React from "react";
import { columns } from "./columns";
import { getVendors } from "@/services/dbService/vendorDbService";
import { DataTable } from "@/components/data-table";

const page = async () => {
  let data = [];
  try {
    data = await getVendors();
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <h2 className="text-3xl font-serif mb-3">All Vendors</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
