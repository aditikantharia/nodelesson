import { useContext } from "react";
import ShopLayout from "../components/ShopLayout";
import { DataContext } from "../context/UserContext";

const AdminPanel = () => {
  const { products, setProducts, orders } = useContext(DataContext);

  const updateStock = (id, delta) => {
    setProducts(products.map((product) => {
      if (product.id === id) {
        return { ...product, stock: Math.max(0, product.stock + delta) };
      }
      return product;
    }));
  };

  return (
    <ShopLayout>
      <div className="space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Admin Panel</h1>
          <p className="mt-2 text-sm text-slate-600">Control inventory, view orders, and manage stock levels.</p>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Inventory management</h2>
          <div className="mt-6 grid gap-4">
            {products.map((product) => (
              <div key={product.id} className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[1fr_0.9fr]">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">Category: {product.category}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">Stock: {product.stock}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => updateStock(product.id, 1)}
                    className="rounded-2xl bg-emerald-900 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                  >
                    + Stock
                  </button>
                  <button
                    onClick={() => updateStock(product.id, -1)}
                    className="rounded-2xl bg-rose-900 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-800"
                  >
                    - Stock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Orders</h2>
          {orders.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600">No orders have been placed yet.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-900">Order #{order.id}</span>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">{order.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">Total: ${order.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </ShopLayout>
  );
};

export default AdminPanel;
