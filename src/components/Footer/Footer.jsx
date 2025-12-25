import Google_Play from "../../assets/images/Google_Play.svg";
import app_store from "../../assets/images/app-store.svg";
import "./Footer.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
function Footer() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    // i18n.changeLanguage('ar');
  }, [i18n]);
  return (
    <footer className="pt-5 border-top">
      <div className="container">
        {/* Top Features */}
        <div className="row text-center mb-4 border-bottom pb-3">
          <div className="col-md-3 col-6 mb-3 h6">
            <i className="fa fa-leaf me-2"></i>
            {t("Everyday fresh products")}
          </div>
          <div className="col-md-3 col-6 mb-3 h6">
            <i className="fa fa-truck me-2"></i>
            {t("Free delivery for order over $70")}
          </div>
          <div className="col-md-3 col-6 mb-3 h6">
            <i className="fa fa-bolt me-2"></i>
            {t("Daily Mega Discounts")}
          </div>
          <div className="col-md-3 col-6 mb-3 h6">
            <i className="fa fa-dollar-sign me-2"></i>
            {t("Best price on the market")}
          </div>
        </div>

        {/* Links */}
        <div className="row text-start">
          <div className="col-md-2 col-6 mb-4">
            <h6>{t("FOOTWEAR")}</h6>
            <ul className="list-unstyled">
              <li>{t("Casual Shoes")}</li>
              <li>{t("Sneakers")}</li>
              <li>{t("Loafers")}</li>
              <li>{t("Sandals")}</li>
              <li>{t("Boots")}</li>
              <li>{t("Slippers")}</li>
              <li>{t("Running Shoes")}</li>
              <li>{t("Dress Shoes")}</li>
            </ul>
          </div>
          <div className="col-md-2 col-6 mb-4">
            <h6>{t("CLOTHING")}</h6>
            <ul className="list-unstyled">
              <li>{t("CLOTHING")}</li>
              <li>{t("Winter Coats")}</li>
              <li>{t("Summer Dresses")}</li>
              <li>{t("Formal Suits")}</li>
              <li>{t("Jeans")}</li>
              <li>{t("Skirts")}</li>
              <li>{t("Activewear")}</li>
              <li>{t("Swimwear")}</li>
            </ul>
          </div>
          <div className="col-md-2 col-6 mb-4">
            <h6>{t("ACCESSORIES")}</h6>
            <ul className="list-unstyled">
              <li>{t("BEVERA")}</li>
              <li>{t("Sunglasses")}</li>
              <li>{t("Watches")}</li>
              <li>{t("Belts")}</li>
              <li>{t("Hats")}</li>
              <li>{t("Scarves")}</li>
              <li>{t("Gloves")}</li>
              <li>{t("Ties")}</li>
            </ul>
          </div>
          <div className="col-md-2 col-6 mb-4">
            <h6>{t("TOPS & OUTERWEAR")}</h6>
            <ul className="list-unstyled">
              <li>{t("T-Shirts & Polos")}</li>
              <li>{t("Blazers & Jackets")}</li>
              <li>{t("Hoodies")}</li>
              <li>{t("Sweatshirts")}</li>
              <li>{t("Tank Tops")}</li>
              <li>{t("Graphic Tees")}</li>
              <li>{t("Casual Shirts")}</li>
              <li>{t("Polo Shirts")}</li>
            </ul>
          </div>
          <div className="col-md-2 col-6 mb-4">
            <h6>{t("JEWELRY")}</h6>
            <ul className="list-unstyled">
              <li>{t("JEWELRY")}</li>
              <li>{t("Necklaces")}</li>
              <li>{t("Earrings")}</li>
              <li>{t("Bracelets")}</li>
              <li>{t("Rings")}</li>
              <li>{t("Anklets")}</li>
              <li>{t("Brooches")}</li>
              <li>{t("Cufflinks")}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="row border-top pt-4 mt-4 align-items-center">
          <div className="col-md-4 text-center text-md-start mb-3">
            <i className="fa fa-phone me-2"></i>
            <strong className="h5">8 800 555-55-55</strong>
            <div className="small h6">{t("Working 8:00 - 22:00")}</div>
          </div>
          <div className="col-md-4 text-center mb-3">
            <span className="me-2">{t("Download App on Mobile :")}</span>
            <img
              src={Google_Play}
              alt="Google Play"
              height="36"
              className="me-2"
            />
            <img src={app_store} alt="App Store" height="36" />
            <div className="small">
              {t("15% discount on your first purchase")}
            </div>
          </div>
          <div className="col-md-4 text-center text-md-end mb-3 icons-footer">
            <a href="#" className="me-3 icon-social-media">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="me-3 icon-social-media">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="me-3 icon-social-media">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="row border-top pt-3 mt-3 small">
          <div className="col-md-6 text-center text-md-start mb-2 h6">
            {t("© 2025 All rights reserved by Blackrise Theme")}
          </div>
          <div className="col-md-6 text-center text-md-end">
            <span className="me-3 h6">{t("Privacy Policy")}</span>
            <span className="me-3 h6">{t("Terms and Conditions")}</span>
            <span className="me-3 h5">{t("Cookie")}</span>
            <i className="fab fa-cc-visa me-2 h4"></i>
            <i className="fab fa-cc-mastercard me-2 h4"></i>
            <i className="fab fa-cc-paypal me-2 h4"></i>
            <i className="fab fa-cc-stripe h4"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
