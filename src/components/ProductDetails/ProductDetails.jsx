import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext";
import Loader from "../../components/Loader/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const { filteredProducts: products, loading, error } = useProducts();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find((p) => p.id === Number(id));
      setProduct(found);

      if (found) {
        const relatedItems = products.filter(
          (p) => p.category === found.category && p.id !== found.id
        );
        setRelated(relatedItems);
      }
    }
  }, [id, products]);

  // Scroll to top smoothly when id changes (new product selected)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading || !product) return <Loader />;
  if (error) return <div className="text-danger py-5">{error}</div>;

  return (
    <div className="container my-5" style={{ maxWidth: "1200px" }}>
      <div className="row g-4">
        {/* Images + Thumbnails */}
        <div className="col-lg-6 col-md-12">
          <Swiper
            modules={[Navigation, Thumbs]}
            navigation
            loop={true}
            thumbs={{ swiper: thumbsSwiper }}
            className="main-swiper"
            style={{ marginBottom: "10px" }}
          >
            {product.images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={product.title}
                  className="img-fluid rounded border"
                  style={{ maxHeight: "450px", objectFit: "contain", width: "100%" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[Thumbs]}
            slidesPerView={product.images.length > 3 ? 3 : product.images.length}
            spaceBetween={10}
            freeMode={true}
            watchSlidesProgress={true}
            className="thumbs-swiper"
            style={{ maxHeight: "100px" }}
          >
            {product.images.map((img, i) => (
              <SwiperSlide key={i} style={{ cursor: "pointer" }}>
                <img
                  src={img}
                  alt={`thumb-${i}`}
                  className="img-fluid rounded border"
                  style={{ objectFit: "contain", height: "80px", width: "100%" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Info */}
        <div className="col-lg-6 col-md-12">
          <h2 className="fw-bold mb-3">{product.title}</h2>
          <h4 className="text-success mb-3">${product.price.toFixed(2)}</h4>

          {product.discountPercentage && (
            <p className="text-muted text-decoration-line-through mb-2">
              Original Price: $
              {(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </p>
          )}

          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p>
            <strong>Stock Status:</strong> {product.stock > 0 ? (
              <span className="text-success">In Stock</span>
            ) : (
              <span className="text-danger">Out of Stock</span>
            )}
          </p>
          <p><strong>Rating:</strong> {product.rating} / 5</p>

          <div className="mt-4">
            <h5>Product Description</h5>
            <p>{product.description}</p>
          </div>

          <div className="mt-4">
            <h5>Product Details</h5>
            <ul className="list-unstyled">
              <li><strong>SKU:</strong> {product.sku}</li>
              <li><strong>Weight:</strong> {product.weight} g</li>
              <li>
                <strong>Dimensions:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} mm
              </li>
              <li><strong>Warranty:</strong> {product.warrantyInformation}</li>
              <li><strong>Shipping Info:</strong> {product.shippingInformation}</li>
              <li><strong>Return Policy:</strong> {product.returnPolicy}</li>
              <li><strong>Minimum Order Qty:</strong> {product.minimumOrderQuantity}</li>
              <li>
                <strong>Tags: </strong>
                {product.tags.map((tag, i) => (
                  <span key={i} className="badge bg-secondary me-1">{tag}</span>
                ))}
              </li>
            </ul>
          </div>

          <div className="mt-3">
            <h5>Product QR Code</h5>
            <img src={product.meta.qrCode} alt="QR Code" style={{ width: "130px" }} />
          </div>

          {/* Add to Cart Button */}
          <button
            className="btn btn-success mt-4 px-4 py-2"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-5">
        <h4>Customer Reviews</h4>
        {product.reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          product.reviews.map((review, index) => (
            <div key={index} className="border rounded p-3 mb-3">
              <strong>{review.reviewerName}</strong> - <small>{new Date(review.date).toLocaleDateString()}</small>
              <div>Rating: {review.rating} / 5</div>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Suggested Products Slider */}
      <div className="mt-5">
        <h4 className="mb-4">Suggested Products</h4>
        {related.length === 0 ? (
          <p>No suggestions found.</p>
        ) : (
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={15}
            slidesPerView={3}
            breakpoints={{
              320: { slidesPerView: 1 },
              576: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
          >
            {related.map((rp) => (
              <SwiperSlide key={rp.id}>
                <Link to={`/product/${rp.id}`} className="text-decoration-none text-dark">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={rp.images[0]}
                      alt={rp.title}
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h6>{rp.title}</h6>
                      <p className="text-success mb-0">${rp.price.toFixed(2)}</p>
                      {rp.discountPercentage && (
                        <small className="text-muted text-decoration-line-through">
                          ${(rp.price / (1 - rp.discountPercentage / 100)).toFixed(2)}
                        </small>
                      )}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
