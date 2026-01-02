'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiInstagram, FiAward } from 'react-icons/fi';

const baristas = [
    {
        name: "Kenji Tanaka",
        role: "Barista en Chef",
        specialty: "Spécialiste du Pour Over",
        experience: "12 Ans",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
        certifications: ["Q Grader", "Certifié SCA"],
        instagram: "#"
    },
    {
        name: "Sofia Martinez",
        role: "Maître Torréfacteur",
        specialty: "Expert Origine Unique",
        experience: "8 Ans",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop",
        certifications: ["Guilde de Torréfaction", "Spécialiste Origine"],
        instagram: "#"
    },
    {
        name: "Marcus Chen",
        role: "Artiste Latte",
        specialty: "Texturisation du Lait",
        experience: "6 Ans",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop",
        certifications: ["Champion Latte Art 2023"],
        instagram: "#"
    }
];

export function CafeBaristas() {
    return (
        <section className="py-32 md:py-48 bg-[#1A1714] text-[#E6DCCA] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 20px,
                        #C8AA6E 20px,
                        #C8AA6E 21px
                    )`
                }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs font-sans tracking-[0.3em] text-[#C8AA6E] uppercase block mb-6">
                            Les Experts
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif mb-6">
                            Rencontrez Nos<br />
                            <span className="text-[#C8AA6E]/30">Artisans</span>
                        </h2>
                        <p className="max-w-lg mx-auto text-sm font-light text-white/40 leading-relaxed">
                            Chaque membre de notre équipe apporte des années de pratique dévouée et une passion pour l'extraction parfaite.
                        </p>
                    </motion.div>
                </div>

                {/* Baristas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {baristas.map((barista, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] mb-8 overflow-hidden">
                                <Image
                                    src={barista.image}
                                    alt={barista.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1714] via-transparent to-transparent opacity-80" />

                                {/* Social Icon */}
                                <a
                                    href={barista.instagram}
                                    className="absolute top-6 right-6 w-10 h-10 border border-white/20 flex items-center justify-center text-white/40 hover:text-[#C8AA6E] hover:border-[#C8AA6E]/50 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <FiInstagram className="w-4 h-4" />
                                </a>

                                {/* Experience Badge */}
                                <div className="absolute bottom-6 left-6">
                                    <span className="text-[10px] uppercase tracking-widest text-[#C8AA6E]">
                                        {barista.experience}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="text-center">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-2">
                                    {barista.role}
                                </span>
                                <h3 className="text-2xl font-serif mb-3 group-hover:text-[#C8AA6E] transition-colors">
                                    {barista.name}
                                </h3>
                                <p className="text-xs text-white/40 mb-4">
                                    {barista.specialty}
                                </p>

                                {/* Certifications */}
                                <div className="flex flex-wrap justify-center gap-2">
                                    {barista.certifications.map((cert, i) => (
                                        <span
                                            key={i}
                                            className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#C8AA6E]/60 border border-[#C8AA6E]/20 px-3 py-1"
                                        >
                                            <FiAward className="w-3 h-3" />
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
