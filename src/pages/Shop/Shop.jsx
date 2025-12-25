// src/pages/Shop/Shop.jsx
import "./Shop.css";
import Shopbutton from "../../assets/images/Shopbutton.png";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProducts } from "../../context/ProductContext";
import { useCart } from "../../context/CartContext"; //  استدعاء الكارت
import Loader from "./../../components/Loader/Loader";
import { Link } from "react-router-dom"; //  إضافة Link

function Shop() {
  const { t } = useTranslation();
  const { filteredProducts: products, loading, error } = useProducts();
  const { addToCart } = useCart(); //  استخدام الكارت

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Filters
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [inStock, setInStock] = useState(null);

  // حساب البداية والنهاية
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  // Apply filters
  const filtered = products.filter((p) => {
    const inCategory =
      selectedCategory.length === 0 || selectedCategory.includes(p.category);
    const inBrand =
      selectedBrands.length === 0 || selectedBrands.includes(p.brand);
    const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const stockFilter =
      inStock === null ||
      (inStock === true && p.stock > 0) ||
      (inStock === false && p.stock === 0);

    return inCategory && inBrand && inPrice && stockFilter;
  });

  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [products, selectedCategory, selectedBrands, priceRange, inStock]);

  if (loading) return <Loader />;
  if (error) return <div className="text-danger py-5">{error}</div>;

  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand))];

  return (
    <div className="container my-5">
      <div className="cont-shop row">
        {/* Sidebar */}
        <div className="check-inputs col-12 col-md-3 p-2">
          <div className="accordion" id="filtersAccordion">
            {/* Categories */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingCategories">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseCategories"
                  aria-expanded="true"
                  aria-controls="collapseCategories"
                >
                  {t("Product Categories")}
                </button>
              </h2>
              <div
                id="collapseCategories"
                className="accordion-collapse collapse show"
                aria-labelledby="headingCategories"
                data-bs-parent="#filtersAccordion"
              >
                <div className="accordion-body">
                  <div className="row">
                    {categories.map((cat) => (
                      <div key={cat} className="form-check col-6 mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectedCategory.includes(cat)}
                          onChange={(e) =>
                            setSelectedCategory((prev) =>
                              e.target.checked
                                ? [...prev, cat]
                                : prev.filter((c) => c !== cat)
                            )
                          }
                          id={`cat-${cat}`}
                        />
                        <label className="form-check-label" htmlFor={`cat-${cat}`}>
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingBrands">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseBrands"
                  aria-expanded="false"
                  aria-controls="collapseBrands"
                >
                  {t("Brands")}
                </button>
              </h2>
              <div
                id="collapseBrands"
                className="accordion-collapse collapse"
                aria-labelledby="headingBrands"
                data-bs-parent="#filtersAccordion"
              >
                <div className="accordion-body">
                  <div className="row">
                    {brands.map((brand) => (
                      <div key={brand} className="form-check col-6 mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={(e) =>
                            setSelectedBrands((prev) =>
                              e.target.checked
                                ? [...prev, brand]
                                : prev.filter((b) => b !== brand)
                            )
                          }
                          id={`brand-${brand}`}
                        />
                        <label className="form-check-label" htmlFor={`brand-${brand}`}>
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingPrice">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePrice"
                  aria-expanded="false"
                  aria-controls="collapsePrice"
                >
                  {t("Price Range")}
                </button>
              </h2>
              <div
                id="collapsePrice"
                className="accordion-collapse collapse"
                aria-labelledby="headingPrice"
                data-bs-parent="#filtersAccordion"
              >
                <div className="accordion-body">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    className="form-range"
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  />
                  <div className="d-flex justify-content-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingAvailability">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseAvailability"
                  aria-expanded="false"
                  aria-controls="collapseAvailability"
                >
                  {t("Availability")}
                </button>
              </h2>
              <div
                id="collapseAvailability"
                className="accordion-collapse collapse"
                aria-labelledby="headingAvailability"
                data-bs-parent="#filtersAccordion"
              >
                <div className="accordion-body">
                  <div className="form-check mb-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="stock"
                      checked={inStock === null}
                      onChange={() => setInStock(null)}
                      id="stock-all"
                    />
                    <label className="form-check-label" htmlFor="stock-all">
                      {t("All")}
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="stock"
                      checked={inStock === true}
                      onChange={() => setInStock(true)}
                      id="stock-in"
                    />
                    <label className="form-check-label" htmlFor="stock-in">
                      {t("In Stock")}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="stock"
                      checked={inStock === false}
                      onChange={() => setInStock(false)}
                      id="stock-out"
                    />
                    <label className="form-check-label" htmlFor="stock-out">
                      {t("Out of Stock")}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Ad image */}
            <div className="photo-ad mt-4">
              <img
                src={Shopbutton}
                alt="photo"
                className="card-img-top"
                style={{
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="col-12 col-md-9">
          {/* Hero */}
          <div className="hero-shop d-flex justify-content-center align-items-center my-3 p-3">
            <div className="cont-hero-shop d-flex justify-content-center align-items-start flex-column py-5">
              <p className="fs-3">{t("organic products")}</p>
              <p className="fw-bold fs-3">
                {t("delivered to")}{" "}
                <span className="text-success">{t("your home")}</span>
              </p>
              <p className="text-secondary">{t("delivered nationwide.")}</p>
            </div>
          </div>

          {/* Sort + length */}
          <div className="product-length-sort rounded my-3 px-4 py-4 d-flex align-items-center justify-content-between">
            <div className="length">
              {filtered.length} {t("products")}
            </div>
            <div className="sort">
              {t("sort by:")}{" "}
              <span className="text-dark">{t("alphabetically, A-Z")}</span>
            </div>
          </div>

          {/* Products Grid */}
          <div className="row">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 viewer-blur"
              >
                <div className="card border border-1 h-100 position-relative">
                  {/* Offer badge */}
                  {product.discountPercentage && (
                    <div className="offer position-absolute top-0 start-0 m-2 px-2 py-1 main-color rounded">
                      {product.discountPercentage}%
                    </div>
                  )}

                  <div className="top-card position-relative">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="card-img-top p-3"
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column align-content-between p-3">
                    <div className="d-flex flex-column">
                      <h5 className="card-text viewer-blur">{product.title}</h5>
                      <div className="rate d-flex gap-2 viewer-blur">
                        <div className="text-warning viewer-blur">
                          {product.rating}
                          <i className="fas fa-star"></i>
                        </div>
                        <span className="viewer-blur">{t("1 review")}</span>
                      </div>
                      <div className="offer-price d-flex gap-2 align-items-center">
                        <div className="after-offer text-danger fs-5 card-text viewer-blur">
                          ${product.price}
                        </div>
                        {product.discountPercentage && (
                          <div className="before-offer text-muted text-decoration-line-through viewer-blur">
                            $
                            {(
                              product.price /
                              (1 - product.discountPercentage / 100)
                            ).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/*  Add to Cart + Show Details */}
                    <div className="d-flex flex-column gap-2 mt-auto">
                      <button
                        className="btn main-button"
                        onClick={() => addToCart(product)}
                      >
                        {t("Add to Cart")}
                      </button>
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-outline-secondary"
                      >
                        Show Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
              {[...Array(totalPages).keys()].map((num) => (
                <li
                  key={num + 1}
                  className={`page-item ${
                    currentPage === num + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(num + 1)}
                  >
                    {num + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Shop;
