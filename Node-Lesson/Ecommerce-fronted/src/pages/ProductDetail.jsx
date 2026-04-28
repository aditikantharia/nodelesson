import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../context/UserContext";
import ShopLayout from "../components/ShopLayout";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist } = useContext(DataContext);

  const product = products.find((item) => item.id === id);
  if (!product) {
    return (
      <ShopLayout>
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Product not found</h2>
          <p className="mt-2 text-sm text-slate-500">Please return to the catalog.</p>
        </div>
      </ShopLayout>
    );
  }

  const [imgSrc, setImgSrc] = useState(product.image || "/product-placeholder.svg");

  return (
    <ShopLayout>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <img
            src={imgSrc}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.onerror = null;
              setImgSrc("/product-placeholder.svg");
            }}
            className="h-96 w-full rounded-3xl object-cover"
          />
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-600">{product.category}</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">{product.offer}</span>
            </div>
            <h1 className="text-3xl font-semibold text-slate-900">{product.name}</h1>
            <p className="text-sm leading-7 text-slate-600">{product.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span>Rating: {product.rating} ★</span>
              <span>Stock: {product.stock}</span>
            </div>
          </div>
        </div>

        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm text-slate-500">Price</p>
            <p className="mt-2 text-4xl font-semibold text-slate-900">${product.price.toFixed(2)}</p>
          </div>
          <div className="space-y-3 rounded-3xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Delivery</p>
            <p className="text-sm text-slate-700">Usually delivered within 3-5 business days.</p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product);
                navigate("/cart");
              }}
              className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Add to Wishlist
            </button>
          </div>
        </aside>
      </div>
    </ShopLayout>
  );
};

export default ProductDetailPage;
