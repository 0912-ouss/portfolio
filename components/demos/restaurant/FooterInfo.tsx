'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function FooterInfo() {
    return (
        <section className="bg-gray-100 py-16 px-4">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

                {/* Item 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-4 group cursor-pointer"
                >
                    <div className="w-16 h-16 rounded-full bg-orange-100 flex-shrink-0 overflow-hidden relative shadow-md ring-2 ring-white group-hover:ring-orange-200 transition-all">
                        <Image
                            src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=200&auto=format&fit=crop"
                            alt="Catering"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    <div>
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-2 group-hover:text-orange-600 transition-colors">Catering & Events</h4>
                        <p className="text-[10px] text-gray-500 leading-relaxed mb-2">
                            Crust Pizza is now offering catering services for local businesses, schools, and other events.
                        </p>
                    </div>
                </motion.div>

                {/* Item 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-4 group cursor-pointer"
                >
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden relative shadow-md ring-2 ring-white group-hover:ring-orange-200 transition-all">
                        <Image
                            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=200&auto=format&fit=crop"
                            alt="Work here"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    <div>
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-2 group-hover:text-orange-600 transition-colors">Work at Crust Pizza</h4>
                        <p className="text-[10px] text-gray-500 leading-relaxed mb-2">
                            In Oven Time, our people are our greatest asset. Have a passion for pizza?
                        </p>
                    </div>
                </motion.div>

                {/* Item 3 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-4 group cursor-pointer"
                >
                    <div className="w-16 h-16 rounded-full bg-red-100 flex-shrink-0 overflow-hidden relative shadow-md ring-2 ring-white group-hover:ring-orange-200 transition-all">
                        <Image
                            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=200&auto=format&fit=crop"
                            alt="Franchise"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    <div>
                        <h4 className="font-bold uppercase tracking-widest text-sm mb-2 group-hover:text-orange-600 transition-colors">Own a Crust Franchise</h4>
                        <p className="text-[10px] text-gray-500 leading-relaxed mb-2">
                            Join the rising star of one of the best cuisines in the restaurant industry.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
