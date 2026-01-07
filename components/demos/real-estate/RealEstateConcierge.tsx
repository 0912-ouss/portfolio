'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail, Calendar, Plane, ShieldCheck, Gem } from 'lucide-react';
import { MagnetButton } from './MagnetButton';

export function RealEstateConcierge({ onInquiryClick }: { onInquiryClick: () => void }) {
    return (
        <section className="py-32 bg-[#1A1A1A] text-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                    {/* Left: Advisor Profile Card */}
                    <div className="relative group">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-[4/5] w-full max-w-lg mx-auto overflow-hidden rounded-sm"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000"
                                alt="Private Advisor"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black via-black/40 to-transparent">
                                <span className="text-[#C19A6B] text-[10px] uppercase tracking-[0.4em] font-bold mb-2 block">Associé Principal</span>
                                <h3 className="text-3xl font-serif mb-6">Yassin Benjelloun</h3>
                                <div className="flex gap-4">
                                    <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C19A6B] transition-colors flex items-center justify-center">
                                        <Phone size={16} />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C19A6B] transition-colors flex items-center justify-center">
                                        <Mail size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative background element */}
                        <div className="absolute -top-12 -left-12 w-64 h-64 border border-white/5 -z-10" />
                        <div className="absolute -bottom-12 -right-12 w-64 h-64 border border-white/5 -z-10" />
                    </div>

                    {/* Right: Content */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[#C19A6B] text-xs uppercase tracking-[0.6em] font-bold mb-6 block"
                        >
                            Service Sur Mesure
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-8xl font-serif mb-10 leading-tight"
                        >
                            Votre Concierge <br /><span className="italic">Privé</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/40 font-light leading-relaxed mb-12 max-w-lg"
                        >
                            Acquérir un domaine patrimonial est plus qu'une transaction; c'est un héritage. Nos conseillers dédiés fournissent un soutien de bout en bout, des coordonnées de jet privé à la gestion juridique et de restauration.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            {[
                                { icon: <Plane size={20} />, title: "Visites en Jet Privé", desc: "Inspections aériennes" },
                                { icon: <ShieldCheck size={20} />, title: "Conseil Juridique", desc: "Expertise en droit du patrimoine" },
                                { icon: <Calendar size={20} />, title: "Visite Privée", desc: "Accès exclusif aux manoirs" },
                                { icon: <Gem size={20} />, title: "Restauration", desc: "Réseau d'artisans sélectionnés" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="text-[#C19A6B] mt-1">{item.icon}</div>
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-widest font-bold mb-1">{item.title}</h4>
                                        <p className="text-[10px] text-white/30 uppercase tracking-widest">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <MagnetButton
                            onClick={onInquiryClick}
                            className="bg-[#C19A6B] text-white px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all duration-500"
                        >
                            Demander une Présentation
                        </MagnetButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
