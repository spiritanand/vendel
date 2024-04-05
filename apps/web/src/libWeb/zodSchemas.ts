import { z } from "zod";

export const basicFormSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z.string(),
  price: z.number().positive(),
});

export const advancedFormSchema = z.object({
  image: z.string().url(),
  category: z.string(),
  tags: z.array(z.string()),
});
