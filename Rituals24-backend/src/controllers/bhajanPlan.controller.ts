import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { returnSuccessResponse } from "../utils/apiout";
import {
  createBhajanPlan as createBhajanPlanService,
  getAllBhajanPlans as getAllBhajanPlansService,
  getBhajanPlanById as getBhajanPlanByIdService,
  updateBhajanPlan as updateBhajanPlanService,
  deleteBhajanPlan as deleteBhajanPlanService,
} from "../services/bhajanPlan.service";
import { StatusCodes } from "../common/errors/statusCodes";

export const createBhajanPlan = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      name,
      description,
      duration,
      price,
      artist_count,
      instruments,
      features,
      tag,
      enabled,
    } = req.body;

    const plan = await createBhajanPlanService({
      name,
      description,
      duration,
      price,
      artist_count,
      instruments,
      features,
      tag,
      enabled,
    });

    return returnSuccessResponse(res, StatusCodes.CREATED, plan);
  },
);

export const getAllBhajanPlans = asyncHandler(
  async (req: Request, res: Response) => {
    const plans = await getAllBhajanPlansService();
    return returnSuccessResponse(res, StatusCodes.OK, plans);
  },
);

export const getBhajanPlanById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const plan = await getBhajanPlanByIdService(id);
    return returnSuccessResponse(res, StatusCodes.OK, plan);
  },
);

export const updateBhajanPlan = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const plan = await updateBhajanPlanService(id, req.body);
    return returnSuccessResponse(res, StatusCodes.OK, plan);
  },
);

export const deleteBhajanPlan = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const plan = await deleteBhajanPlanService(id);
    return returnSuccessResponse(res, StatusCodes.OK, plan);
  },
);
