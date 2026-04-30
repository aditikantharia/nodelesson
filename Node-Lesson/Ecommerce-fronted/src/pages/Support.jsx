import { useState } from "react";
import ShopLayout from "../components/ShopLayout";

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping usually takes 3-5 business days. Express shipping options are available at checkout for 1-2 day delivery."
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day return policy for all unworn and unwashed items with tags attached. Refunds are processed within 5-7 business days after we receive the item."
  },
  {
    q: "Do you ship internationally?",
    a: "Yes! We ship to over 50 countries worldwide. International shipping costs and delivery times vary by destination."
  },
  {
    q: "How can I track my order?",
    a: "Once your order ships, you will receive a confirmation email with a tracking number. You can also view your order status in your account dashboard."
  }
];

const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <ShopLayout>
      <div className="space-y-12 pb-12 dark:text-slate-200">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-[3rem] bg-indigo-600 px-6 py-24 text-center shadow-xl animate-zoom-in">
          <div className="absolute inset-0 bg-hero-glow opacity-50 mix-blend-overlay"></div>
          <div className="relative z-10 mx-auto max-w-2xl">
            <h1 className="text-4xl font-black text-white sm:text-5xl md:text-6xl drop-shadow-md">
              How can we help?
            </h1>
            <p className="mt-6 text-lg font-medium text-indigo-100 sm:text-xl">
              Search our knowledge base or get in touch with our friendly support team.
            </p>
            <div className="mt-8 flex justify-center">
              <input 
                type="text" 
                placeholder="Search for answers..." 
                className="w-full max-w-md rounded-full border-none bg-white/20 px-6 py-4 text-white placeholder-indigo-200 backdrop-blur-md outline-none ring-2 ring-white/50 focus:bg-white/30 focus:ring-white transition-all shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] px-2 sm:px-6">
          
          {/* FAQ Section */}
          <section className="space-y-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <span className="text-4xl">📚</span> Frequently Asked Questions
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">Everything you need to know about the product and billing.</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 dark:bg-slate-800 dark:border-slate-700 cursor-pointer ${openFaq === index ? 'ring-2 ring-indigo-500 shadow-md' : 'hover:border-indigo-300 hover:shadow-md'}`}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{faq.q}</h3>
                    <span className={`text-indigo-500 transition-transform duration-300 text-xl font-bold ${openFaq === index ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <aside className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-xl dark:bg-slate-800 dark:border-slate-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-indigo-50 dark:bg-indigo-900/20"></div>
              
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white relative z-10">Send us a message</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 relative z-10">Our team typically responds within 2 hours.</p>
              
              <form className="mt-8 space-y-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe" 
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:focus:border-indigo-400 transition-all"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</label>
                  <input 
                    type="email" 
                    placeholder="jane@example.com" 
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:focus:border-indigo-400 transition-all"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Message</label>
                  <textarea 
                    rows="4"
                    placeholder="How can we help?" 
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:focus:border-indigo-400 transition-all resize-none"
                  ></textarea>
                </div>
                <button className="w-full rounded-2xl bg-slate-900 px-5 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-600 hover:shadow-xl hover:-translate-y-1 active:scale-95 dark:bg-indigo-600 dark:hover:bg-indigo-500">
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="mt-8 flex items-center gap-4 rounded-3xl bg-indigo-50 p-6 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-sm dark:bg-slate-800">
                💬
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Live Chat</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Available 24/7 for immediate assistance.</p>
              </div>
            </div>
          </aside>
          
        </div>
      </div>
    </ShopLayout>
  );
};

export default SupportPage;
