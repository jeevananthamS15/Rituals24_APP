import { Router } from "express";
import { uploadImages } from "../middleware/upload.middleware";
import {
  getAllPandits,
  getPanditById,
  updatePandit,
  getVerifiedPandits,
  getPanditsByService,
  getMyServices,
  addMyService,
  removeMyService,
  toggleMyService,
  updateMyAvailability,
  updateMyProfile,
} from "../controllers/pandit.controller";
import { validate } from "../middleware/validate.middleware";
import { getPanditSchema } from "../schemas/pandit.schema";
import {
  authenticate,
  authorize,
  checkPermission,
} from "../middleware/auth.middleware";

const router = Router();
router.get("/", getAllPandits);
router.get("/verified", getVerifiedPandits);
router.get("/by-service/:serviceId", getPanditsByService);

// Pandit self-service management — must be defined before /:id
router.get("/me/services", authenticate, authorize("pandit"), getMyServices);
router.post("/me/services", authenticate, authorize("pandit"), addMyService);
router.delete(
  "/me/services/:serviceId",
  authenticate,
  authorize("pandit"),
  removeMyService,
);
router.patch(
  "/me/services/:serviceId/toggle",
  authenticate,
  authorize("pandit"),
  toggleMyService,
);
router.patch(
  "/me/availability",
  authenticate,
  authorize("pandit"),
  updateMyAvailability,
);
router.patch("/me", authenticate, authorize("pandit"), updateMyProfile);

router.get("/:id", validate(getPanditSchema), getPanditById);
router.put(
  "/:id",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("pandits", "update"),
  uploadImages,
  updatePandit,
);

export default router;
