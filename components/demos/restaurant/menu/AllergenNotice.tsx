'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { allergens } from '@/data/restaurant/menuData';

export function AllergenNotice() {
    return (
        <section className="py-12 px-4 bg-amber-50 border-t border-amber-200">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center"
            >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                    <span className="text-3xl">⚠️</span>
                </div>

                <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
                    Allergen Information
                </h3>

                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Our dishes may contain or come into contact with the following allergens.
                    Please inform your server of any dietary requirements or allergies.
                </p>

                {/* Allergen List */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {allergens.map((allergen, idx) => (
                        <span
                            key={idx}
                            className="bg-white border border-amber-300 text-amber-800 px-4 py-2 rounded-full text-sm font-medium"
                        >
                            {allergen}
                        </span>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                    <a
                        href="#"
                        className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Full Allergen Guide (PDF)
                    </a>
                    <span className="text-gray-400 hidden sm:block">|</span>
                    <span className="text-gray-500">
                        Questions? Ask your server or call us at (555) 123-4567
                    </span>
                </div>
            </motion.div>
        </section>
    );
}
