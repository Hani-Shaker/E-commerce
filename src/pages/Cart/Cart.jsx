import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext"; // استدعاء الكارت
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { t } = useTranslation();
  const { cart, removeFromCart, updateQty, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCheckout = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/checkout");
    } else {
      if (
        window.confirm(
          t("You need to login to proceed. Do you want to login now?")
        )
      ) {
        navigate("/login");
      }
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container my-5">
      <h3 className="mb-4 d-flex justify-content-between align-items-center">
        {t("Shopping Cart")}
        {/* زرار تفريغ الكارت */}
        {cart.length > 0 && (
          <button className="btn btn-sm btn-outline-danger" onClick={clearCart}>
            <i className="fas fa-trash me-1"></i> {t("Clear Cart")}
          </button>
        )}
      </h3>

      <div className="row g-4">
        {/* Cart Items */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              {cart.length === 0 ? (
                <p className="text-center text-muted">
                  {t("Your cart is empty")}
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center justify-content-between border-bottom py-3"
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={item.images ? item.images[0] : item.img}
                        alt={item.title || item.name}
                        className="rounded me-3"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <h6 className="mb-1">{item.title || item.name}</h6>
                        <small className="text-success">${item.price}</small>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                      >
                        −
                      </button>
                      <span className="px-3">{item.qty}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>

                    {/* Total per item */}
                    <div className="fw-bold">
                      ${(item.price * item.qty).toFixed(2)}
                    </div>

                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="mb-3">{t("Order Summary")}</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>{t("Subtotal")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>{t("Shipping")}</span>
                <span>$5.00</span>
              </div>
              <div className="d-flex justify-content-between fw-bold border-top pt-2">
                <span>{t("Total")}</span>
                <span>${(subtotal + 5).toFixed(2)}</span>
              </div>

              <button
                className="btn main-button w-100 mt-3"
                onClick={handleCheckout}
              >
                {t("Proceed to Checkout")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
