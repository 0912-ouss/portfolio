'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
    {
        question: "Qu'est-ce qui rend votre café différent ?",
        answer: "Nous nous approvisionnons exclusivement auprès de micro-lots avec des normes de qualité rigoureuses. Chaque grain est sélectionné pour ses caractéristiques de terroir uniques, torréfié en petites quantités dans les 48 heures suivant l'expédition et préparé avec des paramètres d'infusion de précision calibrés pour l'origine spécifique."
    },
    {
        question: "Proposez-vous des cours d'infusion ?",
        answer: "Oui ! Nous organisons des masterclasses hebdomadaires couvrant les techniques de pour-over, la théorie de l'extraction de l'espresso et l'analyse sensorielle. Des sessions privées avec notre barista en chef sont disponibles pour les groupes cherchant une compréhension plus approfondie de l'artisanat."
    },
    {
        question: "Puis-je acheter des grains à emporter ?",
        answer: "Absolument. Tous nos origines uniques et mélanges maison sont disponibles au sac. Nous recommandons une consommation dans les 3 semaines suivant la date de torréfaction pour une fraîcheur optimale. Les abonnements offrent 15% d'économie et un accès prioritaire aux sorties limitées."
    },
    {
        question: "Quel équipement d'infusion recommandez-vous ?",
        answer: "Pour les débutants, nous suggérons le Hario V60 ou l'Aeropress. Les amateurs intermédiaires pourraient explorer le Chemex ou le Kalita Wave. Nous stockons un équipement sélectionné en magasin et offrons des conseils gratuits sur la sélection."
    },
    {
        question: "Prenez-vous en compte les restrictions alimentaires ?",
        answer: "Nous proposons une gamme complète de laits alternatifs, y compris avoine, amande et coco. Nos pâtisseries incluent des options sans gluten et véganes. Veuillez informer notre équipe de toute allergie pour des recommandations personnalisées."
    },
    {
        question: "Y a-t-il un parking disponible ?",
        answer: "Le stationnement dans la rue est disponible le long de Kyoto Street. Nous validons pour le parking du Arts District le week-end. De nombreux invités préfèrent arriver via le métro (station Arts District, 3 min à pied) ou en covoiturage."
    }
];

export function CafeFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-32 bg-[#1F1C18] text-[#E6DCCA] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left - Header */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:sticky lg:top-32 lg:self-start"
                    >
                        <span className="text-xs font-sans tracking-[0.3em] text-[#C8AA6E] uppercase block mb-8">
                            Questions
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-[0.95]">
                            Fréquemment<br />
                            <span className="text-[#C8AA6E]/30">Posées</span>
                        </h2>
                        <p className="text-sm font-light text-white/40 leading-relaxed max-w-sm mb-12">
                            Tout ce que vous devez savoir sur notre café, nos services et l'expérience KŌHĪ. Vous ne trouvez pas ce que vous cherchez ? Contactez notre équipe.
                        </p>
                        <a
                            href="#reservation"
                            className="inline-flex items-center gap-4 text-[#C8AA6E] text-xs uppercase tracking-[0.2em] group"
                        >
                            <span className="group-hover:underline underline-offset-4">Contactez-nous</span>
                            <span className="w-8 h-[1px] bg-[#C8AA6E] group-hover:w-12 transition-all" />
                        </a>
                    </motion.div>

                    {/* Right - Accordion */}
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="border-b border-white/5"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full py-6 flex items-center justify-between text-left group"
                                >
                                    <span className={`text-lg font-serif transition-colors ${openIndex === index ? 'text-[#C8AA6E]' : 'text-white/70 group-hover:text-white'
                                        }`}>
                                        {faq.question}
                                    </span>
                                    <span className={`w-8 h-8 border flex items-center justify-center transition-all ${openIndex === index
                                        ? 'border-[#C8AA6E] text-[#C8AA6E] rotate-0'
                                        : 'border-white/10 text-white/40'
                                        }`}>
                                        {openIndex === index ? <FiMinus /> : <FiPlus />}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-6 text-sm font-light text-white/40 leading-relaxed max-w-lg">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
