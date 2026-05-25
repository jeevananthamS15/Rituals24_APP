import { Bhajan } from "../models/Bhajan.model";
import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";

interface CreateBhajanInput {
  name: string;
  description?: string;
  category?: string;
  languages?: string[];
  durationRange?: string;
  rating?: number;
  significance?: string[];
  images?: string[];
  enabled?: boolean;
}

interface UpdateBhajanInput {
  name?: string;
  description?: string;
  category?: string;
  languages?: string[];
  durationRange?: string;
  rating?: number;
  significance?: string[];
  images?: string[];
  enabled?: boolean;
}

export const createBhajan = async (data: CreateBhajanInput) => {
  const existing = await Bhajan.findOne({ name: data.name });
  if (existing) {
    throw new AppError(
      "Bhajan with this name already exists",
      StatusCodes.CONFLICT,
      "BHAJAN_ALREADY_EXISTS",
    );
  }

  const bhajan = new Bhajan(data);
  await bhajan.save();
  return bhajan;
};

export const getAllBhajans = async () => {
  return Bhajan.find();
};

export const getBhajanById = async (id: string) => {
  const bhajan = await Bhajan.findById(id);
  if (!bhajan) {
    throw new AppError(
      "Bhajan not found",
      StatusCodes.NOT_FOUND,
      "BHAJAN_NOT_FOUND",
    );
  }
  return bhajan;
};

export const updateBhajan = async (id: string, data: UpdateBhajanInput) => {
  const bhajan = await Bhajan.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!bhajan) {
    throw new AppError(
      "Bhajan not found",
      StatusCodes.NOT_FOUND,
      "BHAJAN_NOT_FOUND",
    );
  }
  return bhajan;
};

export const deleteBhajan = async (id: string) => {
  const bhajan = await Bhajan.findByIdAndDelete(id);
  if (!bhajan) {
    throw new AppError(
      "Bhajan not found",
      StatusCodes.NOT_FOUND,
      "BHAJAN_NOT_FOUND",
    );
  }
  return bhajan;
};
