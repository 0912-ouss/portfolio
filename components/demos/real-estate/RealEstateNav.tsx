'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Landmark } from 'lucide-react';

export function RealEstateNav() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Collection Héritage', href: '#featured' },
        { name: 'Découvrir le Maroc', href: '#locations' },
        { name: 'Services', href: '#services' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-500 ${isScrolled ? 'bg-[#FDFBF7]/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
            <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
                <Link href="/demos/real-estate" className="flex items-center gap-2 group">
                    <Landmark className={`w-8 h-8 ${isScrolled ? 'text-[#C19A6B]' : 'text-white'}`} />
                    <span className={`text-xl md:text-2xl font-serif font-medium tracking-tighter ${isScrolled ? 'text-[#2C2C2C]' : 'text-white'}`}>
                        ATLAS<span className="text-[#C19A6B]">ESTATES</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:text-[#C19A6B] ${isScrolled ? 'text-[#2C2C2C]' : 'text-white/80'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button className={`px-6 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 ${isScrolled ? 'bg-[#C19A6B] text-white hover:bg-[#A67F52]' : 'bg-white text-black hover:bg-[#C19A6B] hover:text-white'}`}>
                        Faire une Demande
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className={isScrolled ? 'text-black' : 'text-white'} /> : <Menu className={isScrolled ? 'text-black' : 'text-white'} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-[#FDFBF7] z-[99] flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-2xl font-serif text-[#2C2C2C] hover:text-[#C19A6B] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <button className="mt-4 px-10 py-4 bg-[#C19A6B] text-white text-sm uppercase tracking-widest font-bold">
                            Faire une Demande
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
