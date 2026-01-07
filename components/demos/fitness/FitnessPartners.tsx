"use client";

import { motion } from "framer-motion";

const partners = [
    { name: "Technogym", logo: "TECHNOGYM" },
    { name: "Aesop", logo: "AESOP" },
    { name: "Rolex", logo: "ROLEX" },
    { name: "Dior", logo: "DIOR" },
    { name: "Hermès", logo: "HERMÈS" },
    { name: "Tesla", logo: "TESLA" },
];

export function FitnessPartners() {
    return (
        <section className="py-20 bg-[#050505] border-t border-b border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                <p aria-hidden="true" className="text-white/20 text-[10px] uppercase tracking-[0.5em] font-bold text-center">
                    Trusted By Elite Partners
                </p>
            </div>

            {/* Infinite Scroll Container */}
            <div className="relative group">
                <motion.div
                    animate={{ x: [0, "-50%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30, // Slowed down for luxury feel
                            ease: "linear",
                        },
                    }}
                    whileHover={{ transition: { duration: 1000 } }} // "Pause" by drastically slowing down
                    className="flex gap-20 whitespace-nowrap"
                >
                    {/* Duplicate for seamless loop */}
                    {[...partners, ...partners].map((partner, i) => (
                        <div aria-hidden="true"
                            key={i}
                            className="text-3xl md:text-4xl font-black uppercase tracking-[0.3em] text-white/10 hover:text-[#D4AF37]/50 transition-colors duration-500 cursor-default select-none"
                        >
                            {partner.logo}
                        </div>
                    ))}
                </motion.div>

                {/* Fade Edges */}
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />
            </div>
        </section>
    );
}
