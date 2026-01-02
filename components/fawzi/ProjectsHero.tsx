"use client";

import { motion } from "framer-motion";

export function FawziProjectsHero() {
    return (
        <section className="relative pt-40 pb-20 px-4 md:px-20 bg-white dark:bg-[#1E1E1E] overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -ml-64 -mb-64" />

            <div className="container mx-auto relative z-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-orange-500 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-lg shadow-orange-500/20"
                    >
                        Success Stories
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-[8rem] lg:text-[10rem] font-black text-black dark:text-white leading-[0.85] tracking-tighter"
                    >
                        PROJECTS<br />
                        <span className="text-gray-200 dark:text-gray-800">SHOWCASE</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-2xl text-gray-500 dark:text-gray-400 text-lg md:text-xl font-medium leading-relaxed"
                    >
                        Discover a specialized collection of high-performance digital experiences, from luxury e-commerce to specialized healthcare platforms.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
