"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const testimonials = [
    {
        id: 1,
        text: "Les designs fournis par OU BERHAYLA étaient de classe mondiale et ont vraiment aidé notre marque à se démarquer. Hautement recommandé !",
        name: "Sarah Johnson",
        role: "CEO at TechFlow",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    },
    {
        id: 2,
        text: "Une attention incroyable aux détails et un flux de travail très fluide. L'un des meilleurs designers UI avec qui j'ai travaillé.",
        name: "David Chen",
        role: "Founder of Apex Studio",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    },
];

export function FawziTestimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 px-4 md:px-20 bg-white dark:bg-[#1E1E1E]">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tighter">Témoignages</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                        Découvrez ce que disent les clients incroyables avec qui j'ai eu le plaisir de travailler sur divers projets de design.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative px-10">
                    <div className="flex overflow-hidden">
                        {testimonials.map((t, idx) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: activeIndex === idx ? 1 : 0, x: activeIndex === idx ? 0 : 20 }}
                                className={`w-full flex-shrink-0 bg-gray-50 dark:bg-white/5 p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 ${activeIndex === idx ? 'block' : 'hidden'} border border-gray-100 dark:border-white/5`}
                            >
                                <div className="w-40 h-40 flex-shrink-0 rounded-full overflow-hidden border-4 border-orange-500/20">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-4 text-center md:text-left flex-1">
                                    <p className="text-gray-600 dark:text-gray-400 italic text-lg leading-relaxed relative">
                                        <span className="text-orange-500 text-4xl absolute -left-6 -top-2">"</span>
                                        {t.text}
                                        <span className="text-orange-500 text-4xl absolute -right-4 bottom-0">"</span>
                                    </p>
                                    <div>
                                        <h4 className="text-xl font-bold dark:text-white">{t.name}</h4>
                                        <p className="text-orange-500 font-medium tracking-wide uppercase text-xs">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                aria-label={`Go to testimonial ${idx + 1}`}
                                className={`h-2 rounded-full transition-all ${activeIndex === idx ? 'w-10 bg-orange-500' : 'w-2 bg-gray-300 dark:bg-gray-700'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export function FawziContact() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [step, setStep] = useState(1);
    const [interest, setInterest] = useState("");

    const handleInterestSelection = (type: string) => {
        setInterest(type);
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("success");
        setEmail("");

        setTimeout(() => {
            setStatus("idle");
            setStep(1);
            setInterest("");
        }, 3000);
    };

    return (
        <section id="contact" className="py-24 px-4 md:px-20 bg-white dark:bg-[#1E1E1E]">
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto text-center space-y-12 bg-gray-50 dark:bg-white/5 p-12 md:p-20 rounded-[4rem] border border-gray-100 dark:border-white/5 relative overflow-hidden">

                    {/* Background Accent */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] -mr-32 -mt-32" />

                    <div className="space-y-4 relative z-10">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs"
                        >
                            Contactez-moi
                        </motion.span>
                        <h2 className="text-4xl md:text-7xl font-black text-black dark:text-white tracking-tighter leading-none">
                            Discutons.
                        </h2>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="space-y-10 relative z-10"
                            >
                                <p className="text-gray-500 dark:text-gray-400 text-lg">Quel projet puis-je vous aider à architecturer ?</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {["Design Web Premium", "Identité de Marque", "Systèmes de Design", "Consulting"].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => handleInterestSelection(option)}
                                            className="p-6 rounded-2xl border-2 border-transparent bg-white dark:bg-white/10 hover:border-orange-500 hover:text-orange-500 text-black dark:text-white font-bold transition-all text-left flex justify-between items-center group shadow-sm hover:shadow-xl"
                                        >
                                            {option}
                                            <span aria-hidden="true" className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8 relative z-10"
                            >
                                <div className="flex flex-col items-center">
                                    <p className="text-gray-500 dark:text-gray-400">Architecture de votre solution <span className="text-orange-500 font-bold">{interest}</span>.</p>
                                    <button
                                        onClick={() => setStep(1)}
                                        className="text-xs text-orange-500 mt-2 hover:underline font-bold uppercase tracking-widest"
                                    >
                                        Changer de type de projet
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto w-full">
                                    <input
                                        type="email"
                                        required
                                        placeholder="Votre email professionnel"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={status === "loading" || status === "success"}
                                        className="flex-1 bg-white dark:bg-white/10 border-2 border-transparent focus:border-orange-500 outline-none px-6 py-5 rounded-2xl text-black dark:text-white transition-all shadow-inner"
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === "loading" || status === "success"}
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl hover:shadow-orange-500/40 active:scale-95 disabled:bg-gray-400 min-w-[200px]"
                                    >
                                        {status === "idle" && "Parlons-en"}
                                        {status === "loading" && "Traitement..."}
                                        {status === "success" && "Envoyé !"}
                                    </button>
                                </form>
                                {status === "success" && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-green-500 font-bold"
                                    >
                                        Demande reçue. Je vérifie mon agenda...
                                    </motion.p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
