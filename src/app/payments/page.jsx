import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getPayments } from "@/services/dbService";
import PaginationComponent from "@/components/pagination";

const page = async ({ searchParams }) => {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const pageSize = 10;

  const { payments, totalPayments } = await getPayments(page, pageSize);

  const totalPages = Math.ceil(totalPayments / pageSize);

  return (
    <div>
      <h2 className="text-3xl font-serif mb-3">Payments</h2>
      <DataTable columns={columns} data={payments} />

      {/* Pagination Controls */}
      <PaginationComponent page={page} totalPages={totalPages} />
    </div>
  );
};

export default page;
