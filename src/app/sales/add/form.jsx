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
import { format, set } from "date-fns";
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
import { createSale } from "@/services/dbService";

const formSchema = z.object({
  date: z.coerce.date(),
  size: z.string(),
  quantity: z.string(),
  rate: z.string(),
  amount: z.string(),
  description: z.string().optional(),
  customerId: z.number(),
});

export default function AddSaleForm({ customers }) {
  const [customerOptions, setCustomerOptions] = useState([]);

  useEffect(() => {
    const options = customers.map((customer) => {
      return {
        value: customer.id,
        label: customer.name,
      };
    });
    setCustomerOptions(options);
  }, [customers]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const { setValue } = form;

  const watchQty = useWatch({
    control: form.control,
    name: "quantity",
  });

  const watchRate = useWatch({
    control: form.control,
    name: "rate",
  });

  const watchCustomer = useWatch({
    control: form.control,
    name: "customerId",
  });

  const watchSize = useWatch({
    control: form.control,
    name: "size",
  });

  useEffect(() => {
    if (!customers) return;
    const customer = customers.find(
      (customer) => customer.id === watchCustomer
    );
    if (customer && watchSize) {
      const rate = customer.rates.find(
        (rate) => rate.size === Number(watchSize)
      );
      if (rate) {
        setValue("rate", rate.rate.toString());
      } else {
        setValue("rate", "");
      }
    }
  }, [watchCustomer, watchSize, customers, setValue]);

  useEffect(() => {
    setValue("amount", (Number(watchRate) * Number(watchQty)).toString());
  }, [watchRate, watchQty, setValue]);

  async function onSubmit(values) {
    try {
      values.customerId = Number(values.customerId);
      values.rate = Number(values.rate);
      values.quantity = Number(values.quantity);
      values.amount = Number(values.amount);
      values.size = Number(values.size);
      console.log(values);
      await createSale(values);
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
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Size in inch" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer</FormLabel>
              <SelectWithSearch
                onChange={field.onChange}
                value={field.value}
                options={customerOptions}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Quantity </FormLabel>
                <FormControl>
                  <Input placeholder="In Kgs" type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <Input placeholder="" type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="" type="number" disabled {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
