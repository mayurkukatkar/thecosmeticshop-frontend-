import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BottomNavigation from './BottomNavigation';

const Layout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <>
            <Header />
            <main className={`flex-grow pb-16 md:pb-0 ${!isHomePage ? 'pt-24 md:pt-32' : ''}`}>
                <Outlet />
            </main>
            <BottomNavigation />
            <Footer />
        </>
    );
};

export default Layout;
