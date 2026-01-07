'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const categories = [
    {
        name: "Robes",
        count: 48,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Manteaux",
        count: 32,
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Accessoires",
        count: 86,
        image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop"
    }
];

export function EcommerceCategories() {
    return (
        <section className="py-24 bg-[#FAF8F5]">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#D4A574] text-xs uppercase tracking-[0.3em] block mb-4"
                    >
                        Shop by Category
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-light tracking-tight"
                    >
                        Explorez les <span className="font-serif italic">Collections</span>
                    </motion.h2>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <motion.a
                            key={category.name}
                            href="#"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            className="group relative aspect-[3/4] overflow-hidden"
                        >
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 p-8">
                                <span className="text-white/60 text-xs uppercase tracking-widest block mb-2">
                                    {category.count} Articles
                                </span>
                                <h3 className="text-2xl font-light text-white mb-4">
                                    {category.name}
                                </h3>
                                <div className="flex items-center gap-2 text-white text-sm group-hover:gap-4 transition-all">
                                    <span>Explorer</span>
                                    <FiArrowRight />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
