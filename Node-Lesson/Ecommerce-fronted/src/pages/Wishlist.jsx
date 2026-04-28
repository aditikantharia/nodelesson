import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../context/UserContext";
import ShopLayout from "../components/ShopLayout";

const WishlistPage = () => {
  const { wishlist, addToCart, toggleWishlist } = useContext(DataContext);

  return (
    <ShopLayout>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Wishlist</h1>
          <p className="mt-2 text-sm text-slate-600">Save the items you love and move them to cart when ready.</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 shadow-sm">
            <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
            <p className="mt-3 text-sm">Browse products and tap the heart icon to save favorites.</p>
            <Link className="mt-6 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800" to="/products">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {wishlist.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "/product-placeholder.svg"}
                    alt={item.name}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = "/product-placeholder.svg";
                    }}
                    className="h-24 w-24 rounded-3xl object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-slate-900">{item.name}</h2>
                    <p className="text-sm text-slate-500">{item.category}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => addToCart(item)}
                    className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ShopLayout>
  );
};

export default WishlistPage;
