'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiInstagram } from 'react-icons/fi';

const instagramPosts = [
    { image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400&auto=format&fit=crop", likes: "2,847" },
    { image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop", likes: "1,923" },
    { image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop", likes: "3,102" },
    { image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=400&auto=format&fit=crop", likes: "2,456" },
    { image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop", likes: "4,201" },
    { image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&auto=format&fit=crop", likes: "1,789" },
];

export function EcommerceInstagram() {
    return (
        <section className="py-24 bg-[#FAF8F5]">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <a
                        href="#"
                        className="inline-flex items-center gap-3 text-[#1A1A1A] hover:text-[#D4A574] transition-colors group"
                    >
                        <FiInstagram className="w-6 h-6" />
                        <span className="text-lg font-light">@fashionboutique</span>
                    </a>
                    <p className="text-[#999] text-sm mt-2">Suivez-nous pour des inspirations de style</p>
                </motion.div>

                {/* Instagram Grid */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {instagramPosts.map((post, index) => (
                        <motion.a
                            key={index}
                            href="#"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative aspect-square overflow-hidden group"
                        >
                            <Image
                                src={post.image}
                                alt="Instagram post"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-sm font-medium">♥ {post.likes}</span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
