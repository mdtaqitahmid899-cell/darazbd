import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-secondary text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand section */}
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-bold text-primary italic">
                            Daraz<span className="text-white tracking-tighter not-italic ml-1">BD</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your premium destination for the best products on Daraz. We curate and suggest high-quality items for your convenience as an official partner.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/groups/907316175173778/" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
                        </div>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Customer Care</h3>
                        <ul className="space-y-3">
                            <li><Link href="https://buyer-helpcenter.daraz.com.bd/" className="text-gray-400 hover:text-white text-sm transition-colors">Help Center</Link></li>
                        </ul>
                    </div>

                    {/* Daraz Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link href="/home" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link></li>
                            <li><Link href="/products" className="text-gray-400 hover:text-white text-sm transition-colors">All Products</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin className="text-primary flex-shrink-0 mt-1" size={18} />
                                <span className="text-gray-400 text-sm">Dhaka, Bangladesh</span>
                            </li>

                            <li className="flex items-center space-x-3">
                                <Mail className="text-primary flex-shrink-0" size={18} />
                                <span className="text-gray-400 text-sm">https://www.daraz.com.bd/</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 mt-8 text-center sm:flex sm:justify-between sm:items-center">
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} Daraz BD. Created with ❤️ by Md Taqi Tahmid.
                    </p>
                    <div className="mt-4 sm:mt-0 flex justify-center space-x-6">
                    </div>
                </div>
            </div>
        </footer>
    );
}
