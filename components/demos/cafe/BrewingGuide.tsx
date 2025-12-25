'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const methods = [
    {
        id: 'v60',
        name: 'V60 Pour Over',
        time: '3:00',
        temp: '93°C',
        desc: 'A conical dripper that highlights floral notes and acidity through a thin paper filter.',
        image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=2000&auto=format&fit=crop'
    },
    {
        id: 'chemex',
        name: 'Chemex',
        time: '4:30',
        temp: '94°C',
        desc: 'Thick bonded filters produce an incredibly clean, tea-like body with high clarity.',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop'
    },
    {
        id: 'aeropress',
        name: 'Aeropress',
        time: '1:30',
        temp: '85°C',
        desc: 'Immersion brewing with air pressure. Versatile, rich, and full-bodied extraction.',
        image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=2000&auto=format&fit=crop'
    }
];

export function BrewingGuide() {
    const [activeMethod, setActiveMethod] = useState(methods[0]);

    return (
        <section className="py-32 bg-[#1A1714] text-[#E6DCCA] relative overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                <div className="relative">
                    <span className="text-xs font-sans tracking-[0.3em] text-[#C8AA6E] uppercase block mb-8">
                        Methods of Production
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif mb-12">Precision Brewing</h2>

                    <div className="space-y-6">
                        {methods.map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setActiveMethod(method)}
                                className={`w-full text-left p-6 border-l-2 transition-all duration-500 group ${activeMethod.id === method.id
                                    ? 'border-[#C8AA6E] bg-white/5'
                                    : 'border-white/10 hover:border-white/30'
                                    }`}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className={`text-xl font-serif ${activeMethod.id === method.id ? 'text-[#C8AA6E]' : 'text-white/60 group-hover:text-white/80'}`}>
                                        {method.name}
                                    </h3>
                                    <span className="text-xs font-sans text-white/40">{method.time} • {method.temp}</span>
                                </div>
                                <AnimatePresence>
                                    {activeMethod.id === method.id && (
                                        <motion.p
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="text-sm font-light text-white/60 overflow-hidden"
                                        >
                                            {method.desc}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative h-[600px] w-full rounded-sm overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeMethod.id}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={activeMethod.image}
                                alt={activeMethod.name}
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1714] to-transparent opacity-60" />
                        </motion.div>
                    </AnimatePresence>

                    <div className="absolute bottom-8 left-8 right-8 text-center pointer-events-none">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Step into the ritual</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
