'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const tiers = [
    {
        name: "L'Initié",
        price: "450 €",
        period: " / mois",
        features: ["Accès Illimité 24/7", "Conciergerie Fitness", "Suite de Récupération", "Évaluation Biométrique"]
    },
    {
        name: "L'Architecte",
        price: "1 200 €",
        period: " / mois",
        features: ["Tout de l'Initié", "4 Sessions Master Perso", "Accès VIP Lounge", "Coaching Nutritionnel d'Élite", "Service Blanchisserie"],
        highlight: true
    },
    {
        name: "Le Souverain",
        price: "Sur Mesure",
        period: "",
        features: ["Accès Global Elysium", "Coach Dédié 24/7", "Programmation Bio-Singuilière", "Chef Privé & Nutrition", "Voyages Athlétiques"]
    }
];

export function FitnessMembership() {
    return (
        <section className="py-40 bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-32">
                    <span className="text-[#D4AF37] text-[10px] uppercase tracking-[1em] font-black block mb-8">Alliances</span>
                    <h2 className="text-[10vw] md:text-[6vw] font-black text-white uppercase tracking-tighter leading-none mb-12">ADHÉSION ÉLITE</h2>
                    <p className="max-w-2xl mx-auto text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">
                        Une sélection rigoureuse pour une communauté de performance inégalée.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{
                                y: -10,
                                boxShadow: tier.highlight ? "0 0 50px rgba(212, 175, 55, 0.2)" : "0 0 30px rgba(255, 255, 255, 0.05)"
                            }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-16 rounded-[4rem] border relative overflow-hidden group transition-all duration-700 ${tier.highlight ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'}`}
                        >
                            {tier.highlight && (
                                <div className="absolute top-12 right-12 bg-[#D4AF37] text-black text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                                    Plus Demandé
                                </div>
                            )}

                            <h3 className={`text-3xl font-black uppercase tracking-tight mb-4 ${tier.highlight ? 'text-[#D4AF37]' : 'text-white'}`}>
                                {tier.name}
                            </h3>
                            <div className="flex items-baseline gap-2 mb-12">
                                <span className={`text-4xl font-black uppercase tracking-tighter ${tier.highlight ? 'text-white' : 'text-[#D4AF37]'}`}>
                                    {tier.price}
                                </span>
                                <span className="text-white/30 text-xs font-bold uppercase tracking-widest">
                                    {tier.period}
                                </span>
                            </div>

                            <ul className="space-y-6 mb-16">
                                {tier.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-center gap-4 text-white/50 text-[10px] font-black uppercase tracking-widest">
                                        <FiCheck className={`w-4 h-4 ${tier.highlight ? 'text-[#D4AF37]' : 'text-white/20'}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-6 rounded-2xl text-[10px] uppercase font-black tracking-[0.3em] transition-all duration-500 border ${tier.highlight ? 'bg-[#D4AF37] text-black border-[#D4AF37] hover:bg-white' : 'bg-transparent text-white border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37]'}`}>
                                Demander l'Accès
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
