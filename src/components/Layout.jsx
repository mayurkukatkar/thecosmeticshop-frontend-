import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <>
            <Header />
            <main className={`flex-grow ${!isHomePage ? 'pt-32' : ''}`}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
