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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Asterisk } from "lucide-react";
import Solana from "@/components/logos/Solana.tsx";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z.string(),
  price: z.number().positive(),
});

export function CreateProductForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
              <FormLabel className="flex items-center">
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
              <FormLabel>Description</FormLabel>
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
              <FormLabel className="flex items-center gap-2">
                Price (in <Solana /> SOL){" "}
                <Asterisk className="h-2 self-start" width={13} />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="dApper NFT name or any other product name"
                  type="number"
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
