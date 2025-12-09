import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQty } = useContext(CartContext);
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = subtotal > 999 ? 0 : 50;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-brand-cream flex items-center justify-center font-sans">
                <div className="text-center p-8">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <ShoppingBag size={40} className="text-gray-300" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Discover our premium products and start your journey.</p>
                    <Link to="/products" className="bg-brand-accent hover:bg-brand-accent-hover text-white px-8 py-4 rounded-full font-bold shadow-lg transition inline-flex items-center gap-2">
                        Start Shopping <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-cream font-sans py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-4">
                    Your Cart <span className="text-lg font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">{cartItems.length} items</span>
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items List */}
                    <div className="lg:w-2/3 space-y-4">
                        {cartItems.map(item => (
                            <div key={item._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 relative group">
                                <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                                    <p className="text-brand-accent font-bold">₹{item.price}</p>
                                </div>

                                <div className="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2">
                                    <button onClick={() => updateQty(item._id, 'dec')} className="p-1 hover:text-brand-accent transition"><Minus size={16} /></button>
                                    <span className="font-bold w-4 text-center">{item.qty}</span>
                                    <button onClick={() => updateQty(item._id, 'inc')} className="p-1 hover:text-brand-accent transition"><Plus size={16} /></button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="p-3 text-gray-400 hover:text-red-500 sm:absolute sm:top-6 sm:right-6 transition"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}

                        <div className="mt-6">
                            <Link to="/products" className="text-gray-500 hover:text-brand-accent font-semibold inline-flex items-center gap-2 transition">
                                <ArrowLeft size={18} /> Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-bold">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    {shipping === 0 ? <span className="text-green-500 font-bold">Free</span> : <span>₹{shipping}</span>}
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white py-4 rounded-xl font-bold shadow-lg shadow-pink-200 transition transform hover:scale-105 flex justify-between px-6 items-center"
                            >
                                <span>Checkout</span>
                                <ArrowRight size={20} />
                            </button>

                            <div className="mt-6 text-center text-xs text-gray-400">
                                <p>Secure Checkout - 256-bit SSL Encryption</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
