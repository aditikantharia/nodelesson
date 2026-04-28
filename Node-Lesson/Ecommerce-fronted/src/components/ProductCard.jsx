import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DataContext } from "../context/UserContext";

const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist } = useContext(DataContext);
  const [imgSrc, setImgSrc] = useState(product.image || "/product-placeholder.svg");
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link to={`/products/${product.id}`}>
        <div className="relative h-52 overflow-hidden bg-slate-100">
          <img
            src={imgSrc}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.onerror = null;
              setImgSrc("/product-placeholder.svg");
            }}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`absolute right-3 top-3 rounded-full border p-2 text-sm transition ${
              isWishlisted ? "border-rose-500 bg-rose-50 text-rose-600" : "border-white bg-white/80 text-slate-700 hover:bg-slate-100"
            }`}
          >
            {isWishlisted ? "♥" : "♡"}
          </button>
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">{product.category}</span>
          {product.offer && <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">{product.offer}</span>}
        </div>
        <h3 className="text-base font-semibold text-slate-900">{product.name}</h3>
        <p className="text-sm text-slate-500 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
          <span>${product.price.toFixed(2)}</span>
          <span className="text-slate-500">{product.rating} ★</span>
        </div>
        <Link className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800" to={`/products/${product.id}`}>
          View Details
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
