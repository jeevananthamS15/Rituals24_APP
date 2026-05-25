import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { returnSuccessResponse } from "../utils/apiout";
import {
  getAllPandits as getAllPanditsService,
  getPanditById as getPanditByIdService,
  updatePandit as updatePanditService,
  deletePandit as deletePanditService,
  getVerifiedPandits as getVerifiedPanditsService,
  getPanditsByService as getPanditsByServiceService,
  getPanditServices as getPanditServicesService,
  addPanditService as addPanditServiceService,
  removePanditService as removePanditServiceService,
  togglePanditService as togglePanditServiceService,
  updatePanditAvailability as updatePanditAvailabilityService,
  updatePanditProfile as updatePanditProfileService,
} from "../services/pandit.service";
import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";

// Get all pandits
export const getAllPandits = asyncHandler(
  async (req: Request, res: Response) => {
    const { isVerified, state, language, service_type, minPrice, maxPrice } =
      req.query;

    const filters = {
      isVerified:
        isVerified === "true"
          ? true
          : isVerified === "false"
            ? false
            : undefined,
      state: state as string | undefined,
      language: language as string | undefined,
      service_type: service_type as string | undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };

    const pandits = await getAllPanditsService(filters);

    return returnSuccessResponse(res, StatusCodes.OK, pandits);
  },
);

// Get a single pandit by ID
export const getPanditById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const pandit = await getPanditByIdService(id);

    return returnSuccessResponse(res, StatusCodes.OK, pandit);
  },
);

// Update a pandit by ID
export const updatePandit = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const updateData = req.body;

    if (req.files && (req.files as Express.MulterS3.File[]).length > 0) {
      updateData.images = (req.files as Express.MulterS3.File[]).map(
        (f) => f.location,
      );
    }

    const pandit = await updatePanditService(id, updateData);

    return returnSuccessResponse(res, StatusCodes.OK, pandit);
  },
);

// Delete a pandit by ID
export const deletePandit = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const pandit = await deletePanditService(id);

    return returnSuccessResponse(res, StatusCodes.OK, pandit);
  },
);

// Get verified pandits
export const getVerifiedPandits = asyncHandler(
  async (_req: Request, res: Response) => {
    const pandits = await getVerifiedPanditsService();

    return returnSuccessResponse(res, StatusCodes.OK, pandits);
  },
);

// ─── Pandit self-service management ──────────────────────────────────────────

export const getMyServices = asyncHandler(
  async (req: Request, res: Response) => {
    const services = await getPanditServicesService(req.user!.id);
    returnSuccessResponse(res, StatusCodes.OK, { services });
  },
);

export const addMyService = asyncHandler(
  async (req: Request, res: Response) => {
    const { serviceId, service_types } = req.body as {
      serviceId?: string;
      service_types?: string[];
    };
    if (!serviceId)
      throw new AppError("serviceId is required", StatusCodes.BAD_REQUEST);
    const services = await addPanditServiceService(
      req.user!.id,
      serviceId,
      service_types ?? [],
    );
    returnSuccessResponse(res, StatusCodes.CREATED, { services });
  },
);

export const removeMyService = asyncHandler(
  async (req: Request, res: Response) => {
    const { serviceId } = req.params as { serviceId: string };
    const services = await removePanditServiceService(req.user!.id, serviceId);
    returnSuccessResponse(res, StatusCodes.OK, { services });
  },
);

export const toggleMyService = asyncHandler(
  async (req: Request, res: Response) => {
    const { serviceId } = req.params as { serviceId: string };
    const result = await togglePanditServiceService(req.user!.id, serviceId);
    returnSuccessResponse(res, StatusCodes.OK, result);
  },
);

export const updateMyAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const { working_days, start_time, end_time, travel_radius_km } =
      req.body as {
        working_days?: string[];
        start_time?: string;
        end_time?: string;
        travel_radius_km?: number;
      };
    const result = await updatePanditAvailabilityService(req.user!.id, {
      working_days,
      start_time,
      end_time,
      travel_radius_km:
        travel_radius_km !== undefined ? Number(travel_radius_km) : undefined,
    });
    returnSuccessResponse(res, StatusCodes.OK, result);
  },
);

export const updateMyProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      name,
      phoneNumber,
      city,
      state,
      languages_spoken,
      years_of_experience,
      specialization,
    } = req.body as {
      name?: string;
      phoneNumber?: string;
      city?: string;
      state?: string;
      languages_spoken?: string | string[];
      years_of_experience?: number | string;
      specialization?: string;
    };

    const result = await updatePanditProfileService(req.user!.id, {
      name,
      phoneNumber,
      city,
      state,
      languages_spoken: Array.isArray(languages_spoken)
        ? languages_spoken
        : languages_spoken
          ? languages_spoken
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
      years_of_experience:
        years_of_experience !== undefined
          ? Number(years_of_experience)
          : undefined,
      specialization,
    });
    returnSuccessResponse(res, StatusCodes.OK, result);
  },
);

// Get pandits who offer a specific service (puja)
export const getPanditsByService = asyncHandler(
  async (req: Request, res: Response) => {
    const { serviceId } = req.params as { serviceId: string };
    const pandits = await getPanditsByServiceService(serviceId);
    return returnSuccessResponse(res, StatusCodes.OK, pandits);
  },
);
