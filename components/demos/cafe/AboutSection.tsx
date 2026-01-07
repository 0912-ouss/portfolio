"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { FiCoffee, FiUsers, FiAward, FiHeart } from "react-icons/fi";

interface CounterProps {
    end: number;
    suffix?: string;
    duration?: number;
}

function Counter({ end, suffix = "", duration = 2 }: CounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const increment = end / (duration * 60);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);

        return () => clearInterval(timer);
    }, [isInView, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const stats = [
        { icon: FiCoffee, value: 15, suffix: "+", label: "Years Experience" },
        { icon: FiUsers, value: 50, suffix: "K+", label: "Happy Customers" },
        { icon: FiAward, value: 25, suffix: "+", label: "Awards Won" },
        { icon: FiHeart, value: 100, suffix: "%", label: "Quality Beans" },
    ];

    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233C2A21' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative">
                            {/* Main Image */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                            >
                                <Image
                                    src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop"
                                    alt="Coffee brewing"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B]/50 to-transparent" />
                            </motion.div>

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-[#D5CEA3] to-[#C4B896] rounded-full flex flex-col items-center justify-center shadow-2xl"
                            >
                                <span className="text-4xl font-bold text-[#1A120B]">15+</span>
                                <span className="text-sm font-medium text-[#3C2A21]">Years of</span>
                                <span className="text-sm font-medium text-[#3C2A21]">Excellence</span>
                            </motion.div>

                            {/* Secondary Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="absolute -left-8 top-1/2 -translate-y-1/2 w-48 h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden md:block"
                            >
                                <Image
                                    src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=400&auto=format&fit=crop"
                                    alt="Coffee beans"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-2 bg-[#3C2A21]/10 rounded-full text-[#3C2A21] font-semibold text-sm tracking-wider mb-6"
                        >
                            OUR STORY
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-[#1A120B] mb-6 leading-tight"
                        >
                            Crafting Perfect Coffee
                            <span className="text-[#8B7355]"> Since 2010</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-[#3C2A21]/70 mb-6 leading-relaxed"
                        >
                            From a small corner shop to a beloved city landmark, our journey has been
                            fueled by passion for exceptional coffee. We source our beans directly from
                            sustainable farms across the globe, ensuring every cup tells a story.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-[#3C2A21]/70 mb-8 leading-relaxed"
                        >
                            Our master roasters blend tradition with innovation, creating signature
                            flavors that have become the city&apos;s favorite. Whether you&apos;re starting
                            your day or taking a peaceful break, we&apos;re here to make it special.
                        </motion.p>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-2 gap-4 mb-8"
                        >
                            {[
                                "Single-origin beans",
                                "House-roasted daily",
                                "Expert baristas",
                                "Eco-friendly packaging",
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#D5CEA3]" />
                                    <span className="text-[#3C2A21] font-medium">{feature}</span>
                                </div>
                            ))}
                        </motion.div>

                        <motion.a
                            href="#menu"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#3C2A21] text-white rounded-full font-bold hover:bg-[#1A120B] transition-all shadow-lg"
                        >
                            Explore Our Menu
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                →
                            </motion.span>
                        </motion.a>
                    </motion.div>
                </div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-gradient-to-r from-[#3C2A21] to-[#1A120B] rounded-3xl shadow-2xl"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <stat.icon className="w-8 h-8 text-[#D5CEA3] mx-auto mb-3" />
                            <div className="text-4xl font-bold text-white mb-1">
                                <Counter end={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-sm text-white/60">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
