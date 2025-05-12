import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/database/mongoDB.js";


import authRoutes from "./modules/auth/auth.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Kiểm tra xem biến môi trường cần thiết có tồn tại không
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET environment variable is missing.");
  process.exit(1); // Dừng server nếu thiếu biến môi trường quan trọng
}

app.use(cookieParser());
app.use(express.json());

// (Nếu bạn có xử lý form URL-encoded)
app.use(express.urlencoded({ extended: true }));

// Cấu hình CORS cho phép frontend localhost kết nối
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);


// Sử dụng các route cho API
app.use("/api/auth", authRoutes);

// API Hello World ở root path
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Khởi chạy server và kết nối đến cơ sở dữ liệu MongoDB
const startServer = async () => {
  try {
    await connectDB(); // Kết nối cơ sở dữ liệu
    app.listen(port, () => {
      console.log(`Express is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
