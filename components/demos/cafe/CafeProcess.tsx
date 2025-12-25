'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const processSteps = [
    {
        number: "01",
        title: "Sourcing",
        subtitle: "Origin Selection",
        description: "We travel to remote farms across 24 countries, building direct relationships with growers who share our obsession with quality.",
        icon: "🌍"
    },
    {
        number: "02",
        title: "Cupping",
        subtitle: "Quality Assessment",
        description: "Each lot undergoes rigorous cupping sessions. We score for aroma, body, acidity, and complexity before approval.",
        icon: "☕"
    },
    {
        number: "03",
        title: "Roasting",
        subtitle: "Heat Orchestration",
        description: "Small-batch roasting preserves origin character. Every profile is developed to highlight unique terroir notes.",
        icon: "🔥"
    },
    {
        number: "04",
        title: "Extraction",
        subtitle: "The Final Pour",
        description: "Precision brewing at optimal parameters. Water temperature, grind size, and timing calibrated for perfection.",
        icon: "💧"
    }
];

export function CafeProcess() {
    return (
        <section className="py-32 md:py-48 bg-[#1F1C18] text-[#E6DCCA] relative overflow-hidden">
            {/* Decorative Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[#C8AA6E]/20 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs font-sans tracking-[0.3em] text-[#C8AA6E] uppercase block mb-6">
                            The Journey
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif mb-6">
                            From Seed<br />
                            <span className="text-[#C8AA6E]/30">To Cup</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Process Steps */}
                <div className="max-w-5xl mx-auto">
                    {processSteps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className={`relative flex items-center gap-16 mb-24 last:mb-0 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                                }`}
                        >
                            {/* Number Badge */}
                            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 bg-[#1F1C18] border border-[#C8AA6E]/30 items-center justify-center z-10">
                                <span className="text-2xl">{step.icon}</span>
                            </div>

                            {/* Content */}
                            <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-24' : 'text-left pl-24'}`}>
                                <span className="text-6xl font-serif text-[#C8AA6E]/10 block mb-2">
                                    {step.number}
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8AA6E] block mb-3">
                                    {step.subtitle}
                                </span>
                                <h3 className="text-3xl font-serif mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-sm font-light text-white/40 leading-relaxed max-w-md inline-block">
                                    {step.description}
                                </p>
                            </div>

                            {/* Connecting Line */}
                            {index < processSteps.length - 1 && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-full h-24 flex flex-col items-center">
                                    <div className="w-[1px] h-full bg-[#C8AA6E]/20" />
                                    <FiArrowRight className="rotate-90 text-[#C8AA6E]/30 mt-2" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
