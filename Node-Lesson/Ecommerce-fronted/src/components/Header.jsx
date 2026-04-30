import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/UserContext";

const Header = () => {
  const { cart, wishlist, searchQuery, setSearchQuery, token, setToken, setCenterData, theme, toggleTheme } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setCenterData(null);
    navigate("/login");
  };

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Wishlist", to: "/wishlist", showCount: true },
    { label: "Support", to: "/support" },
    { label: "Admin", to: "/admin" },
  ];

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-md shadow-sm dark:bg-slate-900/90 dark:border-slate-800 transition-colors">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          ShopSphere
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative inline-flex items-center gap-2 text-sm font-medium transition ${
                  isActive ? "text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`
              }
            >
              {item.label}
              {item.showCount && wishlist.length > 0 ? (
                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-rose-700 dark:bg-rose-500/20 dark:text-rose-400">
                  {wishlist.length}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden sm:flex w-full max-w-xs items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products"
              className="ml-2 w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none dark:text-slate-200"
            />
          </div>

          <button 
            onClick={toggleTheme} 
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
            title="Toggle Theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <Link to="/cart" className="relative inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white">
            Cart
            <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-2 text-xs text-white dark:bg-slate-100 dark:text-slate-900">
              {totalItems}
            </span>
          </Link>

          {token ? (
            <button onClick={handleLogout} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
              Logout
            </button>
          ) : (
            <Link to="/login" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
