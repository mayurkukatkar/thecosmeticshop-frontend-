import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showVerify, setShowVerify] = useState(false);

    const { login, userInfo } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get('redirect') || location.state?.from || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setShowVerify(false); // Reset
        const res = await login(email, password);
        setLoading(false);
        if (res.success) {
            toast.success("Welcome back!");
            navigate(redirect);
        } else {
            toast.error(res.error);
            if (res.error && res.error.toLowerCase().includes('verify')) {
                setShowVerify(true);
            }
        }
    };

    return (
        <div className="min-h-screen bg-brand-cream flex items-center justify-center font-sans py-12 px-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                <div className="p-8 md:p-12 w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-500">Sign in to access your account</p>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-pink-100 outline-none transition"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block text-sm font-bold text-gray-700">Password</label>
                                <a href="#" className="text-xs font-semibold text-brand-accent hover:underline">Forgot?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-accent focus:ring-2 focus:ring-pink-100 outline-none transition"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white py-4 rounded-xl font-bold shadow-lg shadow-pink-200 transition transform hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
                        </button>
                    </form>

                    {/* Verification Helper */}
                    {showVerify && (
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-xl text-center animate-fade-in-up">
                            <p className="text-sm text-yellow-800 mb-2">Account requires verification.</p>
                            <Link
                                to="/verify-otp"
                                state={{ email: email }}
                                className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 text-sm font-bold rounded-lg hover:bg-yellow-200 transition"
                            >
                                Verify Now →
                            </Link>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-gray-500">Don't have an account? <Link to="/register" className="text-brand-accent font-bold hover:underline">Create One</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
