import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const cartFromStorage = localStorage.getItem('cartItems');
        return cartFromStorage ? JSON.parse(cartFromStorage) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, qty = 1) => {
        setCartItems((prevItems) => {
            const existItem = prevItems.find((x) => x._id === product._id);
            if (existItem) {
                // Ensure we don't exceed stock if we had that data, but for now just add
                // Actually if coming from ProductDetail, qty is usually the final desired quantity or added quantity.
                // Let's assume it adds to existing.
                return prevItems.map((x) =>
                    x._id === product._id ? { ...x, qty: x.qty + qty } : x
                );
            } else {
                return [...prevItems, { ...product, qty }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((x) => x._id !== id));
    };

    const updateQty = (id, script) => { // script: 'inc' | 'dec'
        setCartItems(prev => prev.map(item => {
            if (item._id === id) {
                if (script === 'inc') return { ...item, qty: item.qty + 1 };
                if (script === 'dec' && item.qty > 1) return { ...item, qty: item.qty - 1 };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
