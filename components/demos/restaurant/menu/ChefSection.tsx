'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { chef } from '@/data/restaurant/menuData';

export function ChefSection() {
    return (
        <section className="py-20 px-4 bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <p className="text-orange-400 text-sm font-bold uppercase tracking-widest mb-4">
                        Meet Our Chef
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-widest">
                        The Heart of Our Kitchen
                    </h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-1/3"
                    >
                        <div className="relative w-64 h-80 mx-auto">
                            <Image
                                src={chef.image}
                                alt={chef.name}
                                fill
                                className="object-cover rounded-2xl"
                            />
                            {/* Decorative Frame */}
                            <div className="absolute -inset-3 border-2 border-orange-500 rounded-2xl -z-10" />
                            {/* Experience Badge */}
                            <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold">
                                {chef.experience}+ Years
                            </div>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-2/3 text-center lg:text-left"
                    >
                        <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                            {chef.name}
                        </h3>
                        <p className="text-orange-400 font-bold uppercase tracking-widest text-sm mb-6">
                            {chef.title}
                        </p>

                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            {chef.bio}
                        </p>

                        {/* Quote */}
                        <blockquote className="relative pl-6 border-l-4 border-orange-500">
                            <p className="text-xl italic text-white/90">
                                {chef.quote}
                            </p>
                        </blockquote>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
