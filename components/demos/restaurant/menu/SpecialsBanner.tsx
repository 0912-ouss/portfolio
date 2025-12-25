'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { todaySpecial } from '@/data/restaurant/menuData';

interface SpecialsBannerProps {
    onAddToCart: () => void;
}

export function SpecialsBanner({ onAddToCart }: SpecialsBannerProps) {
    const discount = Math.round((1 - parseFloat(todaySpecial.discountPrice) / parseFloat(todaySpecial.originalPrice)) * 100);

    return (
        <section className="py-16 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl overflow-hidden shadow-2xl"
            >
                <div className="flex flex-col lg:flex-row items-center">
                    {/* Image */}
                    <div className="relative w-full lg:w-1/2 h-64 lg:h-80">
                        <Image
                            src={todaySpecial.image}
                            alt={todaySpecial.name}
                            fill
                            className="object-cover"
                        />
                        {/* Discount Badge */}
                        <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 font-bold text-lg px-4 py-2 rounded-full">
                            {discount}% OFF
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12 text-white flex-grow">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <p className="text-orange-200 text-sm font-bold uppercase tracking-widest mb-2">
                                🔥 {todaySpecial.validUntil}
                            </p>
                            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
                                {todaySpecial.name}
                            </h2>
                            <p className="text-white/80 mb-6 text-lg">
                                {todaySpecial.description}
                            </p>

                            {/* Price */}
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-3xl font-bold">${todaySpecial.discountPrice}</span>
                                <span className="text-xl text-white/50 line-through">${todaySpecial.originalPrice}</span>
                            </div>

                            {/* CTA */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onAddToCart}
                                className="bg-white text-orange-600 font-bold uppercase tracking-widest text-sm py-4 px-8 rounded-full hover:shadow-lg transition-all"
                            >
                                Order Now
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
