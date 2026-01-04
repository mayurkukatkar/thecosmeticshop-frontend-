import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartItems } = useContext(CartContext);
    const { userInfo, logout } = useContext(AuthContext);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    // Scroll Logic
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                const currentScrollY = window.scrollY;

                // Hide if scrolling down and past 100px
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }

                // Add shadow/background effect when not at top
                if (currentScrollY > 20) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }

                setLastScrollY(currentScrollY);
            }
        };


        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    // Force header visible if menu is open
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            // Optional: Lock body scroll
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Trigger check to set correct visibility state when closing
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            }
        }
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    // Header style condition: Solid if scrolled OR not on home page
    const isHeaderSolid = isScrolled || !isHomePage;

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 transform 
                ${isVisible || isOpen ? 'translate-y-0' : '-translate-y-full'}
                ${isHeaderSolid || isOpen ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-3 md:py-4'}
                `}
            >
                <div className="container mx-auto px-4 md:px-8 flex justify-between items-center transition-all duration-300">
                    {/* Logo & Brand Name */}
                    <Link to="/" className="flex-shrink-0 group flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="The Product Shop"
                            className={`transition-all duration-300 object-contain mix-blend-multiply ${isHeaderSolid ? 'h-12 md:h-16' : 'h-14 md:h-24 md:h-32'}`}
                        />
                        <span className={`font-serif font-bold text-lg md:text-2xl tracking-widest uppercase transition-colors duration-300 hidden sm:block ${isHeaderSolid ? 'text-brand-text' : 'text-white'}`}>
                            The Product Shop
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
                        <div className="flex space-x-6 lg:space-x-10">
                            {['Home', 'Products', 'About'].map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className={`relative font-medium text-lg lg:text-xl tracking-wide group hover:text-brand-accent transition-colors duration-300 ${isHeaderSolid ? 'text-brand-text' : 'text-white'}`}
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>

                        <div className={`h-6 w-px mx-2 ${isHeaderSolid ? 'bg-gray-300' : 'bg-white/30'}`}></div>

                        <div className="flex items-center space-x-6">
                            {/* Search Icon Placeholder */}
                            <button className={`hover:text-brand-accent transition-colors ${isHeaderSolid ? 'text-brand-text' : 'text-white'}`}>
                                <Search className="w-5 h-5" />
                            </button>

                            <Link to="/cart" className={`relative group hover:text-brand-accent transition-colors ${isHeaderSolid ? 'text-brand-text' : 'text-white'}`}>
                                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm animate-pulse">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {userInfo ? (
                                <div className="relative group">
                                    <button className={`flex items-center hover:text-brand-accent transition-colors ${isHeaderSolid ? 'text-brand-text' : 'text-white'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 border ${isHeaderSolid ? 'bg-brand-pink border-brand-accent/20' : 'bg-white/20 border-white/30 backdrop-blur'}`}>
                                            <User className={`w-4 h-4 ${isHeaderSolid ? 'text-brand-accent' : 'text-white'}`} />
                                        </div>
                                        <span className="font-medium text-sm hidden lg:block">{userInfo.name}</span>
                                    </button>
                                    {/* Dropdown */}
                                    <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block z-50">
                                        <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 transform opacity-0 group-hover:opacity-100 transition-all duration-200 origin-top-right">
                                            {userInfo.isAdmin && (
                                                <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-pink hover:text-brand-accent transition-colors">Dashboard</Link>
                                            )}
                                            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-pink hover:text-brand-accent transition-colors">Profile</Link>
                                            <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">Logout</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login" className={`flex items-center px-5 py-2 rounded-full border hover:border-brand-accent hover:text-white hover:bg-brand-accent transition-all duration-300 text-sm font-medium ${isHeaderSolid ? 'border-brand-text/20 text-brand-text' : 'border-white/40 text-white bg-white/10 backdrop-blur'}`}>
                                    <User className="w-4 h-4 mr-2" />
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu Actions */}
                    <div className="flex md:hidden items-center gap-4">
                        <Link to="/cart" className={`relative group hover:text-brand-accent transition-colors ${isHeaderSolid ? 'text-brand-text' : 'text-white'}`}>
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            className={`p-1 hover:text-brand-accent transition-colors ${isHeaderSolid ? 'text-brand-text' : 'text-white'}`}
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                        </button>
                    </div>
                </div>

            </header>

            {/* Mobile Nav Overlay */}
            <div className={`
                fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6
                transition-all duration-300 transform origin-top
                ${isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'}
                md:hidden overflow-y-auto
            `}>
                <nav className="flex flex-col space-y-6 text-center">
                    <Link to="/" className="text-2xl font-serif font-bold text-gray-800 hover:text-brand-accent pb-4 border-b border-gray-100" onClick={toggleMenu}>Home</Link>
                    <Link to="/products" className="text-2xl font-serif font-bold text-gray-800 hover:text-brand-accent pb-4 border-b border-gray-100" onClick={toggleMenu}>Shop</Link>
                    <Link to="/about" className="text-2xl font-serif font-bold text-gray-800 hover:text-brand-accent pb-4 border-b border-gray-100" onClick={toggleMenu}>About</Link>

                    {userInfo ? (
                        <>
                            <div className="flex items-center justify-center gap-3 py-2">
                                <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center text-brand-accent">
                                    <User size={20} />
                                </div>
                                <span className="font-bold text-lg">{userInfo.name}</span>
                            </div>
                            <Link to="/profile" className="text-lg font-medium text-gray-600 hover:text-brand-accent" onClick={toggleMenu}>My Profile</Link>
                            {userInfo.isAdmin && (
                                <Link to="/admin/dashboard" className="text-lg font-medium text-gray-600 hover:text-brand-accent" onClick={toggleMenu}>Dashboard</Link>
                            )}
                            <button onClick={() => { logout(); toggleMenu(); }} className="text-lg font-medium text-red-500 hover:text-red-700">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg mt-4" onClick={toggleMenu}>
                            Sign In
                        </Link>
                    )}
                </nav>
            </div>
        </>
    );
};

export default Header;
