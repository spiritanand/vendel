import { z } from "zod";

export const basicFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z.string().optional(),
  price: z.coerce.number().positive(),
  image: z.string(),
});

export const advancedFormSchema = z.object({
  quantity: z.coerce.number().int().default(0),
  split: z.union([
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
  ]),
});
