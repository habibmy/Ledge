"use client";

const { Button } = require("@/components/ui/button");
const { ArrowUpDown, ArrowUp, ArrowDown } = require("lucide-react");

export const columns = [
  {
    accessorKey: "paymentDate",
    cell: ({ row }) => {
      const date = row.getValue("paymentDate");
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
    accessorKey: "customer.name",
    header: "Customer",
  },
  { accessorKey: "amount", header: "Amount" },
];
