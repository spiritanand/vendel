import { z } from "zod";

export const basicFormSchema = z.object({
  name: z.string().trim().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z.string().trim().optional(),
  price: z.coerce.number().gt(0),
  image: z.string().optional(),
});

const quantitySchema = z.union([
  z.object({
    isLimited: z.literal(true),
    quantity: z.coerce.number().safe().int().positive().default(1),
  }),
  z.object({
    isLimited: z.literal(false),
  }),
]);
export type QuantityType = z.infer<typeof quantitySchema>;

export const splitSchema = z.union([
  z.object({
    isSplit: z.literal(true),
    wallets: z.array(
      z.object({
        wallet: z.string().regex(/[1-9A-HJ-NP-Za-km-z]{32,44}/, {
          message: "Invalid wallet address.",
        }),
        percentage: z.coerce.number().positive().max(100),
      }),
    ),
  }),
  z.object({
    isSplit: z.literal(false),
  }),
]);
export type SplitType = z.infer<typeof splitSchema>;

export const advancedFormSchema = z.object({
  quantity: quantitySchema,
  split: splitSchema,
});

export const formSchema = basicFormSchema.merge(advancedFormSchema);

export const doByIdSchema = z.object({
  id: z.string(),
});
