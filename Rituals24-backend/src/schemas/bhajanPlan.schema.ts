import { z } from "zod";

export const createBhajanPlanSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    duration: z.string().optional(),
    price: z.coerce.number().positive("Price must be positive"),
    artist_count: z.coerce.number().int().positive().optional(),
    instruments: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    tag: z.string().optional(),
    enabled: z.preprocess((v) => v === "true" || v === true, z.boolean()).optional(),
  }),
});

export const updateBhajanPlanSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    duration: z.string().optional(),
    price: z.coerce.number().positive().optional(),
    artist_count: z.coerce.number().int().positive().optional(),
    instruments: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    tag: z.string().optional(),
    enabled: z.preprocess((v) => v === "true" || v === true, z.boolean()).optional(),
  }),
  params: z.object({ id: z.string() }),
});

export const getBhajanPlanSchema = z.object({
  params: z.object({ id: z.string() }),
});

export const deleteBhajanPlanSchema = z.object({
  params: z.object({ id: z.string() }),
});
