import './App.css'
import { Toaster } from "react-hot-toast";
import {Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import SigninPage  from './pages/SignupPage';

import { themeStyles } from './constant/theme';
import { useThemeStore } from './store/useThemStore';
function App() {
  const { theme } = useThemeStore();
  const styles = themeStyles[theme];

  return (
    <div style={{ backgroundColor: styles.background, color: styles.color }}>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SigninPage />} />
        {/* Thêm các route khác nếu cần */}
      </Routes>
    </div>
  );
}

export default App
