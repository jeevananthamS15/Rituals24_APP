import { Router } from "express";
import {
  authenticate,
  authorize,
  checkPermission,
} from "../middleware/auth.middleware";
import {
  createBooking,
  getBookingById,
  getMyBookings,
  updateBookingStatus,
  updatePaymentStatus,
  getAllBookings,
  deleteBooking,
} from "../controllers/panditBooking.controller";

const router = Router();

// All routes require authentication
router.use(authenticate);

// Customer: create a booking
router.post("/", authorize("customer"), createBooking);

// Customer / Pandit: view own bookings
router.get("/my", authorize("customer", "pandit"), getMyBookings);

// Admin: get all bookings (with optional filters via query params)
router.get(
  "/",
  authorize("admin", "subadmin"),
  checkPermission("bookings", "read"),
  getAllBookings,
);

// Any authenticated user: get a single booking by ID
router.get(
  "/:id",
  authorize("customer", "pandit", "admin", "subadmin"),
  getBookingById,
);

// Customer / Pandit: update booking status
router.patch(
  "/:id/status",
  authorize("customer", "pandit", "admin", "subadmin"),
  checkPermission("bookings", "update"),
  updateBookingStatus,
);

// Admin: update payment status
router.patch(
  "/:id/payment",
  authorize("admin", "subadmin"),
  checkPermission("bookings", "update"),
  updatePaymentStatus,
);

// Admin: delete a booking
router.delete(
  "/:id",
  authorize("admin", "subadmin"),
  checkPermission("bookings", "delete"),
  deleteBooking,
);

export default router;
