import { Router } from "express";
import {
  createBhajan,
  getAllBhajans,
  getBhajanById,
  updateBhajan,
  deleteBhajan,
} from "../controllers/bhajan.controller";
import { validate } from "../middleware/validate.middleware";
import { uploadImages } from "../middleware/upload.middleware";
import {
  createBhajanSchema,
  updateBhajanSchema,
  getBhajanSchema,
  deleteBhajanSchema,
} from "../schemas/bhajan.schema";
import {
  authenticate,
  authorize,
  checkPermission,
} from "../middleware/auth.middleware";

const router = Router();
router.post(
  "/",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("services", "create"),
  uploadImages,
  validate(createBhajanSchema),
  createBhajan,
);
router.get("/", checkPermission("services", "read"), getAllBhajans);
router.get(
  "/:id",
  checkPermission("services", "read"),
  validate(getBhajanSchema),
  getBhajanById,
);
router.put(
  "/:id",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("services", "update"),
  uploadImages,
  validate(updateBhajanSchema),
  updateBhajan,
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("services", "delete"),
  validate(deleteBhajanSchema),
  deleteBhajan,
);

export default router;
