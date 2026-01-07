'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { type MenuItem } from '@/data/restaurant/menuData';

interface MenuItemCardProps {
    item: MenuItem;
    onAddToCart: (item: MenuItem) => void;
    onOpenModal: (item: MenuItem) => void;
}

export function MenuItemCard({ item, onAddToCart, onOpenModal }: MenuItemCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer h-full flex flex-col"
            onClick={() => onOpenModal(item)}
        >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <motion.div
                    className="w-full h-full relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                >
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* Overlay */}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {item.isChefPick && (
                        <span className="bg-yellow-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1">
                            👨‍🍳 Chef&apos;s Pick
                        </span>
                    )}
                    {item.isPopular && (
                        <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1">
                            🔥 Popular
                        </span>
                    )}
                </div>

                {/* Quick View Button */}
                <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/90 backdrop-blur text-gray-800 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">
                        Quick View
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Name & Price Row */}
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold font-serif text-lg text-gray-900 group-hover:text-orange-600 transition-colors">
                        {item.name}
                    </h3>
                    <span className="font-bold text-orange-500 text-lg whitespace-nowrap ml-2">
                        ${item.price}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-grow">
                    {item.description}
                </p>

                {/* Dietary Icons */}
                <div className="flex items-center gap-2 mb-4">
                    {item.isVegetarian && (
                        <span className="text-sm" title="Vegetarian">🌱</span>
                    )}
                    {item.isGlutenFree && (
                        <span className="text-sm" title="Gluten-Free">🌾</span>
                    )}
                    {item.isSpicy && (
                        <span className="text-sm" title="Spicy">🌶️</span>
                    )}
                </div>

                {/* Add to Order Button */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                    }}
                    className="w-full bg-gray-100 hover:bg-orange-500 text-gray-800 hover:text-white font-bold uppercase tracking-widest text-xs py-3 px-4 rounded-full transition-all mt-auto"
                >
                    Add to Order
                </motion.button>
            </div>
        </motion.div>
    );
}
