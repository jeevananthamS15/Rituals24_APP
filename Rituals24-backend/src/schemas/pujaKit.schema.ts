import { z } from "zod";

const coerceNum = z.coerce.number();

export const createPujaKitSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    rating: coerceNum.min(0).max(5).optional(),
    cost_price: coerceNum.positive("Cost price must be positive"),
    selling_price: coerceNum.positive("Selling price must be positive"),
    stock_quantity: coerceNum
      .int()
      .min(0, "Stock quantity must be non-negative"),
    minimum_stock_threshold: coerceNum.int().min(0),
    supplier: z.string().optional(),
    specifications: z
      .union([z.array(z.string()), z.string().transform((s) => [s])])
      .optional(),
    items: z
      .union([z.array(z.string()), z.string().transform((s) => [s])])
      .optional(),
    status: z.enum(["active", "inactive"]).optional(),
  }),
});

export const updatePujaKitSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    rating: coerceNum.min(0).max(5).optional(),
    cost_price: coerceNum.positive().optional(),
    selling_price: coerceNum.positive().optional(),
    stock_quantity: coerceNum.int().min(0).optional(),
    minimum_stock_threshold: coerceNum.int().min(0).optional(),
    change_type: z.string().optional(),
    supplier: z.string().optional(),
    specifications: z
      .union([z.array(z.string()), z.string().transform((s) => [s])])
      .optional(),
    items: z
      .union([z.array(z.string()), z.string().transform((s) => [s])])
      .optional(),
    status: z.enum(["active", "inactive"]).optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export const getPujaKitSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const deletePujaKitSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
