import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Edit, Trash2, Plus } from 'lucide-react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        } else {
            fetchProducts();
        }
    }, [userInfo, navigate]);

    const fetchProducts = async () => {
        const { data } = await axios.get('/api/products');
        setProducts(data);
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                await axios.delete(`/api/products/${id}`, config);
                fetchProducts();
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const createProductHandler = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.post('/api/products', {}, config);
            navigate(`/admin/product/${data._id}/edit`);
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                <button onClick={createProductHandler} className="bg-brand-accent text-white px-4 py-2 rounded-lg flex items-center hover:bg-brand-accent-hover transition shadow-sm font-medium">
                    <Plus className="w-4 h-4 mr-2" /> Create Product
                </button>
            </div>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Brand</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition">
                                <td className="px-5 py-4 text-sm font-mono text-gray-500">{product._id.substring(0, 8)}...</td>
                                <td className="px-5 py-4 text-sm font-medium text-gray-800">{product.name}</td>
                                <td className="px-5 py-4 text-sm font-bold text-gray-800">₹{product.price}</td>
                                <td className="px-5 py-4 text-sm text-gray-600 is-capitalized">{product.category}</td>
                                <td className="px-5 py-4 text-sm text-gray-600">{product.brand}</td>
                                <td className="px-5 py-4 text-sm">
                                    <div className="flex items-center gap-3">
                                        <Link to={`/admin/product/${product._id}/edit`} className="text-blue-500 hover:text-blue-700 transition p-1 rounded hover:bg-blue-50">
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button onClick={() => deleteHandler(product._id)} className="text-red-500 hover:text-red-700 transition p-1 rounded hover:bg-red-50">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card List View */}
            <div className="md:hidden space-y-4">
                {products.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 bg-white rounded-2xl border border-gray-100">
                        No products found.
                    </div>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg border border-gray-100" />
                                    ) : (
                                        <div className="w-12 h-12 bg-brand-pink text-brand-accent rounded-lg flex items-center justify-center font-bold text-xs">
                                            {product.name.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{product.name}</h3>
                                        <p className="text-[10px] text-gray-400 font-mono">ID: {product._id.substring(0, 8)}...</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-brand-accent px-2.5 py-1 bg-brand-pink rounded-full capitalize">
                                    {product.category}
                                </span>
                            </div>

                            <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 uppercase font-medium">Price</span>
                                    <span className="text-sm font-extrabold text-gray-900">₹{product.price}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 uppercase font-medium">Brand</span>
                                    <span className="text-xs text-gray-600 font-medium">{product.brand}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link to={`/admin/product/${product._id}/edit`} className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                                        <Edit className="w-3.5 h-3.5" />
                                    </Link>
                                    <button onClick={() => deleteHandler(product._id)} className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductList;
