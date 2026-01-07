'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonials = [
    {
        name: "Michael Chen",
        role: "Cadre Dirigeant",
        text: "AutoRent a rendu mon voyage d'affaires fluide. La Mercedes était impeccable et le service de livraison m'a fait gagner des heures. Je réutiliserai certainement.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
        car: "Mercedes-Benz S-Class"
    },
    {
        name: "Sarah Williams",
        role: "Blogueuse Voyage",
        text: "J'ai loué un cabriolet pour un road trip sur la côte. La voiture était impeccable et l'assistance 24/7 m'a tranquillisée tout au long du voyage.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
        car: "Porsche 911 Cabriolet"
    },
    {
        name: "David Park",
        role: "Entrepreneur Tech",
        text: "La Tesla Model S Plaid était incroyable. La flotte de véhicules électriques d'AutoRent est impressionnante et leur service est inégalé.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
        car: "Tesla Model S Plaid"
    }
];

export function CarRentalTestimonials() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left - Content */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[#FF6B35] text-xs uppercase tracking-[0.3em] block mb-4"
                        >
                            Clients Satisfaits
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black tracking-tight mb-12"
                        >
                            Ce Que Disent<br />
                            <span aria-hidden="true" className="text-white/20">Nos Clients</span>
                        </motion.h2>

                        {/* Testimonial */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                            >
                                <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed mb-8">
                                    "{testimonials[current].text}"
                                </p>

                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#FF6B35]">
                                        <Image
                                            src={testimonials[current].image}
                                            alt={testimonials[current].name}
                                            width={56}
                                            height={56}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">
                                            {testimonials[current].name}
                                        </h4>
                                        <p className="text-sm text-white/50">
                                            {testimonials[current].role} • {testimonials[current].car}
                                        </p>
                                        <div className="flex gap-1 mt-1">
                                            {[...Array(testimonials[current].rating)].map((_, i) => (
                                                <FiStar key={i} className="w-3 h-3 fill-[#FF6B35] text-[#FF6B35]" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex gap-4 mt-12">
                            <button
                                onClick={prev}
                                className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-[#FF6B35] hover:border-[#FF6B35] transition-colors"
                            >
                                <FiChevronLeft />
                            </button>
                            <button
                                onClick={next}
                                className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-[#FF6B35] hover:border-[#FF6B35] transition-colors"
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>

                    {/* Right - Stats */}
                    <div className="grid grid-cols-2 gap-8">
                        {[
                            { value: "15K+", label: "Clients Satisfaits" },
                            { value: "50+", label: "Voitures Premium" },
                            { value: "15", label: "Agences" },
                            { value: "4.9", label: "Note Moyenne" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-white/5 border border-white/10 text-center"
                            >
                                <div className="text-4xl md:text-5xl font-black text-[#FF6B35] mb-2">
                                    {stat.value}
                                </div>
                                <p className="text-xs uppercase tracking-wider text-white/40">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
