import React from 'react';
import { Leaf, Droplet, Star, Mail, Phone, Instagram, MapPin, CheckCircle, ShoppingBag, Globe, Heart } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-brand-cream min-h-screen font-sans">
            {/* Hero Section */}
            <div className="relative bg-gray-900 py-24 px-6 sm:px-12 text-center text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-30"></div>

                <div className="relative z-10 max-w-4xl mx-auto space-y-4 animate-fade-in-up">
                    <div className="inline-block p-3 bg-white/10 backdrop-blur-md rounded-full mb-4">
                        <ShoppingBag className="w-8 h-8 text-brand-accent" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        THE PRODUCT SHOP
                    </h1>
                    <p className="text-xl md:text-2xl text-pink-200 font-light tracking-wide uppercase">Quality You Can Trust</p>
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
                                    Our Mission: Delivering Excellence to Your Doorstep.
                                </p>
                                <p>
                                    <strong className="text-gray-900">THE PRODUCT SHOP</strong> was founded with a vision to simplify your shopping experience by providing a curated selection of high-quality products. We believe that shopping should be seamless, reliable, and enjoyable.
                                </p>
                                <p>
                                    At <strong className="text-gray-900">THE PRODUCT SHOP</strong>, we are dedicated to offering products that meet the highest standards of quality and value.
                                    <br />
                                    <span className="italic text-brand-accent font-medium block mt-2 border-l-4 border-brand-accent pl-4">
                                        CUSTOMER SATISFACTION IS OUR TOP PRIORITY.
                                    </span>
                                </p>
                                <p>
                                    We work with trusted suppliers and brands to ensure that every item you purchase from us is authentic and durable.
                                </p>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition duration-500">
                                <img
                                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
                                    alt="Our Shop"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="font-bold text-lg">Curated Selection</p>
                                    <p className="text-sm opacity-90">Just for you</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Values Section */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">✨ Why Choose Us</h2>
                        <p className="text-xl text-gray-600">What Sets Us Apart</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Value 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                    <Globe size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Standards</h3>
                                <p className="text-gray-600 mb-4">We adhere to international quality standards to bring you the best products available in the market.</p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                        <span><strong className="text-gray-800">Quality Assurance:</strong> Rigorous checks on all products.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                        <span><strong className="text-gray-800">Verified Suppliers:</strong> We partner only with reputable manufacturers.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-pink-100 text-brand-accent rounded-xl flex items-center justify-center mb-6">
                                    <Heart size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Centric</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-brand-accent mt-1 flex-shrink-0" />
                                        <span><strong className="text-gray-800">Excellent Support:</strong> We are here to help you at every step.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-brand-accent mt-1 flex-shrink-0" />
                                        <span><strong className="text-gray-800">Easy Returns:</strong> Hassle-free return policies for your peace of mind.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-brand-accent mt-1 flex-shrink-0" />
                                        <span><strong className="text-gray-800">Secure Payments:</strong> Your data is always safe with us.</span>
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
                            <p className="text-gray-300 mb-8">We'd love to hear from you. Reach out to us for any queries.</p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                                        <p className="font-semibold text-lg">info@theproductshop.in</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
                                        <p className="font-semibold text-lg">+91 1234567890</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <Instagram className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Instagram</p>
                                        <p className="font-semibold text-lg">@theproductshop</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 pt-4 border-t border-gray-700">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Address</p>
                                        <p className="font-medium text-gray-300 mt-1">
                                            123, Main Street, <br />
                                            City Center, State - 400001
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
                                            <td className="px-6 py-4 text-gray-900 font-medium">The Product Shop Pvt Ltd</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-500">Brand Name</td>
                                            <td className="px-6 py-4 text-gray-900 font-medium">THE PRODUCT SHOP</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-500">Email ID</td>
                                            <td className="px-6 py-4 text-gray-900 font-medium">info@theproductshop.in</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-500">Mobile Number</td>
                                            <td className="px-6 py-4 text-gray-900 font-medium">+91 1234567890</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-500">Instagram ID</td>
                                            <td className="px-6 py-4 text-brand-accent font-medium">@theproductshop</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-8 text-center">
                                <p className="text-brand-accent font-bold italic text-lg">
                                    "Discover happiness in every package!"
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
