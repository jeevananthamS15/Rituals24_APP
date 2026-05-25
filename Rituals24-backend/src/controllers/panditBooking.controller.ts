import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { returnSuccessResponse } from "../utils/apiout";
import { StatusCodes } from "../common/errors/statusCodes";
import { AppError } from "../common/errors/api-error";
import {
  createBooking as createBookingService,
  getBookingById as getBookingByIdService,
  getBookingsByCustomer as getBookingsByCustomerService,
  getBookingsByPandit as getBookingsByPanditService,
  updateBookingStatus as updateBookingStatusService,
  updatePaymentStatus as updatePaymentStatusService,
  getAllBookings as getAllBookingsService,
  deleteBooking as deleteBookingService,
} from "../services/panditBooking.service";

// Customer creates a booking
export const createBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const customerId = req.user!.id;
    const {
      panditId,
      customerName,
      booking_type,
      booking_date,
      booking_time,
      location,
      pujaId,
      total_price,
    } = req.body;

    const booking = await createBookingService({
      panditId,
      customerId,
      customerName,
      booking_type,
      booking_date,
      booking_time,
      location,
      pujaId,
      total_price,
    });

    return returnSuccessResponse(res, StatusCodes.CREATED, booking);
  },
);

// Get a booking by its MongoDB ID
export const getBookingById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const booking = await getBookingByIdService(id);
    return returnSuccessResponse(res, StatusCodes.OK, booking);
  },
);

// Customer gets their own bookings
export const getMyBookings = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: userId, role } = req.user!;

    const bookings =
      role === "pandit"
        ? await getBookingsByPanditService(userId)
        : await getBookingsByCustomerService(userId);

    return returnSuccessResponse(res, StatusCodes.OK, bookings);
  },
);

// Update booking status (confirm / complete / cancel)
export const updateBookingStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { status } = req.body;
    const { id: requesterId, role } = req.user!;

    const booking = await updateBookingStatusService(
      id,
      status,
      requesterId,
      role,
    );
    return returnSuccessResponse(res, StatusCodes.OK, booking);
  },
);

// Update payment status — admin only
export const updatePaymentStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { payment_status } = req.body;

    const booking = await updatePaymentStatusService(id, payment_status);
    return returnSuccessResponse(res, StatusCodes.OK, booking);
  },
);

// Admin: get all bookings with optional filters
export const getAllBookings = asyncHandler(
  async (req: Request, res: Response) => {
    const { status, payment_status, booking_type, panditId, customerId } =
      req.query;

    const bookings = await getAllBookingsService({
      status: status as any,
      payment_status: payment_status as any,
      booking_type: booking_type as string | undefined,
      panditId: panditId as string | undefined,
      customerId: customerId as string | undefined,
    });

    return returnSuccessResponse(res, StatusCodes.OK, bookings);
  },
);

// Admin: delete a booking
export const deleteBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const booking = await deleteBookingService(id);
    return returnSuccessResponse(res, StatusCodes.OK, booking);
  },
);
