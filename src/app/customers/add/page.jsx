import React from "react";
import CustomerForm from "@/components/customerForm";

const AddCustomerPage = async () => {
  return (
    <div>
      <h3 className="text-3xl font-semibold text-center">Add New Customer</h3>
      <CustomerForm />
    </div>
  );
};

export default AddCustomerPage;
