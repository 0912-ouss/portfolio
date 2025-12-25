"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
    FiSearch,
    FiMenu,
    FiX,
    FiCoffee,
    FiMapPin,
    FiPhone,
} from "react-icons/fi";

interface HeaderProps {
    transparent?: boolean;
}

export default function Header({ transparent = true }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#home", label: "HOME" },
        { href: "#about", label: "ABOUT" },
        { href: "#menu", label: "MENU" },
        { href: "#gallery", label: "GALLERY" },
        { href: "#events", label: "EVENTS" },
        { href: "#contact", label: "CONTACT" },
    ];

    const navBg = scrolled || !transparent
        ? "bg-[#1A120B]/95 backdrop-blur-lg shadow-xl"
        : "bg-transparent";

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${navBg}`}
            >
                {/* Top Bar */}
                <div className="hidden md:block border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center text-xs text-white/70">
                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-2">
                                <FiMapPin className="text-[#D5CEA3]" />
                                123 Coffee Street, Downtown
                            </span>
                            <span className="flex items-center gap-2">
                                <FiPhone className="text-[#D5CEA3]" />
                                +1 (555) 123-4567
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span>Mon-Fri: 7AM - 9PM</span>
                            <span>|</span>
                            <span>Sat-Sun: 8AM - 10PM</span>
                        </div>
                    </div>
                </div>

                {/* Main Nav */}
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-[#D5CEA3] to-[#8B7355] rounded-full flex items-center justify-center shadow-lg">
                            <FiCoffee className="text-[#1A120B] text-xl" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold tracking-widest uppercase text-white">
                                Coffee
                            </div>
                            <div className="text-[10px] tracking-[0.3em] text-[#D5CEA3] uppercase">
                                Est. 2010
                            </div>
                        </div>
                    </motion.div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D5CEA3] group-hover:w-full transition-all duration-300" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSearchOpen(true)}
                            className="p-2 text-white/80 hover:text-white transition-colors"
                        >
                            <FiSearch className="text-xl" />
                        </motion.button>

                        <motion.a
                            href="#menu"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:flex px-6 py-2.5 bg-gradient-to-r from-[#D5CEA3] to-[#C4B896] text-[#1A120B] rounded-full font-bold text-sm hover:shadow-lg hover:shadow-[#D5CEA3]/30 transition-all"
                        >
                            Order Now
                        </motion.a>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2 text-white"
                        >
                            <FiMenu className="text-2xl" />
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-[#1A120B]"
                    >
                        <div className="h-full flex flex-col">
                            {/* Header */}
                            <div className="flex justify-between items-center p-6 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#D5CEA3] to-[#8B7355] rounded-full flex items-center justify-center">
                                        <FiCoffee className="text-[#1A120B]" />
                                    </div>
                                    <span className="text-xl font-bold text-white tracking-widest">COFFEE</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 text-white"
                                >
                                    <FiX className="text-2xl" />
                                </motion.button>
                            </div>

                            {/* Nav Links */}
                            <div className="flex-1 flex flex-col justify-center items-center gap-8">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-3xl font-bold text-white/80 hover:text-[#D5CEA3] transition-colors tracking-wider"
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-white/10 text-center">
                                <motion.a
                                    href="#menu"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="inline-block w-full px-8 py-4 bg-gradient-to-r from-[#D5CEA3] to-[#C4B896] text-[#1A120B] rounded-full font-bold text-lg"
                                >
                                    Order Now
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Modal */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-lg flex items-start justify-center pt-32"
                        onClick={() => setSearchOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -50, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl mx-6"
                        >
                            <div className="relative">
                                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-white/50" />
                                <input
                                    type="text"
                                    placeholder="Search our menu..."
                                    autoFocus
                                    className="w-full px-16 py-6 bg-white/10 border border-white/20 rounded-2xl text-xl text-white placeholder-white/50 focus:outline-none focus:border-[#D5CEA3]"
                                />
                                <button
                                    onClick={() => setSearchOpen(false)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                                >
                                    <FiX className="text-2xl" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
