"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/data";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ProjectScroll() {
    return (
        <>
            {projects.map((project, index) => (
                <ProjectSection key={project.id} project={project} index={index} />
            ))}
        </>
    );
}

function ProjectSection({ project, index }: { project: any; index: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const isEven = index % 2 === 0;

    // Parallax effect
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
    const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    return (
        <section
            id={index === 0 ? "projects" : undefined}
            ref={ref}
            className="relative h-screen w-full snap-start overflow-hidden bg-white text-black"
        >
            <div className={`flex h-full flex-col md:flex-row ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                {/* Image Half */}
                <div className="relative h-1/2 w-full overflow-hidden md:h-full md:w-1/2">
                    <motion.div style={{ y, scale }} className="h-[120%] w-full relative">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10 transition-colors duration-700 md:group-hover:bg-transparent" />
                    </motion.div>
                </div>

                {/* Content Half */}
                <div className="flex h-1/2 w-full flex-col justify-center px-6 md:h-full md:w-1/2 md:px-16 lg:px-24 bg-white relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: false, amount: 0.3 }}
                        style={{ y: textY }}
                        className="flex flex-col items-start"
                    >
                        <span className="mb-6 block text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                            0{index + 1} — {project.category}
                        </span>

                        <h2 className="mb-8 text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
                            <span className="block font-serif italic text-4xl md:text-5xl lg:text-6xl mb-2 font-light">
                                {project.title.split(" ").slice(0, 2).join(" ")}
                            </span>
                            <span className="block font-black uppercase">
                                {project.title.split(" ").slice(2).join(" ")}
                            </span>
                        </h2>

                        <p className="mb-10 max-w-md text-lg text-gray-600 font-light leading-relaxed">
                            {project.description}
                        </p>

                        <Link
                            href={project.link}
                            className="group inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:text-orange-500"
                        >
                            View Case Study
                            <div className="rounded-full border border-current p-3 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-black group-hover:text-white group-hover:border-transparent">
                                <ArrowUpRight className="h-4 w-4" />
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
