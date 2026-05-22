import React, { useState, useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Home, Grid, ShoppingCart, User, Menu, X, Info, LayoutDashboard, LogOut, LogIn } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const BottomNavigation = () => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const { cartItems } = useContext(CartContext);
    const { userInfo, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const toggleSheet = () => {
        setIsSheetOpen(!isSheetOpen);
    };

    const handleMenuClick = (path) => {
        setIsSheetOpen(false);
        navigate(path);
    };

    const handleLogout = () => {
        setIsSheetOpen(false);
        logout();
        navigate('/');
    };

    return (
        <>
            {/* Sticky Bottom Tab Bar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] py-2 px-4 z-40 md:hidden flex justify-around items-center">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 transition ${
                            isActive ? 'text-brand-green font-bold' : 'text-gray-400 hover:text-gray-600'
                        }`
                    }
                >
                    <Home size={22} />
                    <span className="text-[10px] tracking-wide">Home</span>
                </NavLink>

                <NavLink
                    to="/products"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 transition ${
                            isActive ? 'text-brand-green font-bold' : 'text-gray-400 hover:text-gray-600'
                        }`
                    }
                >
                    <Grid size={22} />
                    <span className="text-[10px] tracking-wide">Shop</span>
                </NavLink>

                <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 relative transition ${
                            isActive ? 'text-brand-green font-bold' : 'text-gray-400 hover:text-gray-600'
                        }`
                    }
                >
                    <div className="relative">
                        <ShoppingCart size={22} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-2 bg-brand-gold text-white text-[9px] font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center shadow-sm">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] tracking-wide">Cart</span>
                </NavLink>

                {userInfo ? (
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 transition ${
                                isActive ? 'text-brand-green font-bold' : 'text-gray-400 hover:text-gray-600'
                            }`
                        }
                    >
                        <User size={22} />
                        <span className="text-[10px] tracking-wide">Profile</span>
                    </NavLink>
                ) : (
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 transition ${
                                isActive ? 'text-brand-green font-bold' : 'text-gray-400 hover:text-gray-600'
                            }`
                        }
                    >
                        <User size={22} />
                        <span className="text-[10px] tracking-wide">Sign In</span>
                    </NavLink>
                )}

                {/* More / Hamburger Tab */}
                <button
                    onClick={toggleSheet}
                    className={`flex flex-col items-center gap-1 transition ${
                        isSheetOpen ? 'text-brand-green font-bold' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    <Menu size={22} />
                    <span className="text-[10px] tracking-wide">More</span>
                </button>
            </nav>

            {/* Slide-Up Bottom Sheet Overlay */}
            {isSheetOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 md:hidden flex flex-col justify-end">
                    {/* Background click to close */}
                    <div className="absolute inset-0" onClick={toggleSheet}></div>

                    {/* Bottom Sheet content */}
                    <div className="relative bg-white rounded-t-3xl shadow-2xl p-6 z-10 max-h-[85vh] overflow-y-auto animate-slide-up transform transition-transform duration-300">
                        {/* Pull Indicator Bar */}
                        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-5"></div>

                        {/* Title and Close */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold font-serif text-brand-green">Chawke Fashion</h3>
                                <p className="text-xs text-gray-400">Premium Traditional wear</p>
                            </div>
                            <button
                                onClick={toggleSheet}
                                className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-full transition"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Options */}
                        <div className="space-y-2">
                            <button
                                onClick={() => handleMenuClick('/about')}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-brand-pink/30 hover:text-brand-green transition text-left text-gray-700 font-medium"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-brand-green shadow-xs">
                                    <Info size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">About Us</p>
                                    <p className="text-xs text-gray-400">Our legacy, values and story</p>
                                </div>
                            </button>

                            {userInfo?.isAdmin && (
                                <button
                                    onClick={() => handleMenuClick('/admin/dashboard')}
                                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-brand-pink/30 hover:text-brand-green transition text-left text-gray-700 font-medium"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-brand-gold shadow-xs">
                                        <LayoutDashboard size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-brand-green">Admin Dashboard</p>
                                        <p className="text-xs text-gray-400">Manage orders, products & content</p>
                                    </div>
                                </button>
                            )}

                            {userInfo ? (
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50/50 hover:bg-red-50 transition text-left text-red-600 font-medium"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white border border-red-100 flex items-center justify-center text-red-500 shadow-xs">
                                        <LogOut size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold">Sign Out</p>
                                        <p className="text-xs text-red-400">Logout from your account</p>
                                    </div>
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleMenuClick('/login')}
                                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-brand-pink/30 hover:text-brand-green transition text-left text-gray-700 font-medium"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-brand-green shadow-xs">
                                        <LogIn size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold">Sign In</p>
                                        <p className="text-xs text-gray-400">Access your account and orders</p>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BottomNavigation;
