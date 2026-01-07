"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FitnessNavbar } from "@/components/demos/fitness/FitnessNavbar";
import { FitnessFooter } from "@/components/demos/fitness/FitnessFooter";
import { fitnessClasses } from "@/data/fitness/classes";
import { FiClock, FiUsers, FiArrowLeft, FiCheck, FiCalendar } from "react-icons/fi";
import { useState } from "react";

export default function ClassDetailPage() {
    const params = useParams();
    const [showBooking, setShowBooking] = useState(false);

    const classData = fitnessClasses.find(c => c.slug === params.slug);

    if (!classData) {
        return (
            <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-4">Classe non trouvée</h1>
                    <Link href="/demos/fitness/classes" className="text-[#D4AF37]">
                        Retour aux classes
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#050505] text-white font-sans">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
                .font-serif { font-family: 'Cinzel', serif; }
                .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
            `}</style>

            <FitnessNavbar />

            {/* Hero */}
            <section className="relative h-[60vh] min-h-[500px]">
                <Image
                    src={classData.image}
                    alt={classData.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />

                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-6 pb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Link
                                href="/demos/fitness/classes"
                                className="inline-flex items-center gap-2 text-white/40 text-sm mb-6 hover:text-white transition-colors"
                            >
                                <FiArrowLeft /> Retour aux classes
                            </Link>

                            <span className="px-3 py-1 bg-[#D4AF37] text-black text-[10px] uppercase font-black tracking-wider rounded-full inline-block mb-4">
                                {classData.category}
                            </span>

                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                                {classData.name}
                            </h1>

                            <p className="text-white/60 text-xl max-w-2xl">
                                {classData.shortDesc}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Description */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
                                    À Propos
                                </h2>
                                <p className="text-white/60 text-lg leading-relaxed">
                                    {classData.fullDesc}
                                </p>
                            </motion.div>

                            {/* Benefits */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
                                    Bénéfices
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {classData.benefits.map((benefit, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 p-4 bg-white/5 rounded-xl"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                                                <FiCheck className="text-[#D4AF37]" />
                                            </div>
                                            <span className="text-white/80">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Equipment */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
                                    Équipement
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {classData.equipment.map((item, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 border border-white/10 rounded-full text-white/60 text-sm"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Booking Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 sticky top-24"
                            >
                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                                        <span className="text-white/40 text-sm">Durée</span>
                                        <span className="text-white font-medium flex items-center gap-2">
                                            <FiClock className="text-[#D4AF37]" /> {classData.duration}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                                        <span className="text-white/40 text-sm">Intensité</span>
                                        <span className="text-white font-medium">{classData.intensity}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                                        <span className="text-white/40 text-sm">Capacité</span>
                                        <span className="text-white font-medium flex items-center gap-2">
                                            <FiUsers className="text-[#D4AF37]" /> {classData.maxParticipants} max
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <span className="text-white/40 text-sm">Coach</span>
                                        <span className="text-[#D4AF37] font-medium">{classData.trainer}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowBooking(true)}
                                    className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-black uppercase tracking-wider hover:bg-white transition-colors"
                                >
                                    Réserver une séance
                                </button>
                            </motion.div>

                            {/* Schedule */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6"
                            >
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <FiCalendar className="text-[#D4AF37]" /> Horaires
                                </h3>
                                <div className="space-y-2">
                                    {classData.schedule.map((time, i) => (
                                        <div
                                            key={i}
                                            className="px-4 py-3 bg-white/5 rounded-lg text-white/60 text-sm"
                                        >
                                            {time}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Modal */}
            {showBooking && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 max-w-md w-full"
                    >
                        <h2 className="text-2xl font-black uppercase mb-4">Réserver</h2>
                        <p className="text-white/60 mb-6">
                            Choisissez votre créneau pour <span className="text-[#D4AF37]">{classData.name}</span>
                        </p>

                        <div className="space-y-3 mb-6">
                            {classData.schedule.map((time, i) => (
                                <button
                                    key={i}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all text-left"
                                >
                                    {time}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowBooking(false)}
                                className="flex-1 py-3 border border-white/20 rounded-xl text-white/60 hover:bg-white/5 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={() => {
                                    setShowBooking(false);
                                    alert("Réservation confirmée !");
                                }}
                                className="flex-1 py-3 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-white transition-colors"
                            >
                                Confirmer
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            <FitnessFooter />
        </main>
    );
}
