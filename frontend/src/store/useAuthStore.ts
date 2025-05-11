import { create } from "zustand";
import { axiosInstance } from "../config/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { io } from "socket.io-client";

interface AuthUser {
  id: string;
  email: string;
}

interface AuthState {
  isLoggingIn: boolean;
  isSigningUp: boolean;
  authUser: AuthUser | null;
  connectSocket: () => void;
  login: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: { username:string , email: string; password: string }) => Promise<void>;
}

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";


export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggingIn: false,
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,

  connectSocket: () => {
    const socket = io("http://localhost:3000");
    console.log("Socket connected:", socket);
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Đăng ký thành công");
      // get().connectSocket();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Đăng nhập thất bại";
        toast.error(message);
      } else {
        toast.error("Đã xảy ra lỗi không xác định");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Đăng nhập thành công");
      get().connectSocket();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Đăng nhập thất bại";
        toast.error(message);
      } else {
        toast.error("Đã xảy ra lỗi không xác định");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
