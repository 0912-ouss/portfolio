'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { MaskReveal } from './MaskReveal';

export function RealEstateRestoration() {
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isResizing, setIsResizing] = useState(false);

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const position = ((x - rect.left) / rect.width) * 100;

        setSliderPos(Math.min(Math.max(position, 0), 100));
    };

    return (
        <section className="py-40 bg-[#FDFBF7] overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
                    <div className="max-w-2xl">
                        <MaskReveal>
                            <span className="text-[#C19A6B] text-[10px] uppercase tracking-[0.6em] font-bold mb-4 block">The Art of Restoration</span>
                        </MaskReveal>
                        <MaskReveal delay={0.2}>
                            <h2 className="text-5xl md:text-8xl font-serif text-[#2C2C2C] leading-none">Resurrecting <br /><span className="italic">Heritage</span></h2>
                        </MaskReveal>
                    </div>
                    <MaskReveal delay={0.4}>
                        <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold pb-4 border-b border-gray-100 lg:w-96">
                            From forgotten ruins to the pinnacle of architectural excellence. Witness the Atlas transformative touch.
                        </p>
                    </MaskReveal>
                </div>

                <div
                    ref={containerRef}
                    className="relative aspect-[21/9] w-full group cursor-ew-resize select-none overflow-hidden rounded-sm shadow-2xl"
                    onMouseMove={handleMove}
                    onTouchMove={handleMove}
                >
                    {/* After Image (Top Layer) */}
                    <div className="absolute inset-0">
                        <Image
                            src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=2000"
                            alt="Restored"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-8 right-8 z-20">
                            <span className="px-4 py-2 bg-black/40 backdrop-blur-md text-white text-[9px] uppercase tracking-widest font-bold border border-white/10 rounded-full">Present / Restored</span>
                        </div>
                    </div>

                    {/* Before Image (Revealed via Clip) */}
                    <div
                        className="absolute inset-0 z-10 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000"
                            alt="Ruined"
                            fill
                            className="object-cover grayscale"
                        />
                        <div className="absolute top-8 left-8">
                            <span className="px-4 py-2 bg-[#C19A6B] text-white text-[9px] uppercase tracking-widest font-bold rounded-full shadow-lg">1924 / Original State</span>
                        </div>
                    </div>

                    {/* Slider Line & Handle */}
                    <div
                        className="absolute top-0 bottom-0 z-20 w-[1px] bg-white pointer-events-none"
                        style={{ left: `${sliderPos}%` }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white rounded-full flex items-center justify-center backdrop-blur-sm bg-white/10">
                            <div className="flex gap-1.5">
                                <div className="w-[1px] h-4 bg-white/40" />
                                <div className="w-[1px] h-4 bg-white" />
                                <div className="w-[1px] h-4 bg-white/40" />
                            </div>
                        </div>
                        {/* Decorative arrows */}
                        <div className="absolute top-[45%] left-1/2 -translate-x-full pr-12 text-white/40 font-serif italic text-sm">Before</div>
                        <div className="absolute top-[45%] left-1/2 translate-x-full pl-12 text-white/40 font-serif italic text-sm">After</div>
                    </div>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { title: "Structural Integrity", desc: "Stabilizing ancient foundations with modern engineering while preserving original mortar techniques." },
                        { title: "Artisan Revival", desc: "Employing the last generation of master craftsmen to recreate lost Zellige patterns." },
                        { title: "Modern Comfort", desc: "Invisible integration of smart climate control and sustainable energy systems." }
                    ].map((item, i) => (
                        <div key={i} className="group">
                            <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#2C2C2C] mb-4 flex items-center gap-4">
                                <span className="text-[#C19A6B]">0{i + 1}</span>
                                {item.title}
                            </h4>
                            <p className="text-gray-400 text-sm font-light leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
