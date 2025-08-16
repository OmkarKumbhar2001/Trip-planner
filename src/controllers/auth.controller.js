// src/controllers/user.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {
  registerUser,
  loginUser,
  refreshAccessToken
} from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email, and password are required");
  }

  const { user, accessToken, refreshToken } = await registerUser({ name, email, password });

  return res
    .status(201)
    .json(
      new ApiResponse(201, {
        user: { id: user._id, name: user.name, email: user.email },
        accessToken,
        refreshToken
      }, "User registered successfully")
    );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const { user, accessToken, refreshToken } = await loginUser({ email, password });

  return res
    .status(200)
    .json(
      new ApiResponse(200, {
        user: { id: user._id, name: user.name, email: user.email },
        accessToken,
        refreshToken
      }, "Login successful")
    );
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: incomingToken } = req.body;

  const { accessToken, refreshToken: newRefreshToken } = await refreshAccessToken(incomingToken);

  return res
    .status(200)
    .json(
      new ApiResponse(200, {
        accessToken,
        refreshToken: newRefreshToken
      }, "Token refreshed successfully")
    );
});
