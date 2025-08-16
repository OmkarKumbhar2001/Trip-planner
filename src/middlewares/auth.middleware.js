import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Access token missing or invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    console.log(decoded)
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    throw new ApiError(403, "Invalid or expired access token");
  }
};
