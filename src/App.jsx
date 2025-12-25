// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useTranslation } from 'react-i18next';

// Pages
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Checkout from "./pages/Checkout/Checkout";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Shop from "./pages/Shop/Shop";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout فيه Navbar و Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>

        {/* Layout بدون Navbar و Footer */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* صفحة الخطأ */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
