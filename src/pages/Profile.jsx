import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { User, Package, Clock, CheckCircle, XCircle, Edit2, Save, X, Phone, MapPin, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
    const { userInfo, login } = useContext(AuthContext); // Assuming login updates state, or we might need a dedicated update function in context
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    // Edit Mode State
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPhone(userInfo.phone || '');
            setAddress(userInfo.address || '');
        }
    }, [userInfo]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
                setOrders(data);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to result orders');
            } finally {
                setLoading(false);
            }
        };

        if (userInfo) {
            fetchOrders();
        }
    }, [userInfo]);

    const updateProfileHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(
                'http://localhost:5000/api/users/profile',
                { id: userInfo._id, name, email, password, phone, address },
                config
            );

            // Update local storage and context if possible, for now we assume page reload or user re-login might be needed for full effect 
            // BUT ideally AuthContext should expose a generic 'updateUser' method. 
            // For this quick implementation, we'll manually update localStorage to keep it simple and consistent.
            localStorage.setItem('userInfo', JSON.stringify(data));
            // Trigger a reload or simple toast for now since we don't have a direct Context setter exposed for updates
            toast.success('Profile Updated Successfully');
            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const filteredOrders = orders.filter(order => {
        if (activeTab === 'all') return true;
        if (activeTab === 'active') return !['Delivered', 'Cancelled'].includes(order.status);
        if (activeTab === 'completed') return ['Delivered', 'Cancelled'].includes(order.status);
        return true;
    });

    return (
        <div className="container mx-auto px-4 py-10 min-h-screen bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* User Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                        <div className="bg-gradient-to-r from-brand-accent to-pink-400 h-24"></div>
                        <div className="px-6 pb-6 relative">
                            <div className="w-20 h-20 bg-white rounded-full p-1 absolute -top-10 left-1/2 transform -translate-x-1/2 shadow-md">
                                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                                    <User size={32} />
                                </div>
                            </div>

                            <div className="mt-12 text-center">
                                {!isEditing ? (
                                    <>
                                        <h2 className="text-xl font-bold text-gray-800">{userInfo?.name}</h2>
                                        <p className="text-gray-500 text-sm mb-6">{userInfo?.email}</p>

                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="w-full py-2 border border-brand-accent text-brand-accent rounded-lg text-sm font-semibold hover:bg-pink-50 transition flex items-center justify-center gap-2 mb-6"
                                        >
                                            <Edit2 size={16} /> Edit Profile
                                        </button>

                                        <div className="text-left space-y-4 border-t border-gray-100 pt-6">
                                            <div className="flex items-start gap-3">
                                                <Phone size={18} className="text-gray-400 mt-1" />
                                                <div>
                                                    <p className="text-xs text-gray-400 font-semibold uppercase">Phone</p>
                                                    <p className="text-sm text-gray-700">{userInfo?.phone || 'Not provided'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <MapPin size={18} className="text-gray-400 mt-1" />
                                                <div>
                                                    <p className="text-xs text-gray-400 font-semibold uppercase">Address</p>
                                                    <p className="text-sm text-gray-700">{userInfo?.address || 'Not provided'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <form onSubmit={updateProfileHandler} className="text-left space-y-3">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500">Name</label>
                                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded text-sm focus:ring-1 focus:ring-pink-500 outline-none" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500">Phone</label>
                                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded text-sm focus:ring-1 focus:ring-pink-500 outline-none" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500">Address</label>
                                            <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows="2" className="w-full p-2 border rounded text-sm focus:ring-1 focus:ring-pink-500 outline-none"></textarea>
                                        </div>
                                        <div className="pt-2 border-t mt-2">
                                            <label className="text-xs font-bold text-gray-500 flex items-center gap-1"><Lock size={10} /> New Password (Optional)</label>
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep same" className="w-full p-2 border rounded text-sm focus:ring-1 focus:ring-pink-500 outline-none mb-2" />
                                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" className="w-full p-2 border rounded text-sm focus:ring-1 focus:ring-pink-500 outline-none" />
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50">Cancel</button>
                                            <button type="submit" className="flex-1 py-2 bg-brand-accent text-white rounded-lg text-sm font-semibold hover:bg-pink-600">Save</button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="lg:col-span-3">
                    <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-6 gap-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Package className="text-brand-accent" /> My Orders
                        </h2>

                        {/* Order Tabs */}
                        <div className="bg-white p-1 rounded-lg border border-gray-200 flex text-sm font-medium">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`px-4 py-1.5 rounded-md transition ${activeTab === 'all' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setActiveTab('active')}
                                className={`px-4 py-1.5 rounded-md transition ${activeTab === 'active' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setActiveTab('completed')}
                                className={`px-4 py-1.5 rounded-md transition ${activeTab === 'completed' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                Completed
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-accent"></div></div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-dashed border-gray-300">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <Package size={32} />
                            </div>
                            <p className="text-gray-500 mb-4">No {activeTab !== 'all' ? activeTab : ''} orders found.</p>
                            {activeTab === 'all' && <Link to="/products" className="text-brand-accent font-medium hover:underline">Start Shopping</Link>}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredOrders.map((order) => (
                                <div key={order._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition hover:shadow-md">
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">ORDER #{order._id.substring(order._id.length - 8)}</p>
                                            <div className="md:hidden">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                            <Clock size={14} /> {new Date(order.createdAt).toLocaleDateString()}
                                        </div>

                                        {/* Product Preview */}
                                        <div className="space-y-3 mb-4">
                                            {order.orderItems.map((item, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-md shrink-0 border border-gray-200 overflow-hidden">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                                                        <p className="text-xs text-gray-500">Qty: {item.qty} × ₹{item.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500">Total:</span>
                                            <span className="font-bold text-gray-900 text-lg">₹{order.totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 w-full md:w-auto items-end">
                                        <div className="hidden md:flex">
                                            <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {order.status === 'Delivered' ? <CheckCircle size={14} /> :
                                                    order.status === 'Cancelled' ? <XCircle size={14} /> :
                                                        <Clock size={14} />}
                                                {order.status}
                                            </div>
                                        </div>

                                        <div className={`text-xs font-semibold px-2 py-0.5 rounded border ${order.isPaid ? 'border-green-200 text-green-700 bg-green-50' : 'border-red-200 text-red-600 bg-red-50'}`}>
                                            {order.isPaid ? 'Paid' : 'Payment Pending'}
                                        </div>

                                        <Link to={`/order-success/${order._id}`} className="w-full md:w-auto text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-bold transition">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
