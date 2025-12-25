"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background">
            <CustomCursor />
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-24 md:px-12 md:pt-48">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl"
                >
                    <span className="block text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
                        About Me
                    </span>
                    <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl mb-12">
                        I create meaningful <br />
                        digital experiences.
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-muted-foreground leading-relaxed">
                        <p>
                            My name is Bazil Hamard, a freelance art director and digital designer based in Paris.
                            With over 10 years of experience, I help brands and agencies tell their stories through
                            design, motion, and code.
                        </p>
                        <p>
                            I believe in simplicity and emotion. My work is driven by a passion for typography,
                            minimalist aesthetics, and smooth interactions. I strive to create websites that are
                            not only beautiful but also intuitive and performant.
                        </p>
                    </div>

                    <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-foreground mb-4">Services</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>Art Direction</li>
                                <li>Web Design</li>
                                <li>Development</li>
                                <li>Brand Identity</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-foreground mb-4">Clients</h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li>L'Oréal</li>
                                <li>Chanel</li>
                                <li>Hermès</li>
                                <li>Vogue</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
