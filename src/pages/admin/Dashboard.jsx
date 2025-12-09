import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, ShoppingBag, DollarSign, Package } from 'lucide-react';

const Dashboard = () => {
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
    });
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

                // Parallel fetching for performance
                const [ordersRes, productsRes, usersRes] = await Promise.all([
                    axios.get('/api/orders', config),
                    axios.get('/api/products'),
                    axios.get('/api/users', config)
                ]);

                const orders = ordersRes.data;
                const products = productsRes.data;
                const users = usersRes.data;

                const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

                setStats({
                    totalSales: totalSales,
                    totalOrders: orders.length,
                    totalProducts: products.length,
                    totalUsers: users.length,
                });

                // Prepare chart data (Sales per day roughly or just last 5 orders for simplicity in this demo)
                // Real app would aggregate by date on backend
                const data = orders.map(order => ({
                    name: new Date(order.createdAt).toLocaleDateString(),
                    sale: order.totalPrice
                })).slice(0, 7); // Last 7 orders as a sample for 'trend'

                setSalesData(data);
                setLoading(false);

            } catch (error) {
                console.error("Dashboard fetch error:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [userInfo, navigate]);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
                <Icon size={24} className="text-white" />
            </div>
        </div>
    );

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-gray-800">Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Sales" value={`₹${stats.totalSales.toFixed(2)}`} icon={DollarSign} color="bg-green-500" />
                <StatCard title="Orders" value={stats.totalOrders} icon={ShoppingBag} color="bg-blue-500" />
                <StatCard title="Products" value={stats.totalProducts} icon={Package} color="bg-purple-500" />
                <StatCard title="Users" value={stats.totalUsers} icon={Users} color="bg-orange-500" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sales Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6 text-gray-800">Recent Sales Trend</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                <Line type="monotone" dataKey="sale" stroke="#EC4899" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Placeholder for future chart or recent activity */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6 text-gray-800">Quick Actions</h3>
                    <div className="space-y-4">
                        <button onClick={() => navigate('/admin/products')} className="w-full text-left p-4 rounded-lg bg-gray-50 hover:bg-pink-50 hover:text-pink-600 transition flex items-center justify-between group">
                            <span className="font-semibold">Manage Inventory</span>
                            <span className="text-gray-400 group-hover:text-pink-600 text-sm">View Products &rarr;</span>
                        </button>
                        <button onClick={() => navigate('/admin/orders')} className="w-full text-left p-4 rounded-lg bg-gray-50 hover:bg-pink-50 hover:text-pink-600 transition flex items-center justify-between group">
                            <span className="font-semibold">Review Orders</span>
                            <span className="text-gray-400 group-hover:text-pink-600 text-sm">View Orders &rarr;</span>
                        </button>
                        <button onClick={() => navigate('/admin/users')} className="w-full text-left p-4 rounded-lg bg-gray-50 hover:bg-pink-50 hover:text-pink-600 transition flex items-center justify-between group">
                            <span className="font-semibold">Manage Users</span>
                            <span className="text-gray-400 group-hover:text-pink-600 text-sm">View Users &rarr;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
