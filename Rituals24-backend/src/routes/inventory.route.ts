import { Router } from "express";
import {
  getAllInventoryLogs,
  getInventoryLogById,
  getInventoryLogsByProduct,
} from "../controllers/inventory.controller";
import {
  authenticate,
  authorize,
  checkPermission,
} from "../middleware/auth.middleware";

const router = Router();
router.use(authenticate, authorize("admin", "subadmin"));

router.get("/", checkPermission("inventory", "read"), getAllInventoryLogs);
router.get(
  "/product/:productId",
  checkPermission("inventory", "read"),
  getInventoryLogsByProduct,
);
router.get("/:id", checkPermission("inventory", "read"), getInventoryLogById);

export default router;
