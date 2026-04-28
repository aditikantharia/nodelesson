import { useContext } from "react";
import { Link } from "react-router-dom";
import ShopLayout from "../components/ShopLayout";
import { DataContext } from "../context/UserContext";

const OrderConfirmationPage = () => {
  const { orders } = useContext(DataContext);
  const latestOrder = orders[orders.length - 1];

  return (
    <ShopLayout>
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
          ✓
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-slate-900">Order Confirmed</h1>
        <p className="mt-3 text-sm text-slate-600">Thank you for your purchase! Your order is being prepared and will ship soon.</p>

        {latestOrder ? (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left">
            <p className="text-sm text-slate-700">Order status: <span className="font-semibold text-slate-900">{latestOrder.status}</span></p>
            <p className="mt-2 text-sm text-slate-700">Order total: <span className="font-semibold text-slate-900">${latestOrder.total.toFixed(2)}</span></p>
            <div className="mt-4 space-y-2">
              {latestOrder.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3">
                  <span className="text-sm text-slate-700">{item.name}</span>
                  <span className="text-sm font-semibold text-slate-900">{item.quantity} × ${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-8 text-sm text-slate-500">No order data is available yet.</p>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800" to="/products">
            Continue Shopping
          </Link>
          <Link className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50" to="/account">
            View Order History
          </Link>
        </div>
      </div>
    </ShopLayout>
  );
};

export default OrderConfirmationPage;
