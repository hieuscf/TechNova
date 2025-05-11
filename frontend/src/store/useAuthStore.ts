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
  authUser: AuthUser | null;
  connectSocket: () => void;
  login: (data: { email: string; password: string }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggingIn: false,
  authUser: null,

  connectSocket: () => {
    const socket = io("http://localhost:3000");
    console.log("Socket connected:", socket);
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
