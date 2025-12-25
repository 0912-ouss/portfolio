'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export function SearchSection() {
    return (
        <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative z-20 -mt-8 mb-16 px-4"
        >
            <div className="max-w-4xl mx-auto bg-black text-white rounded-full p-2 flex flex-col md:flex-row items-center justify-between shadow-2xl border border-gray-800">

                {/* Brand/Type Toggle */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-orange-600 hover:bg-orange-700 transition-colors text-white text-sm font-bold uppercase tracking-widest py-3 px-8 rounded-full cursor-pointer"
                >
                    Crust Pizza
                </motion.div>

                {/* Input */}
                <div className="flex-1 w-full md:w-auto px-6 py-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="City, State or Zip"
                            className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 text-sm tracking-wide focus:outline-none"
                        />
                        <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 cursor-pointer hover:text-white transition-colors" />
                    </div>
                </div>

                {/* Action Button */}
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#ffffff' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-100 text-black text-xs font-bold uppercase tracking-widest py-3 px-8 rounded-full transition-colors whitespace-nowrap"
                >
                    Order Online
                </motion.button>
            </div>
        </motion.section>
    );
}
