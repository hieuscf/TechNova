import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database/mongoDB.js";
const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Express is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
;
