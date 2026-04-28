import Header from "./Header";
import Footer from "./Footer";

const ShopLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:px-8">{children}</main>
      <Footer />
    </div>
  );
};

export default ShopLayout;
