import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductContext"; 
import { useCart } from "../../context/CartContext";

function Navbar() {
  //  Active link style
  const activeStyle = ({ isActive }) => ({
    color: isActive ? "#49BFAA" : "",
    backgroundColor: isActive ? "#F0FAFF" : "",
  });

  //  Language
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "English"
  );

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    if (language === "English") {
      i18n.changeLanguage("en");
      document.body.dir = "ltr";
    } else if (language === "Arabic") {
      i18n.changeLanguage("ar");
      document.body.dir = "rtl";
    }
    localStorage.setItem("selectedLanguage", language);
  };

  useEffect(() => {
    if (selectedLanguage === "English") {
      i18n.changeLanguage("en");
      document.body.dir = "ltr";
    } else {
      i18n.changeLanguage("ar");
      document.body.dir = "rtl";
    }
  }, [i18n, selectedLanguage]);

  //  Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  };

  //  Search
  const { setFilters } = useProducts();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
    if (searchTerm.length > 0) {
      navigate("/shop");
    }
  }, [searchTerm, setFilters, navigate]);

  //  Cart
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartTotal = cart
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <header>
      <div>
        {/*  Top notice */}
        <div className="dueto">
          <p className="duetotext text-light">{t("Due to current circumstances, there may be slight delays in order processing")}</p>
        </div>
        {/*  First navbar */}
        <div className="container d-flex pt-1 first-navbar">
          <div>
            <ul className="d-flex justify-content-evenly navul-1">
              {!isLoggedIn && (
                <>
                  <li>
                    <NavLink id="login" to="/login">
                      {t("LOGIN")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink id="register" to="/register">
                      {t("REGISTER")}
                    </NavLink>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <li>
                  <NavLink id="logout" to="/" onClick={handleLogout}>
                    {t("LOGOUT")}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="d-flex text-for-navbar">
            <div className="secure-delivery d-flex text-muted">
              <i className="fa-solid fa-user-shield pt-1"></i>
              <p>{t("100% secure delivery without contacting the courier")}</p>
            </div>
            <div className="d-flex">
              <div className="line-vertical pt-3 "></div>
              <p className="text-muted">
                {t("Need help? call us:")}
                <b className="number">{t("+00200 500")}</b>
              </p>
              <div className="line-vertical pt-3 "></div>
            </div>
            <div className="selection">
              <select
                className="select"
                id="select"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                <option value="English">English</option>
                <option value="Arabic">عربي</option>
              </select>
            </div>
          </div>
        </div>
        <hr className="horizontail-line pt-1" />
        {/*  Logo + Search + Cart */}
        <div className="header d-flex justify-content-between container ">
          <img
            className="img"
            src={logo}
            alt="logo"
            width={130}
            height={50}
          />
          {/* Search */}
          <div className="text-decoration-none input-text border-0 rounded d-flex justify-content-between">
            <input
              className="search border-0"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t(
                "Search for products, fashion, clothes, accessories, etc..."
              )}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          {/* User + Cart */}
          <div className="user-price-cart d-flex justify-content-evenly">
            <div className="user">
              <NavLink to="/profile">
                <i className="fa-solid fa-user"></i>
              </NavLink>
            </div>
            <div className="price">
              <p>${cartTotal}</p>
            </div>
            <div className="cart">
              <NavLink to="/cart">
                <i className="fa-solid fa-bucket"></i>
              </NavLink>
              <span className="number-cart">{cartCount}</span>
            </div>
          </div>
        </div>

        {/*  Second navbar */}
        <div className="navbar2 container">
          <ul className="d-flex justify-content-evenly navul">
            <li>
              <NavLink style={activeStyle} to="/">
                {t("HOME")}
              </NavLink>
            </li>
            <li>
              <NavLink style={activeStyle} to="/shop">
                {t("SHOP")}
              </NavLink>
            </li>
            <li>
              <NavLink style={activeStyle} to="/blog">
                {t("BLOG")}
              </NavLink>
            </li>
            <li>
              <NavLink style={activeStyle} to="/contact">
                {t("CONTACT")}
              </NavLink>
            </li>
            <li>
              <NavLink style={activeStyle} to="/about">
                {t("About Us")}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <hr className="horizontail-line pt-1" />
    </header>
  );
}

export default Navbar;
