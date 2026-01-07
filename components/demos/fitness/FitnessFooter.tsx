'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiTwitter, FiFacebook, FiLinkedin, FiYoutube } from 'react-icons/fi';

export function FitnessFooter() {
    return (
        <footer className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center gap-12 text-center">
                    {/* Logo/Icon */}
                    <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-serif font-black text-3xl shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                        E
                    </div>

                    <div className="max-w-xl">
                        <h4 className="text-white text-3xl font-black uppercase tracking-tighter mb-6">
                            PAS DE COMPROMIS. PAS D'EXCUSES.
                        </h4>
                        <p className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-black">
                            Le sommet de la performance humaine.
                        </p>
                    </div>

                    <div className="flex gap-8 mt-8">
                        {[
                            { icon: FiInstagram, label: "Instagram", href: "https://instagram.com" },
                            { icon: FiTwitter, label: "Twitter", href: "https://twitter.com" },
                            { icon: FiFacebook, label: "Facebook", href: "https://facebook.com" },
                            { icon: FiLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
                            { icon: FiYoutube, label: "YouTube", href: "https://youtube.com" }
                        ].map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, scale: 1.1 }}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors"
                            >
                                <social.icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-24 mt-16 text-[8px] uppercase font-black tracking-[0.5em] text-white/20">
                        <span>Kyoto • Paris • Los Angeles</span>
                        <span>© 2024 Elysium Athletics.</span>
                        <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
                    </div>
                </div>
            </div>

            {/* Background Decorative Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        </footer>
    );
}
