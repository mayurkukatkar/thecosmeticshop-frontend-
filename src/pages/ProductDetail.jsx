import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { 
    Star, Truck, ShieldCheck, Heart, Share2, Plus, Minus, ArrowRight, Check, 
    Sparkles, AlertCircle, MessageCircle, X, ChevronLeft, ChevronRight, 
    ChevronDown, ChevronUp, ZoomIn 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('overview');
    const [whatsappNumber, setWhatsappNumber] = useState('+919876543210');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [openAccordions, setOpenAccordions] = useState({
        overview: true,
        fabric: false,
        styling: false,
        reviews: false
    });

    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    // Touch and drag refs for gesture tracking
    const touchStartX = useRef(null);
    const touchStartY = useRef(null);
    const touchEndX = useRef(null);
    const touchEndY = useRef(null);
    const touchStartDist = useRef(null);
    const touchStartScale = useRef(1);
    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Fetch WhatsApp configuration
                try {
                    const { data: waConfig } = await axios.get('/api/config/public/whatsappNumber');
                    if (waConfig && waConfig.value) {
                        setWhatsappNumber(waConfig.value);
                    }
                } catch (waErr) {
                    console.error("Error fetching WhatsApp configuration:", waErr);
                }

                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
                setCurrentImageIndex(0); // Reset gallery index on navigate

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

    const handleWhatsAppBuy = () => {
        if (product.countInStock === 0) {
            toast.error("Sorry, this item is out of stock");
            return;
        }
        
        const phoneNumber = whatsappNumber; 
        const currentUrl = window.location.href;
        
        const message = `Hello Chawke Fashion! I would like to purchase the following item:

🛍️ *Product:* ${product.name}
🏷️ *Price:* ₹${product.price}
📦 *Quantity:* ${quantity}
🔗 *Product Link:* ${currentUrl}
🖼️ *Product Image:* ${product.image}

Please let me know how to proceed with payment and shipping. Thank you!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9+]/g, '')}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
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

    // Horizontal Swipe Gestures for main image carousel
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
        touchEndY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diffX = touchStartX.current - touchEndX.current;
        const diffY = touchStartY.current - touchEndY.current;
        const threshold = 50; // minimum distance to swipe

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe left -> next image
                setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
            } else {
                // Swipe right -> previous image
                setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
            }
        }

        // Reset
        touchStartX.current = null;
        touchStartY.current = null;
        touchEndX.current = null;
        touchEndY.current = null;
    };

    // Lightbox gestures (Pinch & Pan)
    const handleLightboxTouchStart = (e) => {
        if (e.touches.length === 2) {
            // Pinch
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            touchStartDist.current = dist;
            touchStartScale.current = zoomLevel;
        } else if (e.touches.length === 1) {
            // Pan or Swipe
            touchStartX.current = e.touches[0].clientX;
            touchStartY.current = e.touches[0].clientY;
            isDragging.current = true;
            dragStart.current = { x: panOffset.x, y: panOffset.y };
        }
    };

    const handleLightboxTouchMove = (e) => {
        if (e.touches.length === 2 && touchStartDist.current) {
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const factor = dist / touchStartDist.current;
            const newScale = Math.min(Math.max(touchStartScale.current * factor, 1), 4);
            setZoomLevel(newScale);
            if (newScale === 1) {
                setPanOffset({ x: 0, y: 0 });
            }
        } else if (e.touches.length === 1 && isDragging.current) {
            const deltaX = e.touches[0].clientX - touchStartX.current;
            const deltaY = e.touches[0].clientY - touchStartY.current;

            if (zoomLevel > 1) {
                // Pan around when zoomed
                setPanOffset({
                    x: dragStart.current.x + deltaX,
                    y: dragStart.current.y + deltaY
                });
            } else {
                // Track swipe distance
                touchEndX.current = e.touches[0].clientX;
                touchEndY.current = e.touches[0].clientY;
            }
        }
    };

    const handleLightboxTouchEnd = () => {
        isDragging.current = false;

        if (zoomLevel === 1 && touchStartX.current && touchEndX.current) {
            const diffX = touchStartX.current - touchEndX.current;
            const diffY = touchStartY.current - touchEndY.current;
            const threshold = 50;
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    nextLightboxImage();
                } else {
                    prevLightboxImage();
                }
            }
        }

        touchStartDist.current = null;
        touchStartX.current = null;
        touchStartY.current = null;
        touchEndX.current = null;
        touchEndY.current = null;
    };

    // Desktop mouse panning inside lightbox
    const handleMouseDown = (e) => {
        if (zoomLevel > 1) {
            e.preventDefault();
            isDragging.current = true;
            touchStartX.current = e.clientX;
            touchStartY.current = e.clientY;
            dragStart.current = { x: panOffset.x, y: panOffset.y };
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging.current && zoomLevel > 1) {
            const deltaX = e.clientX - touchStartX.current;
            const deltaY = e.clientY - touchStartY.current;
            setPanOffset({
                x: dragStart.current.x + deltaX,
                y: dragStart.current.y + deltaY
            });
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const nextLightboxImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        setZoomLevel(1);
        setPanOffset({ x: 0, y: 0 });
    };

    const prevLightboxImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
        setZoomLevel(1);
        setPanOffset({ x: 0, y: 0 });
    };

    const toggleDoubleTapZoom = (e) => {
        e.stopPropagation();
        if (zoomLevel > 1) {
            setZoomLevel(1);
            setPanOffset({ x: 0, y: 0 });
        } else {
            setZoomLevel(2.5);
            setPanOffset({ x: 0, y: 0 });
        }
    };

    const toggleAccordion = (section) => {
        setOpenAccordions(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="min-h-screen bg-brand-cream font-sans py-0 md:py-12 pb-40 md:pb-12">
            <div className="container mx-auto px-0 md:px-4">
                {/* Breadcrumbs - Desktop only */}
                <div className="hidden md:flex items-center text-sm text-gray-500 mb-8 space-x-2 px-4 md:px-0">
                    <Link to="/" className="hover:text-brand-accent">Home</Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-brand-accent">Shop</Link>
                    <span>/</span>
                    <span className="text-brand-text font-semibold">{product.name}</span>
                </div>

                <div className="bg-white rounded-none md:rounded-3xl shadow-none md:shadow-lg border-0 md:border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
                    {/* Left: Image Gallery (Full Bleed on Mobile) */}
                    <div className="lg:w-1/2 p-0 md:p-12 bg-white md:bg-gray-50 flex flex-col items-center justify-center relative">
                        <div 
                            className="relative w-full aspect-[4/5] md:aspect-square md:max-w-[500px] md:rounded-2xl md:shadow-sm overflow-hidden bg-white cursor-zoom-in"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onClick={() => setIsLightboxOpen(true)}
                        >
                            <img 
                                src={galleryImages[currentImageIndex]} 
                                alt={product.name} 
                                className="w-full h-full object-cover md:object-contain md:p-4 transition-transform duration-500 md:hover:scale-105" 
                            />
                            {discount > 0 && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                                    -{discount}% OFF
                                </div>
                            )}
                            <button 
                                className="absolute top-4 right-4 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-md hover:text-red-500 transition text-gray-400 z-10"
                                onClick={(e) => { e.stopPropagation(); toast.success("Added to Wishlist!"); }}
                            >
                                <Heart size={20} />
                            </button>

                            {/* Mobile Indicators */}
                            {galleryImages.length > 1 && (
                                <>
                                    {/* Pagination Pill */}
                                    <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full font-medium tracking-wider z-10 md:hidden">
                                        {currentImageIndex + 1} / {galleryImages.length}
                                    </div>
                                    
                                    {/* Carousel Dots */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 md:hidden">
                                        {galleryImages.map((_, idx) => (
                                            <span 
                                                key={idx} 
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImageIndex === idx ? 'bg-brand-accent w-4' : 'bg-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Zoom prompt indicator (Desktop Only) */}
                            <div className="hidden md:flex absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full transition z-10 items-center justify-center">
                                <ZoomIn size={18} />
                            </div>
                        </div>

                        {/* Thumbnails (Desktop Only) */}
                        {galleryImages.length > 1 && (
                            <div className="hidden md:flex gap-4 overflow-x-auto pb-2 w-full justify-center mt-6 px-4 no-scrollbar">
                                {galleryImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all ${currentImageIndex === idx ? 'border-brand-accent scale-105 shadow-md' : 'border-transparent hover:border-gray-300'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Details (Overlap on Mobile) */}
                    <div className="lg:w-1/2 p-6 md:p-12 flex flex-col bg-white -mt-6 md:mt-0 rounded-t-3xl md:rounded-t-none relative z-10 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] md:shadow-none">
                        <div className="mb-2">
                            <span className="text-brand-accent font-bold tracking-wider uppercase text-xs bg-brand-pink/50 px-3 py-1 rounded-full">
                                {product.brand || product.category}
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 mt-2 font-serif">{product.name}</h1>

                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex text-yellow-500">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" className={i <= 4 ? "text-yellow-400" : "text-gray-300"} />)}
                            </div>
                            <span className="text-gray-500 text-xs font-medium">Read Reviews</span>
                            <div className="h-3 w-px bg-gray-300 mx-1"></div>
                            <span className={`${product.countInStock > 0 ? "text-green-600" : "text-red-500"} text-xs font-semibold flex items-center gap-1`}>
                                {product.countInStock > 0 ? <Check size={12} /> : <AlertCircle size={12} />}
                                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>

                        <div className="flex items-baseline gap-4 mb-6">
                            <div className="text-3xl md:text-4xl font-extrabold text-gray-900">₹{product.price}</div>
                            {product.originalPrice > product.price && (
                                <div className="text-lg text-gray-400 line-through">₹{product.originalPrice}</div>
                            )}
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base border-b border-gray-100 pb-6">
                            {product.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                                <Truck size={20} className="text-brand-accent mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-xs text-gray-900">Free Delivery</h4>
                                    <p className="text-[10px] text-gray-500">Orders over ₹500</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                                <ShieldCheck size={20} className="text-brand-accent mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-xs text-gray-900">Authentic</h4>
                                    <p className="text-[10px] text-gray-500">100% Original</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto hidden md:block">
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
                                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                    <button
                                        onClick={handleBuyNow}
                                        className="flex-1 h-12 md:h-14 rounded-full font-bold text-lg shadow-xl shadow-brand-accent/20 transition transform hover:-translate-y-1 flex items-center justify-center gap-2 bg-brand-accent text-white hover:bg-brand-accent-hover"
                                    >
                                        Buy Now <ArrowRight size={18} />
                                    </button>
                                    <button
                                        onClick={handleWhatsAppBuy}
                                        className="flex-1 h-12 md:h-14 rounded-full font-bold text-lg shadow-xl shadow-green-200 transition transform hover:-translate-y-1 flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#20ba5a]"
                                    >
                                        <MessageCircle size={20} fill="currentColor" /> Buy via WhatsApp
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Accordions Section */}
            <div className="md:hidden mt-6 space-y-3 px-4">
                {/* Overview */}
                <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm">
                    <button
                        onClick={() => toggleAccordion('overview')}
                        className="w-full px-5 py-4 flex items-center justify-between font-bold text-gray-800 text-left text-sm"
                    >
                        <span className="flex items-center gap-2">
                            <Sparkles className="text-brand-gold" size={16} /> Overview
                        </span>
                        {openAccordions.overview ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {openAccordions.overview && (
                        <div className="px-5 pb-5 text-gray-600 leading-relaxed text-xs space-y-4">
                            <p>{product.description}</p>
                            {benefitsList.length > 0 && (
                                <div className="bg-brand-pink/30 rounded-xl p-4 mt-2">
                                    <h4 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider">Features & Care</h4>
                                    <ul className="space-y-2">
                                        {benefitsList.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-700">
                                                <Check size={14} className="text-brand-gold flex-shrink-0 mt-0.5" />
                                                <span>{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Fabric & Details */}
                <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm">
                    <button
                        onClick={() => toggleAccordion('fabric')}
                        className="w-full px-5 py-4 flex items-center justify-between font-bold text-gray-800 text-left text-sm"
                    >
                        <span className="flex items-center gap-2">
                            <Sparkles className="text-brand-gold" size={16} /> Fabric & Details
                        </span>
                        {openAccordions.fabric ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {openAccordions.fabric && (
                        <div className="px-5 pb-5 text-gray-600 leading-relaxed text-xs">
                            <div className="bg-gray-50 p-4 rounded-xl font-mono border border-gray-100 text-gray-700 whitespace-pre-wrap">
                                {product.ingredients || "Fabric details not listed for this product."}
                            </div>
                            <p className="mt-3 text-[10px] text-gray-400">
                                * Note: Fabric colors may vary slightly due to photographic lighting sources or your device settings.
                            </p>
                        </div>
                    )}
                </div>

                {/* Styling Guide */}
                <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm">
                    <button
                        onClick={() => toggleAccordion('styling')}
                        className="w-full px-5 py-4 flex items-center justify-between font-bold text-gray-800 text-left text-sm"
                    >
                        <span className="flex items-center gap-2">
                            <Sparkles className="text-brand-gold" size={16} /> Styling & Fit Guide
                        </span>
                        {openAccordions.styling ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {openAccordions.styling && (
                        <div className="px-5 pb-5 text-gray-600 leading-relaxed text-xs">
                            <div className="border-l-4 border-brand-gold pl-4 py-1">
                                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                    {product.howToUse || "Styling guidelines and fit options not provided."}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Reviews */}
                <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm">
                    <button
                        onClick={() => toggleAccordion('reviews')}
                        className="w-full px-5 py-4 flex items-center justify-between font-bold text-gray-800 text-left text-sm"
                    >
                        <span className="flex items-center gap-2">
                            <Star className="text-brand-gold" size={16} /> Reviews
                        </span>
                        {openAccordions.reviews ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {openAccordions.reviews && (
                        <div className="px-5 pb-5 text-center py-6 text-gray-600 leading-relaxed text-xs">
                            <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Star size={20} className="text-gray-300" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">No Reviews Yet</h4>
                            <p className="text-gray-400">Be the first to review this product!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs Section - Desktop only */}
            <div className="hidden md:grid mt-16 grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-0">
                {/* Sidebar Tabs for Large Screens */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 overflow-x-auto flex lg:flex-col lg:sticky lg:top-24 gap-2 no-scrollbar">
                        {['overview', 'fabric_&_details', 'styling_tips', 'reviews'].map(tab => (
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
                                        <Sparkles className="text-brand-gold" /> Why You'll Love It
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {product.description}
                                    </p>
                                </div>

                                {benefitsList.length > 0 && (
                                    <div className="bg-brand-pink/30 rounded-2xl p-8">
                                        <h4 className="font-bold text-gray-900 mb-4 text-lg">Features & Care Instructions</h4>
                                        <ul className="grid md:grid-cols-2 gap-4">
                                            {benefitsList.map((benefit, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-gray-700">
                                                    <Check size={20} className="text-brand-gold flex-shrink-0 mt-0.5" />
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'fabric_&_details' && (
                            <div className="animate-fade-in">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <Sparkles className="text-brand-gold" /> Fabric & Details
                                </h3>
                                <div className="bg-gray-50 p-6 rounded-2xl text-gray-700 leading-relaxed font-mono text-sm border border-gray-200 whitespace-pre-wrap">
                                    {product.ingredients || "Fabric details not listed for this product."}
                                </div>
                                <p className="mt-4 text-xs text-gray-400">
                                    * Note: Fabric colors may vary slightly due to photographic lighting sources or your device monitor settings.
                                </p>
                            </div>
                        )}

                        {activeTab === 'styling_tips' && (
                            <div className="animate-fade-in">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Styling & Fit Guide</h3>
                                <div className="bg-white border-l-4 border-brand-gold pl-6 py-2">
                                    <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                                        {product.howToUse || "Styling guidelines and fit options not provided."}
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
                <div className="mt-16 md:mt-24 px-4 md:px-0">
                    <div className="flex items-end justify-between mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">You Might Also Like</h2>
                        <Link to="/products" className="text-brand-accent font-bold hover:underline text-sm md:text-base">View All</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {relatedProducts.map(rel => (
                            <Link to={`/product/${rel._id}`} key={rel._id} className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                                <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4 relative">
                                    <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
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

            {/* Sticky Bottom Action Bar for Mobile Viewports */}
            <div className="fixed bottom-[56px] left-0 right-0 z-40 bg-white border-t border-gray-100 p-4 md:hidden flex items-center gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.06)]">
                {product.countInStock > 0 ? (
                    <>
                        <button
                            onClick={handleWhatsAppBuy}
                            className="flex-[4] h-12 rounded-full font-bold text-sm flex items-center justify-center gap-1.5 bg-[#25D366] text-white hover:bg-[#20ba5a] transition active:scale-95 shadow-md shadow-green-100"
                        >
                            <MessageCircle size={18} fill="currentColor" /> WhatsApp Buy
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="flex-[5] h-12 rounded-full font-bold text-sm flex items-center justify-center gap-1.5 bg-gray-900 text-white hover:bg-gray-800 transition active:scale-95 shadow-md shadow-gray-200"
                        >
                            Add to Cart <ArrowRight size={16} />
                        </button>
                    </>
                ) : (
                    <button
                        disabled
                        className="w-full h-12 rounded-full font-bold text-sm flex items-center justify-center bg-gray-200 text-gray-500 cursor-not-allowed"
                    >
                        Out of Stock
                    </button>
                )}
            </div>

            {/* Full-Screen Zoom Lightbox Modal */}
            {isLightboxOpen && (
                <div 
                    className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center select-none animate-fade-in"
                    onClick={() => {
                        setIsLightboxOpen(false);
                        setZoomLevel(1);
                        setPanOffset({ x: 0, y: 0 });
                    }}
                >
                    {/* Top panel */}
                    <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between text-white z-10 bg-gradient-to-b from-black/60 to-transparent">
                        <div className="text-sm font-semibold tracking-wider bg-black/40 px-3 py-1 rounded-full">
                            {currentImageIndex + 1} / {galleryImages.length}
                        </div>
                        <button 
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsLightboxOpen(false);
                                setZoomLevel(1);
                                setPanOffset({ x: 0, y: 0 });
                            }}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Image viewport */}
                    <div 
                        className="relative w-full h-full max-w-4xl max-h-[85vh] flex items-center justify-center overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div 
                            className="w-full h-full flex items-center justify-center p-4 transition-transform duration-100 ease-out"
                            style={{
                                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
                                cursor: zoomLevel > 1 ? 'grab' : 'zoom-in'
                            }}
                            onTouchStart={handleLightboxTouchStart}
                            onTouchMove={handleLightboxTouchMove}
                            onTouchEnd={handleLightboxTouchEnd}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onDoubleClick={toggleDoubleTapZoom}
                        >
                            <img 
                                src={galleryImages[currentImageIndex]} 
                                alt={product.name} 
                                className="max-w-full max-h-full object-contain pointer-events-none select-none"
                                draggable="false"
                            />
                        </div>
                    </div>

                    {/* Navigation Arrows & Tips */}
                    <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-3 text-white/70 z-10 px-4 text-center">
                        <p className="text-xs font-medium tracking-wide">
                            {zoomLevel > 1 ? "Drag to pan | Double-tap to zoom out" : "Swipe left/right to browse | Double-tap or pinch to zoom"}
                        </p>
                        
                        {galleryImages.length > 1 && (
                            <div className="hidden md:flex items-center gap-4 mt-2">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); prevLightboxImage(); }}
                                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white hover:scale-105 active:scale-95"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <div className="flex gap-2">
                                    {galleryImages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
                                            className={`w-2.5 h-2.5 rounded-full transition-all ${currentImageIndex === idx ? 'bg-white w-5' : 'bg-white/30'}`}
                                        />
                                    ))}
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); nextLightboxImage(); }}
                                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-white hover:scale-105 active:scale-95"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
