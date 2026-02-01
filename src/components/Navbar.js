"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full glass bg-white/80 dark:bg-black/60 border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-primary italic">
                            Daraz<span className="text-secondary dark:text-white tracking-tighter not-italic ml-1">BD</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 items-center justify-center px-8">
                        <div className="w-full max-w-lg relative">
                            <input
                                type="text"
                                placeholder="Search in Daraz BD..."
                                className="w-full bg-accent dark:bg-white/5 border-none rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-white/10 transition-all text-sm outline-none dark:text-white"
                            />
                            <button className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-primary">
                                <Search size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                            Home
                        </Link>
                        <Link href="/products" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                            Products
                        </Link>
                        <div className="flex items-center space-x-3 border-l border-gray-200 dark:border-white/10 pl-6">
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-3">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-white dark:bg-black border-b border-gray-200 dark:border-white/10 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            <div className="relative mb-4 mt-2">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-accent dark:bg-white/10 border-none rounded-lg py-2 pl-4 pr-10 text-sm outline-none dark:text-white"
                                />
                                <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
                            </div>
                            <Link
                                href="/"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-accent dark:hover:bg-white/5 hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/products"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-accent dark:hover:bg-white/5 hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                All Products
                            </Link>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
