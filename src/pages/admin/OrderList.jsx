import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Check, X, ChevronDown, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            fetchOrders();
        } else {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const fetchOrders = async () => {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get('/api/orders', config);
        setOrders(data);
    };

    const statusHandler = async (id, status) => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`/api/orders/${id}/status`, { status }, config);
            toast.success(`Order Updated to ${status}`);
            fetchOrders();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const statusColors = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Confirmed': 'bg-blue-100 text-blue-800',
        'Shipped': 'bg-indigo-100 text-indigo-800',
        'Delivered': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-red-100 text-red-800',
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (order.user && order.user.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === '' || order.status === statusFilter || (statusFilter === 'Pending' && !order.status);
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-gray-800">Orders</h1>
            <div className="flex justify-between items-center mb-6 gap-4">
                <div className="relative flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder="Search by Order ID or User Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-4 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Filter Status:</span>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 cursor-pointer"
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredOrders.length === 0 ? (
                            <tr>
                                <td colspan="6" className="px-5 py-8 text-center text-gray-500">
                                    No orders found matching your filters.
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition">
                                    <td className="px-5 py-4 text-sm font-mono text-gray-500">{order._id.substring(0, 8)}...</td>
                                    <td className="px-5 py-4 text-sm font-medium text-gray-800">{order.user ? order.user.name : <span className="text-red-400">Deleted User</span>}</td>
                                    <td className="px-5 py-4 text-sm text-gray-600">{order.createdAt.substring(0, 10)}</td>
                                    <td className="px-5 py-4 text-sm font-bold text-gray-800">₹{order.totalPrice}</td>
                                    <td className="px-5 py-4 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || 'bg-gray-100'}`}>
                                            {order.status || (order.isDelivered ? 'Delivered' : 'Pending')}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Link to={`/admin/order/${order._id}`} className="p-2 text-gray-500 hover:bg-gray-100 hover:text-brand-accent rounded-lg transition" title="View Details">
                                                <Eye size={18} />
                                            </Link>
                                            <div className="relative group inline-block">
                                                <select
                                                    value={order.status || (order.isDelivered ? 'Delivered' : 'Pending')}
                                                    onChange={(e) => statusHandler(order._id, e.target.value)}
                                                    className="appearance-none bg-white border border-gray-300 hover:border-brand-accent px-3 py-1 pr-8 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent cursor-pointer transition shadow-sm w-32"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Confirmed">Confirmed</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                                <ChevronDown className="w-4 h-4 absolute right-2 top-1.5 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
