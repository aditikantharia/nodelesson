import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/UserContext";

const Header = () => {
  const { cart, wishlist, searchQuery, setSearchQuery } = useContext(DataContext);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Wishlist", to: "/wishlist" },
    { label: "Support", to: "/support" },
    { label: "Account", to: "/account" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="text-xl font-semibold tracking-tight text-slate-900">
          ShopSphere
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900 ${
                isActive ? "border-slate-900 text-slate-900" : ""
              }`
            }
          >
            Wishlist
          </NavLink>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden sm:flex w-full max-w-xs items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products"
              className="ml-2 w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <Link to="/cart" className="relative inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900">
            Cart
            <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-slate-900 px-2 text-xs text-white">
              {cart.length}
            </span>
          </Link>

          <Link to="/login" className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
