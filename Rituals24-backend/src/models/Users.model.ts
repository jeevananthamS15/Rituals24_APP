import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const STEP_STATUS = ["pending", "approved", "rejected"] as const;

const PanditDetailsSchema = new Schema(
  {
    // Personal Details
    dob: { type: Date },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pin_code: { type: String },
    profile_photo: { type: String },

    // Identity Verification — admin approves this step
    govt_ID: { type: String },
    address_proof: { type: String },
    identityVerificationStatus: {
      type: String,
      enum: STEP_STATUS,
      default: "pending",
    },

    // Certification and Experience
    years_of_experience: { type: Number },
    languages_spoken: [{ type: String }],
    specialization: { type: String },
    gurukul_certification: { type: String },
    temple_affiliation_proof: { type: String },
    video_intro: { type: String },

    // Bank Details — admin approves this step
    bank_account_number: { type: String },
    bank_ifsc_code: { type: String },
    account_holder_name: { type: String },
    bank_proof: { type: String },
    bankDetailsStatus: {
      type: String,
      enum: STEP_STATUS,
      default: "pending",
    },

    // Service Details
    service_modes: [{ type: String }],
    services_offered: [
      {
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
          required: true,
        },
        status: {
          type: String,
          enum: ["active", "inactive"],
          default: "active",
        },
        service_types: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
    working_days: [{ type: String }],
    start_time: { type: String },
    end_time: { type: String },
    travel_radius_km: { type: Number },
    price: { type: Number },
  },
  { _id: false },
);

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function (): boolean {
        return (
          this.role === "subadmin" ||
          this.role === "admin" ||
          this.role === "pandit"
        );
      },
      select: false, // never returned in queries by default
    },
    role: {
      type: String,
      enum: ["customer", "pandit", "admin", "subadmin"],
      default: "customer",
    },
    jobRole: {
      type: String,
      required: function () {
        return this.role === "subadmin";
      },
    },
    permissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permissions",
      required: function () {
        return this.role === "subadmin";
      },
    },
    language: [{ type: String }],

    // Controls whether this user can log in
    canLogin: {
      type: Boolean,
      default: true,
    },

    authType: {
      type: String,
      enum: ["local", "google"],
      default: "local",
      required: function () {
        return this.role === "customer";
      },
    },

    // Only for pandits — overall onboarding status
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
    },

    // Only for pandits
    panditDetails: {
      type: PanditDetailsSchema,
      default: undefined,
    },
  },
  { timestamps: true },
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password as string, 12);
  }
});

// Auto-set pandit fields and block login until verified
UserSchema.pre("save", function (next) {
  if (this.role === "pandit") {
    if (this.verificationStatus === undefined) {
      this.verificationStatus = "pending";
    }
    // Pandits cannot log in until verificationStatus is "verified"
    if (this.verificationStatus !== "verified") {
      this.canLogin = false;
    }
  } else {
    // customers and admins can always log in
    this.verificationStatus = undefined;
    this.panditDetails = undefined;
    this.canLogin = true;
  }
});

export const User = mongoose.model("User", UserSchema);
