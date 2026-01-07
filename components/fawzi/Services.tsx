"use client";

import { motion } from "framer-motion";
import { FaMobileAlt, FaLayerGroup, FaDesktop, FaPaintBrush } from "react-icons/fa";

const services = [
    {
        title: "UI/UX",
        description: "Conception d'interfaces utilisateur intuitives et d'expériences agréables qui stimulent l'engagement.",
        icon: <FaLayerGroup className="text-5xl text-orange-500 group-hover:scale-110 transition-transform" />,
    },
    {
        title: "Design Web",
        description: "Création de sites web modernes et réactifs, parfaits sur tous les appareils et tailles d'écran.",
        icon: <FaDesktop className="text-5xl text-orange-500 group-hover:scale-110 transition-transform" />,
    },
    {
        title: "Design d'App",
        description: "Création de designs d'applications mobiles fonctionnels et esthétiques pour iOS et Android.",
        icon: <FaMobileAlt className="text-5xl text-orange-500 group-hover:scale-110 transition-transform" />,
    },
    {
        title: "Design Graphique",
        description: "Création de contenu visuel pour communiquer des messages, incluant logos et identité de marque.",
        icon: <FaPaintBrush className="text-5xl text-orange-500 group-hover:scale-110 transition-transform" />,
    },
];

export function FawziServices() {
    return (
        <section className="py-24 px-4 md:px-20 bg-white dark:bg-[#1E1E1E]">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-black dark:text-white"
                    >
                        Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 dark:text-gray-400 text-sm md:text-base"
                    >
                        J'offre une large gamme de services de design pour aider les entreprises et les particuliers à atteindre leurs objectifs grâce à la narration visuelle.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="p-8 bg-gray-50 dark:bg-[#2A2A2A] rounded-2xl space-y-4 hover:shadow-2xl hover:shadow-orange-500/5 transition-all cursor-default group border border-transparent hover:border-orange-500/20"
                        >
                            <div className="mb-6 bg-orange-500/5 w-16 h-16 flex items-center justify-center rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                                <span className="group-hover:text-white transition-colors duration-300">
                                    {service.icon}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-black dark:text-white group-hover:text-orange-500 transition-colors">{service.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
