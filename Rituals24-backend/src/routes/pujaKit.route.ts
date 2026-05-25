import { Router } from "express";
import {
  createPujaKit,
  getAllPujaKits,
  getPujaKitById,
  updatePujaKit,
  deletePujaKit,
} from "../controllers/pujaKit.controller";
import { validate } from "../middleware/validate.middleware";
import {
  createPujaKitSchema,
  updatePujaKitSchema,
  getPujaKitSchema,
  deletePujaKitSchema,
} from "../schemas/pujaKit.schema";
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
  checkPermission("products", "create"),
  uploadImages,
  validate(createPujaKitSchema),
  createPujaKit,
);
router.get("/", checkPermission("products", "read"), getAllPujaKits);
router.get("/:id", validate(getPujaKitSchema), getPujaKitById);
router.put(
  "/:id",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("inventory", "update"),
  uploadImages,
  validate(updatePujaKitSchema),
  updatePujaKit,
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("inventory", "delete"),
  validate(deletePujaKitSchema),
  deletePujaKit,
);

export default router;
