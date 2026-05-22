import React, { useContext, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Image, LogOut, ArrowLeft, Menu, X, Settings } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const AdminLayout = () => {
    const { logout } = useContext(AuthContext);
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex flex-col md:flex-row h-screen bg-brand-cream overflow-hidden">
            {/* Mobile Top Bar */}
            <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 border-b border-gray-100 shadow-sm z-30">
                <div className="flex items-center gap-3">
                    <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition" aria-label="Toggle menu">
                        <Menu size={24} />
                    </button>
                    <span className="font-serif text-lg font-bold text-brand-accent">Chawke Admin</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center text-brand-accent font-bold text-xs">
                    AD
                </div>
            </header>

            {/* Backdrop / Overlay for mobile drawer */}
            {sidebarOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity" 
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar drawer (slide-in on mobile, static on desktop) */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl border-r border-gray-100 z-50 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:transform-none md:shadow-sm md:z-10
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                
                {/* Drawer Header (mobile only) */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <span className="font-serif text-xl font-bold text-brand-accent">Chawke Fashion</span>
                        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Admin Dashboard</h2>
                    </div>
                    <button onClick={closeSidebar} className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <NavLink to="/admin/dashboard" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-brand-pink text-brand-accent font-semibold shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <LayoutDashboard size={18} /> Dashboard
                    </NavLink>
                    <NavLink to="/admin/products" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-brand-pink text-brand-accent font-semibold shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Package size={18} /> Products
                    </NavLink>
                    <NavLink to="/admin/orders" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-brand-pink text-brand-accent font-semibold shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <ShoppingBag size={18} /> Orders
                    </NavLink>
                    <NavLink to="/admin/users" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-brand-pink text-brand-accent font-semibold shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Users size={18} /> Users
                    </NavLink>
                    <NavLink to="/admin/banners" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-brand-pink text-brand-accent font-semibold shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Image size={18} /> Banners
                    </NavLink>
                    <NavLink to="/admin/settings" onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-brand-pink text-brand-accent font-semibold shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Settings size={18} /> Settings
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-gray-100 space-y-1">
                    <NavLink to="/" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-brand-accent transition-colors rounded-xl">
                        <ArrowLeft size={16} /> Back to Store
                    </NavLink>
                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors text-left">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
                    <Outlet />
                </main>

                {/* Mobile Bottom Tab Bar */}
                <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg flex justify-around items-center h-16 z-30 px-2">
                    <NavLink to="/admin/dashboard" className={({ isActive }) => `flex flex-col items-center justify-center flex-1 py-1 text-xs transition-colors ${isActive ? 'text-brand-accent font-bold scale-105' : 'text-gray-400 hover:text-gray-600'}`}>
                        <LayoutDashboard size={20} />
                        <span className="mt-1">Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin/products" className={({ isActive }) => `flex flex-col items-center justify-center flex-1 py-1 text-xs transition-colors ${isActive ? 'text-brand-accent font-bold scale-105' : 'text-gray-400 hover:text-gray-600'}`}>
                        <Package size={20} />
                        <span className="mt-1">Products</span>
                    </NavLink>
                    <NavLink to="/admin/orders" className={({ isActive }) => `flex flex-col items-center justify-center flex-1 py-1 text-xs transition-colors ${isActive ? 'text-brand-accent font-bold scale-105' : 'text-gray-400 hover:text-gray-600'}`}>
                        <ShoppingBag size={20} />
                        <span className="mt-1">Orders</span>
                    </NavLink>
                    <button onClick={toggleSidebar} className="flex flex-col items-center justify-center flex-1 py-1 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                        <Menu size={20} />
                        <span className="mt-1">More</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default AdminLayout;
