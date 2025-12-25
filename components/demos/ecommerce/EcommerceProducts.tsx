'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi';
import { ecommerceProducts } from '@/data/ecommerce/products';
import Link from 'next/link';

export function EcommerceProducts() {
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
    const displayedProducts = ecommerceProducts.slice(0, 6);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#D4A574] text-xs uppercase tracking-[0.3em] block mb-4"
                        >
                            Curated Selection
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-light tracking-tight"
                        >
                            New <span className="font-serif italic">Arrivals</span>
                        </motion.h2>
                    </div>
                    <Link href="/demos/ecommerce/shop" className="text-sm uppercase tracking-wider mt-6 md:mt-0 border-b border-[#1A1A1A] hover:text-[#D4A574] hover:text-[#D4A574] transition-colors pb-1">
                        View All
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {displayedProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                            onMouseEnter={() => setHoveredProduct(product.id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            {/* Image Container */}
                            <Link href={`/demos/ecommerce/product/${product.id}`} className="relative aspect-[3/4] mb-6 overflow-hidden bg-[#F5F5F5] block">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.isNew && (
                                        <span className="px-3 py-1 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-wider font-bold">
                                            New
                                        </span>
                                    )}
                                    {product.isSale && (
                                        <span className="px-3 py-1 bg-[#D4A574] text-white text-[10px] uppercase tracking-wider font-bold">
                                            Sale
                                        </span>
                                    )}
                                </div>

                                {/* Quick Actions */}
                                <div className={`absolute inset-x-0 bottom-0 p-4 flex justify-center gap-3 transition-all duration-300 ${hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    }`}>
                                    <button className="w-10 h-10 bg-white flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-colors shadow-lg">
                                        <FiHeart className="w-4 h-4" />
                                    </button>
                                    <button className="flex-1 max-w-[180px] h-10 bg-[#1A1A1A] text-white flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold hover:bg-[#333] transition-colors shadow-lg">
                                        <FiShoppingBag className="w-4 h-4" />
                                        Add to Bag
                                    </button>
                                    <button className="w-10 h-10 bg-white flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-colors shadow-lg">
                                        <FiEye className="w-4 h-4" />
                                    </button>
                                </div>
                            </Link>

                            {/* Product Info */}
                            <div className="text-center">
                                <span className="text-[11px] uppercase tracking-widest text-[#999] block mb-2">
                                    {product.category}
                                </span>
                                <Link href={`/demos/ecommerce/product/${product.id}`} className="text-lg font-medium mb-2 group-hover:text-[#D4A574] transition-colors block">
                                    {product.name}
                                </Link>
                                <div className="flex items-center justify-center gap-3">
                                    <span className={`font-medium ${product.isSale ? 'text-[#D4A574]' : 'text-[#1A1A1A]'}`}>
                                        ${product.price}
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-[#999] line-through text-sm">
                                            ${product.originalPrice}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
