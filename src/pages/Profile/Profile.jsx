import "./Profile.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") navigate("/login");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [i18n, navigate]);

  const user = JSON.parse(localStorage.getItem("currentUser")) || {
    username: "Guest",
    email: "guest@example.com",
    image: null,      
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    alert("✅ Logged out successfully");
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "⚠️ Are you sure you want to permanently delete your account?"
      )
    ) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("currentUser");

      // If you have a users array stored, remove the user from it
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const filtered = users.filter((u) => u.email !== user.email);
      localStorage.setItem("users", JSON.stringify(filtered));

      alert("🗑️ Account deleted successfully");
      navigate("/register");
    }
  };

  const goEdit = () => navigate("/edit-profile");

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="card profile-card shadow-lg border-0"
        style={{ maxWidth: 680, width: "100%" }}
      >
        <div className="profile-header text-center p-4">
          {user.image ? (
            <img
              src={user.image}
              alt="Profile"
              className="profile-img rounded-circle mb-3"
              style={{ width: 120, height: 120, objectFit: "cover" }}
            />
          ) : (
            <div
              className="profile-avatar mb-3"
              style={{ width: 120, height: 120, borderRadius: 999 }}
            >
              <span style={{ fontSize: 48 }}>
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <h4 className="mb-0">{user.username}</h4>
          <p className="text-muted">@{user.username}</p>
        </div>
        <div className="card-body">
          <h6 className="fw-bold mb-3">{t("Profile Info")}</h6>
          <ul className="list-unstyled mb-4">
            <li className="mb-2">
              <i className="fas fa-envelope me-2 text-success"></i>
              {user.email}
            </li>
          </ul>

          <div className="d-flex flex-column gap-2">
            <div className="d-flex gap-2">
              <button onClick={goEdit} className="btn btn-success w-50">
                <i className="fas fa-edit me-2"></i>
                {t("Edit Profile")}
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger w-50"
              >
                <i className="fas fa-sign-out-alt me-2"></i>
                {t("Logout")}
              </button>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="btn btn-danger w-100"
            >
              <i className="fas fa-trash-alt me-2"></i>
              {t("Delete My Account")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
