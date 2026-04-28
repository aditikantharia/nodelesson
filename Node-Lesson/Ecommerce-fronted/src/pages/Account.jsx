import { useContext } from "react";
import { Link } from "react-router-dom";
import ShopLayout from "../components/ShopLayout";
import { DataContext } from "../context/UserContext";

const AccountPage = () => {
  const { centerData, orders } = useContext(DataContext);

  return (
    <ShopLayout>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Your Account</h1>
          <p className="mt-2 text-sm text-slate-600">Manage your profile, addresses, and order history.</p>

          <div className="mt-8 space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Profile</h2>
            {centerData ? (
              <div className="space-y-2 text-sm text-slate-700">
                <p><strong>Name:</strong> {centerData.username}</p>
                <p><strong>Email:</strong> {centerData.email}</p>
                <Link className="inline-flex rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800" to="/profile">
                  View profile
                </Link>
              </div>
            ) : (
              <p className="text-sm text-slate-600">You are not signed in. Please login to access account settings.</p>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-slate-900">Order history</h2>
            <div className="mt-4 space-y-4">
              {orders.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600 shadow-sm">
                  No orders yet. Start shopping to create your first order.
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Order #{order.id}</p>
                        <p className="text-sm text-slate-600">{order.date}</p>
                      </div>
                      <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">{order.status}</span>
                    </div>
                    <div className="mt-4 text-sm text-slate-700">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b border-slate-200 py-2 last:border-b-0">
                          <span>{item.name}</span>
                          <span>{item.quantity} × ${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm font-semibold text-slate-900">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Need to update?</h2>
            <p className="mt-3 text-sm text-slate-600">Go to your profile page to update your personal details or change your password.</p>
            <Link className="mt-5 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800" to="/edit-profile">
              Edit profile
            </Link>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Need help?</h2>
            <p className="mt-3 text-sm text-slate-600">Visit the support page for delivery and returns assistance.</p>
            <Link className="mt-5 inline-flex rounded-2xl border border-slate-900 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100" to="/support">
              Contact support
            </Link>
          </div>
        </aside>
      </div>
    </ShopLayout>
  );
};

export default AccountPage;
