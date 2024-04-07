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
import { useRouter } from "next/navigation";
import { toast } from "@repo/ui/ui/toaster";
import { advancedFormSchema } from "@repo/db/zodSchemas.ts";
import { trpc } from "@/app/(authenticated)/_trpc/client.ts";
import { useCreateProductStore } from "@/store/createProduct.ts";
import { ROUTES } from "@/libWeb/constants.ts";

export default function CreateProductForm() {
  const router = useRouter();

  const basicForm = useCreateProductStore.use.getBasicForm()();
  const resetForm = useCreateProductStore.use.resetForm();

  const trpcUtils = trpc.useUtils();
  const addProduct = trpc.product.add.useMutation();

  const form = useForm<z.infer<typeof advancedFormSchema>>({
    resolver: zodResolver(advancedFormSchema),
    defaultValues: {
      quantity: {
        isLimited: false,
      },
      split: {
        isSplit: false,
      },
    },
  });

  const isSplit = form.watch("split.isSplit");
  const isLimited = form.watch("quantity.isLimited");

  useEffect(() => {
    if (isSplit) {
      form.register("split.wallets");
      form.setValue("split.wallets", [
        {
          wallet: "",
          percentage: 50,
        },
      ]);
    } else {
      form.clearErrors("split");
      form.unregister("split.wallets");
    }
  }, [form, isSplit]);

  useEffect(() => {
    if (isLimited) {
      form.register("quantity.quantity");
      form.setValue("quantity.quantity", 1);
    } else {
      form.clearErrors("quantity");
      form.unregister("quantity.quantity");
    }
  }, [form, isLimited]);

  function onSubmit(advancedForm: z.infer<typeof advancedFormSchema>) {
    addProduct.mutate(
      {
        ...basicForm,
        ...advancedForm,
      },
      {
        onSuccess: async ({ message }) => {
          toast.success(message);

          resetForm();

          await trpcUtils.product.getAll.invalidate();

          router.push(ROUTES.PRODUCTS);
        },
        onError: () => {
          toast.error("Failed to add product.");
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form
        className="container mt-8 space-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <FormField
            control={form.control}
            name="quantity.isLimited"
            render={({ field }) => (
              <div>
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
                  <div className="space-y-2 leading-none">
                    <FormLabel className="flex items-center text-lg">
                      Quantity
                    </FormLabel>
                    <FormDescription>
                      Limit the quantity of your product.
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

          {isLimited ? (
            <FormField
              control={form.control}
              name="quantity.quantity"
              render={({ field }) => (
                <FormItem className="ml-6 mt-3">
                  <FormLabel className="text-lg">Limit</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter quantity."
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the supply of your product.
                    <span className="ml-2 font-bold">Note:</span> Products do
                    not have to be limited.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
        </div>

        <div>
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
            <div className="ml-6 mt-3 flex flex-col gap-6 sm:flex-row sm:gap-20">
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
                    <FormDescription>
                      How much will they receive?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : null}
        </div>

        <Button disabled={addProduct.isPending} type="submit">
          Submit <CircleCheck className="ml-2" />
        </Button>
      </form>
    </Form>
  );
}
