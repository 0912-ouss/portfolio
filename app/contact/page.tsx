"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function ContactPage() {
    return (
        <main className="h-screen bg-background overflow-hidden relative">
            <CustomCursor />
            <Navbar />

            <div className="h-full flex flex-col justify-center px-6 md:px-12 lg:px-24">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="block text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
                        Contactez-moi
                    </span>
                    <h1 className="text-6xl font-bold tracking-tighter text-foreground md:text-8xl lg:text-9xl leading-none mb-12">
                        Travaillons <br />ensemble.
                    </h1>

                    <div className="flex flex-col md:flex-row gap-12 md:items-end">
                        <a href="mailto:hello@bazil.fr" className="text-2xl md:text-3xl font-medium hover:text-primary transition-colors border-b border-foreground/20 pb-2">
                            hello@bazil.fr
                        </a>
                        <a href="tel:+33600000000" className="text-2xl md:text-3xl font-medium hover:text-primary transition-colors border-b border-foreground/20 pb-2">
                            +33 6 00 00 00 00
                        </a>
                    </div>

                    <div className="mt-24 flex gap-8">
                        {/* Socials placeholder */}
                        {['Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                            <a key={social} href="javascript:void(0)" className="uppercase tracking-widest text-sm font-bold hover:text-primary transition-colors">
                                {social}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
