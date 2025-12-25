'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';

export function CarRentalHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/demos/car-rental' },
        { name: 'Fleet', href: '/demos/car-rental/fleet' },
        { name: 'Locations', href: '/demos/car-rental#locations' },
        { name: 'About', href: '/demos/car-rental#about' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-500 ${isScrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-8'
                }`}
        >
            <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/demos/car-rental"
                    className="flex items-center gap-2"
                >
                    <div className="w-10 h-10 bg-[#FF6B35] flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 40 40" className="text-white fill-current">
                            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="3" />
                            <circle cx="20" cy="20" r="5" />
                            <line x1="20" y1="8" x2="20" y2="15" stroke="currentColor" strokeWidth="2" />
                            <line x1="8" y1="24" x2="15" y2="22" stroke="currentColor" strokeWidth="2" />
                            <line x1="32" y1="24" x2="25" y2="22" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-xl font-black tracking-tighter text-white block leading-none">AUTORENT</span>
                        <span className="text-[10px] uppercase tracking-[0.4em] text-[#FF6B35] block">Premium</span>
                    </div>
                </Link>

                {/* Navigation Links - Desktop */}
                <nav className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-[11px] uppercase tracking-[0.4em] font-black transition-colors hover:text-[#FF6B35] ${pathname === link.href ? 'text-[#FF6B35]' : 'text-white'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-8">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-widest text-white/40">24/7 Support</span>
                        <span className="text-sm font-black text-white">+1 (555) 000-8888</span>
                    </div>
                    <button className="px-6 py-3 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-black hover:bg-[#FF6B35] hover:text-white transition-all">
                        Reservation
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <FiMenu className="w-8 h-8" />
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 z-[200]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#0F0F0F] border-l border-white/10 z-[201] p-12 flex flex-col"
                        >
                            <button
                                className="absolute top-8 right-8 text-white"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <FiX className="w-8 h-8" />
                            </button>

                            <div className="flex flex-col gap-8 mt-12">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-3xl font-black tracking-tighter text-white hover:text-[#FF6B35]"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-auto pt-10 border-t border-white/10 space-y-4">
                                <p className="text-[10px] uppercase tracking-widest text-white/40">Call Us</p>
                                <p className="text-xl font-black text-white">+1 (555) 000-8888</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
