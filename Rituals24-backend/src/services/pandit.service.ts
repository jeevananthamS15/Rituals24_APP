import mongoose from "mongoose";
import { User } from "../models/Users.model";
import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";

// Fields exposed when listing pandits (never expose password, bank details, govt IDs)
const PANDIT_LIST_SELECT =
  "name language verificationStatus panditDetails.profile_photo panditDetails.languages_spoken panditDetails.years_of_experience panditDetails.price panditDetails.service_modes panditDetails.specialization panditDetails.gurukul_certification panditDetails.state panditDetails.city panditDetails.travel_radius_km panditDetails.working_days panditDetails.start_time panditDetails.end_time panditDetails.services_offered";

interface PanditFilters {
  state?: string;
  language?: string;
  service_type?: string;
  minPrice?: number;
  maxPrice?: number;
}

// Get all verified pandits with optional filters
export const getAllPandits = async (filters?: PanditFilters) => {
  const query: Record<string, unknown> = {
    role: "pandit",
    verificationStatus: "verified",
  };

  if (filters?.state) query["panditDetails.state"] = filters.state;
  if (filters?.language)
    query["panditDetails.languages_spoken"] = { $in: [filters.language] };
  if (filters?.service_type)
    query["panditDetails.service_modes"] = { $in: [filters.service_type] };

  if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
    const priceQuery: { $gte?: number; $lte?: number } = {};
    if (filters.minPrice !== undefined) priceQuery.$gte = filters.minPrice;
    if (filters.maxPrice !== undefined) priceQuery.$lte = filters.maxPrice;
    query["panditDetails.price"] = priceQuery;
  }

  return User.find(query).select(PANDIT_LIST_SELECT);
};

// Get a single pandit by ID
export const getPanditById = async (id: string) => {
  const pandit = await User.findOne({ _id: id, role: "pandit" }).select(
    PANDIT_LIST_SELECT,
  );
  if (!pandit) {
    throw new AppError(
      "Pandit not found",
      StatusCodes.NOT_FOUND,
      "PANDIT_NOT_FOUND",
    );
  }
  return pandit;
};

// Update pandit profile fields (admin use)
export const updatePandit = async (
  id: string,
  updateData: Record<string, unknown>,
) => {
  const pandit = await User.findOneAndUpdate(
    { _id: id, role: "pandit" },
    updateData,
    { new: true, runValidators: true },
  ).select(PANDIT_LIST_SELECT);

  if (!pandit) {
    throw new AppError(
      "Pandit not found",
      StatusCodes.NOT_FOUND,
      "PANDIT_NOT_FOUND",
    );
  }
  return pandit;
};

// Delete a pandit account
export const deletePandit = async (id: string) => {
  const pandit = await User.findOneAndDelete({ _id: id, role: "pandit" });
  if (!pandit) {
    throw new AppError(
      "Pandit not found",
      StatusCodes.NOT_FOUND,
      "PANDIT_NOT_FOUND",
    );
  }
  return pandit;
};

// Get all verified pandits
export const getVerifiedPandits = async () => {
  return User.find({ role: "pandit", verificationStatus: "verified" }).select(
    PANDIT_LIST_SELECT,
  );
};

// ─── Pandit self-service management ──────────────────────────────────────────

export const getPanditServices = async (panditId: string) => {
  const user = await User.findById(panditId).select(
    "panditDetails.services_offered panditDetails.service_modes",
  );
  if (!user) throw new AppError("Pandit not found", StatusCodes.NOT_FOUND);
  return {
    services_offered: user.panditDetails?.services_offered ?? [],
    service_modes: user.panditDetails?.service_modes ?? [],
  };
};

export const addPanditService = async (
  panditId: string,
  serviceId: string,
  serviceTypes: string[] = [],
) => {
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    throw new AppError("Invalid service ID", StatusCodes.BAD_REQUEST);
  }

  const existing = await User.findOne({
    _id: panditId,
    "panditDetails.services_offered.serviceId": new mongoose.Types.ObjectId(
      serviceId,
    ),
  });
  if (existing)
    throw new AppError("Service already added", StatusCodes.CONFLICT);

  const user = await User.findByIdAndUpdate(
    panditId,
    {
      $push: {
        "panditDetails.services_offered": {
          serviceId: new mongoose.Types.ObjectId(serviceId),
          service_types: serviceTypes,
          status: "active",
        },
      },
    },
    { new: true, select: "panditDetails.services_offered" },
  );
  if (!user) throw new AppError("Pandit not found", StatusCodes.NOT_FOUND);
  return user.panditDetails?.services_offered ?? [];
};

