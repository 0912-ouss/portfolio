"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FiCode, FiLayout, FiAward, FiUsers } from "react-icons/fi";

const stats = [
    { icon: FiCode, value: 50, suffix: "+", label: "Projects Completed", color: "from-violet-500 to-purple-600" },
    { icon: FiLayout, value: 100, suffix: "+", label: "Design Works", color: "from-pink-500 to-rose-500" },
    { icon: FiUsers, value: 30, suffix: "+", label: "Happy Clients", color: "from-orange-500 to-red-500" },
    { icon: FiAward, value: 5, suffix: "+", label: "Years Experience", color: "from-cyan-500 to-blue-500" },
];

function Counter({ end, isInView }: { end: number; isInView: boolean }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const step = () => {
            start += end / (duration / 16);
            if (start >= end) { setCount(end); return; }
            setCount(Math.floor(start));
            requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [isInView, end]);
    return <>{count}</>;
}

export function Stats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-16 relative overflow-hidden bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_70%)]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="text-center group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}
                            >
                                <stat.icon className="w-8 h-8 text-white" />
                            </motion.div>
                            <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                <Counter end={stat.value} isInView={isInView} />{stat.suffix}
                            </div>
                            <div className="text-sm font-medium text-foreground/60 mt-2">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
