"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/ui/form.tsx";
import { Input } from "@repo/ui/ui/input.tsx";
import { Button } from "@repo/ui/ui/button.tsx";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import { Checkbox } from "@repo/ui/ui/checkbox.tsx";
import { useEffect } from "react";
import { advancedFormSchema } from "@/libWeb/zodSchemas.ts";

export default function CreateProductForm() {
  // const router = useRouter();
  //
  // const step = useCreateProductStore((state) => state.step);
  // const isBasic = step === "basics";
  //
  // if (isBasic) router.push("/user/products/create/basics");

  const form = useForm<z.infer<typeof advancedFormSchema>>({
    resolver: zodResolver(advancedFormSchema),
    defaultValues: {
      split: {
        isSplit: false,
      },
    },
  });

  function onSubmit(values: z.infer<typeof advancedFormSchema>) {
    console.log(values);
  }

  // console.log({
  //   values: form.getValues(),
  //   errors: form.formState.errors,
  // });

  const isSplit = form.watch("split.isSplit");

  useEffect(() => {
    if (isSplit) {
      form.setValue("split.wallets", [
        {
          wallet: "",
          percentage: 50,
        },
      ]);
      form.register("split.wallets");
    } else {
      form.unregister("split.wallets");
    }
  }, [form, isSplit]);

  return (
    <Form {...form}>
      <form
        className="container mt-8 space-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Quantity</FormLabel>
              <FormControl>
                <Input
                  placeholder="is this a limited product? Enter the quantity."
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the supply of your product. Note: Products do not have
                to be limited.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="split.isSplit"
          render={({ field }) => (
            <div>
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
                <div className="space-y-2 leading-none">
                  <FormLabel className="flex items-center text-lg">
                    Split Revenue
                  </FormLabel>
                  <FormDescription>
                    Check this box if you want to split revenue into multiple
                    wallets.
                  </FormDescription>
                </div>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
              <FormMessage />
            </div>
          )}
        />

        {isSplit ? (
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-20">
            <FormField
              control={form.control}
              name="split.wallets.0.wallet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Wallet Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter wallet address"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormDescription>Their wallet address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="split.wallets.0.percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Percentage</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter wallet address"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormDescription>How much will they receive?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : null}

        <Button type="submit">
          Submit <CircleCheck className="ml-2" />
        </Button>
      </form>
    </Form>
  );
}
