import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { returnSuccessResponse } from "../utils/apiout";
import { StatusCodes } from "../common/errors/statusCodes";
import * as AdminService from "../services/admin.service";
import { AppError } from "../common/errors/api-error";
import {
  generatePresignedUrl,
  extractS3Key,
} from "../middleware/upload-private.middleware";

// ── Helpers ────────────────────────────────────────────────────────────────────

function fileUrl(files: Express.Multer.File[] | undefined): string | undefined {
  return files?.[0] ? (files[0] as Express.MulterS3.File).location : undefined;
}

// POST /api/admin/pandits/onboard
export const onboardPandit = asyncHandler(
  async (req: Request, res: Response) => {
    const fields = req.files as
      | Record<string, Express.Multer.File[]>
      | undefined;

    const body = {
      ...req.body,
      // Coerce numeric strings from multipart form
      years_of_experience: req.body.years_of_experience
        ? Number(req.body.years_of_experience)
        : undefined,
      travel_radius_km: req.body.travel_radius_km
        ? Number(req.body.travel_radius_km)
        : undefined,
      price: req.body.price ? Number(req.body.price) : undefined,
      // Array fields sent as repeated keys or comma-separated
      languages_spoken: req.body.languages_spoken
        ? Array.isArray(req.body.languages_spoken)
          ? req.body.languages_spoken
          : req.body.languages_spoken.split(",").map((s: string) => s.trim())
        : [],
      service_modes: req.body.service_modes
        ? Array.isArray(req.body.service_modes)
          ? req.body.service_modes
          : req.body.service_modes.split(",").map((s: string) => s.trim())
        : [],
      working_days: req.body.working_days
        ? Array.isArray(req.body.working_days)
          ? req.body.working_days
          : req.body.working_days.split(",").map((s: string) => s.trim())
        : [],
      // services_offered is sent as a JSON string from multipart form
      services_offered: req.body.services_offered
        ? JSON.parse(req.body.services_offered)
        : [],
      // File uploads overwrite any URL strings
      profile_photo: fileUrl(fields?.profile_photo) ?? req.body.profile_photo,
      govt_ID: fileUrl(fields?.govt_ID) ?? req.body.govt_ID,
      address_proof: fileUrl(fields?.address_proof) ?? req.body.address_proof,
      gurukul_certification:
        fileUrl(fields?.gurukul_certification) ??
        req.body.gurukul_certification,
      temple_affiliation_proof:
        fileUrl(fields?.temple_affiliation_proof) ??
        req.body.temple_affiliation_proof,
      bank_proof: fileUrl(fields?.bank_proof) ?? req.body.bank_proof,
    };

    // Remove URL validation fields from schema — they're now S3 URLs from upload
    const result = await AdminService.adminOnboardPandit(body);
    returnSuccessResponse(res, StatusCodes.CREATED, result);
  },
);

// PATCH /api/admin/pandits/:id/verify/:step
export const verifyStep = asyncHandler(async (req: Request, res: Response) => {
  const { id, step } = req.params as { id: string; step: "identity" | "bank" };
  const { action } = req.body as { action: "approved" | "rejected" };

  const result = await AdminService.approveVerificationStep(id, step, action);
  returnSuccessResponse(res, StatusCodes.OK, result);
});

// GET /api/admin/pandits?filter=pending|verified|rejected|all
export const listPandits = asyncHandler(async (req: Request, res: Response) => {
  const filter = (req.query.filter as string) || "all";
  const allowed = ["all", "pending", "verified", "rejected"];
  const safeFilter = allowed.includes(filter)
    ? (filter as "all" | "pending" | "verified" | "rejected")
    : "all";

  const pandits = await AdminService.listPandits(safeFilter);
  returnSuccessResponse(res, StatusCodes.OK, { pandits });
});

// GET /api/admin/pandits/:id
export const getPandit = asyncHandler(async (req: Request, res: Response) => {
  const pandit = await AdminService.getPanditById(req.params.id as string);
  returnSuccessResponse(res, StatusCodes.OK, { pandit });
});

// GET /api/admin/pandits/presigned?url=<s3-url>
// Returns a 15-minute presigned URL for a private S3 document
export const getPresignedUrl = asyncHandler(
  async (req: Request, res: Response) => {
    const { url } = req.query as { url?: string };
    if (!url) {
      throw new AppError(
        "url query parameter is required",
        StatusCodes.BAD_REQUEST,
      );
    }
    const key = extractS3Key(url);
    const presigned = await generatePresignedUrl(key);
    returnSuccessResponse(res, StatusCodes.OK, { presignedUrl: presigned });
  },
);

// PATCH /api/admin/pandits/:id/login
export const togglePanditLogin = asyncHandler(
  async (req: Request, res: Response) => {
    const { canLogin } = req.body as { canLogin: boolean };
    if (typeof canLogin !== "boolean") {
      throw new AppError("canLogin must be a boolean", StatusCodes.BAD_REQUEST);
    }
    const result = await AdminService.togglePanditLogin(
      req.params.id as string,
      canLogin,
    );
    returnSuccessResponse(res, StatusCodes.OK, result);
  },
);

// GET /api/admin/customers
export const listCustomers = asyncHandler(
  async (_req: Request, res: Response) => {
    const customers = await AdminService.listCustomers();
    returnSuccessResponse(res, StatusCodes.OK, { customers });
  },
);

// PATCH /api/admin/customers/:id/login
export const toggleCustomerLogin = asyncHandler(
  async (req: Request, res: Response) => {
    const { canLogin } = req.body as { canLogin: boolean };
    if (typeof canLogin !== "boolean") {
      throw new AppError("canLogin must be a boolean", StatusCodes.BAD_REQUEST);
    }
    const result = await AdminService.toggleCustomerLogin(
      req.params.id as string,
      canLogin,
    );
    returnSuccessResponse(res, StatusCodes.OK, result);
  },
);

// POST /api/admin/subadmins
export const createSubadmin = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await AdminService.createSubadmin(req.body);
    returnSuccessResponse(res, StatusCodes.CREATED, result);
  },
);

// GET /api/admin/subadmins
export const listSubadmins = asyncHandler(
  async (_req: Request, res: Response) => {
    const subadmins = await AdminService.listSubadmins();
    returnSuccessResponse(res, StatusCodes.OK, { subadmins });
  },
);

// GET /api/admin/subadmins/:id
export const getSubadmin = asyncHandler(async (req: Request, res: Response) => {
  const subadmin = await AdminService.getSubadminById(req.params.id as string);
  returnSuccessResponse(res, StatusCodes.OK, { subadmin });
});

// PATCH /api/admin/subadmins/:id
export const updateSubadmin = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await AdminService.updateSubadmin(
      req.params.id as string,
      req.body,
    );
    returnSuccessResponse(res, StatusCodes.OK, result);
  },
);

// PATCH /api/admin/subadmins/:id/freeze
export const freezeSubadmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { freeze } = req.body as { freeze: boolean };
    if (typeof freeze !== "boolean") {
      throw new AppError("freeze must be a boolean", StatusCodes.BAD_REQUEST);
    }
    const result = await AdminService.freezeSubadmin(
      req.params.id as string,
      freeze,
    );
    returnSuccessResponse(res, StatusCodes.OK, result);
  },
);

// DELETE /api/admin/subadmins/:id
export const deleteSubadmin = asyncHandler(
  async (req: Request, res: Response) => {
    await AdminService.deleteSubadmin(req.params.id as string);
    returnSuccessResponse(res, StatusCodes.OK, {
      message: "Subadmin deleted successfully",
    });
  },
);
