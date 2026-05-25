import { Router } from "express";
import { uploadImages } from "../middleware/upload.middleware";
import {
  createTemple,
  getAllTemples,
  getTempleById,
  updateTemple,
  deleteTemple,
  addSpecialPooja,
} from "../controllers/temple.controller";
import { validate } from "../middleware/validate.middleware";
import {
  createTempleSchema,
  updateTempleSchema,
  getTempleSchema,
  deleteTempleSchema,
  addSpecialPoojaSchema,
} from "../schemas/temple.schema";
import { parseArrayFields } from "../middleware/parseArrayFields.middleware";
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
  parseArrayFields(["special_poojas", "rating"]),
  validate(createTempleSchema),
  createTemple,
);
router.get("/", checkPermission("services", "read"), getAllTemples);
router.get(
  "/:id",
  checkPermission("services", "read"),
  validate(getTempleSchema),
  getTempleById,
);
router.put(
  "/:id",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("services", "update"),
  uploadImages,
  parseArrayFields(["special_poojas", "rating"]),
  validate(updateTempleSchema),
  updateTemple,
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("services", "delete"),
  validate(deleteTempleSchema),
  deleteTemple,
);
router.post(
  "/:id/special-poojas",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("services", "update"),
  validate(addSpecialPoojaSchema),
  addSpecialPooja,
);

export default router;
