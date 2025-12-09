import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Upload, Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';

const BannerEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [link, setLink] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchBanner = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get(`/api/banners`, config); // API should ideally support GET /:id, but we'll filter for now or assume backend support
                // Checking if backend supports get by ID based on routes saw earlier... 
                // Ah, routes/bannerRoutes.js didn't explicit show GET /:id, it showed router.route('/:id').delete(...).put(...)
                // But controllers/bannerController.js DOES NOT have getBannerById. 
                // Wait, let's double check. 
                // Actually, I should probably implement getBannerById on backend or just filter from all banners here since there are few.
                // Let's filter from all for now to avoid backend changes if possible, or assume I can add it easily.
                // Given the plan was "Reuse existing", I'll filter client side for MVP since banners are few.
                const banner = data.find(b => b._id === id);
                if (banner) {
                    setTitle(banner.title || '');
                    setImage(banner.image);
                    setLink(banner.link || '');
                    setIsActive(banner.isActive);
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to load banner');
            }
        };
        fetchBanner();
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
            setImage(data);
            setUploading(false);
            toast.success('Image uploaded');
        } catch (error) {
            console.error(error);
            setUploading(false);
            toast.error('Image upload failed');
        }
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
                `/api/banners/${id}`,
                { title, image, link, isActive },
                config
            );
            toast.success('Banner updated');
            navigate('/admin/banners');
        } catch (error) {
            console.error(error);
            toast.error('Update Failed');
        }
    };

    return (
        <div className="container mx-auto px-4 max-w-2xl">
            <Link to="/admin/banners" className="text-gray-500 hover:text-gray-900 mb-6 inline-flex items-center gap-2">
                <ArrowLeft size={18} /> Back to Banners
            </Link>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Banner</h1>
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Banner Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-pink focus:border-brand-pink outline-none transition"
                            placeholder="e.g., Summer Sale"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Link Payload</label>
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-brand-pink focus:border-brand-pink outline-none transition"
                            placeholder="e.g., /products?category=summer"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Banner Image</label>

                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition cursor-pointer relative group">
                            <input type="file" onChange={uploadFileHandler} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            {image ? (
                                <img src={image} alt="Preview" className="h-40 w-full object-cover rounded-lg mx-auto" />
                            ) : (
                                <div className="py-8 text-gray-400">
                                    <Upload className="mx-auto mb-2" />
                                    <span>Click to upload image</span>
                                </div>
                            )}
                            {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-brand-accent font-bold">Uploading...</div>}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            className="w-5 h-5 text-brand-accent focus:ring-brand-pink border-gray-300 rounded"
                        />
                        <label htmlFor="isActive" className="text-gray-700 font-medium cursor-pointer">Active / Visible</label>
                    </div>

                    <button type="submit" className="w-full bg-brand-accent text-white py-3 rounded-xl font-bold hover:bg-brand-accent-hover transition flex items-center justify-center gap-2 shadow-lg shadow-pink-200">
                        <Save size={20} /> Update Banner
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BannerEdit;
