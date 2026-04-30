import { Link } from "react-router-dom";
import { useContext } from "react";
import ShopLayout from "../components/ShopLayout";
import ProductCard from "../components/ProductCard";
import { DataContext } from "../context/UserContext";
import { banners, deals } from "../data/mockData";

const Home = () => {
  const { products } = useContext(DataContext);
  const featuredProducts = products.filter((product) => product.featured).slice(0, 4);

  return (
    <ShopLayout>
      <section className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors">
          <div className="space-y-4">
            <p className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-700 dark:bg-slate-800 dark:text-slate-300">Seasonal offers</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">Discover trending products and the latest deals.</h1>
            <p className="max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-400">ShopSphere gives you curated categories, top rated picks, and fast checkout for your next purchase.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/products" className="btn-primary rounded-3xl px-6 py-4 text-center dark:shadow-indigo-900/20">
              Browse products
            </Link>
            <Link to="/support" className="btn-secondary rounded-3xl px-6 py-4 text-center dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700">
              Support & info
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-sky-500 via-cyan-400 to-teal-400 p-6 text-white shadow-2xl dark:from-sky-900 dark:via-cyan-800 dark:to-teal-800">
            <div className="absolute inset-0 opacity-30 hero-overlay" />
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"
              alt="Shopping experience"
              className="relative mx-auto h-72 w-full rounded-3xl object-cover shadow-xl mix-blend-overlay dark:mix-blend-normal"
            />
            <div className="relative mt-5 space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-white/80">Trend Collection</p>
              <h2 className="text-3xl font-semibold">Elevate your shopping with premium style</h2>
              <p className="max-w-xl text-sm text-white/90">Browse curated products, top deals, and an elegant storefront designed for modern shoppers.</p>
            </div>
          </div>

          {banners.map((banner) => (
            <Link key={banner.id} to={banner.link} className={`block overflow-hidden rounded-3xl bg-linear-to-r ${banner.color} p-8 text-white shadow-lg transition hover:scale-105 dark:opacity-90`}>
              <p className="text-sm uppercase tracking-[0.25em] text-white/90">{banner.title}</p>
              <h2 className="mt-3 text-2xl font-semibold">{banner.description}</h2>
              <span className="mt-4 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm text-white">{banner.cta}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Featured products</p>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Popular picks</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-slate-900 hover:underline dark:text-slate-300">View all products</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {deals.map((deal) => (
          <div key={deal.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800 transition-colors">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{deal.title}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{deal.detail}</p>
          </div>
        ))}
      </section>
    </ShopLayout>
  );
};

export default Home;
