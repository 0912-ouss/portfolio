'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Local Guide",
        content: "Hands down the best deep dish in The Woodlands. The crust is perfectly flaky and the sauce is to die for!",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        rating: 5
    },
    {
        name: "Michael Chen",
        role: "Food Blogger",
        content: "I've tried pizza all over Chicago, and this place rivals the best of them. An absolute gem in Texas.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        rating: 5
    },
    {
        name: "Emily Davis",
        role: "Regular Customer",
        content: "Great atmosphere for families. My kids love the cheese pizza and the staff is always so friendly.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        rating: 4
    }
];

export function TestimonialsSection() {
    return (
        <section className="py-24 px-4 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-serif font-bold text-gray-800 uppercase tracking-widest mb-4">What Our Customers Say</h2>
                    <div className="w-24 h-1 bg-orange-500 mx-auto opacity-50"></div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 relative"
                        >
                            {/* Quote Icon Background */}
                            <div className="absolute top-4 right-8 text-9xl font-serif text-gray-200 opacity-20 pointer-events-none">"</div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-orange-200">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                                    <p className="text-xs text-orange-500 font-bold uppercase tracking-wider">{item.role}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} className={`${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                ))}
                            </div>

                            <p className="text-gray-600 leading-relaxed italic relative z-10">
                                "{item.content}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
