"use client";

import { motion } from "framer-motion";
import { FaPalette, FaCode, FaMobileAlt, FaBrain } from "react-icons/fa";

const skillEcosystem = [
    {
        name: "Design Visuel",
        icon: <FaPalette />,
        desc: "Création d'interfaces magnifiques et alignées sur la marque avec précision et résonance émotionnelle.",
        tags: ["Graphismes UI", "Branding", "Motion"],
        color: "bg-orange-500"
    },
    {
        name: "Systèmes Interactifs",
        icon: <FaCode />,
        desc: "Construction de systèmes de design évolutifs et de prototypes fonctionnels qui semblent naturels.",
        tags: ["React/Next.js", "GSAP", "Framer Motion"],
        color: "bg-blue-500"
    },
    {
        name: "Stratégie Produit",
        icon: <FaBrain />,
        desc: "Déchiffrer les besoins des utilisateurs pour construire des parcours significatifs et des taxonomies stratégiques.",
        tags: ["Recherche UX", "Ateliers", "Analytique"],
        color: "bg-purple-500"
    },
    {
        name: "Expérience Mobile",
        icon: <FaMobileAlt />,
        desc: "Optimisation de l'expérience numérique pour le mobile, d'iOS à Android.",
        tags: ["React Native", "Responsive", "Gestes"],
        color: "bg-emerald-500"
    }
];

export function FawziAbout() {
    return (
        <section id="about" className="py-32 px-4 md:px-20 bg-white dark:bg-[#1E1E1E] overflow-hidden lg:min-h-screen flex items-center">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-start gap-20">

                    {/* Left: Sticky Image Container */}
                    <div className="flex-1 lg:sticky lg:top-32 h-fit">
                        <div className="relative group">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl border-4 border-white dark:border-gray-800"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80"
                                    alt="OU BERHAYLA - Lead Designer"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                            </motion.div>

                            {/* Floating Accent */}
                            <motion.div
                                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                                className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500 font-black text-white rounded-full flex items-center justify-center p-8 text-center leading-tight shadow-2xl"
                            >
                                5+ ANS D'EXPÉRIENCE
                            </motion.div>
                        </div>
                    </div>

                    {/* Right: Skill Ecosystem Content */}
                    <div className="flex-[1.5] space-y-12">
                        <div className="space-y-6">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-orange-500 font-black uppercase tracking-[0.4em] text-sm"
                            >
                                L'Architecte
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="text-5xl md:text-7xl font-black text-black dark:text-white tracking-tighter"
                            >
                                L'Équilibre entre <span className="italic text-gray-300 dark:text-gray-700">Art</span> & Logique.
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-gray-500 dark:text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl"
                            >
                                Je me spécialise dans la résolution de défis commerciaux complexes et leur traduction en écosystèmes numériques élégants et centrés sur l'utilisateur. Mon travail se situe à l'intersection de la psychologie et de l'esthétique.
                            </motion.p>
                        </div>

                        {/* Interactive Skill Matrix */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
                            {skillEcosystem.map((skill, idx) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-8 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-orange-500/30 transition-all group"
                                >
                                    <div className={`w-14 h-14 ${skill.color} text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                                        {skill.icon}
                                    </div>
                                    <h4 className="text-2xl font-black text-black dark:text-white mb-3 tracking-tight">
                                        {skill.name}
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                                        {skill.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {skill.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-orange-500 border border-orange-500/20 px-3 py-1 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
