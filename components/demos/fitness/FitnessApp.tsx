"use client";

import { motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export function FitnessApp() {
    return (
        <section className="py-32 bg-[#080808] overflow-hidden relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-20">

                    {/* Text Content */}
                    <div className="flex-1 space-y-8 z-10">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-black block"
                        >
                            Digital Ecosystem
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]"
                        >
                            L'Expérience <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">Connectée</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/60 max-w-md text-lg font-sans leading-relaxed"
                        >
                            Pilotez votre performance. Réservez vos sessions, suivez vos biométriques en temps réel et accédez à votre plan nutritionnel personnalisé depuis notre application exclusive.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex gap-4 pt-4"
                        >
                            <button className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#D4AF37] hover:text-black transition-all group">
                                <FaApple className="text-xl" />
                                <div className="text-left leading-tight">
                                    <span className="block text-[8px] uppercase tracking-wider opacity-60">Download on the</span>
                                    <span className="block text-sm">App Store</span>
                                </div>
                            </button>
                            <button className="flex items-center gap-3 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all group">
                                <FaGooglePlay className="text-xl" />
                                <div className="text-left leading-tight">
                                    <span className="block text-[8px] uppercase tracking-wider opacity-60">Get it on</span>
                                    <span className="block text-sm">Google Play</span>
                                </div>
                            </button>
                        </motion.div>
                    </div>

                    {/* Phone Visual Mockup (CSS only construction for speed & style) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 12 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex-1 relative flex justify-center"
                    >
                        <div className="relative w-[300px] h-[600px] border-[8px] border-[#1a1a1a] bg-black rounded-[3rem] shadow-2xl shadow-[#D4AF37]/10 overflow-hidden ring-1 ring-white/10">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-20"></div>

                            {/* Screen Content */}
                            <div className="w-full h-full relative bg-[#050505] flex flex-col">
                                {/* App Header */}
                                <div className="p-6 pt-12 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent absolute top-0 w-full z-10">
                                    <span className="text-white font-black uppercase tracking-widest text-xs">Elysium</span>
                                    <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[10px] font-black">JD</div>
                                </div>

                                {/* App Body */}
                                <div className="flex-1 flex flex-col justify-center px-6 space-y-6">
                                    <div className="space-y-2">
                                        <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Activité du jour</div>
                                        <div className="text-white text-4xl font-black">1,240 <span className="text-[#D4AF37] text-sm">kcals</span></div>
                                    </div>

                                    {/* Graph Bars */}
                                    <div className="flex items-end gap-2 h-32 border-b border-white/10 pb-4">
                                        {[40, 65, 30, 80, 50, 90, 45].map((h, i) => (
                                            <div key={i} className={`flex-1 rounded-t-md ${i === 5 ? 'bg-[#D4AF37]' : 'bg-white/10'}`} style={{ height: `${h}%` }}></div>
                                        ))}
                                    </div>

                                    {/* Upcoming Class */}
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-white font-bold text-sm">Power Lifting</span>
                                            <span className="text-[#D4AF37] text-xs font-black">14:00</span>
                                        </div>
                                        <div className="text-white/40 text-xs">Avec Coach Marcus</div>
                                    </div>
                                </div>

                                {/* App Nav */}
                                <div className="h-16 border-t border-white/10 flex justify-around items-center text-white/40 text-xl">
                                    <div className="text-[#D4AF37]">•</div>
                                    <div>•</div>
                                    <div>•</div>
                                    <div>•</div>
                                </div>
                            </div>
                        </div>

                        {/* Glow Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[500px] bg-[#D4AF37]/20 blur-[100px] -z-10 rounded-full"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
