'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonials = [
    {
        name: "Yuki Tanaka",
        role: "Coffee Enthusiast",
        text: "The V60 here redefined what I thought pour-over could be. Each cup is a masterclass in extraction.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
    },
    {
        name: "Marcus Chen",
        role: "Local Architect",
        text: "KŌHĪ is my second office. The atmosphere is meditative, the coffee is transcendent.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
    },
    {
        name: "Elena Vasquez",
        role: "Food Critic",
        text: "In a city saturated with specialty coffee, KŌHĪ stands apart. This is coffee as an art form.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
    },
    {
        name: "James Wright",
        role: "Writer",
        text: "The single origin series is extraordinary. You can taste the terroir in every sip.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
    }
];

export function CafeTestimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="py-32 md:py-48 bg-[#1A1714] text-[#E6DCCA] relative overflow-hidden">
            {/* Background Quote */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-serif text-white/[0.02] pointer-events-none select-none">
                "
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs font-sans tracking-[0.3em] text-[#C8AA6E] uppercase block mb-4">
                            Voices
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif">Guest Reflections</h2>
                    </motion.div>
                </div>

                {/* Testimonial Carousel */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                                className="text-center"
                            >
                                {/* Quote */}
                                <p className="text-2xl md:text-3xl font-serif font-light leading-relaxed mb-12 text-white/80">
                                    "{testimonials[currentIndex].text}"
                                </p>

                                {/* Author */}
                                <div className="flex flex-col items-center gap-6">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C8AA6E]/30">
                                        <Image
                                            src={testimonials[currentIndex].image}
                                            alt={testimonials[currentIndex].name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-serif text-[#C8AA6E] mb-1">
                                            {testimonials[currentIndex].name}
                                        </h4>
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                                            {testimonials[currentIndex].role}
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                            <FiStar key={i} className="w-4 h-4 text-[#C8AA6E] fill-[#C8AA6E]" />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex justify-center items-center gap-8 mt-16">
                            <button
                                onClick={prev}
                                className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#C8AA6E] hover:border-[#C8AA6E]/30 transition-all"
                            >
                                <FiChevronLeft className="w-5 h-5" />
                            </button>

                            {/* Dots */}
                            <div className="flex gap-3">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                                ? 'bg-[#C8AA6E] w-8'
                                                : 'bg-white/20 hover:bg-white/40'
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={next}
                                className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#C8AA6E] hover:border-[#C8AA6E]/30 transition-all"
                            >
                                <FiChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
