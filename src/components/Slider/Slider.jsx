import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom"; //  استخدم useNavigate للتنقل
import { useProducts } from "../../context/ProductContext";
import Loader from "../../components/Loader/Loader";

import "swiper/css";
import "swiper/css/navigation";
import "./Slider.css";

export default function Slider() {
  const { filteredProducts: products, loading, error } = useProducts();
  const navigate = useNavigate(); //  Hook للتنقل عند الضغط

  if (loading) return <Loader />;
  if (error) return <div className="text-danger">{error}</div>;

  const sliderProducts = products.slice(10, 18);

  return (
    <div className="categories-wrapper container my-5">
      <div className="categories-box position-relative p-3 rounded-3 viewer-blur">
        <Swiper
          modules={[Navigation]}
          navigation={true}
          spaceBetween={20}
          slidesPerView={5}
          loop={sliderProducts.length > 5}
          breakpoints={{
            1200: { slidesPerView: 5 },
            992: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            576: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {sliderProducts.map((cat) => (
            <SwiperSlide key={cat.id}>
              <div
                className="cat-card text-center"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" }); //  يطلع فوق
                  navigate(`/product/${cat.id}`);
                }}
              >
                <div className="img-wrap">
                  <img
                    src={Array.isArray(cat.images) ? cat.images[0] : cat.images}
                    alt={cat.title}
                  />
                </div>
                <div className="cat-info">
                  <h6 className="cat-title">{cat.title}</h6>
                  <p className="cat-items">{cat.stock} items</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
