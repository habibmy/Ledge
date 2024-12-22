"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function PurchasesTable({ columns, data, sortBy }) {
  const [sorting, setSorting] = React.useState(sortBy ? [sortBy] : []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {data.map((purchase) => (
              <React.Fragment key={purchase.id}>
                {purchase.products.map((product, index) => (
                  <TableRow key={index}>
                    {index === 0 && (
                      <>
                        <TableCell rowSpan={purchase.products.length}>
                          {new Date(purchase.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell rowSpan={purchase.products.length}>
                          {purchase.vendor.name}
                        </TableCell>
                      </>
                    )}
                    <TableCell>{product.product}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.rate}</TableCell>
                    <TableCell>{product.amount}</TableCell>
                    {index === 0 && (
                      <>
                        <TableCell rowSpan={purchase.products.length}>
                          {purchase.notes}
                        </TableCell>
                        <TableCell rowSpan={purchase.products.length}>
                          {purchase.amount}
                        </TableCell>
                        <TableCell rowSpan={purchase.products.length}>
                          <Link href={"/purchases/update/" + purchase.id}>
                            <Button size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
