import { Router } from "express";
import {
  createTicket,
  getAllTickets,
  getMyTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../controllers/supportTicket.controller";
import { validate } from "../middleware/validate.middleware";
import {
  createTicketSchema,
  updateTicketSchema,
  getTicketSchema,
  deleteTicketSchema,
} from "../schemas/supportTicket.schema";
import {
  authenticate,
  authorize,
  checkPermission,
} from "../middleware/auth.middleware";

const router = Router();
router.use(authenticate);

router.post("/", validate(createTicketSchema), createTicket);
router.get("/my", getMyTickets);
router.get(
  "/",
  authorize("admin", "subadmin"),
  checkPermission("support", "read"),
  getAllTickets,
);
router.get("/:id", validate(getTicketSchema), getTicketById);
router.put(
  "/:id",
  authorize("admin", "subadmin"),
  checkPermission("support", "update"),
  validate(updateTicketSchema),
  updateTicket,
);
router.delete(
  "/:id",
  authorize("admin", "subadmin"),
  checkPermission("support", "delete"),
  validate(deleteTicketSchema),
  deleteTicket,
);

export default router;
