"use client";

import { useState, useRef } from "react";
import { Plus, Trash2, Edit3, Save, X, Image as ImageIcon, Link as LinkIcon, DollarSign, FileText, CheckCircle2, Star, Lock, Eye, EyeOff, Upload, ArrowRight, Filter } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";

export default function AdminPage() {
    const { products, addProduct, deleteProduct, clearAllProducts } = useProducts();
    const categories = ["Electronics", "Gadgets", "Fashion", "Lifestyle", "Accessories", "Home & Kitchen", "Health & Beauty", "Other"];
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const [isAdding, setIsAdding] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const fileInputRef = useRef(null);

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        description: "",
        category: "Electronics",
        darazLink: "",
        images: []
    });

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === "taqi123taqi") {
            setIsAuthenticated(true);
            setLoginError(false);
        } else {
            setLoginError(true);
            setPassword("");
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const uploadPromises = files.map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(uploadPromises).then(results => {
                setNewProduct(prev => ({
                    ...prev,
                    images: [...prev.images, ...results]
                }));
            });
        }
    };

    const removeImage = (index) => {
        setNewProduct(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setIsPublishing(true);
        const product = {
            ...newProduct,
            price: Number(newProduct.price),
            images: newProduct.images.length > 0
                ? newProduct.images
                : ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"]
        };

        await addProduct(product);
        setIsPublishing(false);
        setIsAdding(false);
        setNewProduct({
            name: "",
            price: "",
            description: "",
            category: "Electronics",
            darazLink: "",
            images: []
        });

        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
        }
    };

    const fadeInUp = {
        initial: { y: 20, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0a0a0a] flex items-center justify-center p-4 transition-colors duration-300">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-md bg-white dark:bg-[#111] p-8 rounded-[2.5rem] card-shadow border border-transparent dark:border-white/5"
                >
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-primary">
                            <Lock size={40} />
                        </div>
                        <h1 className="text-3xl font-black text-secondary dark:text-white mb-2">Secure Access</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Please enter the admin password to continue.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Admin Password"
                                className={`w-full bg-accent dark:bg-white/5 border-2 ${loginError ? 'border-red-500/50' : 'border-transparent'} rounded-2xl py-4 px-6 outline-none focus:ring-4 focus:ring-primary/10 transition-all dark:text-white font-bold tracking-widest`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-[22px] text-gray-400 hover:text-primary transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {loginError && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-xs font-bold text-center"
                            >
                                Incorrect password. Please try again.
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-primary/30 flex items-center justify-center space-x-3"
                        >
                            <span>Unlock Dashboard</span>
                            <ArrowRight size={20} />
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-[#f8f9fa] dark:bg-[#0a0a0a] min-h-screen py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
                >
                    <div>
                        <h1 className="text-4xl font-extrabold text-secondary dark:text-white flex items-center gap-3">
                            Admin <span className="text-primary italic">Dashboard</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your Daraz BD product listings and affiliate links.</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {products.length > 0 && (
                            <button
                                onClick={clearAllProducts}
                                className="flex items-center space-x-2 bg-red-500/10 text-red-500 py-3 px-6 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                            >
                                <Trash2 size={20} />
                                <span>Clear All</span>
                            </button>
                        )}
                        <button
                            onClick={() => setIsAdding(true)}
                            className="flex items-center space-x-2 bg-primary text-white py-3 px-6 rounded-xl font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
                        >
                            <Plus size={20} />
                            <span>Add New Product</span>
                        </button>
                    </div>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    variants={{
                        initial: {},
                        whileInView: { transition: { staggerChildren: 0.1 } }
                    }}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                >
                    <motion.div
                        variants={fadeInUp}
                        className="bg-white dark:bg-[#111] p-6 rounded-2xl card-shadow flex items-center space-x-4 border border-transparent dark:border-white/5"
                    >
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl"><Plus size={24} /></div>
                        <div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Total Products</div>
                            <div className="text-2xl font-black text-secondary dark:text-white">{products.length}</div>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={fadeInUp}
                        className="bg-white dark:bg-[#111] p-6 rounded-2xl card-shadow flex items-center space-x-4 border border-transparent dark:border-white/5"
                    >
                        <div className="p-3 bg-orange-100 dark:bg-primary/20 text-primary rounded-xl"><ImageIcon size={24} /></div>
                        <div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Active Links</div>
                            <div className="text-2xl font-black text-secondary dark:text-white">{products.filter(p => p.darazLink).length}</div>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={fadeInUp}
                        className="bg-white dark:bg-[#111] p-6 rounded-2xl card-shadow flex items-center space-x-4 border border-transparent dark:border-white/5"
                    >
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl"><CheckCircle2 size={24} /></div>
                        <div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Live Status</div>
                            <div className="text-2xl font-black text-secondary dark:text-white">Healthy</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Add Product Modal */}
                <AnimatePresence>
                    {isAdding && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsAdding(false)}
                                className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="relative bg-white dark:bg-[#1a1a1a] w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-transparent dark:border-white/10"
                            >
                                <div className="p-8">
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-2xl font-black text-secondary dark:text-white">Add New Listing</h2>
                                        <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-accent dark:hover:bg-white/5 rounded-full text-gray-400 transition-colors">
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                        {/* Form Section */}
                                        <form onSubmit={handleAddProduct} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                                        <FileText size={14} /> Product Name
                                                    </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="e.g. Sony WH-1000XM4"
                                                        className="w-full bg-accent dark:bg-white/5 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                                                        value={newProduct.name}
                                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                                        <DollarSign size={14} /> Price (BDT)
                                                    </label>
                                                    <input
                                                        required
                                                        type="number"
                                                        placeholder="e.g. 25000"
                                                        className="w-full bg-accent dark:bg-white/5 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                                                        value={newProduct.price}
                                                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                                    <Filter size={14} /> Category
                                                </label>
                                                <select
                                                    required
                                                    className="w-full bg-accent dark:bg-white/5 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white appearance-none cursor-pointer"
                                                    value={newProduct.category}
                                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                                >
                                                    {categories.map(cat => (
                                                        <option key={cat} value={cat} className="dark:bg-[#1a1a1a]">{cat}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                                    <LinkIcon size={14} /> Daraz Affiliate Link
                                                </label>
                                                <input
                                                    required
                                                    type="url"
                                                    placeholder="https://www.daraz.com.bd/products/..."
                                                    className="w-full bg-accent dark:bg-white/5 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                                                    value={newProduct.darazLink}
                                                    onChange={(e) => setNewProduct({ ...newProduct, darazLink: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                                    <ImageIcon size={14} /> Images (Multiple)
                                                </label>
                                                <div className="flex gap-4 mb-4">
                                                    <div className="flex-1">
                                                        <input
                                                            type="text"
                                                            placeholder="Paste Image URL and press Enter..."
                                                            className="w-full bg-accent dark:bg-white/5 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    if (e.target.value) {
                                                                        setNewProduct(prev => ({
                                                                            ...prev,
                                                                            images: [...prev.images, e.target.value]
                                                                        }));
                                                                        e.target.value = '';
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <input
                                                            type="file"
                                                            multiple
                                                            accept="image/*"
                                                            className="hidden"
                                                            ref={fileInputRef}
                                                            onChange={handleImageUpload}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => fileInputRef.current.click()}
                                                            className="h-full px-6 bg-accent dark:bg-white/5 border-2 border-dashed border-gray-300 dark:border-white/10 rounded-xl flex items-center justify-center space-x-2 text-gray-500 hover:border-primary hover:text-primary transition-all"
                                                        >
                                                            <Upload size={18} />
                                                            <span className="text-sm font-bold">Upload Files</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Image Thumbnails Overlay */}
                                                <div className="flex flex-wrap gap-3">
                                                    {newProduct.images.map((img, idx) => (
                                                        <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-100 dark:border-white/10 group/img">
                                                            <img src={img} className="w-full h-full object-cover" alt="Thumb" />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeImage(idx)}
                                                                className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-red-500"
                                                            >
                                                                <X size={10} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                                    Description
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    placeholder="Describe the product features..."
                                                    className="w-full bg-accent dark:bg-white/5 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none dark:text-white"
                                                    value={newProduct.description}
                                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                                />
                                            </div>

                                            <div className="flex gap-4 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsAdding(false)}
                                                    className="flex-1 py-4 bg-accent dark:bg-white/5 text-secondary dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isPublishing}
                                                    className={`flex-1 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 ${isPublishing ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                >
                                                    {isPublishing ? (
                                                        <>
                                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                            <span>Publishing...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Save size={20} />
                                                            <span>Publish Listing</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>

                                        {/* Preview Section */}
                                        <div className="flex flex-col">
                                            <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                                <Eye size={14} /> Real-time Preview
                                            </div>
                                            <div className="flex-1 rounded-3xl bg-[#f8f9fa] dark:bg-black/20 border-2 border-dashed border-gray-200 dark:border-white/5 flex items-center justify-center p-8">
                                                <div className="w-[280px]">
                                                    <ProductCard
                                                        product={{
                                                            id: "preview",
                                                            name: newProduct.name || "Product Name Preview",
                                                            price: Number(newProduct.price) || 0,
                                                            images: newProduct.images.length > 0 ? newProduct.images : ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"],
                                                            rating: 5.0,
                                                            reviews: 0,
                                                            category: newProduct.category
                                                        }}
                                                    />
                                                    <p className="text-center text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-widest italic animate-pulse">Live Preview Mode</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Product Table */}
                <motion.div
                    {...fadeInUp}
                    className="bg-white dark:bg-[#111] rounded-3xl overflow-hidden card-shadow border border-transparent dark:border-white/5"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-accent/50 dark:bg-white/5 text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest border-b border-gray-100 dark:border-white/5">
                                    <th className="px-8 py-6">Product</th>
                                    <th className="px-8 py-6">Category</th>
                                    <th className="px-8 py-6">Price</th>
                                    <th className="px-8 py-6">Rating</th>
                                    <th className="px-8 py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-accent/20 dark:hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={product.images && product.images.length > 0 ? product.images[0] : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"}
                                                    className="w-12 h-12 rounded-lg object-cover bg-accent dark:bg-white/5"
                                                />
                                                <div>
                                                    <div className="font-bold text-secondary dark:text-gray-200 text-sm group-hover:text-primary transition-colors">{product.name}</div>
                                                    <div className="text-xs text-gray-400 dark:text-gray-600 truncate max-w-[200px]">{product.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 bg-accent dark:bg-white/5 rounded-full text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 font-bold text-secondary dark:text-gray-200">৳{product.price}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center text-yellow-500 gap-1">
                                                <Star size={14} fill="currentColor" />
                                                <span className="text-sm font-bold dark:text-gray-300">{product.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button className="p-2 text-gray-400 dark:text-gray-600 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
                                                    <Edit3 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 text-gray-400 dark:text-gray-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Floating Notification */}
                <AnimatePresence>
                    {showNotification && (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-secondary dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 pointer-events-none"
                        >
                            <div className="bg-green-500 rounded-full p-1"><CheckCircle2 size={16} className="text-white" /></div>
                            <span className="font-bold">Product added successfully!</span>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
