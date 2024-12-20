"use client";

import Link from "next/link";

const { Button } = require("@/components/ui/button");
const { ArrowUpDown, ArrowUp, ArrowDown, Pencil } = require("lucide-react");

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
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <Link href={"/vendors/update/" + id}>
          <Button size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
      );
    },
  },
];
