import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {isValidEmail,isValidPassword} from "../utils/validators";
import {  useAuthStore } from "../store/useAuthStore";

import { FcGoogle } from "react-icons/fc";
import { GrInstagram } from "react-icons/gr";
import { SiThreads } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { SiSpacex } from "react-icons/si";




const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with", formData, "Remember me:", rememberMe);
    // TODO: xử lý đăng nhập
    const emailError = isValidEmail(formData.email);
    const passwordError = isValidPassword(formData.password);

    if (!emailError) {
      toast.error("Email không hợp lệ");
      return;
    }

    if (!passwordError) {
      toast.error("Mật khẩu phải từ 8 ký tự, có chữ hoa, số và ký tự đặc biệt");
      return;
    }

    // Gửi API...
    try {
      await login(formData); // <-- Gọi API đăng nhập
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Đăng nhập thất bại");
      } else {
        toast.error("Đăng nhập thất bại");
      }
    }
  };

  return (
    <div className="logincontainer">
      <div className="loginbox">
        <div className="login-form-container">
          <h3 className="form-logo">
            <SiSpacex />
            Tech Nova
          </h3>
          <h2>Login Account</h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                required
              />
            </div>

            {/* Password */}
            <div className="form-group password-group">
              <input
                type={"password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>

            {/* Options */}
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember for 30 days
              </label>
              <a href="#forgot-password" className="forgot-password">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-button"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Đang đăng nhập..." : "Sign in"}
            </button>

            {/* Google */}
            <button type="button" className="google-sign-in">
              <FcGoogle size={20} />
              <span>Sign in with Google</span>
            </button>
          </form>
          {/*Facebook instagram apple twiter */}
          <div className="login-options">
            <p>Log in using another method</p>
            <div className="social-icons">
              <div>
                <GrInstagram size={20} />
              </div>
              <div>
                <SiThreads size={20} />
              </div>
              <div>
                <FaXTwitter size={20} />
              </div>
            </div>
          </div>
          {/* Signup link */}
          <div className="signup-prompt">
            <p>
              I have an account?{" "}
              <Link to="/signup" style={{ textDecoration: "underline" }}>
                Sign-up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
