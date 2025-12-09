import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const { verifyOtp, resendOtp, userInfo } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || new URLSearchParams(location.search).get('email');

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
        if (!email) {
            navigate('/login');
        }
    }, [userInfo, navigate, email]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await verifyOtp(email, otp);
        setLoading(false);
        if (res.success) {
            toast.success('Email Verified Successfully!');
            navigate('/');
        } else {
            toast.error(res.error);
        }
    };

    const resendHandler = async () => {
        setLoading(true);
        const res = await resendOtp(email);
        setLoading(false);
        if (res.success) {
            toast.success('OTP Resent! Check your email.');
        } else {
            toast.error(res.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-sans">Verify OTP</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter the 6-digit code sent to <br /><span className="font-semibold text-brand-accent">{email}</span>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={submitHandler}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                type="text"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-lg text-center tracking-widest"
                                placeholder="------"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-brand-accent hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Verifying...' : 'Verify Email'}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <button
                        onClick={resendHandler}
                        disabled={loading}
                        className="text-sm text-gray-500 hover:text-brand-accent font-medium underline"
                    >
                        Didn't receive code? Resend OTP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
