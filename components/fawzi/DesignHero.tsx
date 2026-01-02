"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function FawziDesignHero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative pt-40 pb-32 px-4 md:px-20 bg-white dark:bg-[#1E1E1E] overflow-hidden min-h-[80vh] flex items-center">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-20 right-[10%] w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute bottom-20 left-[5%] w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto relative z-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="bg-orange-500 text-white px-6 py-1 rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-lg shadow-orange-500/20"
                    >
                        Design Visuals
                    </motion.div>

                    <div className="relative">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-6xl md:text-[10vw] font-black text-black dark:text-white leading-[0.9] tracking-tighter"
                        >
                            Pure <span className="text-orange-500 italic">Creative</span> <br />
                            Direction
                        </motion.h1>

                        {/* Floating elements around text */}
                        <motion.div
                            animate={{
                                rotate: 360,
                                scale: [1, 1.1, 1]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-10 -right-10 w-20 h-20 border-2 border-orange-500/20 rounded-lg hidden md:block"
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="max-w-2xl text-gray-500 dark:text-gray-400 text-lg md:text-2xl font-medium leading-relaxed"
                    >
                        Crafting visual identities that resonate and digital interfaces that empower users through thoughtful design.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="pt-12 flex items-center gap-8"
                    >
                        <div className="flex -space-x-4">
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -10, zIndex: 10 }}
                                    className="w-16 h-16 rounded-full border-4 border-white dark:border-[#1E1E1E] bg-orange-500 overflow-hidden shadow-xl"
                                >
                                    <img
                                        src={`https://images.unsplash.com/photo-${i === 1 ? '1534528741775-53994a69daeb' : i === 2 ? '1506794778242-aff56458953f' : '1507003211169-0a1dd7228f2d'}?w=200&q=80`}
                                        className="w-full h-full object-cover"
                                        alt="Designer"
                                    />
                                </motion.div>
                            ))}
                        </div>
                        <div className="text-left">
                            <p className="text-black dark:text-white font-bold">Trusted by Brands</p>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <span key={s} className="text-orange-500 text-sm">★</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Scroll</p>
                <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500 to-transparent" />
            </motion.div>
        </section>
    );
}
