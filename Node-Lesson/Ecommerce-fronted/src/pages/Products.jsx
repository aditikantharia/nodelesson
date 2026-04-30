import { useContext, useMemo, useState } from "react";
import { DataContext } from "../context/UserContext";
import { categories } from "../data/mockData";
import ProductCard from "../components/ProductCard";
import ShopLayout from "../components/ShopLayout";

const ProductsPage = () => {
  const { products, searchQuery, selectedCategory, setSelectedCategory } = useContext(DataContext);
  const [showFilters, setShowFilters] = useState(false);
  const [priceSort, setPriceSort] = useState("none");
  const [maxPrice, setMaxPrice] = useState(1000);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price <= maxPrice;
      return matchesCategory && matchesQuery && matchesPrice;
    });

    if (priceSort === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (priceSort === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchQuery, selectedCategory, maxPrice, priceSort]);

  return (
    <ShopLayout>
      <div className="space-y-8 min-h-[85vh] bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 p-6 sm:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:bg-none dark:bg-slate-900 dark:border-slate-800 transition-colors">
        <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between dark:bg-slate-800 dark:border-slate-700">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Product Catalog</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Browse categories, filter offers, and find your next purchase.</p>
          </div>
          <button
            onClick={() => setShowFilters((current) => !current)}
            className="rounded-2xl px-5 py-2.5 font-bold text-white shadow-md transition-all hover:scale-105"
            style={{ background: "linear-gradient(to right, #3b82f6, #8b5cf6)" }}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {showFilters && (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    selectedCategory === category
                      ? "border-slate-900 bg-slate-900 text-white dark:bg-indigo-600 dark:border-indigo-600"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-900 hover:text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Max Price</h3>
                  <span className="font-bold text-slate-900 dark:text-white">${maxPrice}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sort By</h3>
                <div className="flex gap-3 flex-wrap">
                  {["none", "low-to-high", "high-to-low"].map((sortOption) => (
                    <button
                      key={sortOption}
                      onClick={() => setPriceSort(sortOption)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        priceSort === sortOption 
                          ? "bg-slate-900 text-white dark:bg-indigo-600" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                      }`}
                    >
                      {sortOption === "none" ? "Default" : sortOption === "low-to-high" ? "Price: Low to High" : "Price: High to Low"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
              <h2 className="text-xl font-semibold dark:text-white">No products found</h2>
              <p className="mt-2 text-sm">Try changing the search term or category.</p>
            </div>
          )}
        </div>
      </div>
    </ShopLayout>
  );
};

export default ProductsPage;
