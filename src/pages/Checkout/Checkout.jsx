import "./Checkout.css";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext"; // ربط بالكارت
import { useEffect } from "react";

const Checkout = () => {
  const { t } = useTranslation();
  const { cart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // إجمالي السعر
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 0; // مجاني
  const total = subtotal + shipping;

  return (
    <div className="container checkout-container py-5">
      <div className="row">
        {/* ====== Left Side - Form ====== */}
        <div className="col-md-7">
          {/* Contact */}
          <h5 className="fw-bold mb-3">{t("Contact")}</h5>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder={t("Email or mobile phone number")}
            />
          </div>
          <div className="form-check mb-4">
            <input type="checkbox" className="form-check-input" id="offers" />
            <label htmlFor="offers" className="form-check-label">
              {t("Email me with news and offers")}
            </label>
          </div>

          {/* Delivery */}
          <h5 className="fw-bold mb-3">{t("Delivery")}</h5>
          <div className="mb-3">
            <select className="form-select">
              <option>{t("United States")}</option>
              <option>{t("Canada")}</option>
              <option>{t("Egypt")}</option>
            </select>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={t("First name (optional)")}
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={t("Last name")}
              />
            </div>
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder={t("Address")}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder={t("Apartment, suite, etc. (optional)")}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={t("Postal code (optional)")}
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={t("City")}
              />
            </div>
          </div>

          <div className="form-check mb-4">
            <input type="checkbox" className="form-check-input" id="saveInfo" />
            <label htmlFor="saveInfo" className="form-check-label">
              {t("Save this information for next time")}
            </label>
          </div>

          {/* Shipping */}
          <h6 className="fw-bold">{t("Shipping method")}</h6>
          <div className="shipping-method p-3 border rounded mb-4 d-flex justify-content-between align-items-center">
            <span>{t("Standard")}</span>
            <span className="fw-bold text-success">{t("FREE")}</span>
          </div>

          {/* Payment */}
          <h5 className="fw-bold">{t("Payment")}</h5>
          <p className="text-muted">
            {t("All transactions are secure and encrypted.")}
          </p>
          <div className="payment-box border rounded p-5 text-center">
            <i className="bi bi-credit-card fs-1"></i>
          </div>
        </div>

        {/* ====== Right Side - Order Summary ====== */}
        <div className="col-md-5">
          <div className="order-summary ps-md-5">
            {/* المنتجات من الكارت */}
            {cart.length === 0 ? (
              <p className="text-muted">{t("Your cart is empty")}</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="d-flex align-items-center mb-3">
                  <img
                    src={item.images ? item.images[0] : item.img}
                    alt={item.title || item.name}
                    className="me-3 rounded"
                  />
                  <div className="flex-grow-1">
                    <p className="mb-0 small">{item.title || item.name}</p>
                    <small className="text-muted">
                      {item.qty} × ${item.price}
                    </small>
                  </div>
                  <span className="small">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))
            )}

            {/* Totals */}
            <div className="d-flex justify-content-between mb-2">
              <span className="small">
                {t("Subtotal ·")} {cart.length} {t("items")}
              </span>
              <span className="small">${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="small">{t("Shipping")}</span>
              <span className="small text-success">{t("FREE")}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold mt-3">
              <span>{t("Total")}</span>
              <span className="fs-5">${total.toFixed(2)}</span>
            </div>
            <p className="text-muted small">
              {t("Including taxes (if applicable)")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
