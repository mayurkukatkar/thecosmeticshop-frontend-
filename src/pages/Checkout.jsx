import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Truck, CreditCard, CheckCircle, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Checkout = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const { userInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [landmark, setLandmark] = useState('');
    const [isPlacing, setIsPlacing] = useState(false);

    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=/checkout');
        } else if (!cartItems.length && !isOrderPlaced) {
            navigate('/cart');
        }
    }, [cartItems, navigate, isOrderPlaced, userInfo]);

    if (!cartItems.length && !isOrderPlaced) {
        return null;
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = subtotal > 999 ? 0 : 50;
    const total = subtotal + shipping;

    const placeOrderHandler = async (e) => {
        e.preventDefault();
        if (!userInfo) {
            navigate('/login?redirect=/checkout');
            return;
        }
        setIsPlacing(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const orderData = {
                orderItems: cartItems.map(item => ({
                    ...item,
                    product: item._id // The backend schema likely expects 'product: ObjectId'
                })),
                shippingAddress: {
                    address: `${address} (Landmark: ${landmark})`,
                    city,
                    postalCode,
                    country,
                    state,
                    phone
                },
                paymentMethod,
                itemsPrice: subtotal,
                shippingPrice: shipping,
                totalPrice: total,
            };

            // Double check data structure
            console.log("Sending Order Data:", orderData);

            const { data } = await axios.post('/api/orders', orderData, config);

            setIsOrderPlaced(true);
            clearCart();
            toast.success("Order placed successfully!");
            navigate(`/order-success/${data._id}`);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsPlacing(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-cream font-sans py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-12 text-gray-900">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Left: Shipping Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-brand-pink text-brand-accent flex items-center justify-center">
                                    <MapPin size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Shipping Details</h2>
                            </div>

                            <form id="checkout-form" onSubmit={placeOrderHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-pink-100 outline-none transition" placeholder="House no, Street name" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Landmark (Optional)</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-pink-100 outline-none transition" placeholder="Near Apollo Hospital" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-pink-100 outline-none transition" placeholder="Mumbai" value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-pink-100 outline-none transition" placeholder="Maharashtra" value={state} onChange={(e) => setState(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code</label>
                                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-pink-100 outline-none transition" placeholder="400001" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                    <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-pink-100 outline-none transition" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-pink-100 outline-none transition" placeholder="India" value={country} onChange={(e) => setCountry(e.target.value)} />
                                </div>
                            </form>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                                    <CreditCard size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                            </div>

                            <div className="space-y-4">
                                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'COD' ? 'border-brand-accent bg-pink-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                    <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-brand-accent" />
                                    <div className="ml-4 flex items-center gap-2">
                                        <Truck size={20} className="text-gray-500" />
                                        <span className="font-bold text-gray-900">Cash on Delivery</span>
                                    </div>
                                    <span className="ml-auto text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">No Extra Fee</span>
                                </label>
                                {/* Future Stripe integration placeholder */}
                                <div className="p-4 border border-dashed border-gray-200 rounded-xl flex items-center gap-4 opacity-50 cursor-not-allowed">
                                    <div className="w-5 h-5 rounded-full border border-gray-300"></div>
                                    <span className="font-medium text-gray-400">Credit/Debit Card (Coming Soon)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">In Your Bag</h2>
                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map(item => (
                                    <div key={item._id} className="flex gap-4 items-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                                            <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                                        </div>
                                        <div className="font-bold text-brand-accent">₹{item.price * item.qty}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    {shipping === 0 ? <span className="text-green-500">Free</span> : <span>₹{shipping}</span>}
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            <button
                                form="checkout-form"
                                type="submit"
                                disabled={isPlacing}
                                className="w-full mt-8 bg-brand-accent hover:bg-brand-accent-hover text-white py-4 rounded-xl font-bold shadow-lg shadow-pink-200 transition transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isPlacing ? <Loader className="animate-spin" /> : <>Place Order <CheckCircle size={20} /></>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
