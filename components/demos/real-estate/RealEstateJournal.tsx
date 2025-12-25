'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MaskReveal } from './MaskReveal';

const articles = [
    {
        title: "The Silent Geometry of the Atlas",
        category: "Architecture",
        image: "/demos/real-estate/atlas_geometry.png",
        date: "WINTER 2024"
    },
    {
        title: "Sunset over Taghazout: A Coastal Odyssey",
        category: "Lifestyle",
        image: "/demos/real-estate/taghazout_sunset.png",
        date: "PREVIEW ISSUE"
    },
    {
        title: "Restoring the Heritage of the Medina",
        category: "Preservation",
        image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1000",
        date: "FEATURE ARTICLE"
    }
];

export function RealEstateJournal() {
    return (
        <section className="py-32 bg-[#FDFBF7] border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
                    <div className="max-w-2xl">
                        <MaskReveal>
                            <span className="text-[#C19A6B] text-[10px] uppercase tracking-[0.6em] font-bold mb-4 block">The Atlas Journal</span>
                        </MaskReveal>
                        <MaskReveal delay={0.2}>
                            <h2 className="text-5xl md:text-8xl font-serif text-[#2C2C2C] leading-none">Perspective <br /><span className="italic">& Lifestyle</span></h2>
                        </MaskReveal>
                    </div>
                    <MaskReveal delay={0.4}>
                        <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold pb-4 border-b border-gray-100 lg:w-96">
                            Exploring the intersection of Moroccan tradition and modern architectural luxury.
                        </p>
                    </MaskReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {articles.map((article, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden mb-10 rounded-sm">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                <div className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-45 group-hover:rotate-0">
                                    <ArrowUpRight size={20} className="text-[#2C2C2C]" />
                                </div>
                            </div>

                            <span className="text-[#C19A6B] text-[10px] uppercase tracking-widest font-bold mb-3 block">
                                {article.category} / {article.date}
                            </span>
                            <h3 className="text-3xl font-serif text-[#2C2C2C] mb-8 leading-tight group-hover:text-[#C19A6B] transition-colors">
                                {article.title}
                            </h3>
                            <button className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 group-hover:text-[#2C2C2C] transition-colors flex items-center gap-4">
                                Read Perspective <div className="w-8 h-[1px] bg-gray-200 group-hover:bg-[#C19A6B] transition-colors" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Decorative View All */}
                <div className="mt-32 border-t border-gray-100 pt-20 flex justify-center">
                    <button className="group relative">
                        <span className="text-[12px] uppercase tracking-[0.6em] font-bold text-[#2C2C2C]">View All Perspectives</span>
                        <motion.div
                            className="absolute -bottom-4 left-0 right-0 h-[1px] bg-[#C19A6B]"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                        />
                    </button>
                </div>
            </div>
        </section>
    );
}
