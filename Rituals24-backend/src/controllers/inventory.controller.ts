import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { returnSuccessResponse } from "../utils/apiout";
import { StatusCodes } from "../common/errors/statusCodes";
import {
  getAllInventoryLogs as getAllInventoryLogsService,
  getInventoryLogById as getInventoryLogByIdService,
  getInventoryLogsByProduct as getInventoryLogsByProductService,
} from "../services/inventory.service";

export const getAllInventoryLogs = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId, userId, change_type, from, to } = req.query;

    const filters = {
      productId: productId as string | undefined,
      userId: userId as string | undefined,
      change_type: change_type as string | undefined,
      from: from ? new Date(from as string) : undefined,
      to: to ? new Date(to as string) : undefined,
    };

    const logs = await getAllInventoryLogsService(filters);
    return returnSuccessResponse(res, StatusCodes.OK, logs);
  },
);

export const getInventoryLogById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const log = await getInventoryLogByIdService(id);
    return returnSuccessResponse(res, StatusCodes.OK, log);
  },
);

export const getInventoryLogsByProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params as { productId: string };
    const logs = await getInventoryLogsByProductService(productId);
    return returnSuccessResponse(res, StatusCodes.OK, logs);
  },
);
