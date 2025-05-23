import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User, { IUser } from "../auth.model.js";
import { generateTokenDefault } from "../service/token.service.js";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try{
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Kiểm tra mật khẩu
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters, include uppercase, lowercase, and a number",
      });
    }
    // Kiểm tra nếu email đã tồn tại
    const user = (await User.findOne({ email })) as IUser;
    if (!user) return res.status(400).json({ message: "Email not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    if (!user || !user._id) {
      return res.status(400).json({ message: "User not found or invalid ID" });
    }
    
    // Tạo token và lưu vào cookie
    generateTokenDefault(user._id.toString(), res);


    // Trả dữ liệu người dùng
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
    });
  }catch (error:unknown) {
    console.log(
      "Error in login controller",
      error instanceof Error ? error.message : error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signup = async (req: Request, res: Response) => {
  const { username , email, password } = req.body;
  try {
    // Kiểm tra các trường bắt buộc
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Kiểm tra username
    const usernameRegex = /^[A-Za-z][A-Za-z0-9]{2,}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message:
          "Username must be at least 3 characters, start with a letter, and contain only letters and numbers",
      });
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Kiểm tra mật khẩu
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters, include uppercase, lowercase, and a number",
      });
    }

    const name = await User.findOne({ username });
    if (name) return res.status(400).json({ message: "Tên đã tồn tại" });

    // Kiểm tra nếu email đã tồn tại
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo người dùng mới
    const newUser = new User({
      username,
      fullName: username,
      email,
      password: hashedPassword,
    });

    // Tạo token và lưu người dùng
    const userId = newUser._id?.toString();
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid user ID");
    }

    try {
      // Generate JWT token
      generateTokenDefault(userId, res);
    } catch (error) {
      console.error("Error generating token:", error);
      return res.status(500).json({ message: "Failed to generate token" });
    }

    try {
      // Lưu người dùng
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        avatar: newUser.avatar,
        token: generateTokenDefault(userId, res),
      });
    } catch (error) {
      console.error("Error saving new user:", error);
      return res.status(500).json({ message: "Failed to save user" });
    }
  } catch (error: unknown) {
    console.log(
      "Error in signup controller",
      error instanceof Error ? error.message : error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (error: unknown) {
    console.log(jwt.TokenExpiredError);
    if (
      error instanceof jwt.TokenExpiredError ||
      (error instanceof Error && error.message === "jwt expired")
      
    ) {
      return res
        .status(401)
        .json({ message: "Token expired. Please login again." });
    }

    console.error("Error in protectRoute middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};