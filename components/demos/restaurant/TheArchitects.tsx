'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const team = [
    {
        name: "Elena Vance",
        role: "Chef Exécutif",
        bio: "Ancienne architecte devenue sculptrice culinaire. Croit que la structure de l'assiette dicte la perception des saveurs.",
        image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2000&auto=format&fit=crop"
    },
    {
        name: "Marcus Thorne",
        role: "Sommelier en Chef",
        bio: "Un conservateur de l'histoire en bouteille. Spécialisé dans les vins volcaniques et les cépages oubliés.",
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=2100&auto=format&fit=crop"
    }
];

export function TheArchitects() {
    return (
        <section className="py-32 bg-[#0F0F0F] text-[#E5E5E5] border-t border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-24">
                    <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#D4AF37] block mb-6">
                        Les Architectes
                    </span>
                    <h2 className="text-5xl font-serif">Conservateurs du Goût</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    {team.map((member, i) => (
                        <div key={i} className="group relative">
                            <div className="relative aspect-[3/4] mb-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            <div className="text-center md:text-left">
                                <h3 className="text-3xl font-serif mb-2">{member.name}</h3>
                                <div className="w-12 h-[1px] bg-[#D4AF37] mb-4 mx-auto md:mx-0" />
                                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#D4AF37] block mb-4">
                                    {member.role}
                                </span>
                                <p className="text-white/40 font-light leading-relaxed max-w-sm mx-auto md:mx-0">
                                    {member.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
