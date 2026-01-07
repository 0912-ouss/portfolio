'use client';

import React from 'react';
import { ChevronRight, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function LocationsSection() {
    return (
        <section className="py-20 px-4 max-w-7xl mx-auto">

            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-3xl font-serif font-bold text-gray-800 uppercase tracking-wide mb-2"
                >
                    Visit Any of our Locations
                </motion.h2>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="w-24 h-1 bg-orange-500 mx-auto opacity-50"
                />
            </div>

            {/* Location Slider (Visual Representation) */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between border-b border-gray-200 pb-4 mb-12 overflow-x-auto gap-8"
            >
                {['Alden Bridge', 'Rayford', 'Creekside', 'Windsor'].map((loc, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.1, color: '#f97316' }} // orange-500
                        className={`flex flex-col items-center cursor-pointer min-w-[100px] ${idx === 0 ? 'opacity-100' : 'opacity-40 hover:opacity-100 transition-opacity'}`}
                    >
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-2">{loc}</span>
                        <motion.div
                            layoutId={idx === 0 ? "activeLoc" : undefined}
                            className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-orange-500' : 'bg-gray-300'}`}
                        />
                    </motion.div>
                ))}
                <ChevronRight className="text-gray-400 w-6 h-6" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">

                {/* Left: Driver Graphic + Details */}
                <div className="relative">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Driver Illustration */}
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ type: "spring", bounce: 0.4, duration: 1 }}
                            className="w-48 h-48 rounded-full overflow-hidden shadow-xl border-4 border-white flex-shrink-0 relative z-10"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=400&auto=format&fit=crop"
                                alt="Delivery Driver"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-center md:text-left space-y-4"
                        >
                            <h3 className="text-xl font-serif font-bold text-gray-900 uppercase tracking-wider">Alden Bridge</h3>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto md:mx-0">
                                8000 Research Forest Dr, Suite 390<br />The Woodlands, TX 77382
                            </p>

                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Hours of Operation</p>
                                <p className="text-xs text-gray-600">Sun-Thu: 11:00am - 9:00pm</p>
                                <p className="text-xs text-gray-600">Fri-Sat: 11:00am - 10:00pm</p>
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-2 text-orange-500 font-bold text-sm">
                                <Phone size={14} />
                                <span>832.585.0929</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right: Map with real map image base */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-[300px] w-full rounded-xl overflow-hidden shadow-inner border border-gray-200"
                >
                    {/* Stylized Map View */}
                    <Image
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
                        alt="Map Background"
                        fill
                        className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-gray-600 text-xs tracking-widest uppercase bg-white/90 px-4 py-2 rounded-full backdrop-blur-sm z-10 shadow-lg">Map View</span>
                    </div>

                    {/* Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-600 z-10 mt-[-20px]">
                        <MapPin size={40} fill="currentColor" className="drop-shadow-lg animate-bounce" />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
