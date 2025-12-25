// src/context/ProductContext.jsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // نخلي البداية true لحد ما الداتا تجي
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    brand: "all",
    category: "all",
    search: "",
  });

  // 🟢 API Call
  const fetchProducts = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("https://dummyjson.com/products?limit=100", {
        signal,
      });

      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

      const data = await res.json();
      setProducts(data.products ?? []);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Failed to fetch products");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // 🟢 Fetch on mount
  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    return () => controller.abort();
  }, [fetchProducts]);

  // 🟢 Unique brands & categories
  const brands = useMemo(() => {
    return ["all", ...new Set(products.map((p) => p.brand).filter(Boolean))];
  }, [products]);

  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(products.map((p) => p.category).filter(Boolean)),
    ];
  }, [products]);

  // 🟢 Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (filters.brand !== "all" && p.brand !== filters.brand) return false;
      if (filters.category !== "all" && p.category !== filters.category)
        return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const text = `${p.title} ${p.description ?? ""}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [products, filters]);

  // 🟢 Helpers
  const getProductById = useCallback(
    (id) => products.find((p) => p.id === Number(id)),
    [products]
  );

  const clearFilters = useCallback(() => {
    setFilters({ brand: "all", category: "all", search: "" });
  }, []);

  const reload = useCallback(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    return () => controller.abort();
  }, [fetchProducts]);

  const value = {
    products,
    filteredProducts,
    loading,
    error,
    brands,
    categories,
    filters,
    setFilters,
    clearFilters,
    getProductById,
    reload,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

// 🟢 Custom hook
export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductProvider");
  return ctx;
}
