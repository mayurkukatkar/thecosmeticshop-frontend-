import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const userFromStorage = localStorage.getItem('userInfo');
        if (userFromStorage) {
            setUserInfo(JSON.parse(userFromStorage));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post('/api/users/login', { email, password }, config);
            setUserInfo(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || error.message };
        }
    };

    const register = async (name, email, password) => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            await axios.post('/api/users', { name, email, password }, config);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message,
            };
        }
    };

    const verifyOtp = async (email, otp) => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            const { data } = await axios.post('/api/users/verify', { email, otp }, config);
            setUserInfo(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message,
            };
        }
    };

    const resendOtp = async (email) => {
        try {
            const config = { headers: { 'Content-Type': 'application/json' } };
            await axios.post('/api/users/resend-otp', { email }, config);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message,
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
    };

    return (
        <AuthContext.Provider value={{ userInfo, login, register, verifyOtp, resendOtp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
