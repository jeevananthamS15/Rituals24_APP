import { z } from "zod";

const crudSchema = z.object({
  create: z.boolean().default(false),
  read: z.boolean().default(false),
  update: z.boolean().default(false),
  delete: z.boolean().default(false),
});

const permissionsSchema = z.object({
  customers: crudSchema.default({
    create: false,
    read: false,
    update: false,
    delete: false,
  }),
  pandits: crudSchema.default({
    create: false,
    read: false,
    update: false,
    delete: false,
  }),
  bookings: crudSchema.default({
    create: false,
    read: false,
    update: false,
    delete: false,
  }),
  services: crudSchema.default({
    create: false,
    read: false,
    update: false,
    delete: false,
  }),
  products: crudSchema.default({
    create: false,
    read: false,
    update: false,
    delete: false,
  }),
  inventory: crudSchema.default({
    create: false,
    read: false,
    update: false,
    delete: false,
  }),
  revenue: crudSchema.default({
    create: false,
    read: false,
    update: false,
    delete: false,
  }),
  blog: crudSchema.default({
    create: false,
    read: false,
    update: false,
    delete: false,
  }),
  support: crudSchema.default({
    create: false,
    read: false,
    update: false,
    delete: false,
  }),
  analytics: crudSchema.default({
    create: false,
    read: false,
    update: false,
    delete: false,
  }),
});

export const createSubadminSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    jobRole: z.string().min(1, "Job role is required"),
    permissions: permissionsSchema.default({
      customers: { create: false, read: false, update: false, delete: false },
      pandits: { create: false, read: false, update: false, delete: false },
      bookings: { create: false, read: false, update: false, delete: false },
      services: { create: false, read: false, update: false, delete: false },
      products: { create: false, read: false, update: false, delete: false },
      inventory: { create: false, read: false, update: false, delete: false },
      revenue: { create: false, read: false, update: false, delete: false },
      blog: { create: false, read: false, update: false, delete: false },
      support: { create: false, read: false, update: false, delete: false },
      analytics: { create: false, read: false, update: false, delete: false },
    }),
  }),
});

export const updateSubadminPermissionsSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    jobRole: z.string().min(1).optional(),
    permissions: permissionsSchema.optional(),
  }),
});

export const subadminIdSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});
