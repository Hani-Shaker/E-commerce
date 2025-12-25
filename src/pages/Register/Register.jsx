import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    // i18n.changeLanguage("ar")
  }, [i18n]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password); // >=6, 1 uppercase, 1 digit

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Optional: limit file size ~2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("❌ Image size is larger than 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validations
    if (!name.trim() || !email.trim() || !password || !confirm) {
      alert("❌ Please fill in all fields");
      return;
    }
    if (!validateEmail(email)) {
      alert("❌ Invalid email address");
      return;
    }
    if (!validatePassword(password)) {
      alert(
        "❌ Password must be at least 6 characters, contain an uppercase letter and a number"
      );
      return;
    }
    if (password !== confirm) {
      alert("❌ Password confirmation does not match");
      return;
    }

    // users stored as array in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() ||
        u.username.toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      alert("❌ A user with the same name or email already exists");
      return;
    }

    const newUser = {
      id: Date.now(),
      username: name,
      email,
      password,
      image: image || null,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="register-page d-flex justify-content-center align-items-center vh-100">
      <div
        className="register-card card p-4 shadow-lg border-0"
        style={{ maxWidth: 480, width: "100%" }}
      >
        <h3 className="text-center mb-4 fw-bold register-title">
          <i className="fas fa-user-plus me-2"></i>
          {t("Register")}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">
              {t("Full Name")}
            </label>
            <div className="input-group">
              <span className="input-group-text icon-box">
                <i className="fas fa-user"></i>
              </span>
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder={t("Enter your full name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              {t("Email Address")}
            </label>
            <div className="input-group">
              <span className="input-group-text icon-box">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder={t("Enter email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <span className="input-group-text icon-box">
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
                id="showPwdRegister"
                checked={showPassword}
                onChange={() => setShowPassword((s) => !s)}
              />
              <label className="form-check-label" htmlFor="showPwdRegister">
                {t("Show Password")}
              </label>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirm" className="form-label fw-semibold">
              {t("Confirm Password")}
            </label>
            <div className="input-group">
              <span className="input-group-text icon-box">
                <i className="fas fa-check"></i>
              </span>
              <input
                id="confirm"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder={t("Confirm Password")}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              {t("Profile Picture")}
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageUpload}
            />
            <small className="text-muted">
              Optional - suggested size less than 2MB
            </small>
          </div>

          {/* Button */}
          <button type="submit" className="btn main-button w-100 fw-bold">
            <i className="fas fa-user-plus me-2"></i>
            {t("Register")}
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-center mt-3">
          {t("Already have an account")}?{" "}
          <a href="/login" className="login-link">
            {t("Login")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
