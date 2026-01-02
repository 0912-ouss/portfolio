'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
    {
        question: "Quels documents dois-je fournir pour louer une voiture ?",
        answer: "Vous aurez besoin d'un permis de conduire valide (depuis au moins 2 ans), d'une carte de crédit à votre nom et d'une pièce d'identité ou d'un passeport valide. Les locataires internationaux peuvent avoir besoin d'un permis international."
    },
    {
        question: "L'assurance est-elle incluse dans le prix de la location ?",
        answer: "Oui, une assurance complète est incluse avec chaque location. Cela couvre les dommages en cas collision, le vol et la responsabilité civile. Des options de couverture supplémentaires sont disponibles."
    },
    {
        question: "Puis-je prendre le véhicule dans une agence et le rendre dans une autre ?",
        answer: "Absolument ! Les locations en aller simple sont disponibles entre toutes nos agences. Un petit supplément peut s'appliquer selon la distance et les lieux concernés."
    },
    {
        question: "Quel est l'âge minimum pour louer ?",
        answer: "L'âge minimum est de 21 ans pour les véhicules standard. Pour les voitures de luxe et de sport, l'âge minimum est de 25 ans. Des frais jeune conducteur peuvent s'appliquer pour les conducteurs de moins de 25 ans."
    },
    {
        question: "Que se passe-t-il si je rends la voiture en retard ?",
        answer: "Nous offrons une période de grâce de 29 minutes. Au-delà, des frais de retard s'appliquent. Si vous prévoyez d'être en retard, contactez-nous et nous essaierons de nous adapter."
    },
    {
        question: "Y a-t-il des limites de kilométrage ?",
        answer: "La plupart de nos locations incluent le kilométrage illimité. Certains véhicules spéciaux et de luxe peuvent avoir des limites journalières de 200 à 300 kilomètres, avec les kilomètres supplémentaires facturés à un tarif compétitif."
    }
];

export function CarRentalFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-32 bg-[#0F0F0F] text-white">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left - Header */}
                    <div className="lg:sticky lg:top-32 lg:self-start">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#FF6B35] text-xs uppercase tracking-[0.3em] block mb-4"
                        >
                            FAQ
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black tracking-tight mb-8"
                        >
                            Questions<br />
                            <span className="text-white/20">Fréquentes</span>
                        </motion.h2>
                        <p className="text-white/50 mb-8 max-w-sm">
                            Tout ce que vous devez savoir sur la location avec AutoRent. Vous ne trouvez pas votre réponse ? Contactez notre équipe support.
                        </p>
                        <button className="px-8 py-4 bg-[#FF6B35] text-white font-bold uppercase tracking-wider text-sm hover:bg-[#FF8C42] transition-colors">
                            Contacter le Support
                        </button>
                    </div>

                    {/* Right - Accordion */}
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="border border-white/10"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className={`font-bold transition-colors ${openIndex === index ? 'text-[#FF6B35]' : 'text-white'
                                        }`}>
                                        {faq.question}
                                    </span>
                                    <span className={`w-8 h-8 flex items-center justify-center transition-colors ${openIndex === index ? 'bg-[#FF6B35] text-white' : 'bg-white/10'
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
                                            className="overflow-hidden"
                                        >
                                            <p className="px-6 pb-6 text-white/50 leading-relaxed">
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
