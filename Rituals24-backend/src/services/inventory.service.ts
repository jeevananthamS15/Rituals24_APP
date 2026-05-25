import { Inventory } from "../models/Inventory.model";
import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";

export const getAllInventoryLogs = async (filters?: {
  productId?: string;
  userId?: string;
  change_type?: string;
  from?: Date;
  to?: Date;
}) => {
  const query: any = {};

  if (filters?.productId) query.productId = filters.productId;
  if (filters?.userId) query.userId = filters.userId;
  if (filters?.change_type) query.change_type = filters.change_type;
  if (filters?.from || filters?.to) {
    query.change_date = {};
    if (filters.from) query.change_date.$gte = filters.from;
    if (filters.to) query.change_date.$lte = filters.to;
  }

  return Inventory.find(query)
    .populate("productId", "name")
    .populate("userId", "name email")
    .sort({ change_date: -1 });
};

export const getInventoryLogById = async (id: string) => {
  const log = await Inventory.findById(id)
    .populate("productId", "name")
    .populate("userId", "name email");
  if (!log) {
    throw new AppError(
      "Inventory log not found",
      StatusCodes.NOT_FOUND,
      "INVENTORY_LOG_NOT_FOUND",
    );
  }
  return log;
};

export const getInventoryLogsByProduct = async (productId: string) => {
  return Inventory.find({ productId })
    .populate("userId", "name email")
    .sort({ change_date: -1 });
};
