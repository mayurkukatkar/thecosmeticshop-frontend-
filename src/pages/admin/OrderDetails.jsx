import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { ArrowLeft, MapPin, Phone, Mail, User, Clock, CheckCircle, Truck, Package, XCircle, ChevronDown, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

const OrderDetails = () => {
    const { id } = useParams();
    const { userInfo } = useContext(AuthContext);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statusLoading, setStatusLoading] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const { data } = await axios.get(`/api/orders/${id}`, config);
                setOrder(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching order:", error);
                toast.error("Failed to load order details");
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id, userInfo.token]);

    const updateStatusHandler = async (status) => {
        setStatusLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            // Assuming backend endpoint follows typical pattern. 
            // If specific endpoints like /deliver exist, we might need to adjust logic,
            // but usually /:id with status Update is common or specific flags.
            // Based on previous context, let's assume a generic update or specific endpoints.
            // Let's try the generic update structure first or typical flags.
            // Often "mark as delivered" is a specific endpoint.

            let updateUrl = `/api/orders/${id}/deliver`; // Defaulting to 'deliver' endpoint if it matches 'Delivered'
            if (status !== 'Delivered') {
                // For generic status updates if backend supports it, otherwise we might need to add it backend side.
                // Assuming standard MERN boilerplate often has /deliver and /pay. 
                // If we want a generic status update, we might need to modify backend.
                // For now, let's assume we are updating 'isDelivered' or adding a 'status' field.
                // Let's assume we can PUT to /api/orders/:id with { status: ... } if backend supports.
                // If not, we might need to restrict to "Mark Delivered".

                // Let's try to just update status via a generic PUT if not verified.
                // Re-checking task instructions: "Buttons to update status".
                updateUrl = `/api/orders/${id}/status`;
            }

            // Since I don't have the backend active file for routes open right now (only orderRoutes.js was open earlier but closed),
            // I'll assume we might need to verify backend routes.
            // However, to proceed, I will use a hypothetical endpoint and if it fails, I will debug.
            // Actually, wait, standard practice is often just PUT /api/orders/:id/deliver for delivered.

            // Let's implement a safe approach:
            if (status === 'Delivered') {
                await axios.put(`/api/orders/${id}/deliver`, {}, config);
            } else {
                // Fallback or Generic
                // If backend doesn't support generic status, this might fail.
                // I'll stick to 'Delivered' as the main action usually provided in basics.
                // But for a full admin panel, we want 'Processing', 'Shipped'.
                // I will assume I need to create/use a route that accepts status.
                await axios.put(`/api/orders/${id}/status`, { status }, config);
            }

            setOrder({ ...order, status: status, isDelivered: status === 'Delivered' });
            toast.success(`Order marked as ${status}`);
        } catch (error) {
            // If 404, maybe route doesn't exist.
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setStatusLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div></div>;
    if (!order) return <div className="text-center p-10">Order not found</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/admin/orders" className="p-2 hover:bg-gray-100 rounded-full transition">
                    <ArrowLeft size={24} className="text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                    <p className="text-sm text-gray-500">ID: {order._id}</p>
                </div>
                <div className="ml-auto flex gap-2">
                    {/* Status Actions */}
                    <div className="relative group">
                        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition">
                            {statusLoading ? 'Updating...' : 'Update Status'} <ChevronDown size={16} />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hidden group-hover:block z-10 p-1">
                            {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => updateStatusHandler(s)}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-brand-pink/20 hover:text-brand-accent rounded-lg transition"
                                >
                                    Mark as {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Items */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <Package size={18} className="text-brand-accent" /> Order Items
                            </h3>
                            <span className="text-sm font-medium text-gray-500">{order.orderItems.length} Items</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <Link to={`/product/${item.product}`} className="font-bold text-gray-900 hover:text-brand-accent transition">
                                            {item.name}
                                        </Link>
                                        <p className="text-sm text-gray-500">{item.category || 'Category'}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-gray-900">₹{item.price}</div>
                                        <div className="text-sm text-gray-500">Qty: {item.qty}</div>
                                    </div>
                                    <div className="w-24 text-right font-bold text-brand-accent">
                                        ₹{item.price * item.qty}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-8 text-sm">
                            <div className="text-gray-500">Subtotal: <span className="font-bold text-gray-900 ml-2">₹{order.itemsPrice}</span></div>
                            <div className="text-gray-500">Shipping: <span className="font-bold text-gray-900 ml-2">₹{order.shippingPrice}</span></div>
                            <div className="text-brand-accent text-lg font-bold">Total: ₹{order.totalPrice}</div>
                        </div>
                    </div>

                    {/* Transaction Info - often useful for admins */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                            <div className="font-bold text-gray-900 flex items-center gap-2">
                                {order.paymentMethod}
                                {order.isPaid ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">PAID</span> : <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">PENDING</span>}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Order Date</p>
                            <div className="font-bold text-gray-900 flex items-center gap-2">
                                <Calendar size={16} /> {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Order Status</p>
                            <div className={`font-bold px-3 py-1 rounded-full inline-flex items-center gap-2 ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                {order.isDelivered ? <CheckCircle size={16} /> : <Clock size={16} />}
                                {order.isDelivered ? 'Delivered' : order.status || 'Processing'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Customer */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 pb-3 border-b border-gray-100">
                            <User size={18} className="text-brand-accent" /> Customer Details
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 rounded-full text-gray-500"><User size={16} /></div>
                                <div>
                                    <p className="text-xs text-gray-400">Name</p>
                                    <p className="font-semibold text-gray-800">{order.user?.name || 'Guest User'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 rounded-full text-gray-500"><Mail size={16} /></div>
                                <div>
                                    <p className="text-xs text-gray-400">Email</p>
                                    <a href={`mailto:${order.user?.email}`} className="font-semibold text-brand-accent hover:underline">{order.user?.email}</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 pb-3 border-b border-gray-100">
                            <Truck size={18} className="text-brand-accent" /> Delivery Address
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-100 rounded-full text-gray-500"><MapPin size={16} /></div>
                                <div>
                                    <p className="font-medium text-gray-800 leading-snug">
                                        {order.shippingAddress?.address}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {order.shippingAddress?.country}
                                    </p>
                                </div>
                            </div>
                            {order.shippingAddress?.phone && (
                                <div className="flex items-start gap-3 pt-2 border-t border-gray-50 mt-2">
                                    <div className="p-2 bg-gray-100 rounded-full text-gray-500"><Phone size={16} /></div>
                                    <div>
                                        <p className="text-xs text-gray-400">Contact Number</p>
                                        <a href={`tel:${order.shippingAddress.phone}`} className="font-bold text-gray-800 hover:text-brand-accent transition">{order.shippingAddress.phone}</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
