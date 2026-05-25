import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { returnSuccessResponse } from "../utils/apiout";
import { StatusCodes } from "../common/errors/statusCodes";
import {
  createBlog as createBlogService,
  getAllBlogs as getAllBlogsService,
  getBlogById as getBlogByIdService,
  updateBlog as updateBlogService,
  deleteBlog as deleteBlogService,
  incrementViews as incrementViewsService,
} from "../services/blog.service";

export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const author = req.user!.id;
  const featuredImage = req.file
    ? (req.file as Express.MulterS3.File).location
    : undefined;

  const blog = await createBlogService({ ...req.body, author, featuredImage });
  return returnSuccessResponse(res, StatusCodes.CREATED, blog);
});

export const getAllBlogs = asyncHandler(
  async (_req: Request, res: Response) => {
    const blogs = await getAllBlogsService();
    return returnSuccessResponse(res, StatusCodes.OK, blogs);
  },
);

export const getBlogById = asyncHandler(async (req: Request, res: Response) => {
  const blog = await getBlogByIdService(req.params.id as string);
  return returnSuccessResponse(res, StatusCodes.OK, blog);
});

export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const updateData = { ...req.body };
  if (req.file) {
    updateData.featuredImage = (req.file as Express.MulterS3.File).location;
  }
  const blog = await updateBlogService(req.params.id as string, updateData);
  return returnSuccessResponse(res, StatusCodes.OK, blog);
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await deleteBlogService(req.params.id as string);
  return returnSuccessResponse(res, StatusCodes.OK, blog);
});

export const trackView = asyncHandler(async (req: Request, res: Response) => {
  const blog = await incrementViewsService(req.params.id as string);
  return returnSuccessResponse(res, StatusCodes.OK, blog);
});
