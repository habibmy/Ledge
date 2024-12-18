import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import React from "react";

// const Pagination = ({ page, totalPages }) => {
//   return (
//     <div className="flex items-center justify-end space-x-2 py-4">
//       <div className="flex-1 text-sm text-muted-foreground">
//         Page {page} of {totalPages}
//       </div>

//       <div className="space-x-2">
//         {page > 1 ? (
//           <Link href={`?page=${page - 1}`}>
//             <Button variant="outline" size="sm">
//               Previous
//             </Button>
//           </Link>
//         ) : (
//           <Button variant="outline" size="sm" disabled>
//             Previous
//           </Button>
//         )}

//         {page < totalPages ? (
//           <Link href={`?page=${page + 1}`}>
//             <Button variant="outline" size="sm">
//               Next
//             </Button>
//           </Link>
//         ) : (
//           <Button variant="outline" size="sm" disabled>
//             Next
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

const PaginationComponent = ({ page, totalPages }) => {
  const renderPaginationItems = () => {
    const items = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === page) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={`?page=${i}`} isActive>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={`?page=${i}`}>{i}</PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          {page > 1 ? (
            <PaginationItem>
              <PaginationPrevious href={`?page=${page - 1}`} />
            </PaginationItem>
          ) : (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                aria-disabled
                className={"pointer-events-none opacity-50"}
              />
            </PaginationItem>
          )}

          {/* Pagination Numbers */}
          {renderPaginationItems()}

          {/* Ellipsis for large pagination */}
          {totalPages > 5 && page < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Next Button */}
          {page < totalPages ? (
            <PaginationItem>
              <PaginationNext href={`?page=${page + 1}`} />
            </PaginationItem>
          ) : (
            <PaginationItem>
              <PaginationNext
                href="#"
                aria-disabled
                className={"pointer-events-none opacity-50"}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
