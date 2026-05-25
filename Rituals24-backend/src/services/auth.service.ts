import bcrypt from "bcrypt";
import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";
import { User } from "../models/Users.model";
import { signToken } from "../utils/jwt";
import { env } from "../config/env";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CustomerSignupInput {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface PanditSignupInput {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  dob?: string;
  address?: string;
  city?: string;
  state?: string;
  pin_code?: string;
  profile_photo?: string;
  govt_ID?: string;
  address_proof?: string;
  years_of_experience?: number;
  languages_spoken?: string[];
  specialization?: string;
  gurukul_certification?: string;
  temple_affiliation_proof?: string;
  video_intro?: string;
  bank_account_number?: string;
  bank_ifsc_code?: string;
  account_holder_name?: string;
  bank_proof?: string;
  service_modes?: string[];
  services_offered?: string[];
  working_days?: string[];
  start_time?: string;
  end_time?: string;
  travel_radius_km?: number;
  price?: number;
}

interface AdminSignupInput {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildCookieOptions() {
  return {
    httpOnly: true,
    secure: true,
    sameSite: "none" as const,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  };
}

// ─── Customer signup ──────────────────────────────────────────────────────────

export async function customerSignup(data: CustomerSignupInput) {
  const existing = await User.findOne({ email: data.email.toLowerCase() });
  if (existing) {
    throw new AppError("Email already registered", StatusCodes.CONFLICT);
  }

  const user = await User.create({
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    password: data.password,
    role: "customer",
    authType: "local",
  });

  const token = signToken({ id: user._id, role: user.role });

  return {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
    cookieOptions: buildCookieOptions(),
  };
}

// ─── Pandit self-onboarding ───────────────────────────────────────────────────

export async function panditSignup(data: PanditSignupInput) {
  const existing = await User.findOne({ email: data.email.toLowerCase() });
  if (existing) {
    throw new AppError("Email already registered", StatusCodes.CONFLICT);
  }

  const {
    name,
    email,
    phoneNumber,
    password,
    dob,
    address,
    city,
    state,
    pin_code,
    profile_photo,
    govt_ID,
    address_proof,
    years_of_experience,
    languages_spoken,
    specialization,
    gurukul_certification,
    temple_affiliation_proof,
    video_intro,
    bank_account_number,
    bank_ifsc_code,
    account_holder_name,
    bank_proof,
    service_modes,
    services_offered,
    working_days,
    start_time,
    end_time,
    travel_radius_km,
    price,
  } = data;

  const user = await User.create({
    name,
    email,
    phoneNumber,
    password,
    role: "pandit",
    verificationStatus: "pending",
    canLogin: false,
    panditDetails: {
      dob: dob ? new Date(dob) : undefined,
      address,
      city,
      state,
      pin_code,
      profile_photo,
      govt_ID,
      address_proof,
      identityVerificationStatus: "pending",
      years_of_experience,
      languages_spoken: languages_spoken ?? [],
      specialization,
      gurukul_certification,
      temple_affiliation_proof,
      video_intro,
      bank_account_number,
      bank_ifsc_code,
      account_holder_name,
      bank_proof,
      bankDetailsStatus: "pending",
      service_modes: service_modes ?? [],
      services_offered: (services_offered ?? []).map((id) => ({
        serviceId: id,
        service_types: [],
      })),
      working_days: working_days ?? [],
      start_time,
      end_time,
      travel_radius_km,
      price,
    },
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verificationStatus: user.verificationStatus,
    },
    message:
      "Registration submitted. You can log in once your profile is verified by the admin.",
  };
}

// ─── Admin signup ─────────────────────────────────────────────────────────────

export async function adminSignup(data: AdminSignupInput) {
  const existing = await User.findOne({ email: data.email.toLowerCase() });
  if (existing) {
    throw new AppError("Email already registered", StatusCodes.CONFLICT);
  }

  const user = await User.create({
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    password: data.password,
    role: "admin",
  });

  const token = signToken({ id: user._id, role: user.role });

  return {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
    cookieOptions: buildCookieOptions(),
  };
}

// ─── Get admin details (for "me" endpoint) ─────────────────────────────────

export const getAdminDetails = async (adminId: string) => {
  const admin = await User.findById(adminId)
    .select("-password")
    .populate("permissionId");
  if (!admin) {
    throw new AppError("Admin not found", StatusCodes.NOT_FOUND);
  }
  return admin;
};

export const getUserDetails = async (userId: string) => {
  const user = await User.findById(userId)
    .select("-password")
    .populate("permissionId");
  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }
  return user;
};

// ─── Login ────────────────────────────────────────────────────────────────────

export async function login(
  data: LoginInput,
  expectedRole: "customer" | "pandit" | "admin" | "subadmin",
) {
  // Explicitly select password (it's excluded by default)
  const user = await User.findOne({ email: data.email.toLowerCase() }).select(
    "+password",
  );

  if (!user) {
    throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
  }

  const passwordMatch = await bcrypt.compare(
    data.password,
    user.password as string,
  );
  if (!passwordMatch) {
    throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
  }

  // Role mismatch
  if (user.role !== expectedRole) {
    throw new AppError(
      `No ${expectedRole} account found with these credentials.`,
      StatusCodes.UNAUTHORIZED,
    );
  }

  if (!user.canLogin) {
    throw new AppError(
      "Your account is pending admin verification. You cannot log in yet.",
      StatusCodes.FORBIDDEN,
    );
  }

  const tokenPayload: { id: unknown; role: string; permissionId?: string } = {
    id: user._id,
    role: user.role,
  };
  if (user.role === "subadmin" && user.permissionId) {
    tokenPayload.permissionId = user.permissionId.toString();
  }

  const token = signToken(tokenPayload);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      ...(user.role === "pandit" && {
        verificationStatus: user.verificationStatus,
      }),
    },
    token,
    cookieOptions: buildCookieOptions(),
  };
}

// ─── Google Login ─────────────────────────────────────────────────────────────

export async function googleLogin({
  email,
  name,
  role,
}: {
  email: string;
  name: string;
  role: "customer" | "pandit" | "admin" | "subadmin";
}) {
  let user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    // If user doesn't exist, create a new one with a random password
    user = await User.create({
      name,
      email,
      role,
      authType: "google",
    });
  } else {
    if (user?.canLogin === false) {
      throw new AppError(
        "Your account is suspended. You cannot log in yet.",
        StatusCodes.FORBIDDEN,
      );
    }
    // If user exists but has a different role, throw an error
    if (user.role !== role) {
      throw new AppError(
        `An account with this email already exists with a different role (${user.role}). Please use the correct login method.`,
        StatusCodes.CONFLICT,
      );
    }
    if (user.authType !== "google") {
      throw new AppError(
        `An account with this email already exists with a different authentication method. Please use the correct login method.`,
        StatusCodes.CONFLICT,
      );
    }
  }

  const token = signToken({ id: user._id, role: user.role });

  return {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    jwttoken: token,
    cookieOtions: buildCookieOptions(),
  };
}
