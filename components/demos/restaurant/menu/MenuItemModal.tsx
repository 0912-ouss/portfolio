'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { type MenuItem } from '@/data/restaurant/menuData';

interface MenuItemModalProps {
    item: MenuItem | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (item: MenuItem, quantity: number) => void;
}

export function MenuItemModal({ item, isOpen, onClose, onAddToCart }: MenuItemModalProps) {
    const [quantity, setQuantity] = useState(1);

    if (!item) return null;

    const handleAddToCart = () => {
        onAddToCart(item, quantity);
        setQuantity(1);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[90vh] bg-white rounded-2xl overflow-hidden z-50 flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors shadow-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image */}
                        <div className="relative h-64 md:h-80 flex-shrink-0">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />

                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                {item.isChefPick && (
                                    <span className="bg-yellow-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1">
                                        👨‍🍳 Chef&apos;s Pick
                                    </span>
                                )}
                                {item.isPopular && (
                                    <span className="bg-red-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1">
                                        🔥 Popular
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto flex-grow">
                            {/* Name & Price */}
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
                                    {item.name}
                                </h2>
                                <span className="text-2xl md:text-3xl font-bold text-orange-500">
                                    ${item.price}
                                </span>
                            </div>

                            {/* Dietary Icons */}
                            <div className="flex items-center gap-3 mb-4">
                                {item.isVegetarian && (
                                    <span className="flex items-center gap-1 text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full">
                                        🌱 Vegetarian
                                    </span>
                                )}
                                {item.isGlutenFree && (
                                    <span className="flex items-center gap-1 text-sm text-gray-600 bg-amber-50 px-3 py-1 rounded-full">
                                        🌾 Gluten-Free
                                    </span>
                                )}
                                {item.isSpicy && (
                                    <span className="flex items-center gap-1 text-sm text-gray-600 bg-red-50 px-3 py-1 rounded-full">
                                        🌶️ Spicy
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {item.description}
                            </p>

                            {/* Divider */}
                            <hr className="border-gray-200 mb-6" />

                            {/* Quantity Selector */}
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-gray-700 font-medium">Quantity</span>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="text-xl font-bold text-gray-900 w-8 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-gray-200 bg-gray-50">
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAddToCart}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase tracking-widest py-4 px-6 rounded-full transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-500/30"
                            >
                                <span>Add to Order</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full">
                                    ${(parseFloat(item.price) * quantity).toFixed(2)}
                                </span>
                            </motion.button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
