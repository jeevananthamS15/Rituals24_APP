import { Router } from "express";
import {
  signupCustomer,
  signupPandit,
  signupAdmin,
  loginCustomer,
  loginPandit,
  loginAdmin,
  logout,
  loginSubadmin,
  me,
  googleLogin,
  myself,
} from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import {
  customerSignupSchema,
  panditSignupSchema,
  adminSignupSchema,
  loginSchema,
} from "../schemas/auth.schema";
import { authenticate } from "../middleware/auth.middleware";
import { uploadPanditDocs } from "../middleware/upload-private.middleware";

const router = Router();

//verify auth
router.get("/admin/me", authenticate, me);
router.get("/myself", authenticate, myself);
// ─── Signup ───────────────────────────────────────────────────────────────────
router.post("/signup/customer", validate(customerSignupSchema), signupCustomer);
router.post(
  "/signup/pandit",
  uploadPanditDocs,
  validate(panditSignupSchema),
  signupPandit,
);
router.post("/signup/admin", validate(adminSignupSchema), signupAdmin);

// ─── Login  ──────────────────────────────────────────────────────

router.post("/login/customer", validate(loginSchema), loginCustomer);
router.post("/login/pandit", validate(loginSchema), loginPandit);
router.post("/login/admin", validate(loginSchema), loginAdmin);
router.post("/login/subadmin", validate(loginSchema), loginSubadmin);
router.post("/google-login", googleLogin);
// ─── Logout ───────────────────────────────────────────────────────────────────
router.post("/logout", logout);

export default router;
