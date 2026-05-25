import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { returnSuccessResponse } from "../utils/apiout";
import {
  createPujaKit as createPujaKitService,
  getAllPujaKits as getAllPujaKitsService,
  getPujaKitById as getPujaKitByIdService,
  updatePujaKit as updatePujaKitService,
  deletePujaKit as deletePujaKitService,
} from "../services/pujaKit.service";
import { StatusCodes } from "../common/errors/statusCodes";

export const createPujaKit = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      name,
      description,
      rating,
      cost_price,
      selling_price,
      stock_quantity,
      minimum_stock_threshold,
      supplier,
      specifications,
      items,
    } = req.body;

    const images = req.files
      ? (req.files as Express.MulterS3.File[]).map((f) => f.location)
      : [];

    const pujaKit = await createPujaKitService({
      name,
      description,
      rating,
      cost_price,
      selling_price,
      stock_quantity,
      minimum_stock_threshold,
      supplier,
      specifications,
      images,
      items,
    });

    return returnSuccessResponse(res, StatusCodes.CREATED, pujaKit);
  },
);

export const getAllPujaKits = asyncHandler(
  async (req: Request, res: Response) => {
    const { minPrice, maxPrice } = req.query;

    const filters = {
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };

    const pujaKits = await getAllPujaKitsService(filters);
    return returnSuccessResponse(res, StatusCodes.OK, pujaKits);
  },
);

export const getPujaKitById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const pujaKit = await getPujaKitByIdService(id);
    return returnSuccessResponse(res, StatusCodes.OK, pujaKit);
  },
);

export const updatePujaKit = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const updateData = req.body;

    if (req.files && (req.files as Express.MulterS3.File[]).length > 0) {
      updateData.images = (req.files as Express.MulterS3.File[]).map(
        (f) => f.location,
      );
    }

    const userId = req.user?.id;
    const pujaKit = await updatePujaKitService(id, updateData, userId);
    return returnSuccessResponse(res, StatusCodes.OK, pujaKit);
  },
);

export const deletePujaKit = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const pujaKit = await deletePujaKitService(id);
    return returnSuccessResponse(res, StatusCodes.OK, pujaKit);
  },
);
