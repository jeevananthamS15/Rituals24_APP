import { BhajanPlan } from "../models/BhajanPlan.model";
import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";

interface CreateBhajanPlanInput {
  name: string;
  description?: string;
  duration?: string;
  price: number;
  artist_count?: number;
  instruments?: string[];
  features?: string[];
  tag?: string;
  enabled?: boolean;
}

interface UpdateBhajanPlanInput {
  name?: string;
  description?: string;
  duration?: string;
  price?: number;
  artist_count?: number;
  instruments?: string[];
  features?: string[];
  tag?: string;
  enabled?: boolean;
}

export const createBhajanPlan = async (data: CreateBhajanPlanInput) => {
  const plan = new BhajanPlan(data);
  await plan.save();
  return plan;
};

export const getAllBhajanPlans = async () =>
  BhajanPlan.find().sort({ price: 1 });

export const getBhajanPlanById = async (id: string) => {
  const plan = await BhajanPlan.findById(id);
  if (!plan)
    throw new AppError(
      "Plan not found",
      StatusCodes.NOT_FOUND,
      "PLAN_NOT_FOUND",
    );
  return plan;
};

export const updateBhajanPlan = async (
  id: string,
  data: UpdateBhajanPlanInput,
) => {
  const plan = await BhajanPlan.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!plan)
    throw new AppError(
      "Plan not found",
      StatusCodes.NOT_FOUND,
      "PLAN_NOT_FOUND",
    );
  return plan;
};

export const deleteBhajanPlan = async (id: string) => {
  const plan = await BhajanPlan.findByIdAndDelete(id);
  if (!plan)
    throw new AppError(
      "Plan not found",
      StatusCodes.NOT_FOUND,
      "PLAN_NOT_FOUND",
    );
  return plan;
};
