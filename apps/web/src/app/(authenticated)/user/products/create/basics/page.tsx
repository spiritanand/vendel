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
import { ArrowBigRight, Asterisk } from "lucide-react";
import { useRouter } from "next/navigation";
import Solana from "@/components/logos/Solana.tsx";
import { basicFormSchema } from "@/libWeb/zodSchemas.ts";
import { useCreateProductStore } from "@/store/createProduct.ts";

export default function CreateProductForm() {
  const router = useRouter();

  const basicForm = useCreateProductStore.use.getBasicForm()();
  const setBasicForm = useCreateProductStore.use.setBasicForm();
  const updateStep = useCreateProductStore.use.updateStep();

  const form = useForm<z.infer<typeof basicFormSchema>>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      name: basicForm.name,
      description: basicForm.description,
      price: basicForm.price,
      image: basicForm.image,
    },
  });

  function onSubmit(values: z.infer<typeof basicFormSchema>) {
    setBasicForm(values);
    updateStep({ step: "advanced" });

    router.push("/user/products/create/advanced");
  }

  return (
    <Form {...form}>
      <form
        className="container mt-8 space-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center text-lg">
                Name <Asterisk className="h-2 self-start" width={13} />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="dApper NFT name or any other product name"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the name of the product displayed to users.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Description</FormLabel>
              <FormControl>
                <Input placeholder="why is it so cool?" {...field} />
              </FormControl>
              <FormDescription>
                This is the description of the product displayed to users.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-lg">
                Price (in <Solana /> SOL){" "}
                <Asterisk className="h-2 self-start" width={13} />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="dApper NFT name or any other product name"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the name of the product displayed to users.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          Next <ArrowBigRight className="ml-2" />
        </Button>
      </form>
    </Form>
  );
}
