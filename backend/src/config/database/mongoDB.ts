import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongodb = process.env.MONGO_URL; 
if (!mongodb) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}
  
const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(mongodb);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
};

export default connectDB;