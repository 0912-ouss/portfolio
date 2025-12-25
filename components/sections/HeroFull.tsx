"use client";

import { motion } from "framer-motion";

export function HeroFull() {
    return (
        <section id="home" className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                    alt="Hero Background"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 lg:px-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // smooth ease out
                    className="max-w-5xl"
                >
                    <h1 className="text-6xl font-bold tracking-tighter text-white md:text-8xl lg:text-9xl leading-[0.9] flex flex-col">
                        <span className="font-serif italic font-light tracking-normal">Freelance</span>
                        <span className="font-sans font-black tracking-tighter">DESIGNER</span>
                    </h1>
                    <div className="mt-12 h-[1px] w-24 bg-white/50" />
                    <p className="mt-8 max-w-lg text-lg text-white/80 md:text-xl font-light">
                        Paris-based art director & digital designer.
                        Crafting digital experiences with a focus on motion and typography.
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator - Bottom Right */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 right-6 md:right-12 lg:right-24"
            >
                <span className="text-xs uppercase tracking-widest text-white/50">Scroll to Explore</span>
            </motion.div>
        </section>
    );
}
