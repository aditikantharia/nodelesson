import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../context/UserContext";
import ShopLayout from "../components/ShopLayout";

const WishlistPage = () => {
  const { wishlist, products, addToCart, toggleWishlist } = useContext(DataContext);

  const wishlistProducts = useMemo(() => {
    const productMap = new Map(products.map((product) => [product.id, product]));
    return wishlist
      .map((item) => productMap.get(item.id))
      .filter(Boolean);
  }, [wishlist, products]);

  const isWishlistEmpty = wishlistProducts.length === 0;

  return (
    <ShopLayout>
      <div className="space-y-8">
        <section className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700">
                <span className="text-base">♥</span>
                Wishlist
              </div>
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900">Collection Wishlist</h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-600">
                  Show the "Add To Wishlist" icon on the catalog page and keep your favorite products in one place.
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-500">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Saved items</p>
              <p className="mt-1 text-3xl font-semibold text-slate-900">{wishlistProducts.length}</p>
            </div>
          </div>
        </section>

        {isWishlistEmpty ? (
          <div className="rounded-4xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Your wishlist is empty</h2>
            <p className="mt-3 text-sm">Add products from the catalog to see them here.</p>
            <Link className="btn-primary mt-6 rounded-2xl px-6 py-3 text-sm font-semibold" to="/products">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-3">
            {wishlistProducts.map((item) => (
              <article key={item.id} className="group overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="relative overflow-hidden bg-slate-100">
                  <img
                    src={item.image || "/product-placeholder.svg"}
                    alt={item.name}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = "/product-placeholder.svg";
                    }}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => toggleWishlist(item)}
                    className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-sm transition hover:bg-white"
                  >
                    <span className="text-rose-500">♥</span>
                    Loved
                  </button>
                </div>

                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
                    <span className="rounded-full bg-slate-100 px-3 py-1 uppercase tracking-[0.18em] text-slate-600">{item.category || "Category"}</span>
                    <span className="text-slate-500">${item.price?.toFixed(2) ?? "0.00"}</span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-slate-900">{item.name}</h2>
                    <p className="text-sm leading-6 text-slate-500 line-clamp-2">{item.description || "A curated favorite from your collection."}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => addToCart(item)}
                      className="btn-primary inline-flex min-w-40 items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="btn-secondary inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold"
                    >
                      <span className="text-rose-500">♥</span>
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </ShopLayout>
  );
};

export default WishlistPage;
