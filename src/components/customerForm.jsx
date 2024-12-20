"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import {
  addCustomer,
  updateCustomer,
} from "@/services/dbService/customersDbService";

const customerSchema = z.object({
  name: z.string().nonempty("Name is required."),
  address: z.string().optional(),
  phone: z.string().optional(),
  balance: z.preprocess((val) => Number(val), z.number()),
  customRates: z
    .array(
      z.object({
        size: z.preprocess((val) => Number(val), z.number()),
        rate: z.preprocess((val) => Number(val), z.number()),
      })
    )
    .min(1, "At least one size-rate pair is required."),
});

export default function CustomerForm({ data }) {
  const form = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: data?.name || "", // Initialize with an empty string for the name field
      address: data?.address || "", // Initialize with an empty string for the address field
      phone: data?.phone || "", // Initialize with an empty string for the phone field
      balance: data?.balance || 0, // Initialize with 0 for the balance field
      customRates:
        data?.customRates?.length > 0
          ? data.customRates
          : [{ size: 0, rate: 0 }],
      // Initialize with one empty size-rate pair
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "customRates", // Path to the array in the schema
  });

  async function onSubmit(values) {
    try {
      values.customRates = values.customRates.filter(
        (rate) => rate.size !== 0 && rate.rate !== 0
      );

      let response;
      if (data) {
        values.id = data.id;
        response = await updateCustomer(values);
      } else {
        response = await addCustomer(values);
      }
      toast.success(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            Customer updated successfully : <hr />
            {JSON.stringify(response, null, 2)}
          </code>
        </pre>
      );
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Customer's Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Address Field */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Customer's Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Phone Field */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Mobile Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Balance Field */}
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Balance</FormLabel>
              <FormControl>
                <Input placeholder="Balance" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Sizes and Rates Fields */}
        <div>
          <h3 className="font-medium text-lg mb-4">Sizes and Rates</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-12 gap-4 mb-4">
              {/* Size Field */}
              <div className="col-span-5">
                <FormField
                  control={form.control}
                  name={`customRates.${index}.size`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Size in Inches"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Rate Field */}
              <div className="col-span-5">
                <FormField
                  control={form.control}
                  name={`customRates.${index}.rate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Rate per Unit"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Remove Button */}
              <div className="col-span-2 flex items-end">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1} // Prevent removing the last field
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          {/* Add More Button */}
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ size: 0, rate: 0 })}
          >
            Add More
          </Button>
        </div>
        {/* Submit Button */}
        <Button type="submit" className="mt-6" disabled={isSubmitting}>
          {isSubmitting && (
            <LoaderCircle
              className="-ms-1 me-2 animate-spin"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
}
