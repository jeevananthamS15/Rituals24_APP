import { z } from "zod";

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().optional(),
    content: z.string().optional(),
    status: z.enum(["draft", "published", "scheduled"]).optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    primaryKeyword: z.string().optional(),
    secondaryKeywords: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),
    scheduledAt: z.string().datetime().optional(),
  }),
});

export const updateBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    slug: z.string().optional(),
    content: z.string().optional(),
    status: z.enum(["draft", "published", "scheduled"]).optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    primaryKeyword: z.string().optional(),
    secondaryKeywords: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),
    scheduledAt: z.string().datetime().optional(),
  }),
  params: z.object({ id: z.string() }),
});

export const getBlogSchema = z.object({
  params: z.object({ id: z.string() }),
});

export const deleteBlogSchema = z.object({
  params: z.object({ id: z.string() }),
});
