'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiChevronDown, FiHeart, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { ecommerceProducts, Product } from '@/data/ecommerce/products';

const categories = ['All', 'Dresses', 'Outerwear', 'Jackets', 'Accessories', 'Bottoms', 'Jewelry'];
const sorts = ['Latest', 'Price: Low to High', 'Price: High to Low'];

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeSort, setActiveSort] = useState('Latest');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(ecommerceProducts);

    useEffect(() => {
        document.title = "Shop All | Fashion Boutique";
    }, []);

    useEffect(() => {
        let result = [...ecommerceProducts];
        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }
        if (activeSort === 'Price: Low to High') {
            result.sort((a, b) => a.price - b.price);
        } else if (activeSort === 'Price: High to Low') {
            result.sort((a, b) => b.price - a.price);
        }
        setFilteredProducts(result);
    }, [activeCategory, activeSort]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.4 }
        }
    };

    return (
        <div className="bg-white min-h-screen pb-24">
            {/* Dramatic Shop Hero - Style Synced with Home */}
            <section className="relative h-[60vh] flex flex-col lg:flex-row overflow-hidden -mt-[100px]">
                {/* Left - Large Text Branding */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-20 bg-[#1A1A1A] text-white">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-md text-center lg:text-left"
                    >
                        <span className="text-[#D4A574] text-[10px] uppercase tracking-[0.4em] block mb-6">Discovery</span>
                        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8">
                            Curated<br />
                            <span className="font-serif italic text-[#D4A574]">Pieces</span>
                        </h1>
                    </motion.div>
                </div>

                {/* Right - Mood Image */}
                <div className="w-full lg:w-1/2 relative h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000"
                        alt="Shop Collection"
                        fill
                        className="object-cover grayscale contrast-125"
                    />
                    <div className="absolute inset-0 bg-[#1A1A1A]/20" />
                </div>
            </section>

            {/* Premium Category Bar */}
            <div className="sticky top-[80px] z-40 bg-white border-b border-[#E5E5E5]">
                <div className="container mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <div className="hidden lg:flex items-center gap-10">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all relative pb-2 ${activeCategory === cat ? 'text-[#1A1A1A]' : 'text-[#999] hover:text-[#D4A574]'
                                        }`}
                                >
                                    {cat}
                                    {activeCategory === cat && (
                                        <motion.div layoutId="shop-cat-line" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4A574]" />
                                    )}
                                </button>
                            ))}
                        </div>
                        <button className="lg:hidden flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]">
                            <FiFilter className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <button className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]">
                                <span className="text-[#999] font-normal">Sort:</span> {activeSort} <FiChevronDown className="w-4 h-4" />
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E5E5E5] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 shadow-2xl z-50">
                                {sorts.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setActiveSort(s)}
                                        className="w-full text-left px-5 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[#FAF8F5] transition-colors"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Products Grid */}
            <div className="container mx-auto px-6 lg:px-12 py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                variants={itemVariants}
                                className="group"
                            >
                                <Link href={`/demos/ecommerce/product/${product.id}`} className="block">
                                    <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-[#FAF8F5]">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                                        />

                                        {/* Premium Badges */}
                                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                                            {product.isNew && (
                                                <span className="px-4 py-1.5 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.2em] font-bold">
                                                    New
                                                </span>
                                            )}
                                            {product.isSale && (
                                                <span className="px-4 py-1.5 bg-[#D4A574] text-white text-[10px] uppercase tracking-[0.2em] font-bold">
                                                    Sale
                                                </span>
                                            )}
                                        </div>

                                        {/* Luxury Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-3 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                            <button className="w-full bg-[#1A1A1A] text-white py-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#333] transition-colors">
                                                <FiShoppingBag className="w-4 h-4" /> Quick Add
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-center px-4">
                                        <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4A574] mb-3 font-bold">{product.category}</p>
                                        <h3 className="text-xl font-light tracking-tight mb-3 group-hover:text-[#D4A574] transition-colors uppercase">{product.name}</h3>
                                        <div className="flex items-center justify-center gap-4">
                                            <span className="text-lg font-light">${product.price}</span>
                                            {product.originalPrice && (
                                                <span className="text-[#999] line-through text-sm font-light">
                                                    ${product.originalPrice}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="py-40 text-center">
                        <h3 className="text-2xl font-light mb-8">Nothing found in this collection.</h3>
                        <button
                            onClick={() => setActiveCategory('All')}
                            className="group flex items-center gap-4 mx-auto text-sm uppercase tracking-widest font-bold"
                        >
                            Explore All
                            <span className="w-12 h-12 bg-[#1A1A1A] text-white flex items-center justify-center group-hover:bg-[#D4A574] transition-colors">
                                <FiArrowRight />
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
