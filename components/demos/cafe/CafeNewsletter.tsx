'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiCheck } from 'react-icons/fi';

export function CafeNewsletter() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setEmail('');
            }, 4000);
        }
    };

    return (
        <section className="py-32 bg-[#1A1714] text-[#E6DCCA] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8AA6E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Coffee Bean Icon */}
                        <div className="w-20 h-20 mx-auto mb-8 relative">
                            <svg viewBox="0 0 100 100" className="w-full h-full text-[#C8AA6E]/20">
                                <ellipse cx="50" cy="50" rx="35" ry="45" fill="none" stroke="currentColor" strokeWidth="2" />
                                <path d="M50 10 Q40 50 50 90" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>

                        <span className="text-xs font-sans tracking-[0.3em] text-[#C8AA6E] uppercase block mb-6">
                            Restez Connecté
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif mb-6">
                            Rejoignez l'Atelier
                        </h2>
                        <p className="text-sm font-light text-white/50 leading-relaxed mb-12 max-w-lg mx-auto">
                            Recevez en avant-première l'accès aux nouvelles origines uniques, des conseils d'infusion de notre faculté et des invitations exclusives aux événements de dégustation.
                        </p>

                        {/* Newsletter Form */}
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                            <AnimatePresence mode="wait">
                                {!submitted ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex flex-col sm:flex-row gap-4"
                                    >
                                        <div className="flex-1 relative">
                                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Votre adresse email"
                                                required
                                                className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C8AA6E]/50 transition-colors"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="px-8 py-4 bg-[#C8AA6E] text-black text-xs uppercase font-bold tracking-[0.2em] hover:bg-white transition-colors whitespace-nowrap"
                                        >
                                            S'abonner
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="flex items-center justify-center gap-4 py-4 text-[#C8AA6E]"
                                    >
                                        <div className="w-10 h-10 rounded-full border-2 border-[#C8AA6E] flex items-center justify-center">
                                            <FiCheck className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-sans tracking-wider">Bienvenue à l'atelier</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>

                        {/* Social Proof */}
                        <p aria-hidden="true" className="text-[10px] uppercase tracking-[0.2em] text-white/20 mt-8">
                            Rejoignez plus de 2 400 amateurs de café
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
