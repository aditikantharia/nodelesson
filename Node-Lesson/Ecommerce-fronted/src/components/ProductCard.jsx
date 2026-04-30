import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DataContext } from "../context/UserContext";

const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist } = useContext(DataContext);
  const [imgSrc, setImgSrc] = useState(product.image || "/product-placeholder.svg");
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <article className="group flex flex-col h-full overflow-hidden rounded-3xl border-2 border-indigo-100 bg-gradient-to-br from-white to-purple-50 shadow-md transition hover:-translate-y-2 hover:shadow-xl hover:border-indigo-300 dark:bg-none dark:bg-slate-900 dark:border-slate-800 dark:hover:border-indigo-500">
      <Link to={`/products/${product.id}`}>
        <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
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
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`absolute right-3 top-3 rounded-full border p-2 text-sm transition-all ${
              isWishlisted ? "border-rose-500 bg-rose-50 text-rose-600 animate-bounce dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/50" : "border-white bg-white/80 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            {isWishlisted ? "♥" : "♡"}
          </button>
        </div>
      </Link>
      <div className="flex flex-col flex-1 p-5 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 dark:bg-slate-800 dark:text-slate-400">{product.category}</span>
          {product.offer && <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">{product.offer}</span>}
        </div>
        <h3 className="text-base font-bold text-slate-900 line-clamp-1 mb-1 dark:text-white">{product.name}</h3>
        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed dark:text-slate-400">{product.description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between text-sm font-black text-slate-900 mb-4 dark:text-white">
            <span className="text-lg">${product.price.toFixed(2)}</span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg dark:bg-slate-800 dark:text-slate-400">{product.rating} ★</span>
          </div>
          <Link className="flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95 dark:shadow-indigo-900/20" style={{ background: "linear-gradient(to right, #6366f1, #d946ef)" }} to={`/products/${product.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
