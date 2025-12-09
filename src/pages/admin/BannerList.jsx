import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Trash2, Plus } from 'lucide-react';

const BannerList = () => {
    const [banners, setBanners] = useState([]);
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            fetchBanners();
        } else {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const fetchBanners = async () => {
        const { data } = await axios.get('/api/banners');
        setBanners(data);
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                await axios.delete(`/api/banners/${id}`, config);
                fetchBanners();
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const createBannerHandler = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.post('/api/banners', {}, config);
            fetchBanners(); // Or edit newly created
            alert("Banner created! Go to API/DB to edit details or implement specific Edit page.");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Banners</h1>
                <button onClick={createBannerHandler} className="bg-brand-accent text-white px-4 py-2 rounded-lg flex items-center hover:bg-brand-accent-hover transition shadow-sm font-medium">
                    <Plus className="w-4 h-4 mr-2" /> Add Banner
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map(banner => (
                    <div key={banner._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition">
                        <div className="relative overflow-hidden rounded-xl mb-4 h-48 bg-gray-50">
                            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>
                            {/* Overlay Link */}
                            <Link to={`/admin/banner/${banner._id}/edit`} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-lg font-bold shadow-lg transform scale-90 group-hover:scale-100 transition">Edit Banner</span>
                            </Link>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-gray-800 mb-1">{banner.title || 'Untitled Banner'}</h3>
                                <p className="text-xs text-brand-accent truncate max-w-[150px]">{banner.link || 'No Link'}</p>
                            </div>
                            <button onClick={() => deleteHandler(banner._id)} className="text-gray-400 hover:text-red-500 transition p-2 hover:bg-red-50 rounded-full z-10 relative">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerList;
