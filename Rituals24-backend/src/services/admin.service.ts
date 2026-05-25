import { AppError } from "../common/errors/api-error";
import { StatusCodes } from "../common/errors/statusCodes";
import { User } from "../models/Users.model";
import { Permissions } from "../models/Permissions.model";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OnboardPanditInput {
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
  services_offered?: { serviceId: string; service_types: string[] }[];
  working_days?: string[];
  start_time?: string;
  end_time?: string;
  travel_radius_km?: number;
  price?: number;
}

// ─── Admin: directly onboard a pandit (all steps auto-approved) ───────────────

export async function adminOnboardPandit(data: OnboardPanditInput) {
  const existing = await User.findOne({ email: data.email.toLowerCase() });
  if (existing) {
    throw new AppError("Email already registered", StatusCodes.CONFLICT);
  }

  const user = await User.create({
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    password: data.password,
    role: "pandit",
    verificationStatus: "verified",
    canLogin: true,
    panditDetails: {
      dob: data.dob ? new Date(data.dob) : undefined,
      address: data.address,
      city: data.city,
      state: data.state,
      pin_code: data.pin_code,
      profile_photo: data.profile_photo,
      govt_ID: data.govt_ID,
      address_proof: data.address_proof,
      identityVerificationStatus: "approved",
      years_of_experience: data.years_of_experience,
      languages_spoken: data.languages_spoken ?? [],
      specialization: data.specialization,
      gurukul_certification: data.gurukul_certification,
      temple_affiliation_proof: data.temple_affiliation_proof,
      video_intro: data.video_intro,
      bank_account_number: data.bank_account_number,
      bank_ifsc_code: data.bank_ifsc_code,
      account_holder_name: data.account_holder_name,
      bank_proof: data.bank_proof,
      bankDetailsStatus: "approved",
      service_modes: data.service_modes ?? [],
      services_offered: data.services_offered ?? [],
      working_days: data.working_days ?? [],
      start_time: data.start_time,
      end_time: data.end_time,
      travel_radius_km: data.travel_radius_km,
      price: data.price,
    },
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      verificationStatus: user.verificationStatus,
      canLogin: user.canLogin,
    },
    message: "Pandit onboarded and verified successfully.",
  };
}

// ─── Admin: approve/reject a single verification step ────────────────────────

export async function approveVerificationStep(
  panditId: string,
  step: "identity" | "bank",
  action: "approved" | "rejected",
) {
  const user = await User.findOne({ _id: panditId, role: "pandit" });
  if (!user) {
    throw new AppError("Pandit not found", StatusCodes.NOT_FOUND);
  }

  if (!user.panditDetails) {
    throw new AppError(
      "Pandit details not found",
      StatusCodes.UNPROCESSABLE_ENTITY,
    );
  }

  // Apply the step status
  if (step === "identity") {
    user.panditDetails.identityVerificationStatus = action;
  } else {
    user.panditDetails.bankDetailsStatus = action;
  }

  // Promote to fully verified only when BOTH steps are approved
  const identityOk =
    user.panditDetails.identityVerificationStatus === "approved";
  const bankOk = user.panditDetails.bankDetailsStatus === "approved";

  if (identityOk && bankOk) {
    user.verificationStatus = "verified";
    user.canLogin = true;
  } else if (action === "rejected") {
    // If either step is rejected the overall status reflects that
    user.verificationStatus = "rejected";
    user.canLogin = false;
  } else {
    // Still pending one of the steps
    user.verificationStatus = "pending";
    user.canLogin = false;
  }

  await user.save();

  return {
    id: user._id,
    verificationStatus: user.verificationStatus,
    canLogin: user.canLogin,
    identityVerificationStatus: user.panditDetails.identityVerificationStatus,
    bankDetailsStatus: user.panditDetails.bankDetailsStatus,
  };
}

// ─── Admin: list all pandits with their verification status ──────────────────

export async function listPandits(
  filter: "all" | "pending" | "verified" | "rejected" = "all",
) {
  const query: Record<string, unknown> = { role: "pandit" };
  if (filter !== "all") {
    query.verificationStatus = filter;
  }

  const pandits = await User.find(query).select(
    "name email phoneNumber verificationStatus canLogin createdAt panditDetails",
  );

  return pandits;
}

