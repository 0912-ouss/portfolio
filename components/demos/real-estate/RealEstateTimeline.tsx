'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MaskReveal } from './MaskReveal';

const milestones = [
    {
        year: "1924",
        title: "The Founding",
        desc: "Origins in documenting the colonial architectural shifts in Casablanca.",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000",
        side: "left"
    },
    {
        year: "1958",
        title: "The Golden Era",
        desc: "Expansion into the restoration of historic Riads in the heart of Marrakech.",
        image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1000",
        side: "right"
    },
    {
        year: "1992",
        title: "Modernist Fusion",
        desc: "Pioneering the blend of traditional Zellige with Brutalist concrete forms.",
        image: "/demos/real-estate/modernist_fusion.jpg",
        side: "left"
    },
    {
        year: "2024",
        title: "The Legacy Continues",
        desc: "Leading the global standard for private architectural guardianship in Morocco.",
        image: "https://images.unsplash.com/photo-1544971587-b842c27f8e14?q=80&w=1000",
        side: "right"
    }
];

export function RealEstateTimeline() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const pathHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="py-40 bg-[#FDFBF7] relative">
            <div className="max-w-[1400px] mx-auto px-6">

                <div className="text-center mb-32">
                    <MaskReveal>
                        <span className="text-[#C19A6B] text-[10px] uppercase tracking-[0.6em] font-bold mb-4 block">Our Lineage</span>
                    </MaskReveal>
                    <MaskReveal delay={0.2}>
                        <h2 className="text-5xl md:text-8xl font-serif text-[#2C2C2C]">A Century Of <br /><span className="italic">Perspective</span></h2>
                    </MaskReveal>
                </div>

                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gray-100 hidden lg:block">
                        <motion.div
                            style={{ height: pathHeight }}
                            className="w-full bg-[#C19A6B]"
                        />
                    </div>

                    <div className="space-y-40 lg:space-y-0">
                        {milestones.map((item, i) => (
                            <TimelineItem key={i} item={item} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ item, index }: { item: any; index: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const x = useTransform(scrollYProgress, [0, 1], [item.side === 'left' ? -100 : 100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

    return (
        <div
            ref={ref}
            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-0 ${item.side === 'right' ? 'lg:flex-row-reverse' : ''} lg:h-[60vh]`}
        >
            {/* Image Section */}
            <div className="w-full lg:w-1/2 flex justify-center px-4 lg:px-20">
                <motion.div
                    style={{ x, opacity, scale }}
                    className="relative w-full aspect-[4/5] max-w-md overflow-hidden rounded-sm shadow-2xl"
                >
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 px-4 lg:px-20 text-center lg:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={item.side === 'right' ? 'lg:text-right' : 'lg:text-left'}
                >
                    <span className="text-6xl md:text-8xl font-serif text-[#C19A6B]/10 block mb-4 lg:-mb-8 lg:-ml-4 font-black">
                        {item.year}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-serif text-[#2C2C2C] mb-6">{item.title}</h3>
                    <p className="text-gray-400 font-light leading-relaxed max-w-sm mx-auto lg:mx-0">
                        {item.desc}
                    </p>
                    <div className={`mt-10 flex items-center gap-4 ${item.side === 'right' ? 'justify-end' : 'justify-start'}`}>
                        <div className="w-8 h-[1px] bg-[#C19A6B]" />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-300">Phase 0{index + 1}</span>
                    </div>
                </motion.div>
            </div>

            {/* Central Node for Desktop */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center pointer-events-none">
                <motion.div
                    style={{ scale: scrollYProgress }}
                    className="w-4 h-4 rounded-full bg-white border-2 border-[#C19A6B] shadow-xl z-10"
                />
            </div>
        </div>
    );
}
