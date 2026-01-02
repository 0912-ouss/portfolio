'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { MagnetButton } from './MagnetButton';

export function RealEstateSearch() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="sticky top-24 z-[100] px-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-[1000px] mx-auto bg-white/80 backdrop-blur-2xl border border-black/5 rounded-full p-2 flex items-center shadow-xl shadow-black/5"
            >
                <div className="flex-1 flex items-center px-6 border-r border-black/5">
                    <Search size={18} className="text-[#C19A6B]" />
                    <input
                        type="text"
                        placeholder="Rechercher par ville, résidence..."
                        className="bg-transparent border-none focus:ring-0 text-sm w-full px-4 placeholder:text-gray-400 font-light"
                    />
                </div>

                <div className="hidden md:flex items-center px-6 gap-8">
                    <button className="flex items-center gap-2 group">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#2C2C2C]">Gamme de Prix</span>
                        <ChevronDown size={14} className="text-gray-400 group-hover:text-[#C19A6B] transition-colors" />
                    </button>
                    <button className="flex items-center gap-2 group">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#2C2C2C]">Chambres</span>
                        <ChevronDown size={14} className="text-gray-400 group-hover:text-[#C19A6B] transition-colors" />
                    </button>
                </div>

                <MagnetButton className="bg-[#2C2C2C] text-white px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#C19A6B] transition-colors flex items-center gap-2 ml-auto">
                    Rechercher
                </MagnetButton>
            </motion.div>
        </div>
    );
}
