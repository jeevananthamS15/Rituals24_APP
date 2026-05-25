import Temple from "../models/Temple.model";
import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";

interface SpecialPooja {
  name?: string;
  description?: string;
  price?: number;
  duration?: number;
  timing?: string;
}

interface CreateTempleInput {
  name: string;
  description?: string;
  state?: string;
  language?: string;
  diety?: string;
  rating?: number;
  special_poojas?: SpecialPooja[];
  images?: string[];
  verified?: boolean;
  certified_pandits_available?: boolean;
  featured_on_homepage?: boolean;
}

interface UpdateTempleInput {
  name?: string;
  description?: string;
  state?: string;
  language?: string;
  diety?: string;
  rating?: number;
  special_poojas?: SpecialPooja[];
  images?: string[];
  verified?: boolean;
  certified_pandits_available?: boolean;
  featured_on_homepage?: boolean;
}

// Create a new temple
export const createTemple = async (templeData: CreateTempleInput) => {
  const existingTemple = await Temple.findOne({ name: templeData.name });
  if (existingTemple) {
    throw new AppError(
      "Temple with this name already exists",
      StatusCodes.CONFLICT,
      "TEMPLE_ALREADY_EXISTS",
    );
  }

  const temple = new Temple(templeData);
  await temple.save();
  return temple;
};

// Get all temples
export const getAllTemples = async () => {
  const temples = await Temple.find();
  return temples;
};

// Get a single temple by ID
export const getTempleById = async (id: string) => {
  const temple = await Temple.findById(id);
  if (!temple) {
    throw new AppError(
      "Temple not found",
      StatusCodes.NOT_FOUND,
      "TEMPLE_NOT_FOUND",
    );
  }
  return temple;
};

// Update a temple by ID
export const updateTemple = async (
  id: string,
  updateData: UpdateTempleInput,
) => {
  const temple = await Temple.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!temple) {
    throw new AppError(
      "Temple not found",
      StatusCodes.NOT_FOUND,
      "TEMPLE_NOT_FOUND",
    );
  }
  return temple;
};

// Delete a temple by ID
export const deleteTemple = async (id: string) => {
  const temple = await Temple.findByIdAndDelete(id);
  if (!temple) {
    throw new AppError(
      "Temple not found",
      StatusCodes.NOT_FOUND,
      "TEMPLE_NOT_FOUND",
    );
  }
  return temple;
};

// Add a special pooja to a temple
export const addSpecialPooja = async (id: string, pooja: SpecialPooja) => {
  const temple = await Temple.findByIdAndUpdate(
    id,
    { $push: { special_poojas: pooja } },
    { new: true, runValidators: true },
  );

  if (!temple) {
    throw new AppError(
      "Temple not found",
      StatusCodes.NOT_FOUND,
      "TEMPLE_NOT_FOUND",
    );
  }
  return temple;
};
