import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-green text-gray-300 pt-16 pb-8 mt-auto font-sans">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="inline-block mb-6">
                            <span className="text-2xl font-bold font-serif text-white tracking-tight">Chawke Fashion</span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Step into elegance with Chawke Fashion. Discover our premium collections of Banarasi silk sarees, designer kurtis, and royal lehengas crafted for the modern woman who cherishes her roots.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-colors">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 font-serif">Collections</h3>
                        <ul className="space-y-4">
                            <li><Link to="/products" className="hover:text-brand-gold transition-colors">All Collections</Link></li>
                            <li><Link to="/products?category=Sarees" className="hover:text-brand-gold transition-colors">Pure Silk Sarees</Link></li>
                            <li><Link to="/products?category=Kurtis & Tunics" className="hover:text-brand-gold transition-colors">Designer Kurtis</Link></li>
                            <li><Link to="/products?category=Lehengas" className="hover:text-brand-gold transition-colors">Bridal Lehengas</Link></li>
                            <li><Link to="/products" className="hover:text-brand-gold transition-colors">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 font-serif">Customer Care</h3>
                        <ul className="space-y-4">
                            <li><Link to="/profile" className="hover:text-brand-gold transition-colors">My Account</Link></li>
                            <li><Link to="/profile" className="hover:text-brand-gold transition-colors">Track Order</Link></li>
                            <li><a href="#" className="hover:text-brand-gold transition-colors">Shipping Policy</a></li>
                            <li><a href="#" className="hover:text-brand-gold transition-colors">Returns & Exchanges</a></li>
                            <li><a href="#" className="hover:text-brand-gold transition-colors">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 font-serif">Boutique</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin size={20} className="text-brand-gold mt-1 flex-shrink-0" />
                                <span>Chawke Fashion, Traditional Towers, 1st Floor, Mumbai, Maharashtra - 400001</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={20} className="text-brand-gold flex-shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={20} className="text-brand-gold flex-shrink-0" />
                                <span>info@chawkefashion.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Chawke Fashion. All rights reserved.</p>
                    <div className="flex items-center space-x-6">
                        <div className="flex space-x-2">
                            <span className="bg-white/5 px-2 py-1 rounded text-xs font-semibold">VISA</span>
                            <span className="bg-white/5 px-2 py-1 rounded text-xs font-semibold">MasterCard</span>
                            <span className="bg-white/5 px-2 py-1 rounded text-xs font-semibold">UPI</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
