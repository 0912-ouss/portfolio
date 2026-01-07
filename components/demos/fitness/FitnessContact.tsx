"use client";

import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export function FitnessContact() {
    return (
        <section className="min-h-screen bg-[#050505] text-white py-32 relative">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                {/* Info Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-16"
                >
                    <div>
                        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-black block mb-6">Conciergerie</span>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
                            Votre Liaison <br /> <span className="text-[#D4AF37]">Privée</span>
                        </h1>
                        <p className="text-white/60 text-lg font-light leading-relaxed max-w-md">
                            Notre équipe de conciergerie est à votre disposition pour orchestrer votre expérience, répondre à vos demandes spécifiques ou organiser une visite privée.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500">
                                <FiMapPin className="text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xs uppercase tracking-widest font-black mb-2 text-white">Siège Social</h3>
                                <p className="text-white/40 font-serif">8 Avenue Montaigne,<br />75008 Paris, France</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500">
                                <FiPhone className="text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xs uppercase tracking-widest font-black mb-2 text-white">Ligne Directe</h3>
                                <p className="text-white/40 font-serif">+33 1 40 40 40 40</p>
                                <p className="text-[#D4AF37] text-[10px] mt-1 uppercase tracking-wider">Disponible 24/7 pour les membres Infinity</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500">
                                <FiMail className="text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xs uppercase tracking-widest font-black mb-2 text-white">Correspondance Numérique</h3>
                                <p className="text-white/40 font-serif">concierge@elysium-athletics.com</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Form Side */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-[#0A0A0A] p-10 md:p-16 rounded-[2rem] border border-white/5 relative overflow-hidden"
                >
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[80px] rounded-full pointer-events-none" />

                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-10">Envoyer une requête</h3>

                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Sujet</label>
                                <select className="w-full bg-black border border-white/10 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-sans appearance-none">
                                    <option>Demande d'adhésion</option>
                                    <option>Privatisation</option>
                                    <option>Presse & Média</option>
                                    <option>Autre</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Nom Complet</label>
                                <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-sans" placeholder="Votre nom" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">Message</label>
                            <textarea rows={6} className="w-full bg-black border border-white/10 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-sans resize-none" placeholder="Comment pouvons-nous vous assister ?"></textarea>
                        </div>

                        <button className="w-full bg-[#D4AF37] text-black font-black uppercase tracking-[0.2em] py-5 rounded-lg hover:bg-white transition-all duration-500 flex items-center justify-center gap-4">
                            Transmettre
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
