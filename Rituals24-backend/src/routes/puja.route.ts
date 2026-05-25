import { Router } from "express";
import {
  createPuja,
  getAllPujas,
  getPujaById,
  updatePuja,
  deletePuja,
  getPopularPujas,
  getVerifiedPujas,
} from "../controllers/puja.controller";
import { validate } from "../middleware/validate.middleware";
import {
  createPujaSchema,
  updatePujaSchema,
  getPujaSchema,
  deletePujaSchema,
} from "../schemas/puja.schema";
import { uploadImages } from "../middleware/upload.middleware";
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
  validate(createPujaSchema),
  createPuja,
);
router.get("/", checkPermission("services", "read"), getAllPujas);
router.get("/popular", getPopularPujas);
router.get("/verified", getVerifiedPujas);
router.get(
  "/:id",
  checkPermission("services", "read"),
  validate(getPujaSchema),
  getPujaById,
);
router.put(
  "/:id",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("services", "update"),
  uploadImages,
  validate(updatePujaSchema),
  updatePuja,
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("services", "delete"),
  validate(deletePujaSchema),
  deletePuja,
);

export default router;
