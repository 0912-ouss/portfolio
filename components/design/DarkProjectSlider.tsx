"use client";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCallback } from "react";

const projects = [
    { title: "Aesthetic Restoration", category: "Art Direction", image: "/images/design/dental-helicopter.jpg" },
    { title: "The Grin Guardian", category: "3D Design", image: "/images/design/dental-character.jpg" },
    { title: "Clinical Excellence", category: "Art Direction", image: "/images/design/dental-braces.jpg" },
    { title: "Wave of Hygiene", category: "Art Direction", image: "/images/design/dental-surf.jpg" },
    { title: "Artisanal Menu", category: "Branding", image: "/images/design/menu-design-1.jpg" },
    { title: "Sonic Harmony", category: "Advertising", image: "/images/design/earbuds-ad.jpg" },
    { title: "The Kebab Atelier", category: "Marketing", image: "/images/design/kebab-menu.jpg" },
    { title: "MOGA Burger", category: "Advertising", image: "/images/design/burger-colosseum.jpg" },
    { title: "The Sandwich Craft", category: "Marketing", image: "/images/design/sandwich-menu.jpg" },
    { title: "Mint Cookie Drink", category: "Advertising", image: "/images/design/mint-cookie-drink.jpg" }
];

export function DarkProjectSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="bg-[#111] text-white py-24 md:py-32 cursor-grab active:cursor-grabbing">
            <div className="px-6 md:px-12 mb-16 flex justify-between items-end">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Latest projects</h2>

                <div className="flex gap-4">
                    <button onClick={scrollPrev} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors z-10 relative">
                        ←
                    </button>
                    <button onClick={scrollNext} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors z-10 relative">
                        →
                    </button>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="overflow-hidden px-6 md:px-12" ref={emblaRef}>
                <div className="flex gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="flex-[0_0_85%] md:flex-[0_0_450px] min-w-0 group relative select-none"
                        >
                            <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-gray-800">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block" />
                                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                                <p className="text-gray-400 text-sm">{project.category}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

