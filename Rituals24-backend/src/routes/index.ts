import { Router } from "express";
import AuthRoutes from "./auth.route";
import AdminRoutes from "./admin.route";
import PujaRoutes from "./puja.route";
import PanditRoutes from "./pandit.route";
import TempleRoutes from "./temple.route";
import PujaKitRoutes from "./pujaKit.route";
import BhajanRoutes from "./bhajan.route";
import BhajanPlanRoutes from "./bhajanPlan.route";
import PanditBookingRoutes from "./panditBooking.route";
import SupportTicketRoutes from "./supportTicket.route";
import InventoryRoutes from "./inventory.route";
import BlogRoutes from "./blog.route";
import WishlistRoutes from "./wishlist.route";
import CartRoutes from "./cart.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/admin", AdminRoutes);
router.use("/pujas", PujaRoutes);
router.use("/pandits", PanditRoutes);
router.use("/temples", TempleRoutes);
router.use("/puja-kits", PujaKitRoutes);
router.use("/bhajans", BhajanRoutes);
router.use("/bhajan-plans", BhajanPlanRoutes);
router.use("/bookings", PanditBookingRoutes);
router.use("/support-tickets", SupportTicketRoutes);
router.use("/inventory", InventoryRoutes);
router.use("/blogs", BlogRoutes);
router.use("/wishlist", WishlistRoutes);
router.use("/cart", CartRoutes);

export default router;
