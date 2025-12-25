'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function AboutPage() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    React.useEffect(() => {
        document.title = "About Us | Fashion Boutique";
    }, []);

    return (
        <div className="bg-[#FAF8F5] min-h-screen">
            {/* Split Hero Section - Mirroring Home Hero */}
            <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden -mt-[100px]">
                {/* Left Content */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-20 py-32 lg:py-0 bg-white">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-lg"
                    >
                        <span className="inline-block px-4 py-2 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.3em] mb-8">
                            The Brand
                        </span>

                        <h1 className="text-5xl md:text-7xl font-light leading-[0.95] tracking-tight mb-8">
                            Defined by<br />
                            <span className="font-serif italic text-[#D4A574]">Heritage</span>
                        </h1>

                        <p className="text-lg text-[#666] font-light leading-relaxed mb-12">
                            Since 2015, we have been crafting stories through fabric. Our boutique is a destination for those who seek the extraordinary in the everyday.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <button className="group flex items-center gap-4 text-sm uppercase tracking-wider font-bold">
                                View History
                                <span className="w-12 h-12 bg-[#1A1A1A] text-white flex items-center justify-center group-hover:bg-[#D4A574] transition-colors">
                                    <FiArrowRight />
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Right Image - High Impact */}
                <motion.div
                    className="w-full lg:w-1/2 h-[60vh] lg:h-screen relative"
                >
                    <Image
                        src="/images/ecommerce/about-hero.png"
                        alt="Brand Story"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-[#1A1A1A]/10" />
                </motion.div>
            </section>

            {/* Philosophy - Dark Section with Gold Accents */}
            <section className="py-32 bg-[#1A1A1A] text-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square border border-white/10 p-4"
                        >
                            <Image src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000" alt="Craftsmanship" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700 p-4" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-[#D4A574] text-xs uppercase tracking-[0.4em] block mb-6">Our Philosophy</span>
                            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8 leading-tight">
                                Excellence in every <span className="font-serif italic text-[#D4A574]">detail</span>.
                            </h2>
                            <p className="text-lg text-white/60 font-light leading-relaxed mb-8">
                                Every garment is a conversation between the designer and the wearer. We source the world's most luxurious raw materials—from Italian silk to Mongolian cashmere—to ensure every piece feels as good as it looks.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { label: "01", title: "Material Purity", desc: "100% organic and traceable fibers." },
                                    { label: "02", title: "Artisan Soul", desc: "Hand-finished by master tailors in Paris." },
                                    { label: "03", title: "Future Proof", desc: "Repair and recycle program for life." }
                                ].map((item) => (
                                    <div key={item.label} className="flex gap-6 items-start">
                                        <span className="font-serif italic text-2xl text-[#D4A574] leading-none">{item.label}</span>
                                        <div>
                                            <h4 className="font-medium mb-1 uppercase tracking-widest text-xs">{item.title}</h4>
                                            <p className="text-white/40 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Visual Break */}
            <section className="h-[70vh] relative overflow-hidden grayscale contrast-125">
                <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
                    <Image src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2000" alt="Visual" fill className="object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-white text-5xl md:text-8xl font-light tracking-tighter text-center leading-none">
                        LESS IS<br />
                        <span className="font-serif italic">Everything</span>
                    </h2>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="text-4xl md:text-6xl font-serif italic text-[#D4A574] block mb-8">"</span>
                        <p className="text-2xl md:text-4xl font-light tracking-tight leading-loose text-[#1A1A1A]">
                            Style is a way to say who you are <span className="underline decoration-[#D4A574] decoration-2 underline-offset-8">without having to speak</span>.
                        </p>
                        <p className="mt-12 text-xs uppercase tracking-[0.4em] font-bold text-[#999]">Rachel Zoe</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
