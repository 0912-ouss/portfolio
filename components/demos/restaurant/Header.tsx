'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Search } from 'lucide-react';

export function Header() {
    return (
        <header className="absolute top-0 left-0 right-0 z-50 py-6 px-4 md:px-12 bg-transparent">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link href="/demos/restaurant">
                        <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-white border-2 border-white/20 shadow-xl relative z-10 cursor-pointer hover:scale-105 transition-transform">
                            <div className="text-center">
                                <span className="block text-[10px] tracking-widest uppercase mb-1 text-orange-400">Eat At More</span>
                                <span className="block text-2xl font-bold tracking-tight leading-none text-white font-serif">CRUST</span>
                                <span className="block text-[10px] tracking-[0.2em] uppercase mt-1 text-gray-400">- PIZZA -</span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="/demos/restaurant/menu" className="text-sm font-semibold tracking-widest uppercase text-gray-800 hover:text-orange-500 transition-colors">Our Menu</Link>
                    <Link href="/demos/restaurant/contact" className="text-sm font-semibold tracking-widest uppercase text-gray-800 hover:text-orange-500 transition-colors">Catering</Link>
                    <Link href="/demos/restaurant/menu" className="text-sm font-semibold tracking-widest uppercase text-gray-800 hover:text-orange-500 transition-colors">Pizza</Link>
                    <Link href="/demos/restaurant/contact" className="text-sm font-semibold tracking-widest uppercase text-gray-800 hover:text-orange-500 transition-colors">Careers</Link>
                    <Link href="/demos/restaurant/contact" className="text-sm font-semibold tracking-widest uppercase text-gray-800 hover:text-orange-500 transition-colors">Gift Cards</Link>
                    <Link href="/demos/restaurant/contact" className="text-sm font-semibold tracking-widest uppercase text-gray-800 hover:text-orange-500 transition-colors">Franchise</Link>
                </nav>

                {/* CTA */}
                <div className="flex items-center space-x-4">
                    <Link href="/demos/restaurant/menu">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-3 px-8 rounded-full uppercase tracking-wider transition-all shadow-lg hover:shadow-orange-500/30 flex items-center gap-2">
                            Order Online
                            <ShoppingBag size={16} />
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
