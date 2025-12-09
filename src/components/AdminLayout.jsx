import React, { useContext } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Image, LogOut, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const AdminLayout = () => {
    const { logout } = useContext(AuthContext);
    const location = useLocation();

    // Hide on non-admin routes just in case, but usually handled by Route structure

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-sm border-r border-gray-100 flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Admin Panel</h2>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <NavLink to="/admin/dashboard" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-pink text-brand-accent' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <LayoutDashboard size={20} /> Dashboard
                    </NavLink>
                    <NavLink to="/admin/products" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-pink text-brand-accent' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Package size={20} /> Products
                    </NavLink>
                    <NavLink to="/admin/orders" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-pink text-brand-accent' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <ShoppingBag size={20} /> Orders
                    </NavLink>
                    <NavLink to="/admin/users" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-pink text-brand-accent' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Users size={20} /> Users
                    </NavLink>
                    <NavLink to="/admin/banners" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-pink text-brand-accent' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Image size={20} /> Banners
                    </NavLink>
                    <NavLink to="/admin/settings" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-brand-pink text-brand-accent' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                        <Users size={20} /> Settings
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-gray-100 space-y-2">
                    <NavLink to="/" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-500 hover:text-brand-accent transition-colors">
                        <ArrowLeft size={18} /> Back to Store
                    </NavLink>
                    <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors text-left">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