export const removePanditService = async (
  panditId: string,
  serviceId: string,
) => {
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    throw new AppError("Invalid service ID", StatusCodes.BAD_REQUEST);
  }

  const user = await User.findByIdAndUpdate(
    panditId,
    {
      $pull: {
        "panditDetails.services_offered": {
          serviceId: new mongoose.Types.ObjectId(serviceId),
        },
      },
    },
    { new: true, select: "panditDetails.services_offered" },
  );
  if (!user) throw new AppError("Pandit not found", StatusCodes.NOT_FOUND);
  return user.panditDetails?.services_offered ?? [];
};

export const togglePanditService = async (
  panditId: string,
  serviceId: string,
) => {
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    throw new AppError("Invalid service ID", StatusCodes.BAD_REQUEST);
  }

  const user = await User.findOne({
    _id: panditId,
    "panditDetails.services_offered.serviceId": new mongoose.Types.ObjectId(
      serviceId,
    ),
  }).select("panditDetails.services_offered");

  if (!user) throw new AppError("Service not found", StatusCodes.NOT_FOUND);

  const entry = user.panditDetails?.services_offered.find(
    (s) => s.serviceId.toString() === serviceId,
  );
  if (!entry) throw new AppError("Service not found", StatusCodes.NOT_FOUND);

  const newStatus = entry.status === "active" ? "inactive" : "active";

  await User.findOneAndUpdate(
    {
      _id: panditId,
      "panditDetails.services_offered.serviceId": new mongoose.Types.ObjectId(
        serviceId,
      ),
    },
    { $set: { "panditDetails.services_offered.$.status": newStatus } },
  );

  return { serviceId, status: newStatus };
};

export const updatePanditAvailability = async (
  panditId: string,
  data: {
    working_days?: string[];
    start_time?: string;
    end_time?: string;
    travel_radius_km?: number;
  },
) => {
  const set: Record<string, unknown> = {};
  if (data.working_days !== undefined)
    set["panditDetails.working_days"] = data.working_days;
  if (data.start_time !== undefined)
    set["panditDetails.start_time"] = data.start_time;
  if (data.end_time !== undefined)
    set["panditDetails.end_time"] = data.end_time;
  if (data.travel_radius_km !== undefined)
    set["panditDetails.travel_radius_km"] = data.travel_radius_km;

  const user = await User.findByIdAndUpdate(
    panditId,
    { $set: set },
    {
      new: true,
      select:
        "panditDetails.working_days panditDetails.start_time panditDetails.end_time panditDetails.travel_radius_km",
    },
  );
  if (!user) throw new AppError("Pandit not found", StatusCodes.NOT_FOUND);

  return {
    working_days: user.panditDetails?.working_days ?? [],
    start_time: user.panditDetails?.start_time,
    end_time: user.panditDetails?.end_time,
    travel_radius_km: user.panditDetails?.travel_radius_km,
  };
};

export const updatePanditProfile = async (
  panditId: string,
  data: {
    name?: string;
    phoneNumber?: string;
    city?: string;
    state?: string;
    languages_spoken?: string[];
    years_of_experience?: number;
    specialization?: string;
  },
) => {
  const set: Record<string, unknown> = {};
  if (data.name !== undefined) set.name = data.name;
  if (data.phoneNumber !== undefined) set.phoneNumber = data.phoneNumber;
  if (data.city !== undefined) set["panditDetails.city"] = data.city;
  if (data.state !== undefined) set["panditDetails.state"] = data.state;
  if (data.languages_spoken !== undefined)
    set["panditDetails.languages_spoken"] = data.languages_spoken;
  if (data.years_of_experience !== undefined)
    set["panditDetails.years_of_experience"] = data.years_of_experience;
  if (data.specialization !== undefined)
    set["panditDetails.specialization"] = data.specialization;

  const user = await User.findByIdAndUpdate(
    panditId,
    { $set: set },
    {
      new: true,
      select:
        "name email phoneNumber verificationStatus panditDetails.city panditDetails.state panditDetails.languages_spoken panditDetails.years_of_experience panditDetails.specialization panditDetails.identityVerificationStatus panditDetails.bankDetailsStatus panditDetails.profile_photo panditDetails.gurukul_certification panditDetails.temple_affiliation_proof panditDetails.govt_ID panditDetails.bank_account_number panditDetails.working_days panditDetails.service_modes",
    },
  );
  if (!user) throw new AppError("Pandit not found", StatusCodes.NOT_FOUND);
  return user;
};

// Get pandits who have a specific puja in their services_offered
export const getPanditsByService = async (serviceId: string) => {
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    throw new AppError(
      "Invalid service ID",
      StatusCodes.BAD_REQUEST,
      "INVALID_ID",
    );
  }

  return User.find({
    role: "pandit",
    verificationStatus: "verified",
    "panditDetails.services_offered.serviceId": new mongoose.Types.ObjectId(
      serviceId,
    ),
  }).select(PANDIT_LIST_SELECT);
};
