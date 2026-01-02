'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function Counter({ value, suffix = "" }: { value: number, suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const stepTime = Math.abs(Math.floor(duration / end));

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, stepTime);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
    { label: "Années d'Héritage", value: 15, suffix: "+" },
    { label: "Propriétés Exclusives", value: 42, suffix: "" },
    { label: "Ventes Réussies", value: 120, suffix: "+" },
    { label: "Prix Remportés", value: 8, suffix: "" }
];

export function RealEstateStats() {
    return (
        <section className="py-24 bg-[#1A1A1A] border-y border-white/5">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="text-4xl md:text-6xl font-serif text-[#C19A6B] mb-4">
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
