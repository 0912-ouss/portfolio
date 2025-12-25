'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const curatedCollections = [
    {
        id: 'winter-2024',
        name: 'Winter',
        subtitle: '2024 Edition',
        description: 'A dialogue between cold-weather utility and sculptural elegance. Featuring heavy cashmere and distilled silhouettes.',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200',
        count: 24
    },
    {
        id: 'the-monochrome',
        name: 'The Monochrome',
        subtitle: 'Heritage Series',
        description: 'Exploring the purity of form through a singular palette. Where shadow meets fabric in perfect harmony.',
        image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=1200',
        count: 12
    },
    {
        id: 'evening-rituals',
        name: 'Evening Rituals',
        subtitle: 'Limited Release',
        description: 'Silk and velvet compositions designed for the hours after dusk. The pinnacle of our artisanal expertise.',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200',
        count: 18
    },
    {
        id: 'artisanal-knit',
        name: 'Artisanal Knit',
        subtitle: 'Craft Series',
        description: 'Hand-woven textures that celebrate the human touch. Sustainably sourced from high-altitude regions.',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200',
        count: 15
    }
];

export default function CollectionsPage() {
    React.useEffect(() => {
        document.title = "Collections | Fashion Boutique";
    }, []);

    return (
        <div className="bg-white min-h-screen pb-32">
            {/* Heritage Split Hero */}
            <section className="relative h-screen flex flex-col lg:flex-row overflow-hidden -mt-[100px]">
                {/* Left Branding */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-20 bg-[#FAF8F5]">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-lg"
                    >
                        <span className="inline-block px-4 py-2 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.3em] mb-8">
                            Library
                        </span>
                        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8">
                            Curated<br />
                            <span className="font-serif italic text-[#D4A574]">Volumes</span>
                        </h1>
                        <p className="text-lg text-[#666] font-light leading-relaxed mb-12">
                            Each collection is a distinct atmosphere, a curated volume of aesthetic exploration. Discover the narratives behind our latest series.
                        </p>
                    </motion.div>
                </div>

                {/* Right Visual */}
                <div className="w-full lg:w-1/2 relative h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000"
                        alt="Collections Hero"
                        fill
                        className="object-cover grayscale"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>
            </section>

            {/* Collections Navigation */}
            <div className="container mx-auto px-6 lg:px-12 py-32">
                <div className="space-y-40">
                    {curatedCollections.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-32 items-center`}
                        >
                            {/* Collection Visual */}
                            <div className="w-full lg:w-1/2 relative aspect-[4/5] overflow-hidden group">
                                <Image
                                    src={collection.image}
                                    alt={collection.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                                />
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-8 left-8">
                                    <span className="px-6 py-2 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-[0.3em] font-bold">
                                        Vol. {index + 1}
                                    </span>
                                </div>
                            </div>

                            {/* Collection Content */}
                            <div className="w-full lg:w-1/2">
                                <span className="text-[#D4A574] text-[10px] uppercase tracking-[0.5em] font-bold block mb-6">
                                    {collection.subtitle}
                                </span>
                                <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
                                    {collection.name}
                                </h2>
                                <p className="text-xl text-[#666] font-light leading-relaxed mb-12 max-w-md italic font-serif">
                                    "{collection.description}"
                                </p>
                                <div className="flex items-center justify-between border-t border-[#E5E5E5] pt-12">
                                    <span className="text-[10px] uppercase tracking-widest text-[#999]">
                                        {collection.count} Curated Items
                                    </span>
                                    <Link href="/demos/ecommerce/shop" className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-black hover:text-[#D4A574] transition-all">
                                        Explore Collection
                                        <span className="w-12 h-12 rounded-full border border-[#E5E5E5] flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:border-[#1A1A1A] transition-all">
                                            <FiArrowRight />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Luxury CTA */}
            <section className="py-40 bg-[#1A1A1A] text-white text-center relative overflow-hidden">
                <span className="absolute top-0 left-0 text-[300px] font-serif italic text-white/[0.02] -translate-y-1/2 -translate-x-1/4 select-none">Boutique</span>
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-12 capitalize">
                            Find your next <span className="font-serif italic text-[#D4A574]">heritage piece</span>
                        </h2>
                        <Link href="/demos/ecommerce/shop" className="inline-flex items-center gap-6 px-12 py-5 bg-white text-[#1A1A1A] text-[10px] uppercase tracking-[0.4em] font-black hover:bg-[#D4A574] hover:text-white transition-all rounded-full">
                            Shop All Arrivals <FiArrowRight />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
