import { z } from "zod";

export const createTicketSchema = z.object({
  body: z.object({
    subject: z.string().min(1, "Subject is required"),
    category: z.string().min(1, "Category is required"),
    priority: z.enum(["low", "medium", "high"]).optional(),
  }),
});

export const updateTicketSchema = z.object({
  body: z.object({
    subject: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    status: z
      .enum(["open", "in_progress", "esclated", "resolved", "closed"])
      .optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export const getTicketSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const deleteTicketSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
