import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/UserContext";
import ShopLayout from "../components/ShopLayout";

const CheckoutPage = () => {
  const { cart, clearCart, createOrder } = useContext(DataContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", postal: "" });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [showQR, setShowQR] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const placeOrder = () => {
    if (!form.name || !form.email || !form.address || !form.city || !form.postal) {
      alert("Please fill in all shipping details.");
      return;
    }

    if (paymentMethod === "GPAY" && !showQR) {
      setShowQR(true);
      setCountdown(10);
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            executeOrder();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return;
    }

    executeOrder();
  };

  const executeOrder = () => {
    createOrder({
      customer: form,
      items: cart,
      total: subtotal + 9.99,
      status: "Pending",
      paymentMethod: paymentMethod,
    });
    setShowQR(false);
    navigate("/order-confirmation");
  };

  return (
    <ShopLayout>
      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Checkout</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Complete your order and confirm payment details.</p>

          <div className="mt-8 space-y-6">
            {/* Shipping Details */}
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 transition-all focus:shadow-md dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:border-indigo-400"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 transition-all focus:shadow-md dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:border-indigo-400"
              />
            </div>
            <div className="space-y-4">
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Shipping address"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 transition-all focus:shadow-md dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:border-indigo-400"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 transition-all focus:shadow-md dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:border-indigo-400"
                />
                <input
                  name="postal"
                  value={form.postal}
                  onChange={handleChange}
                  placeholder="Postal code"
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 transition-all focus:shadow-md dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:border-indigo-400"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 dark:text-white">Payment Method</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div 
                  onClick={() => setPaymentMethod("COD")}
                  className={`cursor-pointer rounded-2xl border-2 p-4 flex items-center gap-4 transition-all ${paymentMethod === "COD" ? "border-indigo-600 bg-indigo-50/50 shadow-md dark:bg-indigo-900/20" : "border-slate-200 bg-white hover:border-indigo-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-indigo-500"}`}
                >
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "COD" ? "border-indigo-600" : "border-slate-300 dark:border-slate-600"}`}>
                    {paymentMethod === "COD" && <div className="h-2.5 w-2.5 rounded-full bg-indigo-600"></div>}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800 dark:text-white">Cash on Delivery</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Pay when you receive</span>
                  </div>
                </div>

                <div 
                  onClick={() => setPaymentMethod("GPAY")}
                  className={`cursor-pointer rounded-2xl border-2 p-4 flex items-center gap-4 transition-all ${paymentMethod === "GPAY" ? "border-indigo-600 bg-indigo-50/50 shadow-md dark:bg-indigo-900/20" : "border-slate-200 bg-white hover:border-indigo-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-indigo-500"}`}
                >
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "GPAY" ? "border-indigo-600" : "border-slate-300 dark:border-slate-600"}`}>
                    {paymentMethod === "GPAY" && <div className="h-2.5 w-2.5 rounded-full bg-indigo-600"></div>}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800 dark:text-white">Google Pay</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Fast & secure UPI</span>
                  </div>
                </div>
              </div>
            </div>

            {paymentMethod === "GPAY" && (
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-2 dark:bg-slate-800 dark:border-slate-700">
                <div className="text-2xl mb-2">📱</div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Scan QR or enter UPI ID on the next step.</p>
                <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">GPay, PhonePe, and Paytm accepted.</p>
              </div>
            )}

            <button
              disabled={cart.length === 0}
              onClick={placeOrder}
              className="w-full rounded-2xl bg-indigo-600 px-5 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none disabled:transform-none dark:disabled:bg-slate-700"
            >
              {paymentMethod === "COD" ? "Place Order (COD)" : "Proceed to Pay"}
            </button>
          </div>
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors h-fit sticky top-28">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Order summary</h2>
          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 rounded-3xl bg-slate-50 p-4 dark:bg-slate-800 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Qty {item.quantity}</p>
                </div>
                <p className="text-sm text-slate-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:bg-slate-900 dark:border-slate-700 transition-colors">
              <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Shipping</span>
                <span>$9.99</span>
              </div>
              <div className="mt-4 border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900 dark:border-slate-700 dark:text-white transition-colors">
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span>${(subtotal + 9.99).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* GPay QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800 animate-zoom-in">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Scan to Pay</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Total Amount: ${(subtotal + 9.99).toFixed(2)}</p>
            
            <div className="mx-auto mt-8 flex aspect-square w-48 items-center justify-center rounded-2xl border-4 border-indigo-100 bg-white p-4 shadow-sm dark:border-slate-700">
              {/* Google Charts API for generating a simple QR Code */}
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=aura@okicici&pn=AuraStore&am=${(subtotal + 9.99).toFixed(2)}`} 
                alt="UPI QR Code"
                className="h-full w-full object-contain"
              />
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-3 text-slate-700 dark:text-slate-300">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
              <p className="text-sm font-semibold">
                Waiting for payment... <span className="text-indigo-600 dark:text-indigo-400">{countdown}s</span>
              </p>
            </div>
            
            <p className="mt-4 text-xs text-slate-400">Please do not close this window.</p>
          </div>
        </div>
      )}
    </ShopLayout>
  );
};

export default CheckoutPage;
