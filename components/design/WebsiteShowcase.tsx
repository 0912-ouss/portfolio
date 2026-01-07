"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const websites = [
    "/images/design/milka-poster.jpg",
    "/images/design/rolex-watch.jpg",
    "/images/design/travis-scott-jordan.jpg",
    "/images/design/bleu-de-chanel.jpg",
    "/images/design/lux-body-wash.jpg",
    "/images/design/internet-ad.jpg",
];

export function WebsiteShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    // Transform scroll progress to horizontal movement
    // We want to move the list to the left as we scroll down
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <section ref={containerRef} className="py-32 bg-gray-50 overflow-hidden">
            <div className="px-6 md:px-12 mb-12 text-center">
                <h2 className="text-xl font-bold uppercase tracking-widest text-gray-400 mb-8">Projets sélectionnés</h2>
            </div>

            <div className="flex w-full overflow-hidden mask-image-gradient-r">
                <motion.div
                    className="flex gap-8 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                >
                    {[...websites, ...websites].map((src, index) => (
                        <div key={index} className="relative w-[300px] md:w-[400px] aspect-[4/5] shadow-2xl rounded-2xl overflow-hidden shrink-0 group cursor-pointer">
                            <img src={src} alt={`Website ${index}`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />

                            {/* Overlay Content */}
                            <div aria-hidden="true" className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <span className="bg-white text-black px-6 py-3 font-bold uppercase tracking-widest text-xs rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Voir le projet</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
