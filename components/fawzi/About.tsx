"use client";

import { motion } from "framer-motion";
import { FaPalette, FaCode, FaMobileAlt, FaBrain } from "react-icons/fa";

const skillEcosystem = [
    {
        name: "Visual Design",
        icon: <FaPalette />,
        desc: "Crafting beautiful, brand-aligned interfaces with precision and emotional resonance.",
        tags: ["UI Graphics", "Branding", "Motion"],
        color: "bg-orange-500"
    },
    {
        name: "Interactive Systems",
        icon: <FaCode />,
        desc: "Building scalable design systems and functional prototypes that feel natural.",
        tags: ["React/Next.js", "GSAP", "Framer Motion"],
        color: "bg-blue-500"
    },
    {
        name: "Product Strategy",
        icon: <FaBrain />,
        desc: "Deciphering user needs to build meaningful journeys and strategic taxonomies.",
        tags: ["UX Research", "Workshops", "Analytics"],
        color: "bg-purple-500"
    },
    {
        name: "Mobile Experience",
        icon: <FaMobileAlt />,
        desc: "Optimizing digital touchpoints for the palm of your hand, from iOS to Android.",
        tags: ["React Native", "Responsive", "Gestures"],
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
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl border-4 border-white dark:border-gray-800"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80"
                                    alt="OU BERHAYLA - Lead Designer"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                            </motion.div>

                            {/* Floating Accent */}
                            <motion.div
                                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                                transition={{ duration: 6, repeat: Infinity }}
                                className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500 font-black text-white rounded-full flex items-center justify-center p-8 text-center leading-tight shadow-2xl"
                            >
                                5+ YEARS EXPERIENCE
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
                                The Architect
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-5xl md:text-7xl font-black text-black dark:text-white tracking-tighter"
                            >
                                Balancing <span className="italic text-gray-300 dark:text-gray-700">Art</span> & Logic.
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-gray-500 dark:text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl"
                            >
                                I specialize in dissecting complex business challenges and translating them into elegant, user-centric digital ecosystems. My work lives at the intersection of psychology and aesthetics.
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
