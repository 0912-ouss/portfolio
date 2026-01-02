'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function EcommerceNewsletter() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <section className="py-24 bg-[#FAF8F5]">
            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <span className="text-[#D4A574] text-xs uppercase tracking-[0.3em] block mb-4">
                        Newsletter
                    </span>
                    <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
                        Rejoignez le <span className="font-serif italic">Cercle Privé</span>
                    </h2>
                    <p className="text-[#666] font-light mb-10">
                        Soyez les premiers informés des nouveautés, des offres exclusives et des conseils de style. Rejoignez notre communauté.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        {!submitted ? (
                            <>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Entrez votre email"
                                    required
                                    className="flex-1 px-6 py-4 border border-[#E0E0E0] bg-white focus:outline-none focus:border-[#1A1A1A] transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-[#1A1A1A] text-white font-medium text-sm uppercase tracking-wider hover:bg-[#333] transition-colors"
                                >
                                    S'abonner
                                </button>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full py-4 text-[#D4A574] font-medium"
                            >
                                ✓ Bienvenue dans le cercle privé !
                            </motion.div>
                        )}
                    </form>

                    <p className="text-xs text-[#999] mt-6">
                        En vous abonnant, vous acceptez notre politique de confidentialité. Désabonnement à tout moment.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
