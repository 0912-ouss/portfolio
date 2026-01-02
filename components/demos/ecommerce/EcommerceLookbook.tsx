'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export function EcommerceLookbook() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Image Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div className="space-y-4">
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
                                    alt="Lookbook 1"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=800&auto=format&fit=crop"
                                    alt="Lookbook 2"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="space-y-4 pt-12">
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
                                    alt="Lookbook 3"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop"
                                    alt="Lookbook 4"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:pl-12"
                    >
                        <span className="text-[#D4A574] text-xs uppercase tracking-[0.3em] block mb-6">
                            Hiver 2024
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8 leading-[1.1]">
                            L'Art de la<br />
                            <span className="font-serif italic">Superposition</span>
                        </h2>
                        <p className="text-lg text-[#666] font-light leading-relaxed mb-8 max-w-md">
                            Découvrez notre lookbook d'hiver mettant en vedette des pièces polyvalentes conçues pour sublimer votre garde-robe par temps froid. Tissus luxueux, silhouettes intemporelles.
                        </p>
                        <div className="space-y-4 mb-12">
                            <div className="flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-[#D4A574]" />
                                <span className="text-sm text-[#666]">Matériaux Durables</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-[#D4A574]" />
                                <span className="text-sm text-[#666]">Fabrication Éthique</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-[#D4A574]" />
                                <span className="text-sm text-[#666]">Design Intemporel</span>
                            </div>
                        </div>
                        <button className="group flex items-center gap-4 text-sm uppercase tracking-wider font-medium">
                            Voir le Lookbook
                            <span className="w-12 h-12 bg-[#1A1A1A] text-white flex items-center justify-center group-hover:bg-[#D4A574] transition-colors">
                                <FiArrowRight />
                            </span>
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
