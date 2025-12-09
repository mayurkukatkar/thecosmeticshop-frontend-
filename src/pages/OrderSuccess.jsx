import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const OrderSuccess = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            // In a real app we might fetch order details here to show summary
            // For now just simulation
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        };
        fetchOrder();
    }, [id]);

    return (
        <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg w-full border border-gray-100">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2 font-sans">Order Placed!</h1>
                <p className="text-gray-500 mb-8">Thank you for your purchase. We have received your order.</p>

                <div className="bg-gray-50 p-6 rounded-2xl mb-8 text-left">
                    <p className="text-sm text-gray-500 mb-1">Order ID</p>
                    <p className="font-mono font-bold text-gray-800 break-all">{id}</p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-brand-accent font-medium">We will confirm your order via call/WhatsApp shortly.</p>
                    </div>
                </div>

                <Link to="/products" className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2 shadow-lg shadow-pink-200">
                    Continue Shopping <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
