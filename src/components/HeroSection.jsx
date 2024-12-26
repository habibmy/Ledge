import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="bg-blue-600 text-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">Welcome to Ledge</h2>
        <p className="mt-4">Simplify your sales and purchase tracking.</p>
        <div className="mt-6">
          <Button
            asChild
            className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100"
          >
            <Link href="/sales/add">Add Sale</Link>
          </Button>
          <Button
            asChild
            className="ml-4 bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100"
          >
            <Link href="/purchases/add">Add Purchase</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
