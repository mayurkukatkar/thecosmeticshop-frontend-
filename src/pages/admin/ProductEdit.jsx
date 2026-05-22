import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
    ArrowLeft, 
    Trash2, 
    Upload, 
    Image as ImageIcon, 
    Tag, 
    Package, 
    Info, 
    Save, 
    Loader2, 
    Sparkles, 
    Layers, 
    FileText,
    Percent
} from 'lucide-react';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';
import { CATEGORIES } from '../../utils/categories';

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [benefits, setBenefits] = useState('');
    const [howToUse, setHowToUse] = useState('');
    const [originalPrice, setOriginalPrice] = useState(0);
    
    // UI Loading States
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [isNewDraft, setIsNewDraft] = useState(false);

    // Custom Category Management
    const [selectedCategoryOption, setSelectedCategoryOption] = useState('');
    const [customCategory, setCustomCategory] = useState('');

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setName(data.name === 'Sample name' ? '' : data.name);
                setIsNewDraft(data.name === 'Sample name');
                setPrice(data.price || 0);
                setImage(data.image || '');
                setImages(data.images || []);
                setBrand(data.brand === 'Sample brand' ? 'Chawke Fashion' : (data.brand || 'Chawke Fashion'));
                setCategory(data.category === 'Sample category' ? '' : (data.category || ''));
                setCountInStock(data.countInStock || 0);
                setDescription(data.description === 'Sample description' ? '' : (data.description || ''));
                setIngredients(data.ingredients === 'Not specified' ? '' : (data.ingredients || ''));
                setBenefits(data.benefits === 'Not specified' ? '' : (data.benefits || ''));
                setHowToUse(data.howToUse === 'Not specified' ? '' : (data.howToUse || ''));
                setOriginalPrice(data.originalPrice || 0);

                // Setup category select option
                const cat = data.category;
                if (cat === 'Sample category' || !cat) {
                    setSelectedCategoryOption('');
                } else if (CATEGORIES.some(c => c.name === cat)) {
                    setSelectedCategoryOption(cat);
                } else {
                    setSelectedCategoryOption('Custom');
                    setCustomCategory(cat);
                }
                
                setLoading(false);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load product details');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, userInfo, navigate]);

    const handleCategoryOptionChange = (val) => {
        setSelectedCategoryOption(val);
        if (val !== 'Custom') {
            setCategory(val);
        } else {
            setCategory(customCategory || '');
        }
    };

    const handleCustomCategoryChange = (val) => {
        setCustomCategory(val);
        setCategory(val);
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const loadingToast = toast.loading('Uploading main image...');

        const options = {
            maxSizeMB: 1.5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            const formData = new FormData();
            formData.append('image', compressedFile);

            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data);
            toast.dismiss(loadingToast);
            toast.success('Main image uploaded');
            setUploading(false);
        } catch (error) {
            console.error(error);
            toast.dismiss(loadingToast);
            toast.error('Image upload failed');
            setUploading(false);
        }
    };

    const uploadGalleryHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const loadingToast = toast.loading('Uploading gallery image...');

        const options = {
            maxSizeMB: 1.5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            const formData = new FormData();
            formData.append('image', compressedFile);

            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await axios.post('/api/upload', formData, config);
            setImages([...images, data]);
            toast.dismiss(loadingToast);
            toast.success('Gallery image added');
            setUploading(false);
        } catch (error) {
            console.error(error);
            toast.dismiss(loadingToast);
            toast.error('Gallery image upload failed');
            setUploading(false);
        }
    };

    const removeImageHandler = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
        toast.success('Gallery image removed');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!name || name.trim() === '') {
            toast.error('Please enter a product name');
            return;
        }
        if (!price || price <= 0) {
            toast.error('Please enter a price greater than 0');
            return;
        }
        if (!category || category.trim() === '') {
            toast.error('Please select or specify a category');
            return;
        }
        if (!image || image.trim() === '') {
            toast.error('Please upload a primary image');
            return;
        }
        if (!description || description.trim() === '') {
            toast.error('Please enter a product description');
            return;
        }

        setSaving(true);
        const savingToast = toast.loading(isNewDraft ? 'Publishing product...' : 'Saving updates...');

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.put(
                `/api/products/${id}`,
                {
                    name,
                    price,
                    description,
                    image,
                    images,
                    brand: brand || 'Chawke Fashion',
                    category,
                    countInStock,
                    ingredients: ingredients || 'Not specified',
                    benefits: benefits || 'Not specified',
                    howToUse: howToUse || 'Not specified',
                    originalPrice: originalPrice || 0,
                },
                config
            );
            toast.dismiss(savingToast);
            toast.success(isNewDraft ? 'Product published successfully!' : 'Product updated successfully!');
            navigate('/admin/products');
        } catch (error) {
            console.error(error);
            toast.dismiss(savingToast);
            toast.error(error.response?.data?.message || 'Save Failed');
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-[60vh] gap-3">
                <Loader2 className="animate-spin text-brand-accent w-12 h-12" />
                <p className="text-gray-500 font-medium">Loading details...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Link 
                        to="/admin/products" 
                        className="p-2.5 bg-white border border-gray-100 hover:border-gray-200 rounded-xl hover:shadow-sm transition text-gray-600 hover:text-black flex items-center justify-center"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <span className="text-xs font-semibold text-brand-accent tracking-wider uppercase bg-brand-pink/50 px-2.5 py-1 rounded-full">
                            Draft Manager
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 font-serif">
                            {isNewDraft ? 'Create New Product' : 'Edit Product'}
                        </h1>
                    </div>
                </div>
            </div>

            <form onSubmit={submitHandler} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Columns - Form Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* General Apparel Information */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-4">
                            <Layers className="text-brand-accent w-5 h-5" /> Product Information
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Apparel Name *</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Royal Emerald Banarasi Silk Saree"
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition text-gray-800"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                                    <select
                                        value={selectedCategoryOption}
                                        onChange={(e) => handleCategoryOptionChange(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition bg-white text-gray-800"
                                    >
                                        <option value="">Select Category</option>
                                        {CATEGORIES.map((cat) => (
                                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                                        ))}
                                        <option value="Custom">Custom / Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Chawke Fashion"
                                        value={brand} 
                                        onChange={(e) => setBrand(e.target.value)} 
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition text-gray-800"
                                    />
                                </div>
                            </div>

                            {selectedCategoryOption === 'Custom' && (
                                <div className="animate-fade-in">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Custom Category Name *</label>
                                    <input 
                                        type="text" 
                                        placeholder="Type custom category (e.g. Kaftans)"
                                        value={customCategory} 
                                        onChange={(e) => handleCustomCategoryChange(e.target.value)} 
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition text-gray-800"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pricing & Stock */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-4">
                            <Package className="text-brand-accent w-5 h-5" /> Pricing & Inventory
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Selling Price (₹) *</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                                    <input 
                                        type="number" 
                                        min="0"
                                        placeholder="0"
                                        value={price || ''} 
                                        onChange={(e) => setPrice(Number(e.target.value))} 
                                        required
                                        className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition text-gray-800 font-semibold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Original Price (₹)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                                    <input 
                                        type="number" 
                                        min="0"
                                        placeholder="0"
                                        value={originalPrice || ''} 
                                        onChange={(e) => setOriginalPrice(Number(e.target.value))} 
                                        className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition text-gray-800 text-gray-500"
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">Leaves strikethrough if higher than Selling Price.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity</label>
                                <input 
                                    type="number" 
                                    min="0"
                                    placeholder="0"
                                    value={countInStock || ''} 
                                    onChange={(e) => setCountInStock(Number(e.target.value))} 
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition text-gray-800"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Detailed Specifications */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-4">
                            <FileText className="text-brand-accent w-5 h-5" /> Descriptions & Fabric Care
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Description *</label>
                                <textarea 
                                    placeholder="Provide detailed description of the design, weave structure, and silhouette details..."
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition text-gray-800 h-28 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Fabric & Material Details</label>
                                <textarea 
                                    placeholder="e.g. Pure Banarasi Katan Silk, handwoven gold Zari bootas..."
                                    value={ingredients} 
                                    onChange={(e) => setIngredients(e.target.value)} 
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition text-gray-800 h-24 resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Features & Care Instructions</label>
                                    <textarea 
                                        placeholder="e.g. Dry Clean Only, includes unstitched running blouse piece..."
                                        value={benefits} 
                                        onChange={(e) => setBenefits(e.target.value)} 
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition text-gray-800 h-24 resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Styling & Fit Guide</label>
                                    <textarea 
                                        placeholder="e.g. Style with antique gold temple jewelry and a sleek low bun..."
                                        value={howToUse} 
                                        onChange={(e) => setHowToUse(e.target.value)} 
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition text-gray-800 h-24 resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Media & Actions */}
                <div className="space-y-8">
                    {/* Media Upload Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-4">
                            <ImageIcon className="text-brand-accent w-5 h-5" /> Media Gallery
                        </h2>

                        {/* Primary Image Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Primary Product Image *</label>
                            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-brand-accent/40 transition relative group bg-gray-50/50">
                                {image ? (
                                    <div className="relative inline-block z-10">
                                        <img src={image} alt="Main Preview" className="max-h-48 rounded-xl object-cover shadow-sm mx-auto" />
                                        <button
                                            type="button"
                                            onClick={() => setImage('')}
                                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow transition-all duration-300"
                                            title="Remove Image"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-4">
                                        <div className="w-12 h-12 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-3">
                                            <Upload size={20} />
                                        </div>
                                        <p className="text-sm font-semibold text-gray-700">Upload primary image</p>
                                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, or JPEG formats</p>
                                    </div>
                                )}
                                <input 
                                    type="file" 
                                    onChange={uploadFileHandler} 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
                                    disabled={uploading}
                                    title="Choose image file"
                                />
                            </div>

                            <div className="mt-4">
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Or enter image URL manually</label>
                                <input
                                    type="text"
                                    placeholder="https://images.unsplash.com/..."
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition text-gray-800"
                                />
                            </div>
                        </div>

                        {/* Gallery Images Upload */}
                        <div className="border-t border-gray-50 pt-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Secondary Gallery Images</label>
                            
                            {images.length > 0 && (
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {images.map((img, idx) => (
                                        <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImageHandler(idx)}
                                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-brand-accent/40 transition relative group bg-gray-50/50 flex flex-col items-center justify-center py-6 cursor-pointer">
                                <Plus size={20} className="text-gray-400 mb-1" />
                                <span className="text-xs font-semibold text-gray-600">Add Gallery Image</span>
                                <input 
                                    type="file" 
                                    onChange={uploadGalleryHandler} 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                    disabled={uploading}
                                    title="Choose gallery image file"
                                />
                            </div>
                        </div>

                        {uploading && (
                            <div className="flex items-center gap-2 justify-center text-xs text-gray-500 font-medium animate-pulse">
                                <Loader2 className="animate-spin text-brand-accent w-4 h-4" />
                                Processing file compression & upload...
                            </div>
                        )}
                    </div>

                    {/* Actions Panel */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-4">
                        <button 
                            type="submit" 
                            disabled={saving || uploading}
                            className="w-full bg-brand-accent text-white py-3.5 rounded-xl font-bold hover:bg-brand-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm flex items-center justify-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {isNewDraft ? 'Publishing...' : 'Saving...'}
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    {isNewDraft ? 'Publish Product' : 'Save Changes'}
                                </>
                            )}
                        </button>

                        <Link 
                            to="/admin/products"
                            className="w-full border border-gray-200 text-gray-600 hover:text-black py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 text-center block"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductEdit;
