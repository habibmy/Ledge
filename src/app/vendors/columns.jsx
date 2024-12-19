"use client";

const { Button } = require("@/components/ui/button");
const { ArrowUpDown, ArrowUp, ArrowDown } = require("lucide-react");

export const columns = [
  {
    accessorKey: "name",
    header: "Vendor Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "balance",
    header: "Balance",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
