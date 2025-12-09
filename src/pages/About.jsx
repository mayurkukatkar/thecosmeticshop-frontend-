import React from 'react';
import { Leaf, Droplet, Star, Mail, Phone, Instagram, MapPin, CheckCircle } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-brand-cream min-h-screen font-sans">
            {/* Hero Section */}
            <div className="relative bg-gray-900 py-24 px-6 sm:px-12 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-30"></div>

                <div className="relative z-10 max-w-4xl mx-auto space-y-4 animate-fade-in-up">
                    <div className="inline-block p-3 bg-white/10 backdrop-blur-md rounded-full mb-4">
                        <Leaf className="w-8 h-8 text-green-400" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        SK HANDMADE HERBAL COSMETICS
                    </h1>
                    <p className="text-xl md:text-2xl text-pink-200 font-light tracking-wide uppercase">The Touch of Nature</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 max-w-6xl">
                {/* Our Story Section */}
                <section className="mb-20">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2 space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900 relative inline-block">
                                Our Story
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-accent transform translate-y-2"></span>
                            </h2>
                            <div className="prose prose-lg text-gray-600">
                                <p className="font-semibold text-xl text-brand-accent">
                                    Our Belief: Purity is the Best Beauty.
                                </p>
                                <p>
                                    <strong className="text-gray-900">SK HANDMADE HERBAL COSMETICS</strong> was founded on a simple yet powerful conviction:
                                    your skin and hair deserve the finest, chemical-free care that nature offers. Through our brand,
                                    <strong className="text-gray-900"> THE COSMETIC SHOP</strong>, we are committed to pioneering an
                                    <strong className="text-green-600"> organic and natural revolution</strong> in personal care.
                                </p>
                                <p>
                                    At <strong className="text-gray-900">THE COSMETIC SHOP</strong>, every product we create is a promise:
                                    <br />
                                    <span className="italic text-brand-accent font-medium block mt-2 border-l-4 border-brand-accent pl-4">
                                        EVERY INGREDIENT CHOSEN WITH LOVE, PREPARED JUST FOR YOUR BEAUTY.
                                    </span>
                                </p>
                                <p>
                                    We use only the highest quality, <strong className="text-gray-800">natural, and certified organic ingredients</strong>.
                                    Each product assures safety, effectiveness, and uncompromising purity.
                                </p>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition duration-500">
                                <img
                                    src="https://images.unsplash.com/photo-1556228552-cabd36322693?auto=format&fit=crop&q=80&w=800"
                                    alt="Natural Ingredients"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="font-bold text-lg">Pure & Natural</p>
                                    <p className="text-sm opacity-90">Handcrafted with care</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Uniqueness Section */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">✨ Our Uniqueness</h2>
                        <p className="text-xl text-gray-600">Where Purity is Born</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* USP 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                                    <Droplet size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">The Secret of Herbal Distillation</h3>
                                <p className="text-gray-600 mb-4">Our biggest Unique Selling Proposition (USP) lies in our commitment to extracting the full potential of our ingredients:</p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <Leaf className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                        <span><strong className="text-gray-800">Focus on Potent Herbs:</strong> We concentrate on selecting only the finest herbs.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Leaf className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                        <span><strong className="text-gray-800">Steam Distillation Process:</strong> To capture the <strong>powerful properties</strong> effectively.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Leaf className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                        <span><strong className="text-gray-800">Pure Herbal Distillate:</strong> Incorporated into all formulations for deep, active essence.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* USP 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-pink-100 text-brand-accent rounded-xl flex items-center justify-center mb-6">
                                    <Star size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Exceptional Handmade Products</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-brand-accent mt-1 flex-shrink-0" />
                                        <span><strong className="text-gray-800">100% Chemical-Free:</strong> Free from Parabens, Sulphates, Synthetic Colors.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-brand-accent mt-1 flex-shrink-0" />
                                        <span><strong className="text-gray-800">Art of Handmade Soaps:</strong> Cold & Hot Process Soaps ensuring intense nourishment.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-brand-accent mt-1 flex-shrink-0" />
                                        <span><strong className="text-gray-800">Extensive Range:</strong> Hair Removal Wax, Oils, Shampoos, Facewashes, Body Butters, and more.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Get In Touch Section */}
                <section className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        <div className="p-10 bg-gray-900 text-white flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-6">👋 Get In Touch</h2>
                            <p className="text-gray-300 mb-8">We believe that trust comes from transparency. Reach out to us directly.</p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                                        <p className="font-semibold text-lg">info@thecosmeticshop.in</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
                                        <p className="font-semibold text-lg">7385452148</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <Instagram className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Instagram</p>
                                        <p className="font-semibold text-lg">@thecosmeticshop2024</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 pt-4 border-t border-gray-700">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Address</p>
                                        <p className="font-medium text-gray-300 mt-1">
                                            At - Gondi digras, Post - yenwa, <br />
                                            Tah- Katol, Dist-Nagpur- 441302
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 bg-gray-50 flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Company Details</h3>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <table className="w-full text-left">
                                    <tbody className="divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-500 w-1/3">Company Name</td>
                                            <td className="px-6 py-4 text-gray-900 font-medium">SK HANDMADE HERBAL COSMETICS</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-500">Brand Name</td>
                                            <td className="px-6 py-4 text-gray-900 font-medium">THE COSMETIC SHOP</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-500">Email ID</td>
                                            <td className="px-6 py-4 text-gray-900 font-medium">info@thecosmeticshop.in</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-500">Mobile Number</td>
                                            <td className="px-6 py-4 text-gray-900 font-medium">7385452148</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-500">Instagram ID</td>
                                            <td className="px-6 py-4 text-brand-accent font-medium">@thecosmeticshop2024</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-8 text-center">
                                <p className="text-brand-accent font-bold italic text-lg">
                                    "Explore our complete range today and experience the pure power of nature!"
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
