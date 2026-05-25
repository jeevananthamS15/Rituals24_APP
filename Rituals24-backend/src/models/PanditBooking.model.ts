import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PanditBookingSchema = new Schema({
  panditId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  bookingId: {
    type: String,
    required: true,
    unique: true,
  },
  booking_type: {
    type: String,
  },
  booking_date: {
    type: Date,
  },
  booking_time: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  pujaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Puja",
  },
  total_price: {
    type: Number,
  },
  payment_status: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending",
  },
  booked_at: {
    type: Date,
    default: Date.now,
  },
  confirmed_at: {
    type: Date,
  },
});

export const PanditBooking = mongoose.model(
  "PanditBooking",
  PanditBookingSchema,
);
