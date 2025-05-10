import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GrInstagram } from "react-icons/gr";
import { SiThreads } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
// import { SiSpacex } from "react-icons/si";
// <SiSpacex />;

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with", formData, "Remember me:", rememberMe);
    // TODO: xử lý đăng nhập tại đây
  };

  return (
    <div className="logincontainer">
      <div className="loginbox">
        <div className="login-form-container">
          <h3 className="form-logo">Tech Nova</h3>
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
            <button type="submit" className="login-button">
              Sign in
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
              Don't have an account?{" "}
              <a style={{ textDecoration: "underline" }} href="#signup">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
