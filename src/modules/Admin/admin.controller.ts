import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";
import { UserStatus } from "../../../generated/prisma/enums";



const getAllUsers = catchAsync(
  async (_req: Request, res: Response) => {

    const result = await AdminService.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Users retrieved successfully",
      data: result,
    });

  }
);




const updateUserStatus = catchAsync(
  async (req: Request, res: Response) => {

    const result =
      await AdminService.updateUserStatus(
        req.params.id as string,
        req.body.status as UserStatus
      );


    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "User status updated successfully",
      data: result,
    });

  }
);






const getAllBookings = catchAsync(
  async (_req: Request, res: Response) => {

    const result =
      await AdminService.getAllBookings();


    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Bookings retrieved successfully",
      data: result,
    });

  }
);






const getCategories = catchAsync(
  async (_req: Request, res: Response) => {

    const result =
      await AdminService.getCategories();


    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Categories retrieved successfully",
      data: result,
    });

  }
);


export const logout = async (
  req: Request,
  res: Response
) => {
  try {

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });


    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });



    res.status(200).json({
      success: true,
      message: "Logout successful",
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Logout failed",
    });

  }
};





export const AdminController = {

  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getCategories,
};