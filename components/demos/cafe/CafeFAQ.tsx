'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
    {
        question: "What makes your coffee different?",
        answer: "We source exclusively from micro-lots with rigorous quality standards. Each bean is selected for its unique terroir characteristics, roasted in small batches within 48 hours of shipping, and prepared with precision brewing parameters calibrated to the specific origin."
    },
    {
        question: "Do you offer brewing classes?",
        answer: "Yes! We host weekly masterclasses covering pour-over techniques, espresso extraction theory, and sensory analysis. Private sessions with our head barista are available for groups seeking a deeper understanding of the craft."
    },
    {
        question: "Can I purchase beans to take home?",
        answer: "Absolutely. All our single origins and house blends are available by the bag. We recommend consumption within 3 weeks of roast date for optimal freshness. Subscriptions offer 15% savings and priority access to limited releases."
    },
    {
        question: "What brewing equipment do you recommend?",
        answer: "For beginners, we suggest the Hario V60 or Aeropress. Intermediate brewers might explore the Chemex or Kalita Wave. We stock curated equipment in-store and offer complimentary guidance on selection."
    },
    {
        question: "Do you accommodate dietary restrictions?",
        answer: "We offer a full range of alternative milks including oat, almond, and coconut. Our pastries include gluten-free and vegan options. Please inform our team of any allergies for personalized recommendations."
    },
    {
        question: "Is there parking available?",
        answer: "Street parking is available along Kyoto Street. We validate for the Arts District lot on weekends. Many guests prefer to arrive via Metro (Arts District station, 3 min walk) or ride-share."
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
                            Frequently<br />
                            <span className="text-[#C8AA6E]/30">Asked</span>
                        </h2>
                        <p className="text-sm font-light text-white/40 leading-relaxed max-w-sm mb-12">
                            Everything you need to know about our coffee, services, and the KŌHĪ experience. Can't find what you're looking for? Reach out to our team.
                        </p>
                        <a
                            href="#reservation"
                            className="inline-flex items-center gap-4 text-[#C8AA6E] text-xs uppercase tracking-[0.2em] group"
                        >
                            <span className="group-hover:underline underline-offset-4">Contact Us</span>
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
