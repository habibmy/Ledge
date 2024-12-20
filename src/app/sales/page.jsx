import React from "react";
import { columns } from "./columns";
import { getSales } from "@/services/dbService";
import PaginationComponent from "@/components/pagination";
import { DataTable } from "@/components/data-table";

const page = async ({ searchParams }) => {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const pageSize = 10;

  const { sales, totalSales } = await getSales(page, pageSize);

  const totalPages = Math.ceil(totalSales / pageSize);

  return (
    <div>
      <h2 className="text-3xl font-serif mb-3">Sales</h2>
      <DataTable
        columns={columns}
        data={sales}
        sortBy={{
          id: "date",
          desc: true,
        }}
      />

      {/* Pagination Controls */}
      <PaginationComponent page={page} totalPages={totalPages} />
    </div>
  );
};

export default page;
