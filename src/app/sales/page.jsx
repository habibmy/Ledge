import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getSales } from "@/services/dbService";

const page = async () => {
  let data = [];
  try {
    data = await getSales();
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <h2 className="text-3xl font-serif mb-3">All Sales</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
