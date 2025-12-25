import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
  }, [i18n]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) =>
        (u.username === username) &&
        u.password === password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("✅ Logged in successfully!");
      navigate("/");
    } else {
      alert("❌ Invalid username/email or password");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div
        className="login-card card p-4 shadow-lg border-0"
        style={{ maxWidth: 420, width: "100%" }}
      >
        <h3 className="login-title text-center mb-4">

          <i className="fas fa-sign-in-alt me-2"></i>
          {t("Login")}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              {t("Username")}
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-user"></i>
              </span>
              <input
                id="username"
                type="text"
                className="form-control"
                placeholder={t("Enter username")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              {t("Password")}
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder={t("Enter password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="showPwdLogin"
                checked={showPassword}
                onChange={() => setShowPassword((s) => !s)}
              />
              <label className="form-check-label" htmlFor="showPwdLogin">
                {t("Show Password")}
              </label>
            </div>
          </div>

          <button type="submit" className="btn main-button w-100 fw-bold">

            <i className="fas fa-sign-in-alt me-2"></i>
            {t("Login")}
          </button>
        </form>

        <p className="text-center mt-3">
          {t("Don't have an account")}?{" "}
          <a href="/register" className="login-link">
            {t("Register")}
          </a>
        </p>

      </div>
    </div>
  );
};

export default Login;
