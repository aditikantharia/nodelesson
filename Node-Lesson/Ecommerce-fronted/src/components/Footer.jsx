const Footer = () => {
  return (
    <footer className="border-t border-slate-200/70 bg-slate-50 py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">ShopSphere</h2>
          <p className="mt-1 text-sm text-slate-600">Modern shopping experience for all product categories.</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <a href="#" className="hover:text-slate-900">Privacy</a>
          <a href="#" className="hover:text-slate-900">Terms</a>
          <a href="#" className="hover:text-slate-900">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
