import { z } from "zod";

const specialPoojaSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().positive().optional(),
  duration: z.coerce.number().int().positive().optional(),
  timing: z.string().optional(),
});

export const createTempleSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    rating: z.coerce.number().min(0).max(5).optional(),
    special_poojas: z.preprocess(
      (v) => { if (typeof v === "string") { try { return JSON.parse(v); } catch { return v; } } return v; },
      z.array(specialPoojaSchema).optional()
    ),
    images: z.array(z.url()).optional(),
  }),
});

export const updateTempleSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    rating: z.coerce.number().min(0).max(5).optional(),
    special_poojas: z.preprocess(
      (v) => { if (typeof v === "string") { try { return JSON.parse(v); } catch { return v; } } return v; },
      z.array(specialPoojaSchema).optional()
    ),
    images: z.array(z.url()).optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export const getTempleSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const deleteTempleSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const addSpecialPoojaSchema = z.object({
  body: specialPoojaSchema,
  params: z.object({
    id: z.string(),
  }),
});
