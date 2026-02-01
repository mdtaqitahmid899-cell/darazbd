"use client";

import { use, useState, useEffect } from "react";
import { useProducts } from "@/context/ProductContext";
import { notFound } from "next/navigation";
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCcw, Share2, ExternalLink, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailPage({ params }) {
    const { id } = use(params);
    const { products, loading, addReview } = useProducts();
    const [activeImage, setActiveImage] = useState(0);
    const [isReviewing, setIsReviewing] = useState(false);
    const [newReview, setNewReview] = useState({ user: "", rating: 5, comment: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const product = products.find(p => p.id === id);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!newReview.user || !newReview.comment) return;

        setIsSubmitting(true);
        try {
            await addReview(id, newReview);
            setIsReviewing(false);
            setNewReview({ user: "", rating: 5, comment: "" });
        } catch (error) {
            console.error("Failed to add review:", error);
            alert("Failed to submit review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] dark:bg-[#0a0a0a]">
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-gray-500 font-bold animate-pulse">Loading Product Details...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        notFound();
    }

    const images = product?.images || [];

    // Ensure multiple images exist for the UI demonstration
    const productImages = images.length > 0 ? images : [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
        "https://images.unsplash.com/photo-1555529669-2269763671c0?w=800&q=80",
        "https://images.unsplash.com/photo-1555529771-7888de833d47?w=800&q=80"
    ];

    const fadeInUp = {
        initial: { y: 20, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#f8f9fa] dark:bg-[#0a0a0a] min-h-screen py-12 transition-colors duration-300"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <motion.nav
                    {...fadeInUp}
                    className="flex mb-8 text-sm font-medium text-gray-500 dark:text-gray-400 overflow-x-auto whitespace-nowrap"
                >
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
                    <span className="mx-2">/</span>
                    <span className="text-secondary dark:text-gray-200">{product.category}</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-400 dark:text-gray-600 truncate max-w-[200px]">{product.name}</span>
                </motion.nav>

                <motion.div
                    {...fadeInUp}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white dark:bg-[#111] rounded-3xl card-shadow overflow-hidden border border-transparent dark:border-white/5"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12">

                        {/* Image Gallery */}
                        <motion.div
                            {...fadeInUp}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-accent dark:bg-white/5 border border-gray-100 dark:border-white/5 group">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeImage}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                        src={productImages[activeImage]}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </AnimatePresence>

                            </div>

                            <div className="flex space-x-4">
                                {productImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImage(index)}
                                        className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === index ? "border-primary ring-2 ring-primary/20 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            {...fadeInUp}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col"
                        >
                            <div className="mb-6">
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
                                        Official Daraz Partner
                                    </span>
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                        In Stock
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-secondary dark:text-white mb-4 leading-tight">
                                    {product.name}
                                </h1>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-300 dark:text-gray-700"} />
                                        ))}
                                        <span className="text-sm font-bold text-secondary dark:text-gray-200 ml-2">{product.rating}</span>
                                    </div>
                                    <span className="text-gray-300 dark:text-gray-700">|</span>
                                    <button className="text-sm text-primary font-medium hover:underline">{product.reviewCount || 0} Reviews</button>
                                    <span className="text-gray-300 dark:text-gray-700">|</span>
                                    <button className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors">
                                        <Share2 size={16} />
                                        <span className="text-sm">Share</span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-accent/50 dark:bg-white/5 p-6 rounded-2xl mb-8 border border-transparent dark:border-white/5">
                                <div className="flex items-baseline space-x-3 mb-2">
                                    <span className="text-4xl font-black text-primary italic font-serif">৳{product.price}</span>
                                    <span className="text-gray-400 dark:text-gray-600 line-through text-lg">৳{Math.floor(product.price * 1.3)}</span>
                                    <span className="text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/20 px-2 rounded text-sm">-30%</span>
                                </div>
                                <p className="text-xs text-gray-400 dark:text-gray-500 italic">Price may vary depending on active promotions on Daraz.</p>
                            </div>

                            <div className="space-y-6 mb-8">
                                <h3 className="font-bold text-secondary dark:text-gray-200">Description</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {product.description} This premium product offers exceptional value and quality.
                                    Designed for those who appreciate the finer details in {product.category.toLowerCase()} products.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent dark:border-white/5">
                                    <Truck className="text-primary" size={20} />
                                    <div className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Fast Shipping</div>
                                </div>
                                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent dark:border-white/5">
                                    <ShieldCheck className="text-primary" size={20} />
                                    <div className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">1 Year warranty</div>
                                </div>
                                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-transparent dark:border-white/5">
                                    <RefreshCcw className="text-primary" size={20} />
                                    <div className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">7 Days Return</div>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10">
                                {product.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <a
                                    href={product.darazLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center space-x-3 bg-primary hover:bg-primary-hover text-white py-4 px-8 rounded-2xl font-black text-lg transition-all shadow-xl shadow-primary/30 group"
                                >
                                    <span>Buy on Daraz Official</span>
                                    <ExternalLink size={18} />
                                </a>
                            </div>

                            {/* Reviews Section */}
                            <div className="mt-12 pt-12 border-t border-gray-100 dark:border-white/5">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-2xl font-black text-secondary dark:text-white">Customer Reviews</h3>
                                    <button
                                        onClick={() => setIsReviewing(!isReviewing)}
                                        className="bg-accent dark:bg-white/5 text-secondary dark:text-gray-300 font-bold py-2 px-6 rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-all text-sm"
                                    >
                                        {isReviewing ? "Cancel" : "Write a Review"}
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {isReviewing && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden mb-12"
                                        >
                                            <form onSubmit={handleSubmitReview} className="bg-accent/30 dark:bg-white/5 p-8 rounded-3xl border border-dashed border-gray-200 dark:border-white/10 space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Your Name</label>
                                                        <input
                                                            required
                                                            type="text"
                                                            placeholder="e.g. Abdullah Hasan"
                                                            className="w-full bg-white dark:bg-[#1a1a1a] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white text-sm"
                                                            value={newReview.user}
                                                            onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Rating</label>
                                                        <select
                                                            className="w-full bg-white dark:bg-[#1a1a1a] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white text-sm appearance-none cursor-pointer"
                                                            value={newReview.rating}
                                                            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                                                        >
                                                            {[5, 4, 3, 2, 1].map(num => (
                                                                <option key={num} value={num}>{num} Stars</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Your Comment</label>
                                                    <textarea
                                                        required
                                                        rows={3}
                                                        placeholder="What did you think of this product?"
                                                        className="w-full bg-white dark:bg-[#1a1a1a] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none dark:text-white text-sm"
                                                        value={newReview.comment}
                                                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                                    />
                                                </div>
                                                <button
                                                    disabled={isSubmitting}
                                                    type="submit"
                                                    className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all flex items-center justify-center space-x-2"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                            <span>Submitting...</span>
                                                        </>
                                                    ) : (
                                                        <span>Submit Review</span>
                                                    )}
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {product.reviews && product.reviews.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {product.reviews.map((review, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="bg-white dark:bg-white/5 p-6 rounded-3xl border border-gray-100 dark:border-white/5 relative overflow-hidden group"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <div className="font-bold text-secondary dark:text-white flex items-center gap-2">
                                                            {review.user}
                                                            <CheckCircle2 size={12} className="text-primary" />
                                                        </div>
                                                        <div className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-widest">
                                                            {new Date(review.date).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-lg">
                                                        <Star size={12} fill="currentColor" />
                                                        <span className="text-xs font-black ml-1">{review.rating}</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic">"{review.comment}"</p>

                                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:scale-110" />
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-accent/50 dark:bg-white/5 rounded-[3rem] border border-dashed border-gray-200 dark:border-white/10">
                                        <div className="w-16 h-16 bg-white dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 dark:border-white/5">
                                            <Star size={24} className="text-gray-300" />
                                        </div>
                                        <h4 className="font-bold text-secondary dark:text-white mb-2">No reviews yet</h4>
                                        <p className="text-gray-500 text-sm">Be the first to share your experience!</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
