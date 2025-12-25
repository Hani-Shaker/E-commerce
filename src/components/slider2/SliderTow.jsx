// src/components/Slider/Slider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "./SliderTwo.css";

export default function SliderTwo() {
  const { filteredProducts: products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (loading) return <Loader />;
  if (error) return <div className="text-danger">{error}</div>;

  const homeProducts = products.slice(0, 20);

  return (
    <div className="categories-wrapper container my-5">
      <div className="categories-box position-relative p-3 rounded-3 viewer-blur">
        <Swiper
          modules={[Navigation]}
          navigation={true}
          spaceBetween={20}
          slidesPerView={5}
          loop={false} // يمكنك تفعيلها حسب عدد المنتجات
          breakpoints={{
            1200: { slidesPerView: 5 },
            992: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            576: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {homeProducts.map((cat) => (
            <SwiperSlide key={cat.id}>
              <div
                className="cat-card card"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/product/${cat.id}`)}
              >
                <div className="img-wrap">
                  <img
                    src={Array.isArray(cat.images) ? cat.images[0] : cat.images}
                    alt={cat.title}
                    style={{objectFit:"fill"}}
                    className="img-fluid"
                  />
                </div>
                <span>{cat.title}</span>
                <span id="sp-1" className="text-success">
                  {cat.stock}. {t("IN STOCK")}
                </span>
                <span>
                  {(cat.reviews?.length || 0)} {t("1 review")}
                </span>
                <div>
                  <span id="sp-3" className="text-danger">
                    ${cat.price}
                  </span>
                </div>
                <div className="cat-info">
                  <button
                    type="button"
                    id="btn"
                    className="btn main-button"
                    onClick={(e) => {
                      e.stopPropagation(); // عشان الزر ما ينقلش لصفحة التفاصيل
                      addToCart(cat);
                    }}
                  >
                    {t("Add to cart")}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
