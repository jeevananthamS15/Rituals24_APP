import { Puja } from "../models/Puja.model";
import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";

interface CreatePujaInput {
  name: string;
  description: string;
  price: number;
  category?: string;
  duration: number;
  state?: string;
  language?: string;
  status?: string;
  service_type?: string;
  images: string[];
  panditCount?: number;
  rating?: number;
  isPopular?: boolean;
  isVerified?: boolean;
}

interface UpdatePujaInput {
  name?: string;
  description?: string;
  price?: number;
  duration?: number;
  state?: string;
  language?: string;
  status?: string;
  service_type?: string;
  images?: string[];
  panditCount?: number;
  rating?: number;
  isPopular?: boolean;
  isVerified?: boolean;
}

interface PujaFilters {
  isPopular?: boolean;
  isVerified?: boolean;
  state?: string;
  language?: string;
  status?: string;
  service_type?: string;
  minPrice?: number;
  maxPrice?: number;
}

// Create a new puja
export const createPuja = async (pujaData: CreatePujaInput) => {
  const existingPuja = await Puja.findOne({ name: pujaData.name });
  if (existingPuja) {
    throw new AppError(
      "Puja with this name already exists",
      StatusCodes.CONFLICT,
      "PUJA_ALREADY_EXISTS",
    );
  }

  const puja = new Puja(pujaData);
  await puja.save();
  return puja;
};

// Get all pujas with optional filters
export const getAllPujas = async (filters?: PujaFilters) => {
  const query: any = {};

  if (filters?.isPopular !== undefined) query.isPopular = filters.isPopular;
  if (filters?.isVerified !== undefined) query.isVerified = filters.isVerified;
  if (filters?.state) query.state = filters.state;
  if (filters?.language) query.language = filters.language;
  if (filters?.status) query.status = filters.status;
  if (filters?.service_type) query.service_type = filters.service_type;

  if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
    query.price = {};
    if (filters?.minPrice !== undefined) {
      query.price.$gte = filters.minPrice;
    }
    if (filters?.maxPrice !== undefined) {
      query.price.$lte = filters.maxPrice;
    }
  }

  const pujas = await Puja.find(query);
  return pujas;
};

// Get a single puja by ID
export const getPujaById = async (id: string) => {
  const puja = await Puja.findById(id);
  if (!puja) {
    throw new AppError(
      "Puja not found",
      StatusCodes.NOT_FOUND,
      "PUJA_NOT_FOUND",
    );
  }
  return puja;
};

// Update a puja by ID
export const updatePuja = async (id: string, updateData: UpdatePujaInput) => {
  const puja = await Puja.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!puja) {
    throw new AppError(
      "Puja not found",
      StatusCodes.NOT_FOUND,
      "PUJA_NOT_FOUND",
    );
  }
  return puja;
};

// Delete a puja by ID
export const deletePuja = async (id: string) => {
  const puja = await Puja.findByIdAndDelete(id);
  if (!puja) {
    throw new AppError(
      "Puja not found",
      StatusCodes.NOT_FOUND,
      "PUJA_NOT_FOUND",
    );
  }
  return puja;
};

// Get popular pujas
export const getPopularPujas = async (limit: number = 10) => {
  const pujas = await Puja.find({ isPopular: true }).limit(limit);
  return pujas;
};

// Get verified pujas
export const getVerifiedPujas = async () => {
  const pujas = await Puja.find({ isVerified: true });
  return pujas;
};
