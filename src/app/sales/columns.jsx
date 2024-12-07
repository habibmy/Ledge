"use client";

const { Button } = require("@/components/ui/button");
const { ArrowUpDown, ArrowUp, ArrowDown } = require("lucide-react");

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
    accessorKey: "customer.name",
    header: "Customer",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
