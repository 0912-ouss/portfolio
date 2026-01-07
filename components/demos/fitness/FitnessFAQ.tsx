"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
    {
        question: "Quels sont les privilèges de l'abonnement Infinity ?",
        answer: "L'abonnement Infinity offre un accès illimité à tous les clubs mondiaux, des séances de coaching privé, un accès prioritaire au Bio-Spa, et un service de conciergerie dédié 24/7."
    },
    {
        question: "Proposez-vous des programmes personnalisés ?",
        answer: "Absolument. Chaque membre bénéficie d'une analyse biométrique complète dès son arrivée, permettant à nos experts de concevoir un programme sur-mesure alliant nutrition, entraînement et récupération."
    },
    {
        question: "Quelles sont les heures d'ouverture du Bio-Spa ?",
        answer: "Le Bio-Spa est ouvert de 06h00 à 23h00 tous les jours. Les soins spécifiques sont sur réservation, tandis que l'accès aux bassins et saunas est libre pour les membres."
    },
    {
        question: "Le service de voiturier est-il inclus ?",
        answer: "Oui, un service de voiturier et de nettoyage de véhicule est inclus pour tous les membres Platinum et Infinity lors de leurs visites."
    }
];

export function FitnessFAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="py-32 bg-[#050505] border-t border-white/5">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-20 space-y-4">
                    <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-black block">
                        La Conciergerie
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Vos Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-white/10">
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between py-8 text-left group"
                            >
                                <span className={`text-lg md:text-xl font-bold uppercase tracking-wide transition-colors ${activeIndex === index ? 'text-[#D4AF37]' : 'text-white group-hover:text-white/80'}`}>
                                    {faq.question}
                                </span>
                                <span className={`text-2xl transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-[#D4AF37]' : 'text-white/30'}`}>
                                    {activeIndex === index ? <FiMinus /> : <FiPlus />}
                                </span>
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-8 text-white/60 leading-relaxed font-sans">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
