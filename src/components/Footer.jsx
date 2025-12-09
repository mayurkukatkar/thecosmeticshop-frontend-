import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-auto font-sans">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="inline-block mb-6">
                            <span className="text-2xl font-bold text-white tracking-tight">TheCosmeticShop</span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Discover your inner radiance with our premium collection of organic and scientifically formulated beauty products.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="https://www.instagram.com/thecosmeticshop2024" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Shop</h3>
                        <ul className="space-y-4">
                            <li><Link to="/products" className="hover:text-brand-accent transition-colors">All Products</Link></li>
                            <li><Link to="/products?category=Painless Wax Powder" className="hover:text-brand-accent transition-colors">Wax Powder</Link></li>
                            <li><Link to="/products?category=Shampoo" className="hover:text-brand-accent transition-colors">Organic Shampoo</Link></li>
                            <li><Link to="/products?category=Soaps" className="hover:text-brand-accent transition-colors">Handmade Soaps</Link></li>
                            <li><Link to="/products" className="hover:text-brand-accent transition-colors">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Support</h3>
                        <ul className="space-y-4">
                            <li><Link to="/profile" className="hover:text-brand-accent transition-colors">My Account</Link></li>
                            <li><Link to="/profile" className="hover:text-brand-accent transition-colors">Track Order</Link></li>
                            <li><a href="#" className="hover:text-brand-accent transition-colors">Shipping Policy</a></li>
                            <li><a href="#" className="hover:text-brand-accent transition-colors">Returns & Exchanges</a></li>
                            <li><a href="#" className="hover:text-brand-accent transition-colors">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin size={20} className="text-brand-accent mt-1 flex-shrink-0" />
                                <span>At - Gondi digras, Post - yenwa, Tah- Katol, Dist-Nagpur- 441302</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={20} className="text-brand-accent flex-shrink-0" />
                                <span>+91 7385452148</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={20} className="text-brand-accent flex-shrink-0" />
                                <span>info@thecosmeticshop.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} The Cosmetic Shop. All rights reserved.</p>
                    <div className="flex items-center space-x-6">
                        <div className="flex space-x-2">
                            {/* Placeholder generic payment icons or text */}
                            <span className="bg-gray-800 px-2 py-1 rounded text-xs font-semibold">VISA</span>
                            <span className="bg-gray-800 px-2 py-1 rounded text-xs font-semibold">MasterCard</span>
                            <span className="bg-gray-800 px-2 py-1 rounded text-xs font-semibold">UPI</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
