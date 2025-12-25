'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { locations } from './data';

export function RealEstateMap({
    selectedLocation,
    onSelectLocation
}: {
    selectedLocation: string;
    onSelectLocation: (id: string) => void;
}) {
    const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

    // Simplified coordinates for Morocco locations on a 500x600 viewBox
    const points = [
        { id: "tangier", x: 400, y: 50, name: "Tangier" },
        { id: "casablanca", x: 300, y: 180, name: "Casablanca" },
        { id: "marrakech", x: 260, y: 280, name: "Marrakech" },
        { id: "taghazout", x: 180, y: 380, name: "Taghazout" }
    ];

    return (
        <section className="py-32 bg-[#FDFBF7] border-y border-gray-100 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                {/* Left: Content */}
                <div>
                    <span className="text-[#C19A6B] text-xs uppercase tracking-[0.6em] font-bold mb-6 block">Geographic Reach</span>
                    <h2 className="text-5xl md:text-7xl font-serif text-[#2C2C2C] mb-10 leading-tight">
                        The Heritage <br />
                        <span className="italic">Cartography</span>
                    </h2>
                    <p className="text-gray-500 font-light leading-relaxed mb-12 max-w-md">
                        Explore our exclusive portfolio across the most prestigious regions of the Kingdom. Each pin represents a cluster of architectural masterpieces.
                    </p>

                    <div className="space-y-4">
                        {locations.map(loc => (
                            <button
                                key={loc.id}
                                onMouseEnter={() => setHoveredLocation(loc.id)}
                                onMouseLeave={() => setHoveredLocation(null)}
                                onClick={() => onSelectLocation(loc.id)}
                                className={`flex items-center gap-6 w-full group transition-all duration-500 p-4 rounded-sm ${selectedLocation === loc.id ? 'bg-white shadow-xl shadow-black/5' : 'hover:bg-white/50'}`}
                            >
                                <span className={`w-8 h-[1px] transition-all duration-500 ${selectedLocation === loc.id ? 'w-12 bg-[#C19A6B]' : 'bg-gray-300 group-hover:bg-[#C19A6B]'}`} />
                                <div className="text-left">
                                    <h4 className={`text-sm uppercase tracking-widest font-bold transition-colors ${selectedLocation === loc.id ? 'text-[#C19A6B]' : 'text-gray-400 group-hover:text-[#2C2C2C]'}`}>{loc.name}</h4>
                                    <p className="text-[10px] text-gray-400 font-light uppercase tracking-widest">{loc.tag}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Interactive SVG Map */}
                <div className="relative aspect-square lg:aspect-[4/5] bg-white rounded-2xl shadow-2xl shadow-black/5 flex items-center justify-center p-12">
                    <svg viewBox="0 0 500 600" className="w-full h-full text-gray-100 fill-current overflow-visible">
                        {/* Simplified Morocco Silhouette */}
                        <path d="M450 50 L480 80 L460 120 L420 150 L400 200 L380 300 L350 400 L300 500 L200 580 L100 550 L50 500 L80 400 L150 300 L250 150 L350 50 Z" />

                        {/* Connection Lines */}
                        <AnimatePresence>
                            {points.map((p, i) => points.slice(i + 1).map((p2, j) => (
                                <motion.line
                                    key={`${p.id}-${p2.id}`}
                                    x1={p.x} y1={p.y} x2={p2.x} y2={p2.y}
                                    stroke="#C19A6B" strokeWidth="0.5" strokeDasharray="4 4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.2 }}
                                />
                            )))}
                        </AnimatePresence>

                        {/* Pins */}
                        {points.map(p => {
                            const isSelected = selectedLocation === p.id;
                            const isHovered = hoveredLocation === p.id;

                            return (
                                <g
                                    key={p.id}
                                    className="cursor-pointer"
                                    onClick={() => onSelectLocation(p.id)}
                                    onMouseEnter={() => setHoveredLocation(p.id)}
                                    onMouseLeave={() => setHoveredLocation(null)}
                                >
                                    <motion.circle
                                        cx={p.x} cy={p.y}
                                        initial={{ r: 0 }}
                                        animate={{
                                            r: isSelected || isHovered ? 12 : 6,
                                            fill: isSelected ? "#C19A6B" : "#2C2C2C"
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    />
                                    {(isSelected || isHovered) && (
                                        <motion.g
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <text
                                                x={p.x + 20} y={p.y + 5}
                                                className="text-[14px] font-bold uppercase tracking-widest fill-[#2C2C2C] font-sans"
                                            >
                                                {p.name}
                                            </text>
                                            <motion.circle
                                                cx={p.x} cy={p.y}
                                                r={24}
                                                fill="transparent"
                                                stroke="#C19A6B"
                                                strokeWidth="1"
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                        </motion.g>
                                    )}
                                </g>
                            );
                        })}
                    </svg>

                    {/* Decorative Overlay */}
                    <div className="absolute bottom-8 right-8 text-right">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-gray-300 font-bold block mb-1">Scale / Scale</span>
                        <div className="w-32 h-[1px] bg-gray-100 relative">
                            <div className="absolute inset-y-0 left-0 w-8 bg-[#C19A6B]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
