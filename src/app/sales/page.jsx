import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const page = async () => {
  let data = [];
  try {
    const resp = await fetch("http://localhost:3000/api");
    data = await resp.json();
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
