import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { TechnicianController } from "./technician.controller";

const router = Router();


router.get(
  "/get-all",
  TechnicianController.getAllTechnicians
);


export default router;

router.put(
  "/profile",
  auth(Role.TECHNICIAN),
  TechnicianController.updateProfile
);

router.put(
  "/availability",
  auth(Role.TECHNICIAN),
  TechnicianController.updateAvailability
);

router.get(
  "/bookings",
  auth(Role.TECHNICIAN),
  TechnicianController.getBookings
);

router.patch(
  "/bookings/:id",
  auth(Role.TECHNICIAN),
  TechnicianController.updateBookingStatus
);

export const TechnicianRoutes = router;