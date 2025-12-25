"use client";

import { motion } from "framer-motion";

export function DesignHero() {
    return (
        <section className="relative pt-32 pb-20 px-6 md:px-12 flex flex-col items-center text-center">
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-orange-500"
            >
                GRAPHIC DESIGNER, WEBDESIGNER & WEBFLOW EXPERT
            </motion.p>

            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] max-w-5xl mx-auto uppercase mb-12"
            >
                <span className="block overflow-hidden">
                    <motion.span
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="block"
                    >
                        Impactful branding and high-end
                    </motion.span>
                </span>
                <span className="block overflow-hidden">
                    <motion.span
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="block"
                    >
                        Webflow websites for creatives.
                    </motion.span>
                </span>
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="border border-black px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
                Let's start a project together
            </motion.div>

            {/* Logos / Badges Row - Simulated */}
            <div className="mt-16 flex gap-12 opacity-50 grayscale mix-blend-multiply items-center">
                {/* Replaced text with simulated logos for visual match to reference image which had logos not text */}
                <span className="font-serif font-bold text-2xl italic">Ballantine's</span>
                <span className="font-sans font-black text-2xl uppercase tracking-tighter">JAMEL</span>
                <span className="font-serif text-2xl">MJD</span>
                <span className="font-sans font-bold text-xl bg-black text-white px-2">Supermoo</span>
            </div>
        </section>
    );
}
