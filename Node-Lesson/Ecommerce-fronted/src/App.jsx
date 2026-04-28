import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmation";
import WishlistPage from "./pages/Wishlist";
import SupportPage from "./pages/Support";
import AccountPage from "./pages/Account";
import AdminPanel from "./pages/AdminPanel";
import LoginPage from "./pages/Login";
import JoinUsPage from "./pages/JoinUs";
import ProfilePage from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/joinus" element={<JoinUsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
