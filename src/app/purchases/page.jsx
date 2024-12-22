import React from "react";
import PaginationComponent from "@/components/pagination";
import { getPurchases } from "@/services/purchaseService";
import PurchasesTable from "./PurchasesTable";
import { columns } from "./columns";

const page = async ({ searchParams }) => {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const pageSize = 10;

  const { purchases, totalPurchases } = await getPurchases(page, pageSize);

  const totalPages = Math.ceil(totalPurchases / pageSize);

  return (
    <div>
      <h2 className="text-3xl font-serif mb-3">Purchases</h2>
      <PurchasesTable data={purchases} columns={columns} />

      {/* Pagination Controls */}
      <PaginationComponent page={page} totalPages={totalPages} />
    </div>
  );
};

export default page;
