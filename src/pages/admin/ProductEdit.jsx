import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import imageCompression from 'browser-image-compression';

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
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setName(data.name);
                setPrice(data.price);
                setImage(data.image);
                setImages(data.images || []);
                setBrand(data.brand);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setDescription(data.description);
                setIngredients(data.ingredients || '');
                setBenefits(data.benefits || '');
                setHowToUse(data.howToUse || '');
                setOriginalPrice(data.originalPrice || 0);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, [id, userInfo, navigate]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        setUploading(true);

        const options = {
            maxSizeMB: 3,
            maxWidthOrHeight: 3840,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            const formData = new FormData();
            formData.append('image', compressedFile);

            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data); // Primary image
            setUploading(false);
            // toast.success('Image uploaded'); // Add toast if desired, though not in original
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const uploadGalleryHandler = async (e) => {
        const file = e.target.files[0];
        setUploading(true);

        const options = {
            maxSizeMB: 3,
            maxWidthOrHeight: 3840,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            const formData = new FormData();
            formData.append('image', compressedFile);

            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await axios.post('/api/upload', formData, config);
            setImages([...images, data]); // Append to gallery
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const removeImageHandler = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
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
                    brand,
                    category,
                    countInStock,
                    ingredients,
                    benefits,
                    howToUse,
                    originalPrice,
                },
                config
            );
            navigate('/admin/products');
        } catch (error) {
            console.error(error);
            alert('Update Failed');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/admin/products" className="text-gray-600 hover:text-black mb-4 inline-block">&larr; Go Back</Link>
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
            <form onSubmit={submitHandler} className="space-y-4 bg-white p-6 rounded shadow">
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-gray-700">Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-2 rounded" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700">Original Price (Strikethrough)</label>
                        <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="w-full border p-2 rounded" />
                    </div>
                </div>

                {/* Main Image */}
                <div>
                    <label className="block text-gray-700 font-bold">Main Image</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full border p-2 rounded mb-2" />
                    <input type="file" onChange={uploadFileHandler} className="w-full" />
                    {image && <img src={image} alt="Main" className="h-20 w-20 object-cover mt-2 rounded border" />}
                </div>

                {/* Gallery Images */}
                <div>
                    <label className="block text-gray-700 font-bold">Gallery Images</label>
                    <div className="flex flex-wrap gap-4 mb-2">
                        {images.map((img, index) => (
                            <div key={index} className="relative group">
                                <img src={img} alt={`Gallery ${index}`} className="h-20 w-20 object-cover rounded border" />
                                <button
                                    type="button"
                                    onClick={() => removeImageHandler(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                    <input type="file" onChange={uploadGalleryHandler} className="w-full" />
                </div>

                {uploading && <span className="text-sm text-gray-500">Uploading...</span>}

                <div>
                    <label className="block text-gray-700">Brand</label>
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-gray-700">Count In Stock</label>
                    <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-gray-700">Category</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2 rounded" />
                </div>

                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded h-24"></textarea>
                </div>
                <div>
                    <label className="block text-gray-700">Ingredients</label>
                    <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} className="w-full border p-2 rounded h-24" placeholder="e.g. Aloe Vera, Vitamin C..."></textarea>
                </div>
                <div>
                    <label className="block text-gray-700">Benefits</label>
                    <textarea value={benefits} onChange={(e) => setBenefits(e.target.value)} className="w-full border p-2 rounded h-24" placeholder="e.g. Hydrating, Anti-aging..."></textarea>
                </div>
                <div>
                    <label className="block text-gray-700">How to Use</label>
                    <textarea value={howToUse} onChange={(e) => setHowToUse(e.target.value)} className="w-full border p-2 rounded h-24" placeholder="e.g. Apply twice daily..."></textarea>
                </div>
                <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded font-bold hover:bg-pink-700">
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default ProductEdit;
