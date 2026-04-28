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
        <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="space-y-4">
            <p className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-700">Seasonal offers</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Discover trending products and the latest deals.</h1>
            <p className="max-w-3xl text-base leading-7 text-slate-600">ShopSphere gives you curated categories, top rated picks, and fast checkout for your next purchase.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/products" className="rounded-3xl bg-slate-900 px-6 py-4 text-center text-sm font-semibold text-white hover:bg-slate-800">
              Browse products
            </Link>
            <Link to="/support" className="rounded-3xl border border-slate-200 px-6 py-4 text-center text-sm font-semibold text-slate-900 hover:bg-slate-50">
              Support & info
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {banners.map((banner) => (
            <Link key={banner.id} to={banner.link} className={`block overflow-hidden rounded-3xl bg-gradient-to-r ${banner.color} p-8 text-white shadow-lg transition hover:scale-[1.01]`}>
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
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Featured products</p>
            <h2 className="text-2xl font-semibold text-slate-900">Popular picks</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-slate-900 hover:underline">View all products</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {deals.map((deal) => (
          <div key={deal.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{deal.title}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{deal.detail}</p>
          </div>
        ))}
      </section>
    </ShopLayout>
  );
};

export default Home;
