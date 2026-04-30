import { useContext, useState } from "react";
import axios from "axios";
import ShopLayout from "../components/ShopLayout";
import { DataContext } from "../context/UserContext";

const AdminPanel = () => {
  const { products, setProducts, orders, token } = useContext(DataContext);
  const [activeTab, setActiveTab] = useState("products"); // 'products', 'add', 'orders'
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states for Add/Edit
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    stock: 10,
    rating: 0,
    featured: false,
    offer: ""
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const updateStock = async (id, delta) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const newStock = Math.max(0, product.stock + delta);
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/product/${id}`, 
        { ...product, stock: newStock },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(products.map(p => p.id === id ? { ...p, stock: newStock } : p));
    } catch (error) {
      alert("Failed to update stock: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/product/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(products.filter(p => p.id !== id));
        alert("Product deleted successfully!");
      } catch (error) {
        alert("Failed to delete product: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product.id);
    setForm(product);
    setActiveTab("add");
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    
    const productPayload = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      description: form.description,
      stock: Number(form.stock),
      images: form.image ? [form.image] : [],
      sku: "SKU-" + Date.now(), // Generate a unique SKU
      isNewProduct: form.featured,
      discount: parseInt(form.offer) || 0,
      brand: "Aura"
    };

    try {
      if (editingProduct) {
        // Update
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/product/${editingProduct}`, 
          productPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setProducts(products.map(p => p.id === editingProduct ? { 
          ...form, 
          price: Number(form.price), 
          stock: Number(form.stock), 
          rating: Number(form.rating) 
        } : p));
        alert("Product updated successfully!");
      } else {
        // Add
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/product/add`, 
          productPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        const backendProduct = response.data.product || {};
        
        const newProduct = {
          ...form,
          id: backendProduct._id || Date.now().toString(),
          price: Number(form.price),
          stock: Number(form.stock),
          rating: Number(form.rating)
        };
        setProducts([newProduct, ...products]);
        alert("Product added successfully!");
      }
      
      // Reset
      setEditingProduct(null);
      setForm({ name: "", category: "", price: "", description: "", image: "", stock: 10, rating: 0, featured: false, offer: "" });
      setActiveTab("products");
    } catch (error) {
      alert("Failed to save product: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <ShopLayout>
      <div className="space-y-8 pb-12 dark:text-slate-200">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors animate-fade-in">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Manage products, inventory, and user orders.</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-2xl dark:bg-slate-800">
            {["products", "add", "orders"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === "add") {
                    setEditingProduct(null);
                    setForm({ name: "", category: "", price: "", description: "", image: "", stock: 10, rating: 0, featured: false, offer: "" });
                  }
                }}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === tab ? "bg-white text-indigo-600 shadow-sm dark:bg-indigo-600 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`}
              >
                {tab === "add" && editingProduct ? "Edit Product" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-slide-up">
          {activeTab === "products" && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Inventory Management</h2>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full dark:bg-indigo-900/50 dark:text-indigo-300">{products.length} Products</span>
              </div>
              
              <div className="grid gap-6">
                {products.map((product) => (
                  <div key={product.id} className="grid gap-4 items-center rounded-3xl border border-slate-100 bg-slate-50 p-4 sm:p-6 lg:grid-cols-[auto_1fr_auto] dark:bg-slate-800/50 dark:border-slate-700 transition-all hover:shadow-md">
                    <img 
                      src={product.image || "/product-placeholder.svg"} 
                      alt={product.name} 
                      onError={(e) => e.currentTarget.src = "/product-placeholder.svg"}
                      className="h-24 w-24 rounded-2xl object-cover bg-white dark:bg-slate-800"
                    />
                    <div>
                      <div className="flex gap-2 items-center mb-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{product.name}</h3>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300">{product.category}</span>
                      </div>
                      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">${Number(product.price).toFixed(2)}</p>
                      
                      <div className="flex items-center gap-4 mt-4 bg-white p-2 rounded-xl border border-slate-200 inline-flex dark:bg-slate-900 dark:border-slate-700">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">Stock</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateStock(product.id, -1)} className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 dark:bg-rose-500/20 dark:text-rose-400">-</button>
                          <span className="font-mono font-bold w-6 text-center dark:text-white">{product.stock}</span>
                          <button onClick={() => updateStock(product.id, 1)} className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 font-bold hover:bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400">+</button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap lg:flex-col lg:justify-center">
                      <button onClick={() => handleEditClick(product)} className="flex-1 lg:flex-none px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-300 transition-colors dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="flex-1 lg:flex-none px-4 py-2 rounded-xl bg-rose-100 text-rose-700 font-bold text-sm hover:bg-rose-200 transition-colors dark:bg-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-900/50">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "add" && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
              <form onSubmit={handleSaveProduct} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Product Name</label>
                    <input required name="name" value={form.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Category</label>
                    <input required name="category" value={form.category} onChange={handleInputChange} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Price ($)</label>
                    <input required type="number" step="0.01" name="price" value={form.price} onChange={handleInputChange} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Initial Stock</label>
                    <input required type="number" name="stock" value={form.stock} onChange={handleInputChange} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Rating (0-5)</label>
                    <input required type="number" step="0.1" min="0" max="5" name="rating" value={form.rating} onChange={handleInputChange} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Image URL</label>
                  <input name="image" value={form.image} onChange={handleInputChange} placeholder="https://..." className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Description</label>
                  <textarea required name="description" value={form.description} onChange={handleInputChange} rows="3" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none transition-colors resize-none dark:bg-slate-800 dark:border-slate-700 dark:text-white"></textarea>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 items-center">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Offer Tag (e.g., "15% OFF")</label>
                    <input name="offer" value={form.offer} onChange={handleInputChange} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 outline-none transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleInputChange} className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800" />
                    <label htmlFor="featured" className="text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer">Featured Product</label>
                  </div>
                </div>

                <div className="pt-6">
                  <button type="submit" className="w-full rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-xl transition-all hover:bg-indigo-700 hover:-translate-y-1 active:scale-95">
                    {editingProduct ? "Update Product" : "Save New Product"}
                  </button>
                </div>
              </form>
            </section>
          )}

          {activeTab === "orders" && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Recent Orders</h2>
              {orders.length === 0 ? (
                <div className="text-center p-12 border-2 border-dashed border-slate-200 rounded-3xl dark:border-slate-700">
                  <p className="text-lg font-bold text-slate-600 dark:text-slate-400">No orders have been placed yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 flex flex-wrap items-center justify-between gap-6 dark:bg-slate-800/50 dark:border-slate-700">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-black text-slate-900 dark:text-white">Order #{order.id}</span>
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">{order.status}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Customer: <span className="text-slate-900 dark:text-white">{order.customer?.name}</span></p>
                        <p className="text-xs text-slate-500 mt-1 dark:text-slate-500">{order.items?.length || 0} items • {order.paymentMethod || "COD"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Total</p>
                        <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">${order.total?.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </ShopLayout>
  );
};

export default AdminPanel;
