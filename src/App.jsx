import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Dashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/ProductList';
import ProductEdit from './pages/admin/ProductEdit';
import OrderList from './pages/admin/OrderList';
import OrderDetails from './pages/admin/OrderDetails';
import BannerList from './pages/admin/BannerList';
import BannerEdit from './pages/admin/BannerEdit';
import UserList from './pages/admin/UserList';
import Settings from './pages/admin/Settings';
import AdminLayout from './components/AdminLayout';
import VerifyOtp from './pages/VerifyOtp';
import Profile from './pages/Profile';
import About from './pages/About';
import { Toaster } from 'react-hot-toast';

import OrderSuccess from './pages/OrderSuccess';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Toaster position="top-center" />

            <Routes>
              {/* Public Routes with Header and Footer */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success/:id" element={<OrderSuccess />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Admin Routes - AdminLayout handles its own structure */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<ProductList />} />
                <Route path="product/:id/edit" element={<ProductEdit />} />
                <Route path="orders" element={<OrderList />} />
                <Route path="order/:id" element={<OrderDetails />} />
                <Route path="banners" element={<BannerList />} />
                <Route path="banner/:id/edit" element={<BannerEdit />} />
                <Route path="users" element={<UserList />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
