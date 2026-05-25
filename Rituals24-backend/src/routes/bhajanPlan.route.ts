import { Router } from "express";
import {
  createBhajanPlan,
  getAllBhajanPlans,
  getBhajanPlanById,
  updateBhajanPlan,
  deleteBhajanPlan,
} from "../controllers/bhajanPlan.controller";
import { validate } from "../middleware/validate.middleware";
import {
  createBhajanPlanSchema,
  updateBhajanPlanSchema,
  getBhajanPlanSchema,
  deleteBhajanPlanSchema,
} from "../schemas/bhajanPlan.schema";
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
  validate(createBhajanPlanSchema),
  createBhajanPlan,
);
router.get("/", checkPermission("services", "read"), getAllBhajanPlans);
router.get(
  "/:id",
  checkPermission("services", "read"),
  validate(getBhajanPlanSchema),
  getBhajanPlanById,
);
router.put(
  "/:id",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("services", "update"),
  validate(updateBhajanPlanSchema),
  updateBhajanPlan,
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin", "subadmin"),
  checkPermission("services", "delete"),
  validate(deleteBhajanPlanSchema),
  deleteBhajanPlan,
);

export default router;
