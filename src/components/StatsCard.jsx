import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCartIcon } from "lucide-react";

const StatsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Sales</CardTitle>
        <CardDescription>In this month</CardDescription>
      </CardHeader>
      <CardContent>
        <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <span className="rounded-full bg-blue-100 p-3 text-blue-600">
            <ShoppingCartIcon />
          </span>

          <div>
            <p className="text-2xl font-medium text-gray-900">₹240.94</p>
          </div>
        </article>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default StatsCard;
