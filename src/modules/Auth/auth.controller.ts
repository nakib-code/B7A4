import { Request, Response } from "express";
import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import { AUTH_MESSAGE } from "./auth.constant";

const isProduction = process.env.NODE_ENV === "production";

const accessCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  maxAge: 1000 * 60 * 60 * 24,
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? ("none" as const) : ("lax" as const),
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: AUTH_MESSAGE.REGISTER_SUCCESS,
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  res.cookie("accessToken", result.accessToken, accessCookieOptions);

  res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: AUTH_MESSAGE.LOGIN_SUCCESS,
    data: {
      user: result.user,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  const result = await AuthService.refreshToken(refreshToken);

  res.cookie("accessToken", result.accessToken, accessCookieOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Token refreshed successfully",
    data: null,
  });
});


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



const getMe = catchAsync(async (req: any, res: Response) => {
  const result = await AuthService.getMe(req.user.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: AUTH_MESSAGE.PROFILE_SUCCESS,
    data: result,
  });
});

export const AuthController = {
  register,
  login,
  refreshToken,
  logout,
  getMe,
};