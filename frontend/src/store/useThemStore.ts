import { create } from "zustand"; // Import create từ Zustand

// Import type Theme từ file định nghĩa (nên là: 'src/types/theme.ts' chứ không phải 'constant')
import type { Theme } from "../Styles/theme";

// Tạo store Zustand với kiểu dữ liệu rõ ràng (type-safe)
export const useThemeStore = create<{
  theme: Theme; // kiểu dữ liệu của theme
  setTheme: (theme: Theme) => void; // hàm setTheme nhận tham số theme
}>((set) => ({
  // Giá trị khởi tạo: lấy từ localStorage hoặc fallback là 'light'
  theme: (localStorage.getItem("theme") as Theme) || "light",

  // Hàm thay đổi theme, vừa cập nhật localStorage vừa cập nhật store
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
