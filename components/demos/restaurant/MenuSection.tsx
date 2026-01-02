'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const courses = [
    {
        name: "Première Impression",
        items: [
            { name: "Coquille Saint-Jacques Fumée", description: "Yuzu, huile d'oignon vert brûlé, micro coriandre", price: "24", image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=2070&auto=format&fit=crop" },
            { name: "Tartare de Wagyu", description: "Œuf de caille, émulsion de truffe, craquelin à l'encre de seiche", price: "28", image: "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=2000&auto=format&fit=crop" },
            { name: "Poulpe Grillé", description: "Sauce Romesco, pommes de terre rattes, poussière de chorizo", price: "26", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2071&auto=format&fit=crop" }
        ]
    },
    {
        name: "Plat Principal",
        items: [
            { name: "Canard Vieilli", description: "Gastrique de mûre, purée de panais, figue rôtie", price: "42", image: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=2080&auto=format&fit=crop" },
            { name: "Morue Noire", description: "Glaçage miso, bok choy, dashi au gingembre, racine de lotus", price: "38", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=2069&auto=format&fit=crop" },
            { name: "Risotto à la Truffe", description: "Champignons sauvages, croustillant de parmesan, truffe fraîche râpée", price: "36", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop" }
        ]
    }
];

export function MenuSection() {
    const [hoveredItem, setHoveredItem] = useState<{ image: string } | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <section
            className="py-32 bg-[#121212] text-[#E5E5E5] relative"
            ref={containerRef}
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Image Layer */}
            <motion.div
                className="pointer-events-none absolute top-0 left-0 z-20 w-64 h-64 rounded-full overflow-hidden hidden lg:block mix-blend-normal shadow-2xl border border-white/10"
                animate={{
                    x: mousePos.x - 128,
                    y: mousePos.y - 128,
                    opacity: hoveredItem ? 1 : 0,
                    scale: hoveredItem ? 1 : 0.8,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            >
                {hoveredItem && (
                    <Image
                        src={hoveredItem.image}
                        alt="Menu Preview"
                        fill
                        className="object-cover"
                    />
                )}
            </motion.div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-20">
                    <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#D4AF37] block mb-6">
                        Le Menu Dégustation
                    </span>
                    <h2 className="text-5xl font-serif mb-4">Omakase & À La Carte</h2>
                </div>

                <div className="space-y-24">
                    {courses.map((course, idx) => (
                        <div key={idx} className="relative">
                            <h3 className="text-2xl font-serif italic mb-12 text-center text-white/40">{course.name}</h3>
                            <div className="space-y-8">
                                {course.items.map((item, itemIdx) => (
                                    <motion.div
                                        key={itemIdx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: itemIdx * 0.1 }}
                                        onMouseEnter={() => setHoveredItem(item)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        className="group relative flex justify-between items-baseline border-b border-white/5 pb-8 hover:border-[#D4AF37]/50 transition-colors cursor-none"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-4 mb-2">
                                                <h4 className="text-xl font-serif font-medium group-hover:text-[#D4AF37] transition-colors">{item.name}</h4>
                                                <span className="flex-1 border-b border-dashed border-white/10 mx-4"></span>
                                                <span className="font-sans text-sm text-[#D4AF37]">{item.price}</span>
                                            </div>
                                            <p className="font-sans text-sm text-white/40 font-light">{item.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
