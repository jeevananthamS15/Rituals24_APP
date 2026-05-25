import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  trackView,
} from "../controllers/blog.controller";
import { validate } from "../middleware/validate.middleware";
import { uploadSingleImage } from "../middleware/upload.middleware";
import {
  createBlogSchema,
  updateBlogSchema,
  getBlogSchema,
  deleteBlogSchema,
} from "../schemas/blog.schema";
import {
  authenticate,
  authorize,
  checkPermission,
} from "../middleware/auth.middleware";

const router = Router();
router.get("/", getAllBlogs);
router.get(
  "/:id",
  checkPermission("blog", "read"),
  validate(getBlogSchema),
  getBlogById,
);
router.post(
  "/:id/views",
  checkPermission("blog", "read"),
  validate(getBlogSchema),
  trackView,
);

router.post(
  "/",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("blog", "create"),
  uploadSingleImage,
  validate(createBlogSchema),
  createBlog,
);
router.put(
  "/:id",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("blog", "update"),
  uploadSingleImage,
  validate(updateBlogSchema),
  updateBlog,
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("blog", "delete"),
  validate(deleteBlogSchema),
  deleteBlog,
);

export default router;
