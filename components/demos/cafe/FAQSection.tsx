"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiPlus, FiMinus, FiHelpCircle } from "react-icons/fi";

const faqs = [
    {
        id: 1,
        question: "What are your opening hours?",
        answer: "We're open Monday to Friday from 7 AM to 9 PM, and Saturday to Sunday from 8 AM to 10 PM. During holidays, hours may vary - please check our social media for updates.",
    },
    {
        id: 2,
        question: "Do you offer vegan or dairy-free options?",
        answer: "Absolutely! We offer a variety of plant-based milks including oat, almond, soy, and coconut at no extra charge. We also have vegan pastries and desserts available daily.",
    },
    {
        id: 3,
        question: "Can I reserve a table or private area?",
        answer: "Yes, we accept reservations for groups of 6 or more. For private events, our rooftop lounge can accommodate up to 40 guests. Please contact us at least 48 hours in advance.",
    },
    {
        id: 4,
        question: "Do you sell your coffee beans?",
        answer: "Yes! All our signature blends and single-origin beans are available for purchase. We offer whole beans and freshly ground options in 250g, 500g, and 1kg bags.",
    },
    {
        id: 5,
        question: "Is there parking available?",
        answer: "We have a dedicated parking lot behind the cafe with 20 spots. Street parking is also available. On weekends, we recommend arriving early as spots fill up quickly.",
    },
    {
        id: 6,
        question: "Do you cater events or offer bulk orders?",
        answer: "We offer catering services for corporate events, weddings, and parties. Bulk coffee orders are available with 1-week advance notice. Contact us for custom quotes.",
    },
];

export default function FAQSection() {
    const [openId, setOpenId] = useState<number | null>(1);

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#3C2A21]/10 rounded-full text-[#3C2A21] font-semibold text-sm tracking-wider mb-4">
                        <FiHelpCircle />
                        FAQ
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1A120B] mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-[#3C2A21]/70 max-w-2xl mx-auto">
                        Everything you need to know about our cafe and services
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border border-[#3C2A21]/10 rounded-2xl overflow-hidden"
                        >
                            <motion.button
                                onClick={() => toggleFAQ(faq.id)}
                                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-[#EEEBE6]/50 transition-colors"
                                whileHover={{ backgroundColor: "rgba(238, 235, 230, 0.5)" }}
                            >
                                <span className="text-lg font-semibold text-[#1A120B] pr-4">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${openId === faq.id
                                            ? "bg-[#3C2A21] text-white"
                                            : "bg-[#EEEBE6] text-[#3C2A21]"
                                        }`}
                                >
                                    {openId === faq.id ? (
                                        <FiMinus className="text-lg" />
                                    ) : (
                                        <FiPlus className="text-lg" />
                                    )}
                                </motion.div>
                            </motion.button>

                            <AnimatePresence>
                                {openId === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pt-0">
                                            <div className="w-full h-px bg-[#3C2A21]/10 mb-4" />
                                            <p className="text-[#3C2A21]/70 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-12 p-8 bg-gradient-to-r from-[#EEEBE6] to-[#E5E0D8] rounded-3xl"
                >
                    <p className="text-[#3C2A21]/70 mb-4">
                        Still have questions? We&apos;re here to help!
                    </p>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-[#3C2A21] text-white rounded-full font-bold hover:bg-[#1A120B] transition-all"
                    >
                        Contact Us
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
