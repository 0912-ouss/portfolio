'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';

export function EcommerceHeader() {
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
        { name: 'Accueil', href: '/demos/ecommerce' },
        { name: 'Tout Voir', href: '/demos/ecommerce/shop' },
        { name: 'Collections', href: '/demos/ecommerce/collections' },
        { name: 'À Propos', href: '/demos/ecommerce/about' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
                }`}
        >
            <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-[#1A1A1A]"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <FiMenu className="w-6 h-6" />
                </button>

                {/* Navigation Links - Desktop */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors relative py-1 hover:text-[#D4A574] ${pathname === link.href ? 'text-[#D4A574]' : 'text-[#1A1A1A]'
                                }`}
                        >
                            {link.name}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D4A574]"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Logo */}
                <Link
                    href="/demos/ecommerce"
                    className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
                >
                    <span className="text-2xl font-light tracking-[0.3em] text-[#1A1A1A]">FASHION</span>
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[#999] -mt-1">Boutique</span>
                </Link>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <button className="text-[#1A1A1A] hover:text-[#D4A574] transition-colors">
                        <FiSearch className="w-5 h-5" />
                    </button>
                    {/* Cart is handled by fixed EcommerceCart, but we could put a trigger here if needed */}
                    <div className="w-10" /> {/* Spacer for the fixed cart button */}
                </div>
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
                            className="fixed inset-0 bg-black/50 z-[200]"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-full max-w-xs bg-[#FAF8F5] z-[201] p-12 flex flex-col"
                        >
                            <button
                                className="absolute top-8 right-8 text-[#1A1A1A]"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <FiX className="w-6 h-6" />
                            </button>

                            <div className="flex flex-col gap-8 mt-12">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-2xl font-light tracking-wider text-[#1A1A1A] hover:text-[#D4A574]"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-auto space-y-4">
                                <p className="text-xs text-[#999] uppercase tracking-widest">Contact</p>
                                <p className="text-sm">hello@fashionboutique.com</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
