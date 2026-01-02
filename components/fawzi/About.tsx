"use client";

import { motion } from "framer-motion";

const skills = [
    { name: "UX", level: 90 },
    { name: "Website Design", level: 85 },
    { name: "App Design", level: 95 },
    { name: "Graphic Design", level: 88 },
];

export function FawziAbout() {
    return (
        <section className="py-24 px-4 md:px-20 bg-white dark:bg-[#1E1E1E] overflow-hidden">
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-20">

                {/* Left: Image */}
                <div className="flex-1 flex justify-center order-2 md:order-1 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="relative w-72 h-72 md:w-[500px] md:h-[500px]"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-orange-500 rounded-full opacity-10 animate-pulse"></div>
                        <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"
                                alt="About Muhammad Umair"
                                className="w-full h-full object-cover scale-x-[-1] hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        {/* Orange bar visual from design */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "80%" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute top-[20%] right-[10%] h-12 bg-orange-500/80 z-20 backdrop-blur-sm hidden md:block rounded-full shadow-lg"
                        ></motion.div>
                    </motion.div>
                </div>

                {/* Right: Content */}
                <div className="flex-1 space-y-8 order-1 md:order-2">
                    <div className="space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-bold text-black dark:text-white"
                        >
                            About Me
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-600 dark:text-gray-400 text-sm md:text-lg leading-relaxed"
                        >
                            I am a passionate UI/UX designer with over 5 years of experience in creating digital products that people love. My approach combines research, strategy, and visual design to solve complex problems.
                        </motion.p>
                    </div>

                    <div className="space-y-8 pt-4">
                        {skills.map((skill, index) => (
                            <div key={skill.name} className="space-y-3 group">
                                <div className="flex justify-between font-bold text-black dark:text-white text-lg">
                                    <span className="group-hover:text-orange-500 transition-colors">{skill.name}</span>
                                    <span className="text-orange-500">{skill.level}%</span>
                                </div>
                                <div className="relative h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.2 + index * 0.1, ease: "circOut" }}
                                        className="absolute top-0 left-0 h-full bg-orange-500 rounded-full"
                                    >
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
