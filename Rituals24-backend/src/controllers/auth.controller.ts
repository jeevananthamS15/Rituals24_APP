import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { returnSuccessResponse } from "../utils/apiout";
import { StatusCodes } from "../common/errors/statusCodes";
import * as AuthService from "../services/auth.service";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID!);
//verify auth
export const me = asyncHandler(async (req: Request, res: Response) => {
  const adminId = req.user!.id;
  const user = await AuthService.getAdminDetails(adminId);
  returnSuccessResponse(res, StatusCodes.OK, user);
});

//Verifu auth for customer and pandit
export const myself = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const user = await AuthService.getUserDetails(userId);
  returnSuccessResponse(res, StatusCodes.OK, user);
});

// POST /api/auth/signup/customer
export const signupCustomer = asyncHandler(
  async (req: Request, res: Response) => {
    const { user, token, cookieOptions } = await AuthService.customerSignup(
      req.body,
    );
    res.cookie("token", token, cookieOptions);
    returnSuccessResponse(res, StatusCodes.CREATED, { user });
  },
);

// POST /api/auth/signup/pandit
export const signupPandit = asyncHandler(
  async (req: Request, res: Response) => {
    const fields = req.files as
      | Record<string, Express.Multer.File[]>
      | undefined;

    function fileUrl(
      files: Express.Multer.File[] | undefined,
    ): string | undefined {
      return files?.[0]
        ? (files[0] as Express.MulterS3.File).location
        : undefined;
    }

    const body = {
      ...req.body,
      years_of_experience: req.body.years_of_experience
        ? Number(req.body.years_of_experience)
        : undefined,
      travel_radius_km: req.body.travel_radius_km
        ? Number(req.body.travel_radius_km)
        : undefined,
      price: req.body.price ? Number(req.body.price) : undefined,
      languages_spoken: req.body.languages_spoken
        ? Array.isArray(req.body.languages_spoken)
          ? req.body.languages_spoken
          : req.body.languages_spoken
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
        : [],
      service_modes: req.body.service_modes
        ? Array.isArray(req.body.service_modes)
          ? req.body.service_modes
          : [req.body.service_modes]
        : [],
      services_offered: req.body.services_offered
        ? Array.isArray(req.body.services_offered)
          ? req.body.services_offered
          : [req.body.services_offered]
        : [],
      working_days: req.body.working_days
        ? Array.isArray(req.body.working_days)
          ? req.body.working_days
          : [req.body.working_days]
        : [],
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

    const result = await AuthService.panditSignup(body);
    returnSuccessResponse(res, StatusCodes.CREATED, result);
  },
);

// POST /api/auth/signup/admin
export const signupAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { user, token, cookieOptions } = await AuthService.adminSignup(
    req.body,
  );
  res.cookie("token", token, cookieOptions);
  returnSuccessResponse(res, StatusCodes.CREATED, { user });
});

// POST /api/auth/login/customer
export const loginCustomer = asyncHandler(
  async (req: Request, res: Response) => {
    const { user, token, cookieOptions } = await AuthService.login(
      req.body,
      "customer",
    );
    res.cookie("token", token, cookieOptions);
    returnSuccessResponse(res, StatusCodes.OK, { user });
  },
);

//POST api.auth/google-login
//google login for customer
export const googleLogin = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email, name } = ticket.getPayload()!;

  const { jwttoken, cookieOtions, user } = await AuthService.googleLogin({
    email: email!,
    name: name!,
    role: "customer",
  });
  res.cookie("token", jwttoken, cookieOtions);
  returnSuccessResponse(res, StatusCodes.OK, { user });
});

//Login subadmin
export const loginSubadmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { user, token, cookieOptions } = await AuthService.login(
      req.body,
      "subadmin",
    );
    res.cookie("token", token, cookieOptions);
    returnSuccessResponse(res, StatusCodes.OK, { user });
  },
);

// POST /api/auth/login/pandit
export const loginPandit = asyncHandler(async (req: Request, res: Response) => {
  const { user, token, cookieOptions } = await AuthService.login(
    req.body,
    "pandit",
  );
  res.cookie("token", token, cookieOptions);
  returnSuccessResponse(res, StatusCodes.OK, { user });
});

// POST /api/auth/login/admin
export const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { user, token, cookieOptions } = await AuthService.login(
    req.body,
    "admin",
  );
  res.cookie("token", token, cookieOptions);
  returnSuccessResponse(res, StatusCodes.OK, { user });
});

// POST /api/auth/logout
export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
  returnSuccessResponse(res, StatusCodes.OK, {
    message: "Logged out successfully",
  });
});
