import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Save, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
    const [deliveryEmail, setDeliveryEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const { userInfo } = useContext(AuthContext);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                const { data } = await axios.get('/api/config/deliveryEmail', config);
                setDeliveryEmail(data.value || '');
                setLoading(false);
            } catch (error) {
                console.error("Error fetching settings:", error);
                setLoading(false);
            }
        };
        fetchSettings();
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.put('/api/config/deliveryEmail', { value: deliveryEmail }, config);
            toast.success('Settings Updated');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent"></div></div>;

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-8 text-gray-800">Settings</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Mail className="text-brand-accent" /> Email Configurations
                </h2>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Team Email</label>
                        <p className="text-xs text-gray-500 mb-2">Notifications for new orders will be sent to this address.</p>
                        <input
                            type="email"
                            placeholder="Enter email address"
                            value={deliveryEmail}
                            onChange={(e) => setDeliveryEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-brand-accent hover:bg-brand-accent-hover text-white px-8 py-3 rounded-xl font-bold transition shadow-lg shadow-pink-500/30 flex items-center gap-2"
                    >
                        <Save size={20} /> Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
