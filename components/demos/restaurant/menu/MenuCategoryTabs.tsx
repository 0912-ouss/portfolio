'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { categories, type MenuCategory } from '@/data/restaurant/menuData';

interface MenuCategoryTabsProps {
    activeCategory: string;
    onCategoryChange: (categoryId: string) => void;
}

export function MenuCategoryTabs({ activeCategory, onCategoryChange }: MenuCategoryTabsProps) {
    const tabsRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (tabsRef.current) {
                const rect = tabsRef.current.getBoundingClientRect();
                setIsSticky(rect.top <= 0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToCategory = (categoryId: string) => {
        onCategoryChange(categoryId);
        const element = document.getElementById(`category-${categoryId}`);
        if (element) {
            const offset = 150; // Account for sticky header
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <div
            ref={tabsRef}
            className={`sticky top-0 z-40 transition-all duration-300 ${isSticky ? 'bg-white/95 backdrop-blur shadow-md py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex overflow-x-auto gap-2 md:gap-4 pb-2 scrollbar-hide justify-center"
                >
                    {/* All Items Tab */}
                    <button
                        onClick={() => scrollToCategory('all')}
                        className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full whitespace-nowrap transition-all text-sm font-bold uppercase tracking-wide ${activeCategory === 'all'
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        <span>🍽️</span>
                        <span>All</span>
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => scrollToCategory(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full whitespace-nowrap transition-all text-sm font-bold uppercase tracking-wide ${activeCategory === category.id
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <span>{category.icon}</span>
                            <span className="hidden md:inline">{category.name}</span>
                        </button>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
