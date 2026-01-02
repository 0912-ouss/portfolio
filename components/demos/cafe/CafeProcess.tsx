'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const processSteps = [
    {
        number: "01",
        title: "Approvisionnement",
        subtitle: "Sélection d'Origine",
        description: "Nous voyageons vers des fermes isolées dans 24 pays, établissant des relations directes avec des producteurs qui partagent notre obsession pour la qualité.",
        icon: "🌍"
    },
    {
        number: "02",
        title: "Dégustation",
        subtitle: "Évaluation de la Qualité",
        description: "Chaque lot subit des sessions de dégustation rigoureuses. Nous notons l'arôme, le corps, l'acidité et la complexité avant approbation.",
        icon: "☕"
    },
    {
        number: "03",
        title: "Torréfaction",
        subtitle: "Orchestration de la Chaleur",
        description: "La torréfaction en petites quantités préserve le caractère d'origine. Chaque profil est développé pour mettre en valeur les notes uniques du terroir.",
        icon: "🔥"
    },
    {
        number: "04",
        title: "Extraction",
        subtitle: "Le Versé Final",
        description: "Infusion de précision aux paramètres optimaux. Température de l'eau, taille de mouture et minutage calibrés pour la perfection.",
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
                            Le Voyage
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif mb-6">
                            De la Graine<br />
                            <span className="text-[#C8AA6E]/30">À la Tasse</span>
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
