import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { returnSuccessResponse } from "../utils/apiout";
import {
  createTemple as createTempleService,
  getAllTemples as getAllTemplesService,
  getTempleById as getTempleByIdService,
  updateTemple as updateTempleService,
  deleteTemple as deleteTempleService,
  addSpecialPooja as addSpecialPoojaService,
} from "../services/temple.service";
import { StatusCodes } from "../common/errors/statusCodes";

// Create a new temple
export const createTemple = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      name,
      description,
      state,
      language,
      diety,
      rating,
      special_poojas,
      verified,
      certified_pandits_available,
      featured_on_homepage,
    } = req.body;

    const images = (req.files as Express.MulterS3.File[]).map(
      (f) => f.location,
    );

    const temple = await createTempleService({
      name,
      description,
      state,
      language,
      diety,
      rating,
      special_poojas,
      images,
      verified,
      certified_pandits_available,
      featured_on_homepage,
    });

    return returnSuccessResponse(res, StatusCodes.CREATED, temple);
  },
);

// Get all temples
export const getAllTemples = asyncHandler(
  async (req: Request, res: Response) => {
    const temples = await getAllTemplesService();

    return returnSuccessResponse(res, StatusCodes.OK, temples);
  },
);

// Get a single temple by ID
export const getTempleById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const temple = await getTempleByIdService(id);

    return returnSuccessResponse(res, StatusCodes.OK, temple);
  },
);

// Update a temple by ID
export const updateTemple = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const updateData = req.body;

    if (req.files && (req.files as Express.MulterS3.File[]).length > 0) {
      updateData.images = (req.files as Express.MulterS3.File[]).map(
        (f) => f.location,
      );
    }

    const temple = await updateTempleService(id, updateData);

    return returnSuccessResponse(res, StatusCodes.OK, temple);
  },
);

// Delete a temple by ID
export const deleteTemple = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const temple = await deleteTempleService(id);

    return returnSuccessResponse(res, StatusCodes.OK, temple);
  },
);

// Add a special pooja to a temple
export const addSpecialPooja = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const pooja = req.body;

    const temple = await addSpecialPoojaService(id, pooja);

    return returnSuccessResponse(res, StatusCodes.CREATED, temple);
  },
);
