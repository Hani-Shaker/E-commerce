import "./Hero.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import Loader from "../../components/Loader/Loader";
import Timer from "../Timer/Timer";
import { useNavigate } from "react-router-dom";

function Hero() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    // i18n.changeLanguage('ar');
  }, [i18n]);
  const navigate = useNavigate();
  // context hero
  // const { homeProducts } = useContext(HomeContext);

  const { filteredProducts: products, loading, error } = useProducts();
  if (loading) return <Loader />;
  if (error) return <div className="text-danger">{error}</div>;
  // Limit to first 4 products for Home
  const homeProducts = products.slice(0, 5);

  return (
    <div className="container">
      {/* hero section */}
      <div className="hero text-capitalize">
        <div className="slid">
          <div className="cont-slid">
            <div className="line-offer">
              <p>{t("EXCLUSIVE OFFER")}</p>
              <span>{t("-20% OFF")}</span>
            </div>
            <h2 className="fw-bold">
              {t("specialist in the grocery store")}
            </h2>
            <p>{t("only this week.don't miss...")}</p>
            <span>{t("from")}</span>
            <span className="fw-bold fs-2 text-danger">$7.99</span>
            <br />
            <Link to="/shop" className="btn px-3">
              {t("shop now")} <i className="fas fa-right-long"></i>
            </Link>
          </div>
        </div>
        <div className="tag-line">
          <span>
            <b>{t("100% secure delivery")}</b>{" "}<br/>
            {t("without contacting the couier")}
          </span>
          <Link to="/shop" className="btn px-3">
            {t("shop now")}
          </Link>
        </div>
      </div>
      {/* offer down section */}
      <div className="offer-down">        
        <div className="timer d-flex flex-column flex-md-row justify-content-center align-items-center text-center gap-4 my-4 flex-wrap viewer-blur">
          <div className="text-section" style={{ maxWidth: "500px" }}>
           <h4 className="text-primary">{t("special offers of the week!")}</h4>
            <p>
              {t(
             "Enjoy our special offers of the week! Get amazing discounts on the latest clothes and accessories. Don’t miss out, shop now!"
              )}
            </p>
          </div>
          <Timer />
        </div>
         <div className="offer-cards border border-danger border-2 rounded row row-col-12 viewer-blur">
         {homeProducts.slice(0, 5).map((p) => (
            <div
              key={p.id}
              className="offer-card col-md-6 a col-lg-4 col-xl border border-1 viewer-blur"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <div className="top-card position-relative">
                <img
                  src={Array.isArray(p.images) ? p.images[0] : p.images}
                  alt={p.title}
                />

                <div className="offer position-absolute top-0 left-0 m-2 viewer-blur">
                  {p.discountPercentage}%
                </div>
              </div>
              <div className="body-card p-3 viewer-blur">
                <h5 className="title viewer-blur">{t(p.title)}</h5>
                <div className="rate d-flex gap-2 viewer-blur">
                  <div className="text-warning">
                    {p.rating}
                    <i className="fas fa-star"></i>
                  </div>
                  <span>
                    {p.reviews.length}
                    {t(" review")}
                  </span>
                </div>
                <div className="offer-price d-flex gap-2">
                  <div className="before-offer text-decoration-line-through viewer-blur">
                    ${(p.price / (1 - p.discountPercentage / 100)).toFixed(2)}
                  </div>
                  <div className="after-offer text-danger fs-5 viewer-blur">
                    ${p.price}
                  </div>
                </div>
                <div className="bar viewer-blur">
                  <div style={{ width: p.stock + "%" }}></div>
                </div>
                <p className="pt-3 text-center viewer-blur">
                  {t("the available products:")}{" "}
                  <span className="fw-bold fs-3 text-primary">{p.stock}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="row row-cols-12 my-4 d-flex gap-5">
        <div
          className="col-11 col-lg rounded p-5 viewer-to-left d-flex flex-column align-items-end bg-img-red-public"
          style={{ backgroundSize: "cover", backgroundPosition: "0 75%" }}
        >
          <p className="viewer-blur fs-3">{t("High-quality products")}</p>
          <p className="viewer-blur" style={{ color: "var(--text-color)" }}>
            {t("Meat, fish, eggs and all foods")}
          </p>
          <Link to="/shop" className="btn btn-info px-3 rounded-5 viewer-blur">
            {t("shop now")}
          </Link>
        </div>
        <div
          className="col-11 col-lg rounded p-5 viewer-to-left bg-img-blue-public"
          style={{ backgroundSize: "cover", backgroundPosition: "0 75%" }}
        >
          <p className="viewer-blur fs-3">{t("High-quality products")}</p>
          <p className="viewer-blur" style={{ color: "var(--text-color)" }}>
            {t("Pharaonic style jewelry")}
          </p>
          <Link
            to="/shop"
            className="btn btn-danger px-3 rounded-5 viewer-blur"
          >
            {t("shop now")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;