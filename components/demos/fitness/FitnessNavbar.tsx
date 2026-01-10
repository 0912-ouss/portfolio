"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import { getInitials } from "@/lib/avatar-utils";

export function FitnessNavbar() {
    const { data: session, status } = useSession();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu]);

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

                    {/* Auth Buttons / User Profile */}
                    <div className="hidden lg:flex items-center gap-6">
                        {status === "loading" ? (
                            <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
                        ) : session?.user ? (
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-3 group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-sm border-2 border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-colors">
                                        {session.user.name ? getInitials(session.user.name) : (session.user.email ? getInitials(session.user.email) : <FiUser size={18} />)}
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/80 group-hover:text-white transition-colors">
                                        {session.user.name || session.user.email?.split('@')[0] || 'User'}
                                    </span>
                                </button>
                                
                                {/* User Dropdown Menu */}
                                {showUserMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 top-full mt-2 w-48 bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                                    >
                                        <div className="p-4 border-b border-white/5">
                                            <p className="text-white text-sm font-bold">{session.user.name || 'User'}</p>
                                            <p className="text-white/60 text-xs mt-1">{session.user.email}</p>
                                            {session.user.role && (
                                                <span className="inline-block mt-2 px-2 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-[9px] uppercase font-bold rounded">
                                                    {session.user.role}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => {
                                                signOut({ callbackUrl: "/demos/fitness" });
                                                setShowUserMenu(false);
                                            }}
                                            className="w-full px-4 py-3 text-left text-white/80 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 text-sm"
                                        >
                                            <FiLogOut size={16} />
                                            <span>Déconnexion</span>
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        ) : (
                            <>
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
                            </>
                        )}
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
                {status === "loading" ? (
                    <div className="w-12 h-12 rounded-full bg-white/10 animate-pulse" />
                ) : session?.user ? (
                    <>
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-lg border-2 border-[#D4AF37]/30">
                                {session.user.name ? getInitials(session.user.name) : <FiUser size={24} />}
                            </div>
                            <div className="text-center">
                                <p className="text-white font-bold">{session.user.name || 'User'}</p>
                                <p className="text-white/60 text-xs mt-1">{session.user.email}</p>
                                {session.user.role && (
                                    <span className="inline-block mt-2 px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] uppercase font-bold rounded">
                                        {session.user.role}
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                signOut({ callbackUrl: "/demos/fitness" });
                                setMobileMenuOpen(false);
                            }}
                            className="px-8 py-3 bg-red-500/20 border border-red-500/30 text-red-400 text-xs uppercase font-black tracking-[0.2em] hover:bg-red-500/30 transition-all flex items-center gap-2"
                        >
                            <FiLogOut size={16} />
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </motion.div>
        </>
    );
}
