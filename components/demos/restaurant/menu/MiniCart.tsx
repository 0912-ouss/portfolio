'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type MenuItem } from '@/data/restaurant/menuData';

export interface CartItem extends MenuItem {
    quantity: number;
}

interface MiniCartProps {
    items: CartItem[];
    onRemoveItem: (itemId: string) => void;
    onUpdateQuantity: (itemId: string, quantity: number) => void;
    onClearCart: () => void;
}

export function MiniCart({ items, onRemoveItem, onUpdateQuantity, onClearCart }: MiniCartProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    if (items.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 z-50"
        >
            {/* Expanded Cart */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
                            <h3 className="font-bold uppercase tracking-wider text-sm">Your Order</h3>
                            <button
                                onClick={onClearCart}
                                className="text-xs text-gray-400 hover:text-white transition-colors"
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Items */}
                        <div className="max-h-64 overflow-y-auto p-4 space-y-3">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                                    <div className="flex-grow">
                                        <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                                        <p className="text-orange-500 font-bold text-sm">${item.price}</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                if (item.quantity === 1) {
                                                    onRemoveItem(item.id);
                                                } else {
                                                    onUpdateQuantity(item.id, item.quantity - 1);
                                                }
                                            }}
                                            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 p-4">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600 font-medium">Total</span>
                                <span className="text-xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase tracking-widest py-3 rounded-full transition-all text-sm">
                                Checkout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg shadow-orange-500/40 flex items-center gap-3 px-6 py-4 transition-all"
            >
                {/* Cart Icon */}
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {/* Badge */}
                    <span className="absolute -top-2 -right-2 bg-white text-orange-500 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {totalItems}
                    </span>
                </div>

                <span className="font-bold">${totalPrice.toFixed(2)}</span>

                {/* Arrow */}
                <motion.svg
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </motion.svg>
            </motion.button>
        </motion.div>
    );
}
