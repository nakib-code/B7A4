import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TechnicianService } from "./technician.service";

const getAllTechnicians = catchAsync(
  async (_req: Request, res: Response) => {
    const result = await TechnicianService.getAllTechniciansFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technicians retrieved successfully.",
      data: result,
    });
  }
);

const getMyProfile = catchAsync(
  async (req: any, res: Response) => {
    const result = await TechnicianService.getMyProfile(req.user.id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician profile retrieved successfully.",
      data: result,
    });
  }
);

const updateProfile = catchAsync(
  async (req: any, res: Response) => {
    const result = await TechnicianService.updateProfile(
      req.user.id,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician profile updated successfully.",
      data: result,
    });
  }
);

const updateAvailability = catchAsync(
  async (req: any, res: Response) => {
    const result = await TechnicianService.updateAvailability(
      req.user.id,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Availability updated successfully.",
      data: result,
    });
  }
);

const getBookings = catchAsync(
  async (req: any, res: Response) => {
    const result = await TechnicianService.getBookings(req.user.id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Bookings retrieved successfully.",
      data: result,
    });
  }
);

const updateBookingStatus = catchAsync(
  async (req: any, res: Response) => {
    const result = await TechnicianService.updateBookingStatus(
      req.user.id,
      req.params.id,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking status updated successfully.",
      data: result,
    });
  }
);

export const TechnicianController = {
  getAllTechnicians,
  getMyProfile,
  updateProfile,
  updateAvailability,
  getBookings,
  updateBookingStatus,
};