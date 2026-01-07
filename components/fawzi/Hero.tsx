"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export function FawziHero() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 50, stiffness: 400 };
    const mouseXSpring = useSpring(mouseX, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    // Parallax Transforms
    const textX = useTransform(mouseXSpring, [-0.5, 0.5], ["10px", "-10px"]);
    const textY = useTransform(mouseYSpring, [-0.5, 0.5], ["10px", "-10px"]);
    const imageX = useTransform(mouseXSpring, [-0.5, 0.5], ["-20px", "20px"]);
    const imageY = useTransform(mouseYSpring, [-0.5, 0.5], ["-20px", "20px"]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const xPct = (e.clientX / window.innerWidth) - 0.5;
            const yPct = (e.clientY / window.innerHeight) - 0.5;
            mouseX.set(xPct);
            mouseY.set(yPct);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 px-4 md:px-20 overflow-hidden bg-white dark:bg-[#1E1E1E]">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between z-10">

                {/* Left Content */}
                <div className="flex-1 text-center md:text-left space-y-4">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200"
                    >
                        Hi I am
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-orange-500 text-2xl md:text-3xl font-bold"
                    >
                        Muhammad Umair
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <motion.h1
                            style={{ x: textX, y: textY }}
                            className="text-5xl md:text-8xl font-extrabold leading-tight text-black dark:text-white select-none"
                        >
                            UI & UX <br />
                            <span className="md:ml-[0.5em]">Designer</span>
                        </motion.h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="max-w-xl text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed"
                    >
                        Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus netus in. Aliquet donec morbi convallis pretium. Turpis tempus pharetra
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="pt-6"
                    >
                        <Link
                            href="/design"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-md font-semibold transition-all inline-block shadow-lg shadow-orange-500/20 active:scale-95"
                        >
                            Hire Me
                        </Link>
                    </motion.div>
                </div>

                {/* Right Image */}
                <div className="flex-1 mt-12 md:mt-0 relative flex justify-center items-center">
                    <motion.div
                        style={{ x: imageX, y: imageY }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-72 h-72 md:w-[450px] md:h-[450px]"
                    >
                        {/* Background shape/orange circle if needed */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-orange-500 rounded-full opacity-10 animate-pulse"></div>

                        <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-8 border-white/50 dark:border-white/10 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80"
                                alt="Muhammad Umair"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Orange bar visual from design */}
                        <motion.div
                            style={{ x: textX, y: textY }}
                            className="absolute top-[20%] right-[10%] w-[80%] h-12 bg-orange-500/80 z-20 backdrop-blur-sm hidden md:block rounded-full"
                        ></motion.div>
                    </motion.div>

                    {/* Social Icons Overlay (as seen in design) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-8 flex gap-6 text-2xl text-black dark:text-white md:absolute md:bottom-[-20px] md:left-1/2 md:-translate-x-1/2"
                    >
                        <FaFacebook className="hover:text-orange-500 cursor-pointer transition-all hover:-translate-y-1" aria-label="Facebook" />
                        <FaTwitter className="hover:text-orange-500 cursor-pointer transition-all hover:-translate-y-1" aria-label="Twitter" />
                        <FaInstagram className="hover:text-orange-500 cursor-pointer transition-all hover:-translate-y-1" aria-label="Instagram" />
                        <FaLinkedin className="hover:text-orange-500 cursor-pointer transition-all hover:-translate-y-1" aria-label="LinkedIn" />
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
