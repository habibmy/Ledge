import VendorForm from "@/components/vendorForm";
import { getVendor } from "@/services/dbService/vendorDbService";

const UpdateVendorPage = async ({ params }) => {
  const { vendorId } = params;
  let vendor = null;
  try {
    vendor = await getVendor(Number(vendorId));
  } catch (error) {
    console.error(error);
  }
  return (
    <div>
      <h3 className="text-3xl font-semibold text-center">Update vendor</h3>
      {vendor && <VendorForm data={vendor} />}
    </div>
  );
};

export default UpdateVendorPage;
