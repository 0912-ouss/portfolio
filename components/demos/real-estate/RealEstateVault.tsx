'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Fingerprint, Lock, Key, Eye, ArrowUpRight } from 'lucide-react';
import { MaskReveal } from './MaskReveal';
import { MagnetButton } from './MagnetButton';

export function RealEstateVault() {
    const [isHovered, setIsHovered] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);

    const handleUnlock = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setIsUnlocked(true);
        }, 2000);
    };

    return (
        <section className="py-40 bg-black overflow-hidden relative">
            {/* Background Texture/Pattern */}
            <div aria-hidden="true" className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#C19A6B_1px,_transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                    {/* Left: Interactive Scanner / Unlock Area */}
                    <div className="relative flex justify-center vault-scanner">
                        <motion.div
                            className={`relative w-80 h-96 border transition-all duration-1000 flex flex-col items-center justify-center gap-8 ${isUnlocked ? 'border-[#C19A6B]/50 bg-[#C19A6B]/5' : 'border-white/10 bg-white/5'}`}
                            animate={isUnlocked ? { boxShadow: "0 0 50px rgba(193, 154, 107, 0.2)" } : {}}
                        >
                            <AnimatePresence mode="wait">
                                {!isUnlocked ? (
                                    <motion.div
                                        key="locked"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="contents"
                                    >
                                        <div className="relative">
                                            <Fingerprint size={64} className={`transition-colors duration-700 ${isScanning ? 'text-[#C19A6B]' : 'text-white/20'}`} />
                                            {isScanning && (
                                                <motion.div
                                                    className="absolute -inset-2 border-2 border-[#C19A6B] rounded-full"
                                                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                />
                                            )}
                                        </div>
                                        <div className="text-center px-10">
                                            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white mb-2">Archives Hors Marché</h4>
                                            <p className="text-[9px] uppercase tracking-widest text-white/30 leading-relaxed font-bold">Vérification biométrique requise pour l'accès anonyme au portefeuille.</p>
                                        </div>
                                        <button
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                            onClick={handleUnlock}
                                            disabled={isScanning}
                                            className={`px-8 py-3 border border-white/10 rounded-full text-[9px] uppercase tracking-widest font-bold transition-all duration-500 overflow-hidden relative ${isScanning ? 'text-[#C19A6B]' : 'text-white hover:border-[#C19A6B]'}`}
                                        >
                                            {isScanning ? 'Authentification...' : 'Commencer le Scan'}
                                            {isScanning && (
                                                <motion.div
                                                    className="absolute bottom-0 left-0 h-[2px] bg-[#C19A6B]"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 2 }}
                                                />
                                            )}
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="unlocked"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="contents"
                                    >
                                        <Eye size={64} className="text-[#C19A6B]" />
                                        <div className="text-center px-10">
                                            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#C19A6B] mb-2">Accès Autorisé</h4>
                                            <p className="text-[9px] uppercase tracking-widest text-white/60 leading-relaxed font-bold">Affichage des propriétés restreintes pour les partenaires vérifiés.</p>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full px-12">
                                            <div className="h-[1px] bg-[#C19A6B]/30 w-full" />
                                            <div className="flex justify-between text-[8px] uppercase tracking-widest font-bold text-[#C19A6B]">
                                                <span>Fichiers Actifs</span>
                                                <span>12 Portefeuilles Secrets</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Scanning Line Animation */}
                            {isScanning && (
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C19A6B] to-transparent z-50 shadow-[0_0_15px_#C19A6B]"
                                    animate={{ top: ["10%", "90%", "10%"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />
                            )}
                        </motion.div>

                        {/* Decorative side text */}
                        <div className="absolute top-1/2 -left-20 -translate-y-1/2 rotate-90 hidden lg:block">
                            <span aria-hidden="true" className="text-[10px] uppercase tracking-[1em] text-white/10 font-bold whitespace-nowrap">SECTION RESTREINTE 09-AF</span>
                        </div>
                    </div>

                    {/* Right: Narrative Content */}
                    <div>
                        <MaskReveal>
                            <span className="text-[#C19A6B] text-[10px] uppercase tracking-[0.6em] font-bold mb-6 block drop-shadow-lg underline underline-offset-8">Niveau de Confidentialité 1</span>
                        </MaskReveal>
                        <MaskReveal delay={0.2}>
                            <h2 className="text-5xl md:text-8xl font-serif text-white mb-10 leading-none">Le Coffre <br /><span className="italic">Héritage</span></h2>
                        </MaskReveal>
                        <MaskReveal delay={0.4}>
                            <p className="text-white/40 font-light leading-relaxed mb-12 max-w-lg text-lg italic">
                                "Les propriétés les plus prestigieuses ne sont jamais listées. Elles se transmettent entre gardiens en silence."
                            </p>
                        </MaskReveal>

                        <div className="space-y-12 mb-16">
                            {[
                                { icon: <Shield size={18} />, title: "Discrétion Avant Tout", desc: "Archives privées, sans traces numériques. Confidentialité architecturale pure." },
                                { icon: <Lock size={18} />, title: "Garde Exclusive", desc: "Réservé aux mécènes détenant déjà des actifs patrimoniaux importants." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    className="flex items-start gap-6 group"
                                >
                                    <div className="text-[#C19A6B] mt-1 p-3 border border-[#C19A6B]/20 group-hover:border-[#C19A6B] transition-colors">{item.icon}</div>
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white mb-2">{item.title}</h4>
                                        <p className="text-sm text-white/30 font-light leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <MagnetButton className="bg-white text-black px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#C19A6B] hover:text-white transition-all duration-700 flex items-center gap-4 group">
                            Demander une Autorisation
                            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </MagnetButton>
                    </div>
                </div>
            </div>

            {/* Ambient Lighting FX */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#C19A6B]/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-[#C19A6B]/5 to-transparent pointer-events-none" />
        </section>
    );
}
