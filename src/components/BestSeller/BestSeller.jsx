import "./BestSeller.css";
import bannerBg from "../../assets/images/bestSeller.jpg"; 
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";  // ✅

const BestSeller = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    // i18n.changeLanguage("ar");
  }, [i18n]);

  const { filteredProducts: products, loading, error } = useProducts();
  const navigate = useNavigate(); // ✅

  if (loading) return <Loader />;
  if (error) return <div className="text-danger">{error}</div>;

  const homeProducts = products;

  return (
    <div className="container my-5">
      <p className="fw-bold fs-3 text-center">{t("Best Seller")}</p>
      <p className="text-muted text-center">
        {t("Do not miss the current offers until the end of month.")}
      </p>
      <div className="row g-4">
        {/* الشمال */}
        <div className="col-12 col-lg-4">
          <div className="row g-4">
            {homeProducts
              .slice(0, 4)
              .map((item) => (
                <div className="col-6 viewer-blur" key={item.id}>
                  <div
                    className="product-card p-3 border rounded h-100 position-relative"
                    style={{ cursor: "pointer" }}  // ✅
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" }); // اختياري لتجربة أفضل
                      navigate(`/product/${item.id}`);
                    }}
                  >
                    <span className="badge bg-success position-absolute top-0 start-0 m-2">
                      {item.discountPercentage}%
                    </span>
                    <img
                      src={Array.isArray(item.images) ? item.images[0] : item.images}
                      alt={item.title}
                      className="img-fluid mb-3 product-img"
                    />
                    <h6 className="mb-1 viewer-blur">{item.title}</h6>
                    <p className="text-success small mb-1 viewer-blur">
                      {item.stock} IN STOCK
                    </p>
                    <div className="d-flex align-items-center mb-1 viewer-blur">
                      {item.rating}
                      <i className="fas fa-star text-warning"></i>
                      <span className="ms-2 small viewer-blur">
                        {item.reviews.length} review
                      </span>
                    </div>
                    <div>
                        <span className="text-muted text-decoration-line-through me-2 viewer-blur">
                          ${(item.price/(1-(item.discountPercentage)/100)).toFixed(2)}
                        </span>
                        <span className="text-danger fw-bold viewer-blur">
                          ${item.price.toFixed(2)}
                        </span>

                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* البانر في النص */}
        <div className="col-12 col-lg-4 d-flex">
          <div
            className="banner-box text-center p-4 d-flex flex-column justify-content-center align-items-center rounded w-100"
            style={{
              backgroundImage: `url(${bannerBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#fff",
              minHeight: "100%",
            }}
          ></div>
        </div>

        {/* اليمين */}
        <div className="col-12 col-lg-4">
          <div className="row g-4">
            {homeProducts
              .slice(15, 19)
              .map((item) => (

                <div className="col-6 viewer-blur" key={item.id}>
                  <div
                    className="product-card p-3 border rounded h-100 position-relative"
                    style={{ cursor: "pointer" }}  // ✅
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" }); // اختياري
                      navigate(`/product/${item.id}`);
                    }}
                  >
                    <span className="badge bg-success position-absolute top-0 start-0 m-2">
                      {item.discountPercentage}%
                    </span>
                    <img
                      src={Array.isArray(item.images) ? item.images[0] : item.images}
                      alt={item.title}
                      className="img-fluid mb-3 product-img"
                    />
                    <h6 className="mb-1 viewer-blur">{item.title}</h6>
                    <p className="text-success small mb-1 viewer-blur">
                      {item.stock} IN STOCK
                    </p>
                    <div className="d-flex align-items-center mb-1 viewer-blur">
                      {item.rating}
                      <i className="fas fa-star text-warning"></i>
                      <span className="ms-2 small viewer-blur">
                        {item.reviews.length} review
                      </span>
                    </div>
                    <div>
                        <span className="text-muted text-decoration-line-through me-2 viewer-blur">
                          ${(item.price/(1-(item.discountPercentage)/100)).toFixed(2)}
                        </span>
                        <span className="text-danger fw-bold viewer-blur">
                          ${item.price.toFixed(2)}
                        </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
