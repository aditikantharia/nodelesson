import { useContext, useMemo, useState } from "react";
import { DataContext } from "../context/UserContext";
import { categories } from "../data/mockData";
import ProductCard from "../components/ProductCard";
import ShopLayout from "../components/ShopLayout";

const ProductsPage = () => {
  const { products, searchQuery, selectedCategory, setSelectedCategory } = useContext(DataContext);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <ShopLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Product Catalog</h1>
            <p className="mt-2 text-sm text-slate-600">Browse categories, filter offers, and find your next purchase.</p>
          </div>
          <button
            onClick={() => setShowFilters((current) => !current)}
            className="inline-flex items-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {showFilters && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-900 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
              <h2 className="text-xl font-semibold">No products found</h2>
              <p className="mt-2 text-sm">Try changing the search term or category.</p>
            </div>
          )}
        </div>
      </div>
    </ShopLayout>
  );
};

export default ProductsPage;
