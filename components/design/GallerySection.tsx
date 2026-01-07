"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const categories = ["Tout", "Branding", "Direction artistique", "Publicité", "Marketing", "Design 3D"];

const items = [
    {
        id: 1,
        title: "Milka - Artisanal Spread",
        category: "Branding",
        image: "/images/design/milka-poster.jpg",
        width: "col-span-12 md:col-span-8",
    },
    {
        id: 2,
        title: "Dental Precision - Air Lift",
        category: "Direction artistique",
        image: "/images/design/dental-helicopter.jpg",
        width: "col-span-12 md:col-span-4",
    },
    {
        id: 3,
        title: "The Grin Guardian",
        category: "Design 3D",
        image: "/images/design/dental-character.jpg",
        width: "col-span-12 md:col-span-4",
    },
    {
        id: 4,
        title: "Clinical Excellence",
        category: "Direction artistique",
        image: "/images/design/dental-braces.jpg",
        width: "col-span-12 md:col-span-4",
    },
    {
        id: 5,
        title: "Wave of Hygiene",
        category: "Direction artistique",
        image: "/images/design/dental-surf.jpg",
        width: "col-span-12 md:col-span-4",
    },
    {
        id: 6,
        title: "Yebehiir Marketing - Online Potential",
        category: "Marketing",
        image: "/images/design/yebehiir-marketing.jpg",
        width: "col-span-12 md:col-span-6",
    },
    {
        id: 7,
        title: "Rolex - Wear the Future",
        category: "Publicité",
        image: "/images/design/rolex-watch.jpg",
        width: "col-span-12 md:col-span-6",
    },
    {
        id: 8,
        title: "Air Jordan 1 x Travis Scott",
        category: "Marketing",
        image: "/images/design/travis-scott-jordan.jpg",
        width: "col-span-12 md:col-span-4",
    },
    {
        id: 9,
        title: "Lux Body Wash - Orchid Essence",
        category: "Publicité",
        image: "/images/design/lux-body-wash.jpg",
        width: "col-span-12 md:col-span-4",
    },
    {
        id: 10,
        title: "Bleu de Chanel - Luxury Perfume",
        category: "Publicité",
        image: "/images/design/bleu-de-chanel.jpg",
        width: "col-span-12 md:col-span-4",
    },
    {
        id: 11,
        title: "Artisanal Menu Concept",
        category: "Branding",
        image: "/images/design/menu-design-1.jpg",
        width: "col-span-12 md:col-span-6",
    },
    {
        id: 12,
        title: "Sonic Harmony - Earbuds Pro",
        category: "Publicité",
        image: "/images/design/earbuds-ad.jpg",
        width: "col-span-12 md:col-span-6",
    },
    {
        id: 13,
        title: "The Kebab Atelier",
        category: "Marketing",
        image: "/images/design/kebab-menu.jpg",
        width: "col-span-12 md:col-span-4",
    },
    {
        id: 14,
        title: "MOGA - Roman Cheese Burger",
        category: "Publicité",
        image: "/images/design/burger-colosseum.jpg",
        width: "col-span-12 md:col-span-4",
    },
    {
        id: 15,
        title: "The Sandwich Craft",
        category: "Marketing",
        image: "/images/design/sandwich-menu.jpg",
        width: "col-span-12 md:col-span-4",
    },
];

export const GallerySection = () => {
    const [activeCategory, setActiveCategory] = useState("Tout");

    const filteredItems = activeCategory === "Tout"
        ? items
        : items.filter(item => item.category === activeCategory);

    return (
        <section className="py-32 bg-white px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 block mb-6"
                        >
                            Archives Visuelles
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-[8vw] md:text-[5vw] font-black leading-[0.9] tracking-tighter uppercase"
                        >
                            Design <br /> <span className="text-transparent stroke-text">Galerie</span>
                        </motion.h2>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {categories.map((cat, i) => (
                            <motion.button
                                key={cat}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-3 rounded-full text-[10px] uppercase font-black tracking-widest transition-all ${activeCategory === cat
                                    ? "bg-black text-white"
                                    : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                                    }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-12 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                className={`${item.width} group relative aspect-square md:aspect-auto md:h-[500px] overflow-hidden bg-gray-100 cursor-pointer`}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16, 1, 0.3, 1)] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                                    <span className="text-[10px] text-white/60 uppercase tracking-widest mb-2">{item.category}</span>
                                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">{item.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            <style jsx>{`
                .stroke-text {
                    -webkit-text-stroke: 1px black;
                }
            `}</style>
        </section>
    );
};
