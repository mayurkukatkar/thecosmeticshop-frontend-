import React from 'react';
import { Mail, Phone, Instagram, MapPin, CheckCircle, ShoppingBag, Globe, Heart } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-brand-cream min-h-screen font-sans">
            {/* Hero Section */}
            <div className="relative bg-brand-green py-24 px-6 sm:px-12 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-[#03251D] to-brand-green opacity-95"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>

                <div className="relative z-10 max-w-4xl mx-auto space-y-4 animate-fade-in-up">
                    <div className="inline-block p-3 bg-white/10 backdrop-blur-md rounded-full mb-4">
                        <ShoppingBag className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-serif text-white">
                        CHAWKE FASHION
                    </h1>
                    <p className="text-xl md:text-2xl text-brand-pink font-light tracking-wide uppercase font-serif">Weaving Tradition with Elegance</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 max-w-6xl">
                {/* Our Story Section */}
                <section className="mb-20">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2 space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900 relative inline-block font-serif">
                                Our Legacy
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold transform translate-y-2"></span>
                            </h2>
                            <div className="prose prose-lg text-gray-600">
                                <p className="font-semibold text-xl text-brand-green font-serif">
                                    Crafting Handloom Masterpieces for Generations.
                                </p>
                                <p>
                                    <strong className="text-gray-900">Chawke Fashion</strong> was founded with a passion to bring the rich heritage of Indian handlooms and traditional weaves to the global stage. We believe that ethnic attire is not just clothing, but an art form that represents our culture and traditions.
                                </p>
                                <p>
                                    At <strong className="text-gray-900">Chawke Fashion</strong>, we work directly with skilled weavers and artisans across the country to produce authentic, premium-quality sarees, designer kurtis, and wedding lehengas that display exceptional craftsmanship.
                                    <br />
                                    <span className="italic text-brand-maroon font-medium block mt-2 border-l-4 border-brand-gold pl-4 font-serif">
                                        EVERY THREAD TELLS A STORY OF EXPERT CRAFTSMANSHIP.
                                    </span>
                                </p>
                                <p>
                                    We promise our customers absolute authenticity, high-quality fabrics, and unique designs that seamlessly blend classic styles with contemporary tastes.
                                </p>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition duration-500">
                                <img
                                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800"
                                    alt="Chawke Fashion Saree Crafting"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="font-bold text-lg font-serif">Fine Banarasi Silks</p>
                                    <p className="text-sm opacity-90">Handcrafted just for you</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Values Section */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">✨ The Chawke Promise</h2>
                        <p className="text-xl text-gray-600">Why Shop with Us</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Value 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/30 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-brand-pink text-brand-green rounded-xl flex items-center justify-center mb-6">
                                    <Globe size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Artisanal Sourcing</h3>
                                <p className="text-gray-600 mb-4">We support weaver communities directly, preserving age-old craftsmanship and ensuring ethical compensation.</p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-brand-gold mt-1 flex-shrink-0" />
                                        <span><strong className="text-gray-800">100% Genuine:</strong> Certifications for silk and handloom origins.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-brand-gold mt-1 flex-shrink-0" />
                                        <span><strong className="text-gray-800">Master Weavers:</strong> Collaborating with national-award-winning artisans.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/30 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-brand-pink text-brand-green rounded-xl flex items-center justify-center mb-6">
                                    <Heart size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Exquisite Customization</h3>
                                <p className="text-gray-600 mb-4">We provide tailored fits and design advice to help you look your best on your special day.</p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-brand-gold mt-1 flex-shrink-0" />
                                        <span><strong className="text-gray-800">Custom Fit Blouses:</strong> Bespoke measurements for sarees.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-brand-gold mt-1 flex-shrink-0" />
                                        <span><strong className="text-gray-800">Secure Payments & Shipping:</strong> Express global delivery.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Get In Touch Section */}
                <section className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        <div className="p-10 bg-brand-green text-white flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-6 font-serif">👋 Get In Touch</h2>
                            <p className="text-gray-300 mb-8">We'd love to hear from you. Visit our boutique or call us.</p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-gold">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                                        <p className="font-semibold text-lg">info@chawkefashion.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-gold">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
                                        <p className="font-semibold text-lg">+91 98765 43210</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-gold">
                                        <Instagram className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Instagram</p>
                                        <p className="font-semibold text-lg">@chawkefashion</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-brand-gold">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Boutique Address</p>
                                        <p className="font-medium text-gray-300 mt-1">
                                            Chawke Fashion, Traditional Towers,<br />
                                            1st Floor, Mumbai, Maharashtra - 400001
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 bg-gray-50 flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">Brand Registry</h3>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <table className="w-full text-left">
                                    <tbody className="divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-500 w-1/3">Company Name</td>
                                            <td className="px-6 py-4 text-gray-900 font-medium font-serif">Chawke Fashion Private Limited</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-500">Brand Label</td>
                                            <td className="px-6 py-4 text-brand-green font-bold font-serif">CHAWKE FASHION</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-500">Official Email</td>
                                            <td className="px-6 py-4 text-gray-900 font-medium">info@chawkefashion.com</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-500">Support Line</td>
                                            <td className="px-6 py-4 text-gray-900 font-medium">+91 98765 43210</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-500">Instagram Handle</td>
                                            <td className="px-6 py-4 text-brand-maroon font-semibold">@chawkefashion</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-8 text-center">
                                <p className="text-brand-gold font-bold italic text-lg font-serif">
                                    "Woven with love, worn with pride!"
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
