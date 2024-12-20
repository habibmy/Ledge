import React from "react";
import VendorForm from "@/components/vendorForm";

const AddVendorPage = async () => {
  return (
    <div>
      <h3 className="text-3xl font-semibold text-center">Add New Vendor</h3>
      <VendorForm />
    </div>
  );
};

export default AddVendorPage;