// ─── Admin: get single pandit detail ─────────────────────────────────────────

export async function getPanditById(panditId: string) {
  const pandit = await User.findOne({ _id: panditId, role: "pandit" });
  if (!pandit) {
    throw new AppError("Pandit not found", StatusCodes.NOT_FOUND);
  }
  return pandit;
}

// ─── Subadmin management ──────────────────────────────────────────────────────

interface PermissionsCrud {
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
}

interface PermissionsInput {
  customers?: PermissionsCrud;
  pandits?: PermissionsCrud;
  bookings?: PermissionsCrud;
  services?: PermissionsCrud;
  products?: PermissionsCrud;
  inventory?: PermissionsCrud;
  revenue?: PermissionsCrud;
  blog?: PermissionsCrud;
  support?: PermissionsCrud;
  analytics?: PermissionsCrud;
}

interface CreateSubadminInput {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  jobRole: string;
  permissions: PermissionsInput;
}

export async function createSubadmin(data: CreateSubadminInput) {
  const existing = await User.findOne({ email: data.email.toLowerCase() });
  if (existing) {
    throw new AppError("Email already registered", StatusCodes.CONFLICT);
  }

  const permDoc = await Permissions.create({
    role: "subadmin",
    permissions: data.permissions,
  });

  const user = await User.create({
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    password: data.password,
    role: "subadmin",
    jobRole: data.jobRole,
    permissionId: permDoc._id,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      jobRole: user.jobRole,
      permissionId: permDoc._id,
    },
    permissions: permDoc.permissions,
  };
}

export async function listSubadmins() {
  return User.find({ role: "subadmin" })
    .select("name email phoneNumber jobRole permissionId canLogin createdAt")
    .populate("permissionId", "permissions");
}

export async function getSubadminById(id: string) {
  const subadmin = await User.findOne({ _id: id, role: "subadmin" })
    .select("name email phoneNumber jobRole permissionId canLogin createdAt")
    .populate("permissionId", "permissions");

  if (!subadmin) {
    throw new AppError("Subadmin not found", StatusCodes.NOT_FOUND);
  }
  return subadmin;
}

export async function updateSubadmin(
  id: string,
  data: { jobRole?: string; permissions?: PermissionsInput },
) {
  const user = await User.findOne({ _id: id, role: "subadmin" });
  if (!user) {
    throw new AppError("Subadmin not found", StatusCodes.NOT_FOUND);
  }

  if (data.jobRole) {
    user.jobRole = data.jobRole;
    await user.save();
  }

  if (data.permissions) {
    await Permissions.findByIdAndUpdate(user.permissionId, {
      permissions: data.permissions,
    });
  }

  return getSubadminById(id);
}

export async function freezeSubadmin(id: string, freeze: boolean) {
  // Use findByIdAndUpdate to bypass the pre-save hook that forces canLogin=true for non-pandits
  const user = await User.findOneAndUpdate(
    { _id: id, role: "subadmin" },
    { canLogin: !freeze },
    { new: true },
  ).select("name email jobRole canLogin");

  if (!user) {
    throw new AppError("Subadmin not found", StatusCodes.NOT_FOUND);
  }
  return user;
}

export async function togglePanditLogin(id: string, canLogin: boolean) {
  const user = await User.findOneAndUpdate(
    { _id: id, role: "pandit" },
    { canLogin },
    { new: true },
  ).select("name email canLogin verificationStatus");

  if (!user) {
    throw new AppError("Pandit not found", StatusCodes.NOT_FOUND);
  }
  return user;
}

export async function listCustomers() {
  return User.find({ role: "customer" }).select(
    "name email phoneNumber canLogin createdAt",
  );
}

export async function toggleCustomerLogin(id: string, canLogin: boolean) {
  const user = await User.findOneAndUpdate(
    { _id: id, role: "customer" },
    { canLogin },
    { new: true },
  ).select("name email canLogin");

  if (!user) {
    throw new AppError("Customer not found", StatusCodes.NOT_FOUND);
  }
  return user;
}

export async function deleteSubadmin(id: string) {
  const user = await User.findOne({ _id: id, role: "subadmin" });
  if (!user) {
    throw new AppError("Subadmin not found", StatusCodes.NOT_FOUND);
  }

  await Permissions.findByIdAndDelete(user.permissionId);
  await user.deleteOne();
}
