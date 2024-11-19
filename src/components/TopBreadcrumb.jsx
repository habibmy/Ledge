"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const TopBreadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pathSegments.map((segment, index) => {
          const segmentPath = `/${pathSegments.slice(0, index + 1).join("/")}`;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {index === pathSegments.length - 1 ? (
                  <span>{capitalizeFirstLetter(segment)}</span>
                ) : (
                  <BreadcrumbLink href={segmentPath}>
                    {capitalizeFirstLetter(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index !== pathSegments.length - 1 && <BreadcrumbSeparator />}{" "}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default TopBreadcrumb;
