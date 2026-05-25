import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { returnSuccessResponse } from "../utils/apiout";
import { StatusCodes } from "../common/errors/statusCodes";
import {
  createTicket as createTicketService,
  getAllTickets as getAllTicketsService,
  getTicketsByUser as getTicketsByUserService,
  getTicketById as getTicketByIdService,
  updateTicket as updateTicketService,
  deleteTicket as deleteTicketService,
} from "../services/supportTicket.service";

export const createTicket = asyncHandler(
  async (req: Request, res: Response) => {
    const { subject, category, priority } = req.body;
    const userId = req.user!.id;

    const ticket = await createTicketService({
      userId,
      subject,
      category,
      priority,
    });
    return returnSuccessResponse(res, StatusCodes.CREATED, ticket);
  },
);

export const getAllTickets = asyncHandler(
  async (req: Request, res: Response) => {
    const tickets = await getAllTicketsService();
    return returnSuccessResponse(res, StatusCodes.OK, tickets);
  },
);

export const getMyTickets = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const tickets = await getTicketsByUserService(userId);
    return returnSuccessResponse(res, StatusCodes.OK, tickets);
  },
);

export const getTicketById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const ticket = await getTicketByIdService(id);
    return returnSuccessResponse(res, StatusCodes.OK, ticket);
  },
);

export const updateTicket = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const ticket = await updateTicketService(id, req.body);
    return returnSuccessResponse(res, StatusCodes.OK, ticket);
  },
);

export const deleteTicket = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const ticket = await deleteTicketService(id);
    return returnSuccessResponse(res, StatusCodes.OK, ticket);
  },
);
