import { z } from "zod";

// ─── Admin direct onboarding ──────────────────────────────────────────────────
// Handles multipart/form-data so:
//   • numeric fields use z.coerce.number() (FormData sends everything as strings)
//   • document fields are plain optional strings (files arrive in req.files, not req.body)
//   • array fields accept either a string or an array (multer behaviour depends on count)
//   • services_offered is a JSON string serialised by the frontend

const stringOrArray = z.union([z.string(), z.array(z.string())]);

export const adminOnboardPanditSchema = z.object({
  body: z.object({
    // Account credentials — required
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),

    // Personal details
    dob: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pin_code: z.string().optional(),

    // Document fields — files arrive in req.files; body only has these when
    // the admin provides a URL directly instead of uploading a file
    profile_photo: z.string().optional(),
    govt_ID: z.string().optional(),
    address_proof: z.string().optional(),
    gurukul_certification: z.string().optional(),
    temple_affiliation_proof: z.string().optional(),
    bank_proof: z.string().optional(),

    // Certification & experience
    years_of_experience: z.coerce.number().int().min(0).optional(),
    languages_spoken: stringOrArray.optional(),
    specialization: z.string().optional(),
    video_intro: z.string().optional(),

    // Bank details
    bank_account_number: z.string().optional(),
    bank_ifsc_code: z
      .string()
      .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
      .optional(),
    account_holder_name: z.string().optional(),

    // Service details
    service_modes: stringOrArray.optional(),
    services_offered: z.string().optional(), // JSON string — parsed in controller
    working_days: stringOrArray.optional(),
    start_time: z.string().optional(),
    end_time: z.string().optional(),
    travel_radius_km: z.coerce.number().min(0).optional(),
    price: z.coerce.number().positive("Price must be positive").optional(),
  }),
});

// ─── Approve a single verification step ───────────────────────────────────────

export const approveVerificationStepSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Pandit ID is required"),
    step: z.enum(["identity", "bank"], {
      error: 'Step must be "identity" or "bank"',
    }),
  }),
  body: z.object({
    action: z.enum(["approved", "rejected"], {
      error: 'Action must be "approved" or "rejected"',
    }),
  }),
});

// ─── CRUD schemas ─────────────────────────────────────────────────────────────

export const getPanditSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const deletePanditSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
