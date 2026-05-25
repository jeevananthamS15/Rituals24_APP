import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.middleware";
import {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../controllers/wishlist.controller";

const router = Router();

router.use(authenticate);
router.use(authorize("customer"));

router.post("/", addToWishlist);
router.get("/", getMyWishlist);
router.delete("/", clearWishlist);
router.delete("/:id", removeFromWishlist);

export default router;
