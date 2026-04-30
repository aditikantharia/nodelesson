import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../context/UserContext";
import ShopLayout from "../components/ShopLayout";

const CartPage = () => {
  const { cart, removeFromCart, updateCartQty } = useContext(DataContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <ShopLayout>
      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Shopping Cart</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Review your selected items before checkout.</p>
            </div>
            <Link to="/products" className="text-sm font-semibold text-slate-900 hover:underline dark:text-slate-300">Continue shopping</Link>
          </div>

          {cart.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center text-slate-600 dark:border-slate-700 dark:text-slate-400">
              <p className="text-lg font-semibold dark:text-slate-300">Your cart is empty</p>
              <p className="mt-3 text-sm">Add products to your cart from the catalog.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="grid gap-4 rounded-3xl border border-slate-200 p-4 md:grid-cols-[0.8fr_1.2fr_0.4fr] dark:border-slate-700 dark:bg-slate-800/50 transition-colors">
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
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{item.name}</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQty(item.id, item.quantity - 1)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-xl text-slate-700 dark:border-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        −
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-semibold text-slate-900 dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQty(item.id, item.quantity + 1)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-xl text-slate-700 dark:border-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="self-start rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-900/50 dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-900/40 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors h-fit sticky top-28">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Order Summary</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>Estimated shipping</span>
              <span>$9.99</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900 dark:border-slate-700 dark:text-white transition-colors">
              <span>Total</span>
              <span>${(subtotal + 9.99).toFixed(2)}</span>
            </div>
            <button
              disabled={cart.length === 0}
              onClick={() => navigate("/checkout")}
              className="w-full rounded-2xl bg-indigo-600 px-5 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none disabled:transform-none dark:disabled:bg-slate-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </aside>
      </div>
    </ShopLayout>
  );
};

export default CartPage;
