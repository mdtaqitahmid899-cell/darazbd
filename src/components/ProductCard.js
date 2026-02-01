"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductCard({ product }) {
    const [discount, setDiscount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        setDiscount(Math.floor(Math.random() * 30 + 10));
    }, []);

    const images = product?.images || ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"];

    // Cycle images on hover
    useEffect(() => {
        if (isHovered && images.length > 1) {
            const interval = setInterval(() => {
                setImageIndex((prev) => (prev + 1) % images.length);
            }, 1500);
            return () => clearInterval(interval);
        } else {
            setImageIndex(0);
        }
    }, [isHovered, images.length]);

    return (
        <motion.div
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ y: -5 }}
            className="group bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 flex flex-col h-full border border-transparent dark:border-white/5"
        >
            <Link href={`/products/${product.id}`} className="relative h-48 overflow-hidden bg-accent dark:bg-white/5">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={imageIndex}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        src={images[imageIndex]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </AnimatePresence>

                {/* Image Indicators */}
                {images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                        {images.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 rounded-full transition-all duration-300 ${i === imageIndex ? "w-4 bg-primary" : "w-1 bg-white/40"}`}
                            />
                        ))}
                    </div>
                )}

                {discount > 0 && (
                    <div className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">
                        -{discount}%
                    </div>
                )}
            </Link>

            <div className="p-4 flex flex-col flex-grow">
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-sm font-medium text-secondary dark:text-gray-200 line-clamp-2 hover:text-primary transition-colors cursor-pointer mb-2">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center space-x-1 mb-2">
                    <div className="flex items-center text-yellow-400">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-300 dark:text-gray-700">|</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{product.reviewCount} sold</span>
                </div>

                <div className="mt-auto">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-primary font-bold text-lg">৳{product.price}</span>
                        <span className="text-gray-400 dark:text-gray-600 line-through text-xs">৳{Math.floor(product.price * 1.3)}</span>
                    </div>

                    <Link href={`/products/${product.id}`} className="mt-3 w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-accent dark:bg-white/5 text-secondary dark:text-gray-300 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-xs font-semibold">
                        <span>View Details</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
