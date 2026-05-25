import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { returnSuccessResponse } from "../utils/apiout";
import {
  createBhajan as createBhajanService,
  getAllBhajans as getAllBhajansService,
  getBhajanById as getBhajanByIdService,
  updateBhajan as updateBhajanService,
  deleteBhajan as deleteBhajanService,
} from "../services/bhajan.service";
import { StatusCodes } from "../common/errors/statusCodes";

export const createBhajan = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      name,
      description,
      category,
      languages,
      durationRange,
      rating,
      significance,
      enabled,
    } = req.body;
    const images = req.files
      ? (req.files as Express.MulterS3.File[]).map((f) => f.location)
      : [];

    const bhajan = await createBhajanService({
      name,
      description,
      category,
      languages,
      durationRange,
      rating,
      significance,
      images,
      enabled,
    });

    return returnSuccessResponse(res, StatusCodes.CREATED, bhajan);
  },
);

export const getAllBhajans = asyncHandler(
  async (req: Request, res: Response) => {
    const bhajans = await getAllBhajansService();
    return returnSuccessResponse(res, StatusCodes.OK, bhajans);
  },
);

export const getBhajanById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const bhajan = await getBhajanByIdService(id);
    return returnSuccessResponse(res, StatusCodes.OK, bhajan);
  },
);

export const updateBhajan = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const updateData = { ...req.body };
    if (req.files && (req.files as Express.MulterS3.File[]).length > 0) {
      updateData.images = (req.files as Express.MulterS3.File[]).map(
        (f) => f.location,
      );
    }
    const bhajan = await updateBhajanService(id, updateData);
    return returnSuccessResponse(res, StatusCodes.OK, bhajan);
  },
);

export const deleteBhajan = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const bhajan = await deleteBhajanService(id);
    return returnSuccessResponse(res, StatusCodes.OK, bhajan);
  },
);
