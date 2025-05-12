import jwt from "jsonwebtoken";
import User, { IUser } from "../modules/auth/auth.model.js"; // Ensure IUser is exported from the model
import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";

interface JwtPayload {
  userId: string;
}

// Extend the Request interface to include the user property
declare module "express-serve-static-core" {
  interface Request {
    user?: Document<unknown, Record<string, unknown>, IUser> & IUser; // Correctly type the user property
  }
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Now correctly typed
    next();
  } catch (error: unknown) {
    console.error(
      "Error in protectRoute middleware: ",
      error instanceof Error ? error.message : error
    );
    res.status(500).json({ message: "Internal server error" });
  }
};
