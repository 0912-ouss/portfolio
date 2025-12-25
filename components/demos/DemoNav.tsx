"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

export function DemoNav({ title }: { title: string }) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/#projects">
                        <motion.button
                            whileHover={{ scale: 1.05, x: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-foreground/80 hover:text-foreground transition-colors"
                        >
                            <FiArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Back to Portfolio</span>
                        </motion.button>
                    </Link>

                    <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {title}
                    </h1>

                    <div className="w-32" /> {/* Spacer for centering */}
                </div>
            </div>
        </nav>
    );
}
