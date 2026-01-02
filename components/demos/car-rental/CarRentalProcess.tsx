'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: "01",
        title: "Choisissez Votre Voiture",
        description: "Parcourez notre flotte premium et sélectionnez le véhicule parfait pour vos besoins."
    },
    {
        number: "02",
        title: "Réservez en Ligne",
        description: "Complétez votre réservation en quelques minutes avec notre système simplifié."
    },
    {
        number: "03",
        title: "Récupérez-la",
        description: "Récupérez votre voiture dans l'une de nos agences ou optez pour la livraison gratuite."
    },
    {
        number: "04",
        title: "Prenez la Route",
        description: "Profitez de votre voyage avec une assistance 24/7 et une couverture complète."
    }
];

export function CarRentalProcess() {
    return (
        <section className="py-32 bg-[#0F0F0F] text-white relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[#FF6B35] text-xs uppercase tracking-[0.3em] block mb-4"
                    >
                        Comment Ça Marche
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black tracking-tight"
                    >
                        Louez en <span className="text-[#FF6B35]">4</span> Étapes Faciles
                    </motion.h2>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="relative"
                        >
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-10 left-[60%] right-0 h-[1px] bg-gradient-to-r from-[#FF6B35]/50 to-transparent" />
                            )}

                            {/* Step Number */}
                            <div className="text-8xl font-black text-[#FF6B35]/10 mb-4">
                                {step.number}
                            </div>

                            <h3 className="text-xl font-bold mb-3">
                                {step.title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
