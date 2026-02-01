"use client";

import { useState, useMemo } from "react";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";
import { Search, SlidersHorizontal, ChevronDown, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductsPage() {
    const { products, loading } = useProducts();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = useMemo(() => {
        return ["All", ...new Set(products.map(p => p.category))];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    const fadeInUp = {
        initial: { y: 40, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    return (
        <main className="bg-[#f8f9fa] dark:bg-[#0a0a0a] min-h-screen py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-black text-secondary dark:text-white uppercase tracking-tighter">
                        Our <span className="text-primary">Products</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-500 mt-2 font-medium">Browse our collection of high-quality items.</p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    {...fadeInUp}
                    className="max-w-2xl mb-8 relative"
                >
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search for products, categories, or descriptions..."
                        className="w-full bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-2xl py-4 pl-14 pr-4 outline-none focus:ring-4 focus:ring-primary/10 transition-all dark:text-white card-shadow text-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </motion.div>

                {/* Awesome Category Filter */}
                <motion.div
                    {...fadeInUp}
                    className="mb-12 flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar"
                >
                    <div className="flex-shrink-0 flex items-center gap-2 text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest text-[10px] mr-2">
                        <Filter size={14} /> Filter By
                    </div>
                    <div className="flex gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${selectedCategory === cat
                                    ? "text-white"
                                    : "bg-white dark:bg-[#111] text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 border border-gray-100 dark:border-white/5"
                                    }`}
                            >
                                {selectedCategory === cat && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/30"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
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
                ) : filteredProducts.length > 0 ? (
                    <motion.div
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                        variants={{
                            initial: {},
                            whileInView: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={{
                                    initial: { y: 30, opacity: 0 },
                                    whileInView: { y: 0, opacity: 1 }
                                }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 bg-white dark:bg-[#111] rounded-3xl card-shadow border border-gray-100 dark:border-white/5"
                    >
                        <div className="bg-accent dark:bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search size={40} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">No products found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                            className="mt-6 text-primary font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
