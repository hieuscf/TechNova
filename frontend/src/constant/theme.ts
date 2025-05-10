import type { Theme } from "../Styles/theme";
import {} from "../Styles/_main.scss";

export const themeStyles: Record<Theme, { background: string; color: string }> = {
  light: {
    background: "#ffffff",
    color: "#8b8d96",
  },
  dark: {
    background: "#20232f",
    color: "#ffffff",
  },
};
