import mongoose from "mongoose";
const Schema = mongoose.Schema;

const supportTicketSchema = new Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "in_progress", "esclated", "resolved", "closed"],
    default: "open",
  },
  category: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const SupportTicket = mongoose.model(
  "SupportTicket",
  supportTicketSchema,
);
