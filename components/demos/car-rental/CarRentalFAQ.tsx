'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
    {
        question: "What documents do I need to rent a car?",
        answer: "You'll need a valid driver's license (held for at least 2 years), a credit card in your name, and a valid ID or passport. International renters may need an International Driving Permit."
    },
    {
        question: "Is insurance included in the rental price?",
        answer: "Yes, comprehensive insurance is included with every rental. This covers collision damage, theft protection, and third-party liability. Additional coverage options are available."
    },
    {
        question: "Can I pick up in one location and drop off in another?",
        answer: "Absolutely! One-way rentals are available between all our locations. A small surcharge may apply depending on the distance and locations involved."
    },
    {
        question: "What is the minimum age to rent?",
        answer: "The minimum age is 21 for standard vehicles. For luxury and performance cars, the minimum age is 25. Young driver surcharges may apply for drivers under 25."
    },
    {
        question: "What happens if I return the car late?",
        answer: "We offer a 29-minute grace period. After that, a late fee applies. If you anticipate being late, contact us and we'll try to accommodate your needs."
    },
    {
        question: "Are there mileage limits?",
        answer: "Most of our rentals include unlimited mileage. Some specialty and luxury vehicles may have daily limits of 200-300 miles, with additional miles charged at a competitive rate."
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
                            Common<br />
                            <span className="text-white/20">Questions</span>
                        </motion.h2>
                        <p className="text-white/50 mb-8 max-w-sm">
                            Everything you need to know about renting with AutoRent. Can't find your answer? Contact our support team.
                        </p>
                        <button className="px-8 py-4 bg-[#FF6B35] text-white font-bold uppercase tracking-wider text-sm hover:bg-[#FF8C42] transition-colors">
                            Contact Support
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
