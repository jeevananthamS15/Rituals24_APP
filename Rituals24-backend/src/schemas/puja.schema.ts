import { z } from "zod";

const coerceBool = z.preprocess((v) => v === "true" || v === true, z.boolean());

export const createPujaSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    price: z.coerce.number().positive("Price must be positive"),
    duration: z.coerce.number().int().positive("Duration must be positive"),
    images: z.array(z.url()).optional(),
    panditCount: z.coerce.number().int().positive().optional(),
    rating: z.coerce.number().min(0).max(5).optional(),
    isPopular: coerceBool.optional(),
    isVerified: coerceBool.optional(),
  }),
});

export const updatePujaSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(10).optional(),
    price: z.coerce.number().positive().optional(),
    duration: z.coerce.number().int().positive().optional(),
    images: z.array(z.url()).optional(),
    panditCount: z.coerce.number().int().positive().optional(),
    rating: z.coerce.number().min(0).max(5).optional(),
    isPopular: coerceBool.optional(),
    isVerified: coerceBool.optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export const getPujaSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const deletePujaSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
