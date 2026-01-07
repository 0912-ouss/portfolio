"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export function FitnessNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    const navLinks = [
        { name: "Le Club", href: "/demos/fitness#philosophy" },
        { name: "Sessions", href: "/demos/fitness#schedule" },
        { name: "Locations", href: "/demos/fitness#locations" },
        { name: "Membership", href: "/demos/fitness/membership" },
        { name: "Concierge", href: "/demos/fitness/contact" },
    ];

    const [hoveredLink, setHoveredLink] = useState<number | null>(null);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-8"}`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/demos/fitness" className="relative z-50 group">
                        <span className="text-xl font-black uppercase tracking-tighter text-white group-hover:text-[#D4AF37] transition-colors">
                            Elysium <span className="text-white/30 group-hover:text-[#D4AF37]/50">.</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-12" onMouseLeave={() => setHoveredLink(null)}>
                        {navLinks.map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                onMouseEnter={() => setHoveredLink(i)}
                                className="relative text-[10px] uppercase font-bold tracking-[0.2em] text-white/60 hover:text-white transition-colors py-2"
                            >
                                {link.name}
                                {hoveredLink === i && (
                                    <motion.div
                                        layoutId="navUnderline"
                                        className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D4AF37]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-6">
                        <Link
                            href="/demos/fitness/login"
                            className="text-[10px] uppercase font-bold tracking-[0.2em] text-white hover:text-[#D4AF37] transition-colors"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/demos/fitness/register"
                            className="px-6 py-2 bg-white text-black text-[10px] uppercase font-black tracking-[0.2em] hover:bg-[#D4AF37] transition-all"
                        >
                            Join
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden text-white text-2xl relative z-50"
                    >
                        {mobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <motion.div
                initial={{ opacity: 0, pointerEvents: "none" }}
                animate={{ opacity: mobileMenuOpen ? 1 : 0, pointerEvents: mobileMenuOpen ? "auto" : "none" }}
                className="fixed inset-0 z-40 bg-[#050505] lg:hidden flex flex-col items-center justify-center gap-8"
            >
                {navLinks.map((link, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : -20 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Link
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-2xl font-black uppercase tracking-tighter text-white hover:text-[#D4AF37] transition-colors"
                        >
                            {link.name}
                        </Link>
                    </motion.div>
                ))}
                <div className="h-px w-20 bg-white/10 my-4" />
                <Link
                    href="/demos/fitness/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm uppercase font-bold tracking-[0.2em] text-white/60 hover:text-white"
                >
                    Log In
                </Link>
                <Link
                    href="/demos/fitness/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-8 py-3 bg-[#D4AF37] text-black text-xs uppercase font-black tracking-[0.2em]"
                >
                    Apply for Membership
                </Link>
            </motion.div>
        </>
    );
}
