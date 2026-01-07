"use client";

import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

const tiers = [
    {
        name: "Platinum",
        price: "180",
        period: "/mois",
        desc: "L'essence de la performance.",
        features: [
            "Accès illimité aux espaces cardio & force",
            "Casiers privés chauffés",
            "Serviettes fraîches & produits Aesop",
            "1 Session Coach / mois",
            "Accès Spa (Heures creuses)"
        ],
        highlight: false
    },
    {
        name: "Infinity",
        price: "290",
        period: "/mois",
        desc: "L'expérience Elysium sans limites.",
        features: [
            "Accès illimité Club & Spa 24/7",
            "Casiers privés nominatifs",
            "Pressing sportif quotidien",
            "4 Sessions Coach / mois",
            "Nutritionniste dédié",
            "Accès aux Clubs Mondiaux (Paris, Londres, Dubai)",
            "Invité illimité"
        ],
        highlight: true
    }
];

export function FitnessPricing() {
    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden">
            {/* Decorative Background Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] whitespace-nowrap select-none pointer-events-none uppercase rotate-90 md:rotate-0">
                Collections
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-black block mb-6">Collections</span>
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                        Votre Héritage <br /> <span className="text-transparent font-serif italic font-extralight lowercase stroke-text">Commence Ici</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className={`relative p-12 rounded-[2rem] border transition-all duration-500 group ${tier.highlight ? 'bg-white/5 border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.1)]' : 'bg-[#0A0A0A] border-white/5 hover:border-white/10'}`}
                        >
                            {tier.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37] text-black px-6 py-2 rounded-full text-[10px] uppercase font-black tracking-widest shadow-lg">
                                    Recommandé
                                </div>
                            )}

                            <div className="text-center mb-12">
                                <h3 className={`text-2xl font-black uppercase tracking-widest mb-4 ${tier.highlight ? 'text-[#D4AF37]' : 'text-white'}`}>
                                    {tier.name}
                                </h3>
                                <div className="flex items-start justify-center gap-1 font-serif">
                                    <span className="text-lg text-white/40 mt-2">€</span>
                                    <span className="text-6xl font-black text-white">{tier.price}</span>
                                    <span className="text-sm text-white/40 mt-auto mb-2 font-sans uppercase tracking-widest">{tier.period}</span>
                                </div>
                                <p className="text-white/40 text-sm mt-6 font-sans border-t border-white/5 pt-6 mx-8">
                                    {tier.desc}
                                </p>
                            </div>

                            <ul className="space-y-4 mb-12">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-4 text-sm text-white/80">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${tier.highlight ? 'bg-[#D4AF37] text-black' : 'bg-white/10 text-white'}`}>
                                            <FiCheck />
                                        </div>
                                        <span className={tier.highlight ? 'font-medium' : 'font-light'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-5 rounded-xl uppercase tracking-[0.2em] font-black text-[10px] transition-all duration-500 ${tier.highlight ? 'bg-[#D4AF37] text-black hover:bg-white' : 'bg-white/5 text-white hover:bg-white hover:text-black border border-white/10'}`}>
                                Sélectionner
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center max-w-2xl mx-auto">
                    <p className="text-white/30 text-xs leading-relaxed">
                        * L'adhésion Infinity nécessite une approbation du comité de direction. Les membres Infinity bénéficient d'une priorité absolue sur les réservations de spa et de coaching.
                    </p>
                </div>
            </div>

            <style jsx>{`
                .stroke-text {
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </section>
    );
}
