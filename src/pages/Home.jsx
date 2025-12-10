import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, CheckCircle, ShieldCheck, Truck, Lock, Star, Mail, Heart, Eye, Leaf, Droplet } from 'lucide-react';
import { CATEGORIES } from '../utils/categories';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [banners, setBanners] = useState([]);

    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const productsRef = React.useRef(null);
    const [isProductsVisible, setIsProductsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsProductsVisible(true);
                    observer.disconnect(); // Animate once
                }
            },
            { threshold: 0.1 }
        );

        if (productsRef.current) {
            observer.observe(productsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        };
        const fetchBanners = async () => {
            const { data } = await axios.get('/api/banners');
            setBanners(data.filter(b => b.isActive));
        };
        fetchProducts();
        fetchBanners();
    }, []);

    // Auto-slide effect
    useEffect(() => {
        if (banners.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners]);

    const nextBanner = () => {
        setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    };

    const prevBanner = () => {
        setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const currentBanner = banners.length > 0 ? banners[currentBannerIndex] : {
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?auto=format&fit=crop&q=80&w=1200&h=600',
        title: 'Glow Better. Every Day.',
        link: '/products',
        subtitle: 'New Collection 2024'
    };

    return (
        <div className="bg-brand-cream min-h-screen font-sans">
            {/* Hero Section */}
            <div className="relative min-h-[500px] md:min-h-[600px] w-full bg-gray-900 overflow-hidden group">
                {/* Background Slides */}
                {banners.length > 0 ? (
                    banners.map((banner, index) => (
                        <div
                            key={banner._id || index}
                            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentBannerIndex ? 'opacity-100' : 'opacity-0'}`}
                            style={{ backgroundImage: `url(${banner.image})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                        </div>
                    ))
                ) : (
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${currentBanner.image})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
                    </div>
                )}

                {/* Content */}
                <div className="relative container mx-auto px-6 md:px-12 h-full min-h-[500px] md:min-h-[600px] flex items-center text-white z-10">
                    <div className="max-w-3xl space-y-4 md:space-y-6 animate-fade-in-up pt-16 md:pt-0">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold drop-shadow-lg leading-tight">
                            {banners.length > 0 ? (
                                <>
                                    {currentBanner.title.split(' ').slice(0, 2).join(' ')} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-white">
                                        {currentBanner.title.split(' ').slice(2).join(' ')}
                                    </span>
                                </>
                            ) : (
                                <>Unlock Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-white">Inner Radiance</span></>
                            )}
                        </h1>
                        <p className="text-base md:text-lg lg:text-xl text-gray-200 font-light max-w-xl leading-relaxed">
                            {/* Static description for now as it's not in banner model usually, or use title if short */}
                            Discover our premium range of organic cosmetics designed to highlight your natural beauty.
                        </p>
                        <div className="pt-4">
                            <Link to={currentBanner.link || "/products"} className="group bg-white text-gray-900 px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold transition transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] inline-flex items-center gap-3">
                                Shop Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Navigation Controls */}
                {banners.length > 1 && (
                    <>
                        <button
                            onClick={prevBanner}
                            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition md:opacity-0 md:group-hover:opacity-100"
                        >
                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 rotate-180" />
                        </button>
                        <button
                            onClick={nextBanner}
                            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition md:opacity-0 md:group-hover:opacity-100"
                        >
                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                        </button>

                        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
                            {banners.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentBannerIndex(idx)}
                                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${idx === currentBannerIndex ? 'bg-brand-accent w-6 md:w-8' : 'bg-white/50 hover:bg-white'}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Features Grid (Trust Strip Redesign) */}
            <section className="py-12 md:py-16 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {[
                        { icon: Truck, title: "Free Shipping", desc: "On all orders over ₹999" },
                        { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure checkout process" },
                        { icon: Leaf, title: "100% Organic", desc: "Natural ingredients only" },
                        { icon: CheckCircle, title: "Easy Returns", desc: "Hassle-free 30 day returns" },
                    ].map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition duration-300">
                            <div className="p-3 bg-brand-pink/50 rounded-full text-brand-accent">
                                <feature.icon size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">{feature.title}</h3>
                                <p className="text-gray-500 text-sm mt-1">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 bg-white" ref={productsRef}>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-brand-accent font-bold tracking-wider uppercase text-sm">Trending</span>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2">Bestsellers</h2>
                        </div>
                        <Link to="/products" className="hidden md:flex items-center gap-2 text-gray-500 hover:text-brand-accent font-semibold transition group">
                            View All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {products.slice(0, 4).map((product, index) => (
                            <Link
                                to={`/product/${product._id}`}
                                key={product._id}
                                className={`group relative bg-white rounded-2xl cursor-pointer opacity-0 ${isProductsVisible ? 'animate-fade-in-up' : ''}`}
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="relative h-[300px] overflow-hidden rounded-2xl bg-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-300">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">NEW</span>
                                        {product.price > 50 && <span className="bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">HOT</span>}
                                    </div>

                                    {/* Quick Actions Overlay */}
                                    <div className="absolute inset-x-0 bottom-4 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
                                        <button className="flex-1 bg-white text-gray-900 py-3 rounded-lg font-bold shadow-lg hover:bg-brand-accent hover:text-white transition flex items-center justify-center gap-2">
                                            <Eye size={18} /> View Details
                                        </button>
                                        <button className="w-12 h-12 bg-white text-gray-900 rounded-lg flex items-center justify-center shadow-lg hover:text-pink-500 transition">
                                            <Heart size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-1">
                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{product.category}</p>
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-accent transition-colors truncate">{product.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="flex text-yellow-400">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                        </div>
                                        <span className="text-xs text-gray-400">(45)</span>
                                    </div>
                                    <p className="text-xl font-bold text-gray-900 mt-2">₹{product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link to="/products" className="btn-primary inline-flex items-center gap-2">
                            View All Products <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-brand-pink/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand-accent/5 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full filter blur-3xl translate-x-1/3 translate-y-1/3"></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-6">Why Choose The Cosmetic Shop?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
                        We blend nature's finest ingredients with modern science to create products that are safe, effective, and ethical.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
                        <div className="p-8 bg-white/60 backdrop-blur rounded-3xl border border-white shadow-sm hover:shadow-lg transition">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-6 transition">
                                <Leaf size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">100% Vegan & Cruelty Free</h3>
                            <p className="text-gray-500">No animals were harmed in the making of our products. Certified ethical.</p>
                        </div>
                        <div className="p-8 bg-white/60 backdrop-blur rounded-3xl border border-white shadow-sm hover:shadow-lg transition">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-2 hover:-rotate-4 transition">
                                <Droplet size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Dermatologically Tested</h3>
                            <p className="text-gray-500">Safe for all skin types. Rigorously tested for safety and efficacy.</p>
                        </div>
                        <div className="p-8 bg-white/60 backdrop-blur rounded-3xl border border-white shadow-sm hover:shadow-lg transition">
                            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-6 transition">
                                <Star size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Premium Ingredients</h3>
                            <p className="text-gray-500">Sourced from the finest locations around the world for maximum quality.</p>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;
