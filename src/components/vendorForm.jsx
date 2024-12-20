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
import { addVendor, updateVendor } from "@/services/dbService/vendorDbService";

const vendorSchema = z.object({
  name: z.string().nonempty("Name is required."),
  address: z.string().optional(),
  phone: z.string().optional(),
  balance: z.preprocess((val) => Number(val), z.number()),
});

export default function VendorForm({ data }) {
  const form = useForm({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      name: data?.name || "", // Initialize with an empty string for the name field
      address: data?.address || "", // Initialize with an empty string for the address field
      phone: data?.phone || "", // Initialize with an empty string for the phone field
      balance: data?.balance || 0, // Initialize with 0 for the balance field
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values) {
    try {
      let response;
      if (data) {
        values.id = data.id;
        response = await updateVendor(values);
      } else {
        response = await addVendor(values);
      }
      console.log("Submitted Values:", values);

      toast.success(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            Vendor updated successfully : <hr />
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
                <Input placeholder="Vendor's Name" {...field} />
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
                <Input placeholder="Vendor's Address" {...field} />
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
                <Input type="number" placeholder="Balance" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
