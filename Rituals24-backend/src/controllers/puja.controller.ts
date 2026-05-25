import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { returnSuccessResponse } from "../utils/apiout";
import {
  createPuja as createPujaService,
  getAllPujas as getAllPujasService,
  getPujaById as getPujaByIdService,
  updatePuja as updatePujaService,
  deletePuja as deletePujaService,
  getPopularPujas as getPopularPujasService,
  getVerifiedPujas as getVerifiedPujasService,
} from "../services/puja.service";

import { StatusCodes } from "../common/errors/statusCodes";

// Create a new puja
export const createPuja = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    description,
    category,
    price,
    duration,
    state,
    language,
    status,
    service_type,
    panditCount,
    rating,
    isPopular,
    isVerified,
  } = req.body;

  const images = (req.files as Express.MulterS3.File[]).map((f) => f.location);

  const puja = await createPujaService({
    name,
    description,
    category,
    price,
    duration,
    state,
    language,
    status,
    service_type,
    images,
    panditCount,
    rating,
    isPopular,
    isVerified,
  });

  return returnSuccessResponse(res, StatusCodes.CREATED, puja);
});

// Get all pujas
export const getAllPujas = asyncHandler(async (req: Request, res: Response) => {
  const {
    isPopular,
    isVerified,
    state,
    language,
    diety,
    service_type,
    minPrice,
    maxPrice,
  } = req.query;

  const filters = {
    isPopular:
      isPopular === "true" ? true : isPopular === "false" ? false : undefined,
    isVerified:
      isVerified === "true" ? true : isVerified === "false" ? false : undefined,
    state: state as string | undefined,
    language: language as string | undefined,
    diety: diety as string | undefined,
    service_type: service_type as string | undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  };

  const pujas = await getAllPujasService(filters);

  return returnSuccessResponse(res, StatusCodes.OK, pujas);
});

// Get a single puja by ID
export const getPujaById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const puja = await getPujaByIdService(id);

  return returnSuccessResponse(res, StatusCodes.OK, puja);
});

// Update a puja by ID
export const updatePuja = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const updateData = req.body;

  if (req.files && (req.files as Express.MulterS3.File[]).length > 0) {
    updateData.images = (req.files as Express.MulterS3.File[]).map(
      (f) => f.location,
    );
  }

  const puja = await updatePujaService(id, updateData);

  return returnSuccessResponse(res, StatusCodes.OK, puja);
});

// Delete a puja by ID
export const deletePuja = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  const puja = await deletePujaService(id);

  return returnSuccessResponse(res, StatusCodes.OK, puja);
});

// Get popular pujas
export const getPopularPujas = asyncHandler(
  async (req: Request, res: Response) => {
    const { limit } = req.query;

    const pujas = await getPopularPujasService(limit ? Number(limit) : 10);

    return returnSuccessResponse(res, StatusCodes.OK, pujas);
  },
);

// Get verified pujas
export const getVerifiedPujas = asyncHandler(
  async (req: Request, res: Response) => {
    const pujas = await getVerifiedPujasService();

    return returnSuccessResponse(res, StatusCodes.OK, pujas);
  },
);
