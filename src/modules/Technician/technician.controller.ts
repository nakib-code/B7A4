import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TechnicianService } from "./technician.service";

const getAllTechnicians = catchAsync(async (req: any, res: Response) => {
  
  const result = await TechnicianService.getAllTechniciansFromDB();


  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Technicians retrieved successfully",
    data: result,
  });
});

const updateAvailability = catchAsync(async (req: any, res: Response) => {
  const result = await TechnicianService.updateAvailability(
    req.user.id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Availability updated successfully",
    data: result,
  });
});
const updateProfile = catchAsync(async (req: any, res: Response) => {
  
  const result = await TechnicianService.updateProfile(
    req.user.id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Technician profile updated successfully",
    data: result,
  });
});
;

const getBookings = catchAsync(async (req: any, res: Response) => {
  const result = await TechnicianService.getBookings(req.user.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const updateBookingStatus = catchAsync(
  async (req: any, res: Response) => {
    const result = await TechnicianService.updateBookingStatus(
      req.user.id,
      req.params.id,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Booking status updated successfully",
      data: result,
    });
  }
);

export const TechnicianController = {
  getAllTechnicians,
  updateProfile,
  updateAvailability,
  getBookings,
  updateBookingStatus,
};