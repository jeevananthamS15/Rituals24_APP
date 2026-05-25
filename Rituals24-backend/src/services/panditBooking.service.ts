import { PanditBooking } from "../models/PanditBooking.model";
import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

interface CreateBookingInput {
  panditId: string;
  customerId: string;
  customerName: string;
  booking_type?: string;
  booking_date?: Date;
  booking_time?: string;
  location?: string;
  pujaId?: string;
  total_price?: number;
}

interface BookingFilters {
  status?: BookingStatus;
  payment_status?: PaymentStatus;
  booking_type?: string;
  panditId?: string;
  customerId?: string;
}

function generateBookingId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `BK-${timestamp}-${random}`;
}

export const createBooking = async (data: CreateBookingInput) => {
  const bookingId = generateBookingId();

  const booking = new PanditBooking({
    ...data,
    bookingId,
  });

  await booking.save();
  return booking.populate([
    { path: "panditId", select: "name email" },
    { path: "pujaId", select: "name price" },
  ]);
};

export const getBookingById = async (id: string) => {
  const booking = await PanditBooking.findById(id)
    .populate("panditId", "name email")
    .populate("customerId", "name email")
    .populate("pujaId", "name price");

  if (!booking) {
    throw new AppError(
      "Booking not found",
      StatusCodes.NOT_FOUND,
      "BOOKING_NOT_FOUND",
    );
  }
  return booking;
};

export const getBookingsByCustomer = async (customerId: string) => {
  return PanditBooking.find({ customerId })
    .populate("panditId", "name email")
    .populate("pujaId", "name price")
    .sort({ booked_at: -1 });
};

export const getBookingsByPandit = async (panditId: string) => {
  return PanditBooking.find({ panditId })
    .populate("customerId", "name email")
    .populate("pujaId", "name price")
    .sort({ booked_at: -1 });
};

export const updateBookingStatus = async (
  id: string,
  status: BookingStatus,
  requesterId: string,
  requesterRole: "customer" | "pandit" | "admin" | "subadmin",
) => {
  const booking = await PanditBooking.findById(id);
  if (!booking) {
    throw new AppError(
      "Booking not found",
      StatusCodes.NOT_FOUND,
      "BOOKING_NOT_FOUND",
    );
  }

  // Role-based permission checks
  if (requesterRole === "customer") {
    if (booking.customerId.toString() !== requesterId) {
      throw new AppError(
        "You can only update your own bookings",
        StatusCodes.FORBIDDEN,
      );
    }
    if (status !== "cancelled") {
      throw new AppError(
        "Customers can only cancel bookings",
        StatusCodes.FORBIDDEN,
      );
    }
  }

  if (requesterRole === "pandit") {
    if (booking.panditId.toString() !== requesterId) {
      throw new AppError(
        "You can only update bookings assigned to you",
        StatusCodes.FORBIDDEN,
      );
    }
    if (!["confirmed", "completed", "cancelled"].includes(status)) {
      throw new AppError(
        "Pandits can only confirm, complete, or cancel bookings",
        StatusCodes.FORBIDDEN,
      );
    }
  }

  if (booking.status === "cancelled" || booking.status === "completed") {
    throw new AppError(
      `Cannot update a booking that is already ${booking.status}`,
      StatusCodes.BAD_REQUEST,
    );
  }

  booking.status = status;
  if (status === "confirmed") {
    booking.confirmed_at = new Date();
  }

  await booking.save();
  return booking;
};

export const updatePaymentStatus = async (
  id: string,
  payment_status: PaymentStatus,
) => {
  const booking = await PanditBooking.findByIdAndUpdate(
    id,
    { payment_status },
    { new: true, runValidators: true },
  );

  if (!booking) {
    throw new AppError(
      "Booking not found",
      StatusCodes.NOT_FOUND,
      "BOOKING_NOT_FOUND",
    );
  }
  return booking;
};

export const getAllBookings = async (filters?: BookingFilters) => {
  const query: Record<string, unknown> = {};

  if (filters?.status) query.status = filters.status;
  if (filters?.payment_status) query.payment_status = filters.payment_status;
  if (filters?.booking_type) query.booking_type = filters.booking_type;
  if (filters?.panditId) query.panditId = filters.panditId;
  if (filters?.customerId) query.customerId = filters.customerId;

  return PanditBooking.find(query)
    .populate("panditId", "name email")
    .populate("customerId", "name email")
    .populate("pujaId", "name price")
    .sort({ booked_at: -1 });
};

export const deleteBooking = async (id: string) => {
  const booking = await PanditBooking.findByIdAndDelete(id);
  if (!booking) {
    throw new AppError(
      "Booking not found",
      StatusCodes.NOT_FOUND,
      "BOOKING_NOT_FOUND",
    );
  }
  return booking;
};
