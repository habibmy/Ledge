"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SelectWithSearch from "@/components/ui/select-with-search";
import { updatePurchase } from "@/services/purchaseService";

const formSchema = z.object({
  date: z.coerce.date(),
  vendorId: z.number(),
  products: z.array(
    z.object({
      product: z.string(),
      quantity: z.string(),
      rate: z.string(),
      amount: z.string(),
    })
  ),
  amount: z.string(),
  description: z.string().optional(),
});

export default function UpdatePurchaseForm({ vendors, purchase }) {
  const [vendorOptions, setVendorOptions] = useState([]);

  useEffect(() => {
    const options = vendors.map((vendor) => {
      return {
        value: vendor.id,
        label: vendor.name,
      };
    });
    setVendorOptions(options);
  }, [vendors]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendorId: purchase?.vendorId || "",
      date: purchase?.date ? new Date(purchase.date) : new Date(),
      products: purchase?.products
        ? purchase.products.map((prod) => ({
            product: prod.product,
            quantity: prod.quantity.toString(),
            rate: prod.rate.toString(),
            amount: prod.amount.toString(),
          }))
        : [{ product: "", quantity: "", rate: "", amount: "" }],
      amount: purchase?.amount.toString(),
      description: purchase?.description || "",
    },
  });

  const { setValue, getValues } = form;

  const watchProducts = useWatch({
    control: form.control,
    name: "products",
  });

  useEffect(() => {
    setValue(
      "amount",
      watchProducts
        .reduce((total, prod) => total + Number(prod.amount), 0)
        .toString()
    );
  }, [watchProducts, setValue]);

  const handleAddProduct = () => {
    const newProducts = [
      ...watchProducts,
      { product: "", quantity: "", rate: "", amount: "" },
    ];
    setValue("products", newProducts);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = watchProducts.filter((_, i) => i !== index);
    setValue("products", newProducts);
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...watchProducts];
    newProducts[index][field] = value;
    newProducts[index].amount = (
      Number(newProducts[index].quantity) * Number(newProducts[index].rate)
    ).toString();
    setValue("products", newProducts);
  };

  async function onSubmit(values) {
    try {
      values.vendorId = Number(values.vendorId);
      values.amount = Number(values.amount);
      values.products = values.products.map((prod) => ({
        ...prod,
        quantity: Number(prod.quantity),
        rate: Number(prod.rate),
        amount: Number(prod.amount),
      }));
      values.id = purchase.id;
      values.date = values.date;
      values.description = values.description;
      await updatePurchase(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vendorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor</FormLabel>
              <SelectWithSearch
                onChange={field.onChange}
                value={field.value}
                options={vendorOptions}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {watchProducts.map((_, index) => (
          <div key={index} className="flex gap-4 w-full">
            <FormField
              control={form.control}
              name={`products.${index}.product`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Product</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Name"
                      value={field.value}
                      onChange={(e) =>
                        handleProductChange(index, "product", e.target.value)
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`products.${index}.quantity`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="In Kgs"
                      type="number"
                      value={field.value}
                      onChange={(e) =>
                        handleProductChange(index, "quantity", e.target.value)
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`products.${index}.rate`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Rate</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="number"
                      value={field.value}
                      onChange={(e) =>
                        handleProductChange(index, "rate", e.target.value)
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`products.${index}.amount`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="number"
                      disabled
                      value={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="destructive"
              onClick={() => handleRemoveProduct(index)}
              className="self-end"
            >
              Remove
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddProduct}
          className="w-full"
        >
          Add Product
        </Button>

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Amount</FormLabel>
              <FormControl>
                <Input placeholder="" type="number" disabled {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
