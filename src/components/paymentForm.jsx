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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SelectWithSearch from "@/components/ui/select-with-search";
import {
  addPayment,
  addVendorPayment,
  updatePayment,
  updateVendorPayment,
} from "@/services/paymentService";

const paymnetSchema = z
  .object({
    paymentDate: z.coerce.date(),
    amount: z.string(),
    note: z.string().optional(),
    customerId: z.number().optional(),
    vendorId: z.number().optional(),
  })
  .refine((data) => data.customerId || data.vendorId, {
    message: "Either customerId or vendorId must be provided",
    path: ["customerId", "vendorId"],
  });

export default function PaymentForm({
  customers,
  vendors,
  entityType,
  payment,
}) {
  const [entityOptions, setEntityOptions] = useState([]);

  const entities = entityType === "customer" ? customers : vendors;

  useEffect(() => {
    const options = entities.map((entity) => {
      return {
        value: entity.id,
        label: entity.name,
      };
    });
    setEntityOptions(options);
  }, [entities]);

  const form = useForm({
    resolver: zodResolver(paymnetSchema),

    defaultValues: {
      paymentDate: payment?.paymentDate || new Date(),
      amount: payment?.amount?.toString() || "",
      note: payment?.note || "",
      [`${entityType}Id`]: payment?.[`${entityType}Id`] || "",
    },
  });

  const { setValue } = form;

  async function onSubmit(values) {
    try {
      const data = {
        paymentDate: values.paymentDate,
        note: values.note,
        amount: Number(values.amount),
      };
      if (payment) {
        data.id = payment.id;
      }

      let response;
      if (entityType === "customer") {
        data.customerId = values.customerId;
        response = payment ? await updatePayment(data) : await addPayment(data);
      } else {
        data.vendorId = values.vendorId;
        response = payment
          ? await updateVendorPayment(data)
          : await addVendorPayment(data);
      }
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            Payment updated successfully : <hr />
            {JSON.stringify(response, null, 2)}
          </code>
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
          name="paymentDate"
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
          name={entityType === "customer" ? "customerId" : "vendorId"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {entityType === "customer" ? "Customer" : "Vendor"}
              </FormLabel>
              <SelectWithSearch
                onChange={field.onChange}
                value={field.value}
                options={entityOptions}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="note"
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
        <Button type="submit">{payment ? "Update Payment" : "Submit"}</Button>
      </form>
    </Form>
  );
}
