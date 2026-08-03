import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";

import auth from "../../middleware/auth";
import { TechnicianController } from "./technician.controller";

const router = Router();

// Public
router.get(
  "/",
  TechnicianController.getAllTechnicians
);

// Technician Profile
router.get(
  "/profile",
  auth(Role.TECHNICIAN),
  TechnicianController.getMyProfile
);

router.patch(
  "/profile",
  auth(Role.TECHNICIAN),
  TechnicianController.updateProfile
);

// Availability
router.put(
  "/availability",
  auth(Role.TECHNICIAN),
  TechnicianController.updateAvailability
);

// Bookings
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