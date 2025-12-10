import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { Star, Truck, ShieldCheck, Heart, Share2, Plus, Minus, ArrowRight, Check, Droplets, Sparkles, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('overview');
    const [activeImage, setActiveImage] = useState('');
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
                // Set initial image (prefer explicit image field, fallback to first in images array)
                setActiveImage(data.image || (data.images && data.images.length > 0 ? data.images[0] : ''));

                // Fetch related products
                const allProducts = await axios.get('/api/products');
                const related = allProducts.data
                    .filter(p => p.category === data.category && p._id !== data._id)
                    .slice(0, 4);
                setRelatedProducts(related);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center bg-brand-cream">
            <div className="w-16 h-16 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const handleAddToCart = () => {
        if (product.countInStock === 0) {
            toast.error("Sorry, this item is out of stock");
            return;
        }
        addToCart(product, quantity);
        toast.success(
            <div className="flex items-center gap-2">
                <span className="font-bold">Added to Cart!</span>
                <span className="text-sm">Great choice.</span>
            </div>
        );
    };

    const handleBuyNow = () => {
        if (product.countInStock === 0) {
            toast.error("Sorry, this item is out of stock");
            return;
        }
        addToCart(product, quantity);
        navigate('/checkout');
    };

    // Calculate discount percentage
    const discount = product.originalPrice && product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    // Parse Benefits (assuming comma or newline separated)
    const benefitsList = product.benefits
        ? product.benefits.split(',').map(b => b.trim()).filter(b => b)
        : [];

    // Combine main image and gallery images for thumbnails
    const galleryImages = [product.image, ...(product.images || [])].filter((v, i, a) => v && a.indexOf(v) === i); // Unique images

    return (
        <div className="min-h-screen bg-brand-cream font-sans py-12">
            <div className="container mx-auto px-4">
                {/* Breadcrumbs */}
                <div className="flex items-center text-sm text-gray-500 mb-8 space-x-2">
                    <Link to="/" className="hover:text-brand-accent">Home</Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-brand-accent">Shop</Link>
                    <span>/</span>
                    <span className="text-brand-text font-semibold">{product.name}</span>
                </div>

                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
                    {/* Left: Image Gallery */}
                    <div className="lg:w-1/2 p-6 md:p-12 bg-gray-50 flex flex-col items-center justify-center relative">
                        <div className="relative w-full aspect-square max-w-[500px] mb-4 md:mb-6 rounded-2xl overflow-hidden shadow-sm bg-white">
                            <img src={activeImage} alt={product.name} className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-105" />
                            {discount > 0 && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    -{discount}% OFF
                                </div>
                            )}
                            <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:text-red-500 transition text-gray-400">
                                <Heart size={20} />
                            </button>
                        </div>

                        {/* Thumbnails */}
                        {galleryImages.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 w-full justify-start md:justify-center px-4 no-scrollbar">
                                {galleryImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all ${activeImage === img ? 'border-brand-accent scale-105 shadow-md' : 'border-transparent hover:border-gray-300'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Details */}
                    <div className="lg:w-1/2 p-8 md:p-12 flex flex-col">
                        <div className="mb-2">
                            <span className="text-brand-accent font-bold tracking-wider uppercase text-xs bg-brand-pink/50 px-3 py-1 rounded-full">
                                {product.brand || product.category}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 mt-2 font-serif">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex text-yellow-500">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" className={i <= 4 ? "text-yellow-400" : "text-gray-300"} />)}
                            </div>
                            <span className="text-gray-500 text-sm font-medium hover:text-brand-accent cursor-pointer">Read Reviews</span>
                            <div className="h-4 w-px bg-gray-300 mx-2"></div>
                            <span className={`${product.countInStock > 0 ? "text-green-600" : "text-red-500"} text-sm font-semibold flex items-center gap-1`}>
                                {product.countInStock > 0 ? <Check size={14} /> : <AlertCircle size={14} />}
                                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>

                        <div className="flex items-baseline gap-4 mb-8">
                            <div className="text-4xl font-bold text-gray-900">₹{product.price}</div>
                            {product.originalPrice > product.price && (
                                <div className="text-xl text-gray-400 line-through">₹{product.originalPrice}</div>
                            )}
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8 text-lg border-b border-gray-100 pb-8">
                            {product.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                                <Truck size={20} className="text-brand-accent mt-1" />
                                <div>
                                    <h4 className="font-bold text-sm text-gray-900">Free Delivery</h4>
                                    <p className="text-xs text-gray-500">Orders over ₹500</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                                <ShieldCheck size={20} className="text-brand-accent mt-1" />
                                <div>
                                    <h4 className="font-bold text-sm text-gray-900">Authentic</h4>
                                    <p className="text-xs text-gray-500">100% Original</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <div className="flex items-center gap-4 mb-8">
                            </div>
                            <div className="grid grid-cols-5 gap-3">
                                <div className="col-span-2 flex items-center bg-white border border-gray-200 rounded-full h-12 md:h-14 justify-between px-3 md:px-4">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="font-bold text-lg text-gray-900">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.countInStock === 0}
                                    className={`col-span-3 h-12 md:h-14 rounded-full font-bold text-sm md:text-lg shadow-xl transition transform hover:-translate-y-1 flex items-center justify-center gap-1 md:gap-2
                                    ${product.countInStock > 0
                                            ? "bg-gray-900 text-white hover:bg-gray-800 shadow-gray-200"
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                                >
                                    {product.countInStock > 0 ? "Add to Cart" : "No Stock"} <Share2 size={16} className="ml-1 md:ml-2 opacity-50" />
                                </button>
                            </div>
                            {product.countInStock > 0 && (
                                <button
                                    onClick={handleBuyNow}
                                    className="w-full mt-3 h-12 md:h-14 rounded-full font-bold text-lg shadow-xl shadow-brand-accent/30 transition transform hover:-translate-y-1 flex items-center justify-center gap-2 bg-brand-accent text-white hover:bg-brand-accent-hover"
                                >
                                    Buy Now <ArrowRight size={18} className="ml-2" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section - Redesigned */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Tabs for Large Screens */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 overflow-x-auto flex lg:flex-col lg:sticky lg:top-24 gap-2 no-scrollbar">
                        {['overview', 'ingredients', 'how_to_use', 'reviews'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-shrink-0 lg:w-full text-left px-4 md:px-6 py-3 md:py-4 rounded-2xl font-bold capitalize transition-all duration-300 flex items-center justify-between whitespace-nowrap
                                    ${activeTab === tab
                                        ? 'bg-brand-accent text-white shadow-md'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
                            >
                                <span className="mr-2">{tab.replace(/_/g, ' ')}</span>
                                {activeTab === tab && <ArrowRight size={16} className="hidden lg:block" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-9">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 min-h-[400px]">
                        {activeTab === 'overview' && (
                            <div className="animate-fade-in space-y-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Sparkles className="text-brand-accent" /> Why You'll Love It
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {product.description}
                                    </p>
                                </div>

                                {benefitsList.length > 0 && (
                                    <div className="bg-brand-pink/10 rounded-2xl p-8">
                                        <h4 className="font-bold text-gray-900 mb-4 text-lg">Key Benefits</h4>
                                        <ul className="grid md:grid-cols-2 gap-4">
                                            {benefitsList.map((benefit, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-gray-700">
                                                    <Check size={20} className="text-brand-accent flex-shrink-0 mt-0.5" />
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'ingredients' && (
                            <div className="animate-fade-in">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Droplets className="text-brand-accent" /> Ingredients
                                </h3>
                                <div className="bg-gray-50 p-6 rounded-2xl text-gray-700 leading-relaxed font-mono text-sm border border-gray-200">
                                    {product.ingredients || "Ingredients not listed for this product."}
                                </div>
                                <p className="mt-4 text-xs text-gray-400">
                                    * Disclaimer: Ingredients are subject to change at the manufacturer's discretion. For the most complete and up-to-date list of ingredients, refer to the product packaging.
                                </p>
                            </div>
                        )}

                        {activeTab === 'how_to_use' && (
                            <div className="animate-fade-in">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Use</h3>
                                <div className="bg-white border-l-4 border-brand-accent pl-6 py-2">
                                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                                        {product.howToUse || "Usage instructions not provided."}
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="animate-fade-in text-center py-16">
                                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Star size={32} className="text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No Reviews Yet</h3>
                                <p className="text-gray-500">Be the first to review this product!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-24">
                    <div className="flex items-end justify-between mb-10">
                        <h2 className="text-3xl font-bold text-gray-900">You Might Also Like</h2>
                        <Link to="/products" className="text-brand-accent font-bold hover:underline">View All</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map(rel => (
                            <Link to={`/product/${rel._id}`} key={rel._id} className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                                <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4 relative">
                                    <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    {/* Quick Add Overlay */}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                        <span className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition duration-300">View Details</span>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{rel.category}</p>
                                    <h3 className="font-bold text-gray-900 group-hover:text-brand-accent transition truncate mb-2">{rel.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-lg text-gray-900">₹{rel.price}</span>
                                        <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 group-hover:bg-brand-accent group-hover:text-white transition">
                                            <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>

    );
};

export default ProductDetail;
