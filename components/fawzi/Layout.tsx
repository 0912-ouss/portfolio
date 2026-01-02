"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";

const navItems = ["Home", "About Me", "Services", "Projects", "Designs", "Testimonials", "Contact"];

export function FawziNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] bg-white/80 dark:bg-[#1E1E1E]/80 backdrop-blur-md border-b dark:border-gray-800">
            <div className="container mx-auto px-4 md:px-20 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl font-black dark:text-white tracking-tighter transition-all group-hover:tracking-widest">
                        OU <span className="text-orange-500">BERHAYLA</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item}
                            href={
                                item === "Home" ? "/" :
                                    item === "Projects" ? "/projects" :
                                        item === "Designs" ? "/design" :
                                            `/#${item.toLowerCase().replace(" ", "-")}`
                            }
                            className="text-black dark:text-white font-medium hover:text-orange-500 transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                        </Link>
                    ))}
                    <Link
                        href="/cv.pdf"
                        className="bg-orange-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-orange-500/20 active:scale-95"
                    >
                        Download CV
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden text-2xl dark:text-white p-2"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white dark:bg-[#1E1E1E] border-b dark:border-gray-800 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item}
                                    href={
                                        item === "Home" ? "/" :
                                            item === "Projects" ? "/projects" :
                                                item === "Designs" ? "/design" :
                                                    `/#${item.toLowerCase().replace(" ", "-")}`
                                    }
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium dark:text-white hover:text-orange-500"
                                >
                                    {item}
                                </Link>
                            ))}
                            <Link
                                href="/cv.pdf"
                                className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold text-center"
                            >
                                Download CV
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export function FawziFooter() {
    return (
        <footer className="bg-gray-50 dark:bg-[#141414] py-16 px-4 md:px-20 border-t dark:border-gray-800">
            <div className="container mx-auto text-center space-y-12">
                <div className="flex flex-col items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-3xl font-black dark:text-white tracking-tighter transition-all group-hover:tracking-widest">
                            OU <span className="text-orange-500">BERHAYLA</span>
                        </span>
                    </Link>

                    <div className="flex flex-wrap justify-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item}
                                href={
                                    item === "Home" ? "/" :
                                        item === "Projects" ? "/projects" :
                                            item === "Designs" ? "/design" :
                                                `/#${item.toLowerCase().replace(" ", "-")}`
                                }
                                className="text-black dark:text-white font-bold hover:text-orange-500 transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-6 text-2xl text-black dark:text-white">
                    <FaFacebook className="hover:text-orange-500 cursor-pointer transition-all hover:-translate-y-1" aria-label="Facebook" />
                    <FaTwitter className="hover:text-orange-500 cursor-pointer transition-all hover:-translate-y-1" aria-label="Twitter" />
                    <FaInstagram className="hover:text-orange-500 cursor-pointer transition-all hover:-translate-y-1" aria-label="Instagram" />
                    <FaLinkedin className="hover:text-orange-500 cursor-pointer transition-all hover:-translate-y-1" aria-label="LinkedIn" />
                </div>

                <div className="pt-8 border-t dark:border-gray-800 text-gray-500 text-sm">
                    <p>© 2024 <span className="text-orange-500 font-bold">OU BERHAYLA</span> All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
