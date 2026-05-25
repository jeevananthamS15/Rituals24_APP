import { Router } from "express";
import {
  onboardPandit,
  verifyStep,
  listPandits,
  getPandit,
  getPresignedUrl,
  togglePanditLogin,
  createSubadmin,
  listSubadmins,
  getSubadmin,
  updateSubadmin,
  deleteSubadmin,
  freezeSubadmin,
  listCustomers,
  toggleCustomerLogin,
} from "../controllers/admin.controller";
import { validate } from "../middleware/validate.middleware";
import {
  adminOnboardPanditSchema,
  approveVerificationStepSchema,
  deletePanditSchema,
} from "../schemas/pandit.schema";
import {
  createSubadminSchema,
  updateSubadminPermissionsSchema,
  subadminIdSchema,
} from "../schemas/subadmin.schema";
import {
  authenticate,
  authorize,
  checkPermission,
} from "../middleware/auth.middleware";
import { uploadPanditDocs } from "../middleware/upload-private.middleware";
import { deletePandit } from "../services/pandit.service";
import { getAllInventoryLogs } from "../services/inventory.service";

const router = Router();

// All admin routes require a valid JWT and admin or subadmin role
router.use(authenticate, authorize("admin", "subadmin"));

// POST  /api/admin/pandits/onboard  — direct onboard with private doc uploads
// uploadPanditDocs (multer) MUST run before validate() so req.body is populated
router.post(
  "/pandits/onboard",
  checkPermission("pandits", "create"),
  uploadPanditDocs,
  validate(adminOnboardPanditSchema),
  onboardPandit,
);

// GET   /api/admin/pandits/presigned?url=<s3-url>  — presigned URL for private doc
router.get(
  "/pandits/presigned",
  checkPermission("pandits", "read"),
  getPresignedUrl,
);

// PATCH /api/admin/pandits/:id/verify/:step  — approve or reject identity/bank step
router.patch(
  "/pandits/:id/verify/:step",
  checkPermission("pandits", "update"),
  validate(approveVerificationStepSchema),
  verifyStep,
);

// GET   /api/admin/pandits?filter=all|pending|verified|rejected
router.get("/pandits", checkPermission("pandits", "read"), listPandits);

// GET   /api/admin/pandits/:id
router.get("/pandits/:id", checkPermission("pandits", "read"), getPandit);

// PATCH /api/admin/pandits/:id/login  — toggle canLogin for a pandit
router.patch(
  "/pandits/:id/login",
  checkPermission("pandits", "update"),
  togglePanditLogin,
);

router.delete(
  "/pandits/:id",
  checkPermission("pandits", "delete"),
  validate(deletePanditSchema),
  deletePandit,
);

// Subadmin management — admin only
router.post(
  "/subadmins",
  authorize("admin"),
  validate(createSubadminSchema),
  createSubadmin,
);
router.get("/subadmins", authorize("admin"), listSubadmins);
router.get(
  "/subadmins/:id",
  authorize("admin"),
  validate(subadminIdSchema),
  getSubadmin,
);
router.patch(
  "/subadmins/:id",
  authorize("admin"),
  validate(updateSubadminPermissionsSchema),
  updateSubadmin,
);
router.patch(
  "/subadmins/:id/freeze",
  authorize("admin"),
  validate(subadminIdSchema),
  freezeSubadmin,
);
router.delete(
  "/subadmins/:id",
  authorize("admin"),
  validate(subadminIdSchema),
  deleteSubadmin,
);

// Customer management
router.get("/customers", checkPermission("customers", "read"), listCustomers);
router.patch(
  "/customers/:id/login",
  checkPermission("customers", "update"),
  toggleCustomerLogin,
);

router.get(
  "/inventory/logs",
  authorize("admin", "subadmin"),
  checkPermission("inventory", "read"),
  getAllInventoryLogs,
);

export default router;
