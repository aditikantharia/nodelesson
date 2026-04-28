import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { products as mockProducts } from "../data/mockData";

export const DataContext = createContext();

const UserContext = ({ children }) => {
  const [centerData, setCenterData] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState(mockProducts);

  useEffect(() => {
    if (centerData) {
      localStorage.setItem("user", JSON.stringify(centerData));
    } else {
      localStorage.removeItem("user");
    }
  }, [centerData]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (!token) {
      const savedCart = localStorage.getItem("cart");
      setCart(savedCart ? JSON.parse(savedCart) : []);
      const savedWishlist = localStorage.getItem("wishlist");
      setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
      return;
    }

    const fetchCartAndWishlist = async () => {
      try {
        const cartResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const backendCart = cartResponse.data.cart?.items || [];
        setCart(
          backendCart.map((item) => ({
            id: item.productId,
            name: item.productName || "",
            image: item.productImage || "/product-placeholder.svg",
            price: item.productPrice ?? 0,
            quantity: item.quantity,
            category: item.category || "",
          })),
        );
      } catch (error) {
        console.warn("Unable to load backend cart", error?.response?.data || error.message);
      }

      try {
        const wishlistResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/wishlist/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const backendWishlist = wishlistResponse.data.wishlist?.productIds || [];
        setWishlist(
          backendWishlist.map((item) => ({
            id: item.productId,
            name: item.productName || "",
            image: item.productImage || "/product-placeholder.svg",
            category: item.category || "",
            price: item.price ?? 0,
          })),
        );
      } catch (error) {
        console.warn("Unable to load backend wishlist", error?.response?.data || error.message);
      }
    };

    fetchCartAndWishlist();
  }, [token]);

  useEffect(() => {
    if (!token) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, token]);

  useEffect(() => {
    if (!token) return;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const backendProducts = response.data.products || [];

        if (backendProducts.length > 0) {
          setProducts(
            backendProducts.map((product) => ({
              id: product._id,
              name: product.name,
              category: product.category,
              description: product.description,
              price: product.price,
              stock: product.stock,
              rating: product.rating ?? 4.5,
              image: product.images?.[0] || "/product-placeholder.svg",
              offer: product.discount ? `${product.discount}% OFF` : "",
            })),
          );
        }
      } catch (error) {
        console.warn("Unable to load backend products", error?.response?.data || error.message);
      }
    };

    fetchProducts();
  }, [token]);

  useEffect(() => {
    if (!token) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, token]);

  const addToCart = async (product) => {
    if (token) {
      try {
        const item = { productId: product.id, quantity: 1 };
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/cart/add`,
          { item },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const backendCart = response.data.cart?.items || [];
        setCart(
          backendCart.map((cartItem) => ({
            id: cartItem.productId,
            name: cartItem.productName || "",
            image: cartItem.productImage || "/product-placeholder.svg",
            price: cartItem.productPrice ?? 0,
            quantity: cartItem.quantity,
            category: cartItem.category || "",
          })),
        );
        return;
      } catch (error) {
        console.warn("Cart backend failed", error?.response?.data || error.message);
      }
    }

    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = async (id) => {
    if (token) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/product/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart((prev) => prev.filter((item) => item.id !== id));
        return;
      } catch (error) {
        console.warn("Cart remove backend failed", error?.response?.data || error.message);
      }
    }

    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQty = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const toggleWishlist = async (product) => {
    if (token) {
      try {
        const item = { productId: product.id };
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/wishlist/add`,
          { item },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const backendWishlist = response.data.wishlist?.productIds || [];
        setWishlist(
          backendWishlist.map((item) => ({
            id: item.productId,
            name: item.productName || "",
            image: item.productImage || "/product-placeholder.svg",
            category: item.category || "",
            price: item.price ?? 0,
          })),
        );
        return;
      } catch (error) {
        console.warn("Wishlist backend failed", error?.response?.data || error.message);
      }
    }

    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const clearCart = () => setCart([]);

  const createOrder = (orderInfo) => {
    const newOrder = {
      id: `${Date.now()}`,
      date: new Date().toLocaleDateString(),
      ...orderInfo,
    };

    setOrders((prev) => [...prev, newOrder]);
    clearCart();
    setProducts((prev) =>
      prev.map((product) => {
        const purchased = orderInfo.items.find((item) => item.id === product.id);
        if (!purchased) return product;
        return { ...product, stock: Math.max(0, product.stock - purchased.quantity) };
      }),
    );
  };

  return (
    <DataContext.Provider
      value={{
        centerData,
        setCenterData,
        token,
        setToken,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        wishlist,
        toggleWishlist,
        orders,
        createOrder,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        products,
        setProducts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default UserContext;
