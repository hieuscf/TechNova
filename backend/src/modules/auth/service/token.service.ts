import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

// type SignOptions = {
//   expiresIn: number ; // StringValue là type đặc biệt
// };
const generateToken = (
  userId: string,
  res: Response,
  expiresIn: string
): string => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  // const signOptions: SignOptions = { expiresIn };
  console.log("Timeout", expiresIn);
  try {
    const token = jwt.sign(
      { userId },
      JWT_SECRET,
      {
        expiresIn: "7d", // ✅ sửa ở đây
      } /*signOptions*/
    );

    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
      // expiresIn === 30 ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;

    res.cookie("jwt", token, {
      maxAge,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Failed to generate token");
  }
};

export const generateTokenDefault = (userId: string, res: Response) =>
  generateToken(userId, res, "7d");

export const generateToken30Day = (userId: string, res: Response) =>
  generateToken(userId, res, "30d");
