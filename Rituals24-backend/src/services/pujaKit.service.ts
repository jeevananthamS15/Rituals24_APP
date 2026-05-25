import { PujaKit } from "../models/pujaKit.model";
import { Inventory } from "../models/Inventory.model";
import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";

interface CreatePujaKitInput {
  name: string;
  description?: string;
  rating?: number;
  cost_price: number;
  selling_price: number;
  stock_quantity: number;
  minimum_stock_threshold: number;
  supplier?: string;
  specifications?: string[];
  images?: string[];
  items?: string[];
  status?: "active" | "inactive";
}

interface UpdatePujaKitInput {
  name?: string;
  description?: string;
  rating?: number;
  cost_price?: number;
  selling_price?: number;
  stock_quantity?: number;
  minimum_stock_threshold?: number;
  supplier?: string;
  specifications?: string[];
  change_type?: string;
  images?: string[];
  items?: string[];
  status?: "active" | "inactive";
}

interface PujaKitFilters {
  minPrice?: number;
  maxPrice?: number;
}

export const createPujaKit = async (data: CreatePujaKitInput) => {
  const existing = await PujaKit.findOne({ name: data.name });
  if (existing) {
    throw new AppError(
      "PujaKit with this name already exists",
      StatusCodes.CONFLICT,
      "PUJAKIT_ALREADY_EXISTS",
    );
  }

  const pujaKit = new PujaKit(data);
  await pujaKit.save();
  return pujaKit;
};

export const getAllPujaKits = async (filters?: PujaKitFilters) => {
  const query: any = {};

  if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
    query.price = {};
    if (filters?.minPrice !== undefined) query.price.$gte = filters.minPrice;
    if (filters?.maxPrice !== undefined) query.price.$lte = filters.maxPrice;
  }

  return PujaKit.find(query);
};

export const getPujaKitById = async (id: string) => {
  const pujaKit = await PujaKit.findById(id);
  if (!pujaKit) {
    throw new AppError(
      "PujaKit not found",
      StatusCodes.NOT_FOUND,
      "PUJAKIT_NOT_FOUND",
    );
  }
  return pujaKit;
};

export const updatePujaKit = async (
  id: string,
  data: UpdatePujaKitInput,
  userId?: string,
) => {
  const existing = await PujaKit.findById(id);
  if (!existing) {
    throw new AppError(
      "PujaKit not found",
      StatusCodes.NOT_FOUND,
      "PUJAKIT_NOT_FOUND",
    );
  }

  const pujaKit = await PujaKit.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (
    userId &&
    data.stock_quantity !== undefined &&
    data.stock_quantity !== existing.stock_quantity
  ) {
    await Inventory.create({
      userId,
      productId: id,
      quantity_change: data.stock_quantity - existing.stock_quantity,
      change_type: data.change_type ?? "manual_update",
    });
  }

  return pujaKit;
};

export const deletePujaKit = async (id: string) => {
  const pujaKit = await PujaKit.findByIdAndDelete(id);
  if (!pujaKit) {
    throw new AppError(
      "PujaKit not found",
      StatusCodes.NOT_FOUND,
      "PUJAKIT_NOT_FOUND",
    );
  }
  return pujaKit;
};
