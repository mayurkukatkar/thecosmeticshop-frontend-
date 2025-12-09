import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Filter, ChevronDown, Lock, X, Star, Eye, Heart, ShoppingBag } from 'lucide-react';
import { CATEGORIES } from '../utils/categories';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Filter States
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState('All'); // All, 0-20, 20-50, 50+
    const [sortBy, setSortBy] = useState('newest'); // newest, price-low, price-high

    // Mobile Drawer State
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // Handle Query Params for initial category
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const catParam = params.get('category');
        if (catParam) {
            setSelectedCategory(catParam);
        }
    }, [location.search]);

    // Apply Filters and Sort
    useEffect(() => {
        let result = [...products];

        // 1. Filter by Category
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // 2. Filter by Price
        if (priceRange !== 'All') {
            if (priceRange === '0-20') result = result.filter(p => p.price <= 20);
            if (priceRange === '20-50') result = result.filter(p => p.price > 20 && p.price <= 50);
            if (priceRange === '50+') result = result.filter(p => p.price > 50);
        }

        // 3. Sort
        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        } else {
            // Newest logic (if backend sends createdAt, otherwise assumption)
        }

        setFilteredProducts(result);
    }, [products, selectedCategory, priceRange, sortBy]);

    const FilterContent = () => (
        <div className="space-y-8">
            {/* Category Filter */}
            <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Categories</h3>
                <div className="space-y-3">
                    <label className="flex items-center cursor-pointer group">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 transition ${selectedCategory === 'All' ? 'bg-brand-accent border-brand-accent' : 'border-gray-300 group-hover:border-brand-accent'}`}>
                            {selectedCategory === 'All' && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <input
                            type="radio"
                            name="category"
                            className="hidden"
                            checked={selectedCategory === 'All'}
                            onChange={() => setSelectedCategory('All')}
                        />
                        <span className={`text-sm ${selectedCategory === 'All' ? 'font-bold text-gray-900' : 'text-gray-600 group-hover:text-brand-accent'}`}>All Products</span>
                    </label>

                    {CATEGORIES.map(cat => (
                        <div key={cat.id} className="ml-1">
                            <div className={`flex items-center py-1 ${cat.isUpcoming ? 'opacity-50' : ''}`}>
                                <span className={`text-sm font-semibold ${cat.isUpcoming ? 'text-gray-400' : 'text-gray-800'}`}>
                                    {cat.name} {cat.isUpcoming && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded ml-2 border">SOON</span>}
                                </span>
                            </div>

                            {cat.subcategories && (
                                <div className="ml-3 mt-1 space-y-2 border-l-2 border-gray-100 pl-4">
                                    {cat.subcategories.map(sub => (
                                        <div key={sub.name}>
                                            {sub.isUpcoming ? (
                                                <div className="flex items-center text-gray-400 text-sm cursor-not-allowed py-1">
                                                    <Lock size={12} className="mr-2 opacity-70" />
                                                    {sub.name}
                                                </div>
                                            ) : (
                                                <label className="flex items-center cursor-pointer group py-1">
                                                    <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 transition ${selectedCategory === sub.value ? 'bg-brand-accent border-brand-accent' : 'border-gray-300 group-hover:border-brand-accent'}`}>
                                                        {selectedCategory === sub.value && <div className="w-2 h-2 bg-white rounded-full text-[10px]" />}
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name="category"
                                                        className="hidden"
                                                        checked={selectedCategory === sub.value}
                                                        onChange={() => setSelectedCategory(sub.value)}
                                                    />
                                                    <span className={`text-sm ${selectedCategory === sub.value ? 'font-bold text-brand-accent' : 'text-gray-600 group-hover:text-brand-accent'}`}>{sub.name}</span>
                                                </label>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Price Range</h3>
                <div className="space-y-3">
                    {['All', '0-20', '20-50', '50+'].map(range => (
                        <label key={range} className="flex items-center cursor-pointer group">
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 transition ${priceRange === range ? 'bg-brand-accent border-brand-accent' : 'border-gray-300 group-hover:border-brand-accent'}`}>
                                {priceRange === range && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <input
                                type="radio"
                                name="price"
                                className="hidden"
                                checked={priceRange === range}
                                onChange={() => setPriceRange(range)}
                            />
                            <span className={`text-sm ${priceRange === range ? 'font-bold text-gray-900' : 'text-gray-600 group-hover:text-brand-accent'}`}>
                                {range === 'All' ? 'All Prices' : range === '50+' ? '₹50+' : `₹${range}`}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-brand-cream font-sans">
            {/* Page Header */}
            <div className="bg-white border-b border-gray-100 py-12">
                <div className="container mx-auto px-4 text-center">
                    <span className="text-brand-accent font-bold tracking-widest text-sm uppercase mb-2 block">Premium Collection</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shop All Products</h1>
                    <p className="text-gray-500 max-w-lg mx-auto">Explore our curated selection of organic, cruelty-free beauty essentials designed to enhance your natural glow.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Mobile Filter Button */}
                <div className="md:hidden mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="flex items-center gap-2 font-bold text-gray-800"
                    >
                        <Filter size={20} /> Filters
                    </button>
                    <span className="text-sm text-gray-500 font-medium">{filteredProducts.length} Results</span>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden md:block w-1/4 h-fit sticky top-24">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <FilterContent />
                        </div>
                    </aside>

                    {/* Mobile Drawer (Slide-over) */}
                    {isMobileFilterOpen && (
                        <div className="fixed inset-0 z-50 flex md:hidden">
                            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
                            <div className="relative w-[300px] max-w-[80%] bg-white h-full shadow-2xl p-6 overflow-y-auto animate-slide-in-right">
                                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                                    <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                                    <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                                        <X size={24} className="text-gray-500" />
                                    </button>
                                </div>
                                <FilterContent />
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <button
                                        onClick={() => setIsMobileFilterOpen(false)}
                                        className="w-full bg-brand-accent text-white py-3 rounded-xl font-bold shadow-lg shadow-pink-200"
                                    >
                                        Show {filteredProducts.length} Results
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Product Grid Area */}
                    <div className="w-full md:w-3/4">
                        {/* Top Bar Sort (Desktop) */}
                        <div className="hidden md:flex justify-between items-center mb-8">
                            <span className="text-gray-500 font-medium">Showing {filteredProducts.length} results</span>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-gray-700">Sort by:</span>
                                <div className="relative group">
                                    <select
                                        className="appearance-none bg-white border border-gray-200 rounded-lg py-2.5 pl-4 pr-10 text-sm font-medium focus:outline-none focus:border-brand-accent shadow-sm cursor-pointer hover:border-brand-accent transition"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="newest">Newest Arrivals</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-gray-400 pointer-events-none group-hover:text-brand-accent transition" />
                                </div>
                            </div>
                        </div>

                        {/* Grid */}
                        {filteredProducts.length === 0 ? (
                            <div className="bg-white rounded-3xl p-12 text-center border dashed border-2 border-gray-200">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <ShoppingBag size={32} className="text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria.</p>
                                <button onClick={() => { setSelectedCategory('All'); setPriceRange('All'); }} className="text-brand-accent font-bold hover:underline">
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                                {filteredProducts.map(product => (
                                    <Link to={`/product/${product._id}`} key={product._id} className="group relative bg-white rounded-2xl cursor-pointer">
                                        <div className="relative h-[280px] overflow-hidden rounded-2xl bg-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                                            {/* Badges */}
                                            <div className="absolute top-3 left-3 flex gap-2">
                                                {product.price < 50 && <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm">SALE</span>}
                                                <span className="bg-white/90 backdrop-blur text-gray-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm">NEW</span>
                                            </div>

                                            {/* Quick Actions Overlay */}
                                            <div className="absolute inset-x-0 bottom-3 px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
                                                <button className="flex-1 bg-white/95 backdrop-blur text-gray-900 py-2.5 rounded-lg font-bold text-sm shadow-lg hover:bg-brand-accent hover:text-white transition flex items-center justify-center gap-2">
                                                    <Eye size={16} /> Quick View
                                                </button>
                                                <button className="w-10 h-10 bg-white/95 backdrop-blur text-gray-900 rounded-lg flex items-center justify-center shadow-lg hover:text-pink-500 transition">
                                                    <Heart size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-4 px-1 space-y-1">
                                            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{product.category}</p>
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-accent transition-colors truncate">{product.name}</h3>
                                            <div className="flex items-center gap-1.5 mb-2">
                                                <div className="flex text-yellow-400">
                                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
                                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                                                    <ShoppingBag size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
