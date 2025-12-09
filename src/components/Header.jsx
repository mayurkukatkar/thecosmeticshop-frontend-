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

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };



    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    // Header style condition: Solid if scrolled OR not on home page
    const isHeaderSolid = isScrolled || !isHomePage;

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 transform 
            ${isVisible ? 'translate-y-0' : '-translate-y-full'}
            ${isVisible ? 'translate-y-0' : '-translate-y-full'}
            ${isHeaderSolid ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}
            `}
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center transition-all duration-300">
                {/* Logo & Brand Name */}
                <Link to="/" className="flex-shrink-0 group flex items-center">
                    <img
                        src="/logo.png"
                        alt="TheCosmeticShop"
                        className={`transition-all duration-300 object-contain mix-blend-multiply ${isHeaderSolid ? 'h-20' : 'h-24 md:h-32'}`}
                    />
                    <span className={`ml-3 font-serif font-bold text-2xl tracking-widest uppercase transition-colors duration-300 hidden lg:block ${isHeaderSolid ? 'text-brand-text' : 'text-white'}`}>
                        The Cosmetic Shop
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-12">
                    <div className="flex space-x-10">
                        {['Home', 'Products', 'About'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className={`relative font-medium text-xl tracking-wide group hover:text-brand-accent transition-colors duration-300 ${isHeaderSolid ? 'text-brand-text' : 'text-white'}`}
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    <div className={`h-6 w-px mx-2 ${isHeaderSolid ? 'bg-gray-300' : 'bg-white/30'}`}></div>

                    <div className="flex items-center space-x-6">
                        {/* Search Icon Placeholder for future */}
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

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden p-2 hover:text-brand-accent transition-colors ${isHeaderSolid ? 'text-brand-text' : 'text-white'}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={`
                absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg border-t border-gray-100
                transition-all duration-300 origin-top overflow-hidden
                ${isOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}
            `}>
                <nav className="container mx-auto px-4 flex flex-col space-y-4 text-center">
                    <Link to="/" className="text-xl font-medium text-gray-800 hover:text-brand-accent" onClick={toggleMenu}>Home</Link>
                    <Link to="/products" className="text-xl font-medium text-gray-800 hover:text-brand-accent" onClick={toggleMenu}>Shop</Link>
                    <Link to="/about" className="text-xl font-medium text-gray-800 hover:text-brand-accent" onClick={toggleMenu}>About</Link>
                    <hr className="border-gray-100 mx-8" />
                    <Link to="/cart" className="flex items-center justify-center space-x-2 text-gray-800 hover:text-brand-accent" onClick={toggleMenu}>
                        <ShoppingCart className="w-5 h-5" />
                        <span>Cart ({cartCount})</span>
                    </Link>
                    {userInfo ? (
                        <>
                            <Link to="/profile" className="text-gray-800 hover:text-brand-accent" onClick={toggleMenu}>My Profile</Link>
                            <button onClick={() => { logout(); toggleMenu(); }} className="text-red-500 hover:text-red-700">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="inline-block mx-auto px-8 py-3 bg-brand-accent text-white rounded-full font-medium" onClick={toggleMenu}>
                            Sign In
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
