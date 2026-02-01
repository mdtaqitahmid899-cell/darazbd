"use client";

import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, ShoppingBag, Zap, ShieldCheck, Truck, Shield, RotateCcw, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 8);

  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block">
              Ramadan Special
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Elevate Your <br />
              <span className="text-primary italic">Lifestyle.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              Discover the latest tech, fashion, and home essentials with Daraz BD's curated collection.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary/25">
                Shop Now
              </Link>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold transition-all border border-white/20">
                View Offers
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <motion.section
        {...fadeInUp}
        className="py-10 bg-white dark:bg-[#0f0f0f] border-b border-gray-100 dark:border-white/5 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Truck size={24} />, title: "Free Delivery", desc: "For orders over ৳500" },
              { icon: <Shield size={24} />, title: "Safe Payment", desc: "100% secure payment" },
              { icon: <RotateCcw size={24} />, title: "Easy Returns", desc: "7 days return policy" },
              { icon: <CheckCircle size={24} />, title: "Authentic", desc: "100% genuine products" },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <div className="text-primary bg-primary/10 p-3 rounded-2xl">{feature.icon}</div>
                <div>
                  <h3 className="font-bold text-sm dark:text-gray-200">{feature.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <section className="py-20 bg-[#f8f9fa] dark:bg-[#0a0a0a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-secondary dark:text-white uppercase tracking-tighter">
                Featured <span className="text-primary">Deals</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-500 mt-2 font-medium">Handpicked premium products just for you.</p>
            </div>
            <Link href="/products" className="group flex items-center space-x-2 text-primary font-bold hover:underline">
              <span>View All</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-[#111] rounded-2xl h-[380px] animate-pulse border border-transparent dark:border-white/5 overflow-hidden">
                  <div className="h-48 bg-gray-200 dark:bg-white/5" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-white/5 rounded" />
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-white/5 rounded" />
                    <div className="h-10 w-full bg-gray-200 dark:bg-white/5 rounded-xl pt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {featuredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={{
                    initial: { y: 40, opacity: 0 },
                    whileInView: { y: 0, opacity: 1 }
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-white/5 rounded-[3rem] border border-dashed border-gray-200 dark:border-white/10">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-500">No products available yet.</h3>
              <p className="text-gray-400 mt-2">Check back soon for amazing deals!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA / Newsletter */}
      <motion.section
        {...fadeInUp}
        className="py-20 bg-white dark:bg-[#0a0a0a] transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary dark:bg-[#111] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden card-shadow">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -ml-32 -mb-32" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Join the <span className="text-primary italic">Daraz</span> Exclusive Club</h2>
              <p className="text-gray-400 dark:text-gray-500 mb-10 text-lg">Subscribe to receive updates, access to exclusive deals, and more.</p>

              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow bg-white/10 dark:bg-white/5 border border-white/20 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                />
                <button className="bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary/25">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
