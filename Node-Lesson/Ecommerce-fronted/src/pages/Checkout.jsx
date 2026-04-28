import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/UserContext";
import ShopLayout from "../components/ShopLayout";

const CheckoutPage = () => {
  const { cart, clearCart, createOrder } = useContext(DataContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", postal: "" });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const placeOrder = () => {
    if (!form.name || !form.email || !form.address || !form.city || !form.postal) {
      return;
    }

    createOrder({
      customer: form,
      items: cart,
      total: subtotal + 9.99,
      status: "Pending",
    });

    navigate("/order-confirmation");
  };

  return (
    <ShopLayout>
      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Checkout</h1>
          <p className="mt-2 text-sm text-slate-600">Complete your order and confirm payment details.</p>

          <div className="mt-8 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
              />
            </div>
            <div className="space-y-4">
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Shipping address"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
                />
                <input
                  name="postal"
                  value={form.postal}
                  onChange={handleChange}
                  placeholder="Postal code"
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-900"
                />
              </div>
            </div>

            <button
              disabled={cart.length === 0}
              onClick={placeOrder}
              className="w-full rounded-3xl bg-slate-900 px-5 py-4 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              Confirm order
            </button>
          </div>
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">Qty {item.quantity}</p>
                </div>
                <p className="text-sm text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="rounded-3xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                <span>Shipping</span>
                <span>$9.99</span>
              </div>
              <div className="mt-4 border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span>${(subtotal + 9.99).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </ShopLayout>
  );
};

export default CheckoutPage;
