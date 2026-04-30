import Header from "./Header";
import Footer from "./Footer";

const ShopLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-layout-bg text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 dark:!bg-none">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-hero-glow blur-3xl opacity-100 dark:opacity-20" />
      <div className="pointer-events-none absolute left-0 top-24 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-900/20" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-900/20" />
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:px-8 relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default ShopLayout;
