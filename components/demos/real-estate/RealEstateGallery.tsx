'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const galleryItems = [
    {
        title: "Majestic Arches",
        category: "Architecture",
        image: "/demos/real-estate/hero.png",
        size: "large"
    },
    {
        title: "Intricate Zellige",
        category: "Details",
        image: "/demos/real-estate/detail1.png",
        size: "small"
    },
    {
        title: "Royal Suite",
        category: "Interior",
        image: "/demos/real-estate/detail2.png",
        size: "medium"
    },
    {
        title: "Oasis Garden",
        category: "Landscape",
        image: "/demos/real-estate/detail3.png",
        size: "medium"
    },
    {
        title: "Atlas Panorama",
        category: "Environment",
        image: "/demos/real-estate/villa.png",
        size: "large"
    },
    {
        title: "Ocean Breeze",
        category: "Coastal",
        image: "/demos/real-estate/apartment.png",
        size: "small"
    }
];

export function RealEstateGallery() {
    return (
        <section id="gallery" className="py-32 bg-[#FDFBF7] px-6">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-24">
                    <span className="text-[#C19A6B] text-xs uppercase tracking-[0.5em] font-bold mb-4 block">Visual Journey</span>
                    <h2 className="text-5xl md:text-8xl font-serif text-[#2C2C2C]">Architecture <br /><span className="italic">& Detail</span></h2>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="gallery-item relative break-inside-avoid group cursor-none"
                        >
                            <div className="relative overflow-hidden bg-gray-200">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={800}
                                    height={1000}
                                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <span className="text-[#C19A6B] text-[10px] uppercase tracking-widest font-bold mb-2">{item.category}</span>
                                    <h3 className="text-white text-2xl font-serif">{item.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
