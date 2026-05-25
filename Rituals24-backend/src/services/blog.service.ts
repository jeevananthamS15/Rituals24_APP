import { Blog } from "../models/Blog.model";
import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";

interface CreateBlogInput {
  title: string;
  slug: string;
  content?: string;
  status?: "draft" | "published" | "scheduled";
  author: string;
  featuredImage?: string;
  imageAlt?: string;
  imageCaption?: string;
  metaTitle?: string;
  metaDescription?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string;
  scheduledAt?: Date;
}

type UpdateBlogInput = Partial<Omit<CreateBlogInput, "author">>;

const slugify = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const uniqueSlug = async (base: string, excludeId?: string) => {
  let slug = base;
  let suffix = 0;
  while (true) {
    const query: Record<string, unknown> = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const existing = await Blog.findOne(query);
    if (!existing) return slug;
    suffix++;
    slug = `${base}-${suffix}`;
  }
};

export const createBlog = async (data: CreateBlogInput) => {
  const baseSlug = data.slug || slugify(data.title);
  const slug = await uniqueSlug(baseSlug);
  const blog = new Blog({ ...data, slug });
  await blog.save();
  return blog;
};

export const getAllBlogs = async () =>
  Blog.find().populate("author", "name email").sort({ createdAt: -1 });

export const getBlogById = async (id: string) => {
  const blog = await Blog.findById(id).populate("author", "name email");
  if (!blog) throw new AppError("Blog not found", StatusCodes.NOT_FOUND, "BLOG_NOT_FOUND");
  return blog;
};

export const updateBlog = async (id: string, data: UpdateBlogInput) => {
  if (data.title && !data.slug) {
    data.slug = await uniqueSlug(slugify(data.title), id);
  } else if (data.slug) {
    data.slug = await uniqueSlug(slugify(data.slug), id);
  }
  const blog = await Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!blog) throw new AppError("Blog not found", StatusCodes.NOT_FOUND, "BLOG_NOT_FOUND");
  return blog;
};

export const deleteBlog = async (id: string) => {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) throw new AppError("Blog not found", StatusCodes.NOT_FOUND, "BLOG_NOT_FOUND");
  return blog;
};

export const incrementViews = async (id: string) =>
  Blog.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
