import { z } from "zod";

export const createBhajanSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    category: z.enum(["Devotional", "Festival", "Traditional", "Custom"]).optional(),
    languages: z.array(z.string()).optional(),
    durationRange: z.string().optional(),
    rating: z.coerce.number().min(0).max(5).optional(),
    significance: z.array(z.string()).optional(),
    enabled: z.preprocess((v) => v === "true" || v === true, z.boolean()).optional(),
  }),
});

export const updateBhajanSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    category: z.enum(["Devotional", "Festival", "Traditional", "Custom"]).optional(),
    languages: z.array(z.string()).optional(),
    durationRange: z.string().optional(),
    rating: z.coerce.number().min(0).max(5).optional(),
    significance: z.array(z.string()).optional(),
    enabled: z.preprocess((v) => v === "true" || v === true, z.boolean()).optional(),
  }),
  params: z.object({ id: z.string() }),
});

export const getBhajanSchema = z.object({
  params: z.object({ id: z.string() }),
});

export const deleteBhajanSchema = z.object({
  params: z.object({ id: z.string() }),
});
