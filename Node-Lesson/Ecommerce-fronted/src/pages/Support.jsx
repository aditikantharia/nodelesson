import ShopLayout from "../components/ShopLayout";

const SupportPage = () => {
  return (
    <ShopLayout>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Support & Information</h1>
          <p className="mt-3 text-sm text-slate-600">Here to help with order questions, product details, and delivery support.</p>

          <div className="mt-8 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Customer support</h2>
              <p className="mt-2 text-sm text-slate-600">Email us at <a href="mailto:support@shopsphere.com" className="text-slate-900 underline">support@shopsphere.com</a> or call +1 800 123 4567.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Shipping & returns</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">Orders typically ship within 1-2 business days. Returns are accepted within 30 days of delivery for most products.</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Payment & security</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">We accept all major cards and keep your payment data secure with industry-standard protection.</p>
            </div>
          </div>
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Need help fast?</h2>
          <p className="mt-4 text-sm text-slate-600">Use these quick links to resolve common order issues.</p>
          <ul className="mt-6 space-y-4 text-sm text-slate-700">
            <li className="rounded-2xl bg-white p-4 shadow-sm">Track my order</li>
            <li className="rounded-2xl bg-white p-4 shadow-sm">Change shipping address</li>
            <li className="rounded-2xl bg-white p-4 shadow-sm">Report a damaged item</li>
            <li className="rounded-2xl bg-white p-4 shadow-sm">Ask a question</li>
          </ul>
        </aside>
      </div>
    </ShopLayout>
  );
};

export default SupportPage;
