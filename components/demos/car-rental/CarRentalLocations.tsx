'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiPhone, FiNavigation } from 'react-icons/fi';

const locations = [
    {
        id: 1,
        name: "LAX Airport",
        address: "1 World Way, Los Angeles, CA 90045",
        hours: "24/7",
        phone: "+1 (555) 123-4567",
        coords: { top: "35%", left: "25%" }
    },
    {
        id: 2,
        name: "Downtown LA",
        address: "500 S Grand Ave, Los Angeles, CA 90071",
        hours: "6AM - 11PM",
        phone: "+1 (555) 234-5678",
        coords: { top: "45%", left: "55%" }
    },
    {
        id: 3,
        name: "Santa Monica",
        address: "1550 Pacific Coast Hwy, Santa Monica, CA",
        hours: "7AM - 10PM",
        phone: "+1 (555) 345-6789",
        coords: { top: "50%", left: "20%" }
    },
    {
        id: 4,
        name: "Beverly Hills",
        address: "9876 Wilshire Blvd, Beverly Hills, CA",
        hours: "8AM - 9PM",
        phone: "+1 (555) 456-7890",
        coords: { top: "30%", left: "45%" }
    },
    {
        id: 5,
        name: "Hollywood",
        address: "6801 Hollywood Blvd, Hollywood, CA",
        hours: "7AM - 11PM",
        phone: "+1 (555) 567-8901",
        coords: { top: "25%", left: "60%" }
    }
];

export function CarRentalLocations() {
    const [activeLocation, setActiveLocation] = useState(locations[0]);
    const [hoveredPin, setHoveredPin] = useState<number | null>(null);

    return (
        <section className="py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[#FF6B35] text-xs uppercase tracking-[0.3em] block mb-4"
                    >
                        Lieux de Prise en Charge
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black tracking-tight"
                    >
                        Trouvez-nous <span className="text-white/20">Partout</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Interactive Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative aspect-square bg-[#0F0F0F] border border-white/10 overflow-hidden"
                    >
                        {/* Map Background Grid */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `linear-gradient(#FF6B35 1px, transparent 1px), linear-gradient(90deg, #FF6B35 1px, transparent 1px)`,
                                backgroundSize: '40px 40px'
                            }} />
                        </div>

                        {/* Roads */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                            <path d="M10 50 Q 50 30 90 55" stroke="#FF6B35" strokeWidth="0.5" fill="none" opacity="0.3" />
                            <path d="M20 80 Q 50 60 80 20" stroke="#FF6B35" strokeWidth="0.5" fill="none" opacity="0.3" />
                            <path d="M5 30 L 95 70" stroke="#FF6B35" strokeWidth="0.3" fill="none" opacity="0.2" />
                        </svg>

                        {/* Location Pins */}
                        {locations.map((location) => (
                            <motion.button
                                key={location.id}
                                className="absolute z-10"
                                style={{ top: location.coords.top, left: location.coords.left }}
                                onMouseEnter={() => setHoveredPin(location.id)}
                                onMouseLeave={() => setHoveredPin(null)}
                                onClick={() => setActiveLocation(location)}
                                whileHover={{ scale: 1.2 }}
                            >
                                <motion.div
                                    animate={{
                                        scale: activeLocation.id === location.id ? [1, 1.2, 1] : 1,
                                    }}
                                    transition={{ repeat: activeLocation.id === location.id ? Infinity : 0, duration: 2 }}
                                    className={`relative ${activeLocation.id === location.id ? 'z-20' : 'z-10'}`}
                                >
                                    <FiMapPin className={`w-8 h-8 ${activeLocation.id === location.id ? 'text-[#FF6B35]' : 'text-white/60'
                                        } transition-colors`} />

                                    {/* Pulse Effect */}
                                    {activeLocation.id === location.id && (
                                        <motion.div
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#FF6B35]"
                                            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        />
                                    )}

                                    {/* Tooltip */}
                                    {hoveredPin === location.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-white text-black text-xs font-bold whitespace-nowrap"
                                        >
                                            {location.name}
                                        </motion.div>
                                    )}
                                </motion.div>
                            </motion.button>
                        ))}

                        {/* Map Label */}
                        <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest text-white/30">
                            Zone Métropolitaine de Los Angeles
                        </div>
                    </motion.div>

                    {/* Location Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        {/* Location Tabs */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {locations.map(location => (
                                <button
                                    key={location.id}
                                    onClick={() => setActiveLocation(location)}
                                    className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all ${activeLocation.id === location.id
                                        ? 'bg-[#FF6B35] text-white'
                                        : 'bg-white/5 text-white/60 hover:text-white'
                                        }`}
                                >
                                    {location.name}
                                </button>
                            ))}
                        </div>

                        {/* Selected Location Info */}
                        <motion.div
                            key={activeLocation.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-8 bg-white/5 border border-white/10"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-[#FF6B35]">
                                {activeLocation.name}
                            </h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-4">
                                    <FiMapPin className="w-5 h-5 text-[#FF6B35] mt-1" />
                                    <span className="text-white/70">{activeLocation.address}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FiClock className="w-5 h-5 text-[#FF6B35]" />
                                    <span className="text-white/70">{activeLocation.hours}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <FiPhone className="w-5 h-5 text-[#FF6B35]" />
                                    <span className="text-white/70">{activeLocation.phone}</span>
                                </div>
                            </div>

                            <button className="flex items-center gap-3 px-6 py-3 bg-[#FF6B35] text-white font-bold uppercase tracking-wider text-sm hover:bg-[#FF8C42] transition-colors">
                                <FiNavigation className="w-4 h-4" />
                                Itinéraire
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
