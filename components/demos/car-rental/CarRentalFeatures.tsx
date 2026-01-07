'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiClock, FiMapPin, FiHeadphones, FiDollarSign, FiTruck } from 'react-icons/fi';

const features = [
    {
        icon: FiShield,
        title: "Assurance Complète",
        description: "Couverture complète incluse avec chaque location. Conduisez en toute tranquillité."
    },
    {
        icon: FiClock,
        title: "Disponibilité 24/7",
        description: "Prise en charge et retour à tout moment. Notre service fonctionne 24h/24, tous les jours."
    },
    {
        icon: FiMapPin,
        title: "15+ Agences",
        description: "Points de prise en charge pratiques dans toute la ville. Aéroport, centre-ville et banlieue."
    },
    {
        icon: FiHeadphones,
        title: "Assistance 24/7",
        description: "Notre équipe dédiée est toujours prête à vous aider pour toute question ou urgence."
    },
    {
        icon: FiDollarSign,
        title: "Meilleur Prix",
        description: "Tarifs compétitifs sans frais cachés. Garantie du meilleur prix sur toutes les réservations."
    },
    {
        icon: FiTruck,
        title: "Livraison Gratuite",
        description: "Nous vous apportons la voiture. Livraison gratuite en ville pour les locations de plus de 3 jours."
    }
];

export function CarRentalFeatures() {
    return (
        <section className="py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
            {/* Accent Lines */}
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#FF6B35]/20 to-transparent" />
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#FF6B35]/20 to-transparent" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#FF6B35] text-xs uppercase tracking-[0.3em] block mb-4"
                    >
                        Pourquoi Nous Choisir
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black tracking-tight mb-6"
                    >
                        L'Avantage<br />
                        <span className="text-white/20">AutoRent</span>
                    </motion.h2>
                    <p className="max-w-lg mx-auto text-white/50 font-light">
                        Profitez d'un service premium à chaque location. Nous allons au-delà de la simple fourniture de voitures.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 bg-white/[0.02] border border-white/5 hover:border-[#FF6B35]/30 transition-all duration-500"
                        >
                            <div className="w-14 h-14 bg-[#FF6B35]/10 flex items-center justify-center mb-6 group-hover:bg-[#FF6B35] transition-colors duration-500">
                                <feature.icon className="w-6 h-6 text-[#FF6B35] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-[#FF6B35] transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
