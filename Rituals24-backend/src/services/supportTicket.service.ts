import { SupportTicket } from "../models/SupportTickets.model";
import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";

interface CreateTicketInput {
  userId: string;
  subject: string;
  category: string;
  priority?: "low" | "medium" | "high";
}

interface UpdateTicketInput {
  subject?: string;
  category?: string;
  priority?: "low" | "medium" | "high";
  status?: "open" | "in_progress" | "esclated" | "resolved" | "closed";
}

const generateTicketId = () =>
  `TKT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

export const createTicket = async (data: CreateTicketInput) => {
  const ticketId = generateTicketId();
  const ticket = new SupportTicket({ ...data, ticketId });
  await ticket.save();
  return ticket;
};

export const getAllTickets = async () => {
  return SupportTicket.find().populate("userId", "name email");
};

export const getTicketsByUser = async (userId: string) => {
  return SupportTicket.find({ userId });
};

export const getTicketById = async (id: string) => {
  const ticket = await SupportTicket.findById(id).populate(
    "userId",
    "name email",
  );
  if (!ticket) {
    throw new AppError(
      "Support ticket not found",
      StatusCodes.NOT_FOUND,
      "TICKET_NOT_FOUND",
    );
  }
  return ticket;
};

export const updateTicket = async (id: string, data: UpdateTicketInput) => {
  const ticket = await SupportTicket.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!ticket) {
    throw new AppError(
      "Support ticket not found",
      StatusCodes.NOT_FOUND,
      "TICKET_NOT_FOUND",
    );
  }
  return ticket;
};

export const deleteTicket = async (id: string) => {
  const ticket = await SupportTicket.findByIdAndDelete(id);
  if (!ticket) {
    throw new AppError(
      "Support ticket not found",
      StatusCodes.NOT_FOUND,
      "TICKET_NOT_FOUND",
    );
  }
  return ticket;
};
