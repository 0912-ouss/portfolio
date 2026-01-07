'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
    { label: "Surface d'Elite", value: 12000, suffix: " sqft", delay: 0 },
    { label: "Experts Masters", value: 24, suffix: "+", delay: 0.2 },
    { label: "Suites Privées", value: 15, suffix: "", delay: 0.4 },
    { label: "Equipements", value: 100, suffix: "% Custom", delay: 0.6 }
];

function Counter({ value, suffix, delay }: { value: number, suffix: string, delay: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}{suffix}
        </span>
    );
}

export function FitnessStats() {
    return (
        <section className="py-32 bg-[#050505] border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: stat.delay }}
                            viewport={{ once: true }}
                            className="text-center lg:text-left"
                        >
                            <div className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tighter">
                                <Counter value={stat.value} suffix={stat.suffix} delay={stat.delay} />
                            </div>
                            <div className="text-[10px] uppercase font-black tracking-[0.3em] text-[#D4AF37]">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
