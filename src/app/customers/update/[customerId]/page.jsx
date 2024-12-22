import CustomerForm from "@/components/customerForm";
import { getCustomer } from "@/services/dbService/customersDbService";

const UpdateCustomerPage = async ({ params }) => {
  const { customerId } = params;
  let customer = null;
  try {
    customer = await getCustomer(Number(customerId));
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <h3 className="text-3xl font-semibold text-center">Update customer</h3>
      {customer && <CustomerForm data={customer} />}
    </div>
  );
};

export default UpdateCustomerPage;
