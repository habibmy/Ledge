"use client";

import Link from "next/link";
import { ArrowUpDown, ArrowUp, ArrowDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns = [
  {
    accessorKey: "date",
    cell: ({ row }) => {
      const date = row.getValue("date");
      const formatted = new Date(date).toLocaleDateString();

      return formatted;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Vendor",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "rate",
    header: "Rate",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <Link href={"/purchase/update/" + id}>
          <Button size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
      );
    },
  },
];
