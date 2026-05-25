import { z } from "zod";

// ─── Customer ────────────────────────────────────────────────────────────────

export const customerSignupSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

// ─── Pandit self-onboarding ───────────────────────────────────────────────────
// Accepts multipart/form-data (files arrive in req.files via uploadPanditDocs,
// so document fields are absent from req.body and validated in the controller).

const stringOrArray = z.union([z.string(), z.array(z.string())]);

export const panditSignupSchema = z.object({
  body: z.object({
    // Account credentials
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),

    // Personal details
    dob: z.string().min(1, "Date of birth is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pin_code: z.string().min(6, "PIN code must be 6 digits"),

    // Document fields — uploaded via multer; only present in req.body if the
    // caller sends a pre-existing URL; the controller enforces required docs.
    profile_photo: z.string().optional(),
    govt_ID: z.string().optional(),
    address_proof: z.string().optional(),
    gurukul_certification: z.string().optional(),
    temple_affiliation_proof: z.string().optional(),
    video_intro: z.string().url("Video intro must be a valid URL").optional(),
    bank_proof: z.string().optional(),

    // Certification & experience
    years_of_experience: z.coerce
      .number()
      .int()
      .min(0, "Years of experience cannot be negative")
      .optional(),
    languages_spoken: stringOrArray.optional(),
    specialization: z.string().optional(),

    // Bank details
    bank_account_number: z.string().optional(),
    bank_ifsc_code: z
      .string()
      .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
      .optional(),
    account_holder_name: z.string().optional(),

    // Service details
    service_modes: stringOrArray.optional(),
    services_offered: stringOrArray.optional(),
    working_days: stringOrArray.optional(),
    start_time: z.string().optional(),
    end_time: z.string().optional(),
    travel_radius_km: z.coerce.number().min(0).optional(),
    price: z.coerce.number().positive("Price must be positive").optional(),
  }),
});

// ─── Admin ────────────────────────────────────────────────────────────────────

export const adminSignupSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

// ─── Login (shared for all roles) ─────────────────────────────────────────────

export const loginSchema = z.object({
  body: z.object({
    email: z.email("Invalid email"),
    password: z.string().min(1, "Password is required"),
  }),
});
