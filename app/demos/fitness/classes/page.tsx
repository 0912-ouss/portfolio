"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FitnessNavbar } from "@/components/demos/fitness/FitnessNavbar";
import { FitnessFooter } from "@/components/demos/fitness/FitnessFooter";
import { fitnessClasses } from "@/data/fitness/classes";
import { FiClock, FiUsers, FiArrowRight } from "react-icons/fi";

export default function ClassesPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white font-sans">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
                .font-serif { font-family: 'Cinzel', serif; }
                .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
            `}</style>

            <FitnessNavbar />

            {/* Hero */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)]" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-black block mb-6">
                            Nos Disciplines
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                            L'Excellence en <br />
                            <span className="text-[#D4AF37]">Mouvement</span>
                        </h1>
                        <p className="text-white/60 text-lg max-w-xl mx-auto">
                            Chaque discipline est enseignée par des maîtres reconnus, dans des espaces conçus pour la performance.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Classes Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {fitnessClasses.map((cls, index) => (
                            <motion.div
                                key={cls.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <Link href={`/demos/fitness/classes/${cls.slug}`}>
                                    <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                                        <Image
                                            src={cls.image}
                                            alt={cls.name}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-[#D4AF37] text-black text-[10px] uppercase font-black tracking-wider rounded-full">
                                                {cls.category}
                                            </span>
                                        </div>

                                        {/* Info Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                                                {cls.name}
                                            </h3>
                                            <p className="text-white/60 text-sm mb-4">{cls.shortDesc}</p>
                                            <div className="flex items-center gap-4 text-white/40 text-xs">
                                                <span className="flex items-center gap-1">
                                                    <FiClock /> {cls.duration}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FiUsers /> Max {cls.maxParticipants}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-white/40 text-xs uppercase tracking-wider">
                                            {cls.intensity}
                                        </span>
                                        <span className="text-[#D4AF37] text-xs uppercase font-bold tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Découvrir <FiArrowRight />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <FitnessFooter />
        </main>
    );
}
