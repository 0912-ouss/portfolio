"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
    FiArrowRight,
    FiCheck,
    FiPlay,
    FiMail,
    FiPhone,
    FiMapPin,
    FiCalendar,
    FiClock,
    FiUser,
    FiChevronDown,
    FiPlus,
    FiMinus,
    FiChevronLeft,
    FiChevronRight,
    FiStar,
    FiMaximize2,
    FiActivity,
    FiSearch,
    FiArrowUpRight
} from "react-icons/fi";

// Luxury Data: Re-using and refining existing data
const services = [
    {
        title: "Restauration Esthétique",
        description: "Transformer les sourires avec des facettes en porcelaine sur mesure et des techniques de collage méticuleuses.",
        icon: "✨",
        image: "/images/dentist/service_1.png"
    },
    {
        title: "Précision Structurelle",
        description: "Implantologie dentaire avancée utilisant des matériaux biocompatibles et l'imagerie 3D de précision.",
        icon: "🦷",
        image: "/images/dentist/service_2.png"
    },
    {
        title: "Sanctuaire Préventif",
        description: "Entretien de routine dans un environnement spa, garantissant une vitalité buccale à long terme.",
        icon: "🛡️",
        image: "/images/dentist/service_3.png"
    },
];

const vaultEquipment = [
    { device: "Scan 3D Spectral", function: "Imagerie Volumétrique", icon: <FiMaximize2 /> },
    { device: "Fraise Bio-Céramique", function: "Restauration Artisanale", icon: <FiActivity /> },
    { device: "IA Esthétique Neurale", function: "Orchestration Symétrique", icon: <FiSearch /> },
    { device: "Flux d'Air Stérile v8", function: "Pureté du Sanctuaire", icon: <FiActivity /> }
];

const membershipTiers = [
    { name: "Essentiel Clinique", protocols: ["Imagerie de Précision Semestrielle", "Bilan Esthétique Annuel", "Accès Conciergerie Privée"], price: "1.2k" },
    { name: "Signature Boutique", protocols: ["Soins Bien-être Trimestriels", "Planification Symétrique Sur Mesure", "Entrée Galerie Prioritaire", "Accès Équipe 24/7"], price: "4.5k" },
    { name: "Souverain Artisanal", protocols: ["Soins de Restauration à Vie", "Architecte Dentaire Dédié", "Optimisation Santé Moléculaire", "Accès Studio Mondial"], price: "12k" }
];

const galleryImages = [
    {
        title: "Le Nombre d'Or",
        category: "Esthétique",
        image: "/images/dentist/gallery_1.png"
    },
    {
        title: "Harmonie Métabolique",
        category: "Restauration",
        image: "/images/dentist/gallery_2.png"
    },
    {
        title: "Précision Architecturale",
        category: "Chirurgie",
        image: "/images/dentist/gallery_3.png"
    },
    {
        title: "L'Alignement Parfait",
        category: "Orthodontie",
        image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&h=1200&fit=crop"
    }
];

const journalPosts = [
    {
        title: "La Science de la Symétrie",
        date: "12 Déc 2025",
        excerpt: "Explorer la perfection mathématique derrière chaque sourire signature.",
        image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&h=600&fit=crop"
    },
    {
        title: "Hospitalité Boutique",
        date: "28 Nov 2025",
        excerpt: "Comment nous avons redéfini le parcours patient en une expérience clinique cinq étoiles.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
    }
];

const interiorImages = [
    "https://images.unsplash.com/photo-1629908041521-4888fca020a5?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&h=800&fit=crop"
];

// --- Sub-components & Utility ---

const Magnetic = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const center_x = left + width / 2;
        const center_y = top + height / 2;
        x.set(clientX - center_x);
        y.set(clientY - center_y);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
        >
            {children}
        </motion.div>
    );
};

export default function DentistDemo() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState<number | null>(null);

    // Advanced Motion Constants
    const LUXURY_EASE = [0.6, 0.05, 0.01, 0.9];
    const luxuryEaseTransition = { duration: 1.4, ease: [0.6, 0.05, 0.01, 0.9] };

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

    return (
        <div className="bg-[#F5F7FA] text-[#1F2933] selection:bg-[#2F80ED]/10 selection:text-[#2F80ED] min-h-screen font-sans">
            <style jsx global>{`
                .luxury-text-stroke {
                    -webkit-text-stroke: 1px rgba(31, 41, 51, 0.1);
                    color: transparent;
                }
                .grain-overlay {
                    background-image: url("https://www.transparenttextures.com/patterns/dark-matter.png");
                    filter: invert(1);
                    opacity: 0.02;
                }
                html {
                   scroll-behavior: smooth;
                }
            `}</style>

            {/* Cinematic Grain Overlay */}
            <div className="fixed inset-0 grain-overlay pointer-events-none z-[60]" />

            {/* Ultra-Premium Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 border-b border-[#1F2933]/5 bg-white/60 backdrop-blur-3xl">
                <div className="container mx-auto px-8 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-[#2F80ED] rounded-full flex items-center justify-center text-[10px] font-black text-white">OU</div>
                        <span className="text-xl font-black uppercase tracking-[0.4em] text-[#1F2933]">Berhayla</span>
                    </div>
                    <div className="hidden md:flex items-center gap-12 text-[10px] uppercase font-bold tracking-[0.3em] text-[#1F2933]/40">
                        {['Collections', 'Héritage', 'Galerie', 'Journal', 'Consultation'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#2F80ED] transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>
                    <Magnetic>
                        <a href="#booking" className="hidden sm:block px-8 py-4 border border-[#1F2933]/10 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-[#2F80ED] hover:text-white hover:border-transparent transition-all">
                            Réserver
                        </a>
                    </Magnetic>
                </div>
            </nav>

            {/* Hero Section: The Grand Arrival */}
            <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24">
                <motion.div
                    initial={{ clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ clipPath: 'inset(0% 0 0 0)' }}
                    transition={{ duration: 1.8, ease: "anticipate", delay: 0.2 }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="/images/dentist/hero.png"
                        alt="Boutique Luxury"
                        fill
                        className="object-cover opacity-20 scale-105"
                        priority
                    />
                </motion.div>
                <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[#2F80ED]/5 blur-[200px] -translate-y-1/2 translate-x-1/2 rounded-full" />
                <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#7EDAD2]/10 blur-[150px] translate-y-1/2 -translate-x-1/2 rounded-full" />

                <div className="container mx-auto px-8 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={luxuryEaseTransition}
                        >
                            <div className="flex items-center gap-6 mb-16">
                                <div className="h-[1px] w-24 bg-[#2F80ED]/30" />
                                <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#2F80ED]">Couture Orale & Précision</span>
                            </div>

                            <h1 className="text-[15vw] sm:text-[13vw] md:text-[11vw] font-black leading-[0.7] uppercase tracking-tighter text-[#1F2933]">
                                <span className="block italic font-serif font-extralight text-[#1F2933]/5 lowercase -mb-[3vw] ml-[2vw]">réimaginer</span>
                                <span className="block">DENTISTERIE</span>
                                <span className="flex items-center gap-6">
                                    <span className="luxury-text-stroke">LUXE</span>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "20vw" }}
                                        transition={{ delay: 1, duration: 1.5, ease: LUXURY_EASE }}
                                        className="h-[0.5vw] bg-[#2F80ED] hidden lg:block"
                                    />
                                </span>
                            </h1>

                            <div className="mt-20 flex flex-col lg:flex-row lg:items-end justify-between gap-16">
                                <p className="text-xl md:text-2xl text-[#1F2933]/40 max-w-2xl font-light leading-snug tracking-tight">
                                    Un sanctuaire privé pour l'esthétique orale avancée. Où la maîtrise clinique rencontre l'hospitalité raffinée d'une boutique haut de gamme.
                                </p>

                                <div className="flex items-center gap-12">
                                    <Magnetic>
                                        <motion.a
                                            href="#booking"
                                            whileHover={{ x: 10 }}
                                            className="group flex flex-col gap-6"
                                        >
                                            <div className="w-20 h-20 rounded-full border border-[#1F2933]/10 flex items-center justify-center group-hover:bg-[#2F80ED] group-hover:border-transparent transition-all duration-500">
                                                <FiArrowRight className="w-8 h-8 group-hover:text-white" />
                                            </div>
                                            <span className="text-[10px] uppercase font-bold tracking-[0.3em]">La Consultation</span>
                                        </motion.a>
                                    </Magnetic>

                                    <div className="h-24 w-[1px] bg-[#1F2933]/10" />

                                    <div className="flex flex-col gap-4">
                                        <div className="text-4xl font-black tracking-tighter text-[#2F80ED]">99.8%</div>
                                        <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-[#1F2933]/30 whitespace-nowrap">Éloges Esthétiques</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Scroll Link */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-6 opacity-30">
                    <div className="w-[1px] h-16 bg-gradient-to-t from-[#1F2933] to-transparent" />
                    <span className="text-[9px] uppercase tracking-[0.6em] font-bold text-[#1F2933]">Découvrir</span>
                </div>
            </section>

            {/* The Collection: Our Mastery (Services) */}
            <section id="collections" className="py-40 bg-white relative border-t border-[#1F2933]/5">
                <div className="container mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32 items-end">
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-[#2F80ED] block mb-8">La Collection</span>
                                <h2 className="text-[8vw] sm:text-[7vw] md:text-[6vw] font-black uppercase tracking-tighter leading-[0.8] text-[#1F2933]">
                                    <span className="block font-serif italic lowercase font-extralight text-[#1F2933]/10 -mb-[1.5vw]">Artisanales</span>
                                    <span className="block">PROCÉDURES</span>
                                </h2>
                            </motion.div>
                        </div>
                        <div className="lg:col-span-4 lg:text-right">
                            <p className="text-sm text-[#1F2933]/30 font-light leading-relaxed max-w-xs lg:ml-auto">
                                Chaque traitement est un parcours sur mesure adapté à votre signature anatomique unique et vos objectifs personnels.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.2 }}
                                className="group relative"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F7FA] border border-[#1F2933]/5 group-hover:border-[#2F80ED]/30 transition-colors duration-700">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-[3000ms] brightness-90 group-hover:brightness-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />

                                    <div className="absolute bottom-12 left-12 p-2">
                                        <span className="text-5xl mb-6 block drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">{service.icon}</span>
                                        <h3 className="text-3xl font-black uppercase tracking-tighter text-[#1F2933] mb-4">{service.title}</h3>
                                        <p className="text-xs text-[#1F2933]/50 font-light leading-relaxed max-w-[200px]">{service.description}</p>
                                    </div>

                                    <div aria-hidden="true" className="absolute top-12 right-12 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                        <div className="w-16 h-16 rounded-full border border-[#1F2933]/10 flex items-center justify-center backdrop-blur-xl bg-white/40">
                                            <FiArrowRight className="w-6 h-6 text-[#1F2933]" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Heritage: The Philosophy (About) */}
            <section id="heritage" className="py-52 bg-[#F5F7FA] relative overflow-hidden border-t border-[#1F2933]/5">
                <div className="absolute top-0 right-1/3 w-[1px] h-full bg-[#1F2933]/5 hidden lg:block" />

                <div className="container mx-auto px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5 }}
                            className="relative"
                        >
                            <div className="relative aspect-square border border-[#1F2933]/5 p-6 md:p-12 background-white">
                                <div className="relative w-full h-full overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=1200&fit=crop"
                                        alt="Luxury Medical Suite"
                                        fill
                                        className="object-cover brightness-95 rotate-3 scale-110"
                                    />
                                </div>
                            </div>
                            <div className="absolute -bottom-16 -right-16 w-80 h-80 border border-[#1F2933]/5 bg-white backdrop-blur-3xl p-16 flex flex-col justify-end shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#7EDAD2] mb-6 italic">Excellence</span>
                                <div className="text-8xl font-black tracking-tighter leading-none text-[#1F2933]">15</div>
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1F2933]/30 mt-2">Années d'Héritage</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#2F80ED] block mb-10">L'Héritage</span>
                            <h2 className="text-[8vw] md:text-[6vw] font-black uppercase tracking-tighter leading-[0.7] text-[#1F2933] transition-all mb-16">
                                <span className="block font-serif italic lowercase font-extralight text-[#1F2933]/10 -mb-[1.5vw]">redéfinir</span>
                                <span className="block">LES STANDARDS</span>
                            </h2>
                            <p className="text-2xl text-[#1F2933]/50 font-light leading-snug tracking-tight mb-20 max-w-xl">
                                Nous croyons que la dentisterie est une forme d'art profonde. Chaque consultation est une exploration de la symétrie anatomique, de la santé métabolique et de l'élégance personnalisée.
                            </p>

                            <div className="grid grid-cols-2 gap-16 border-t border-[#1F2933]/10 pt-16">
                                <div>
                                    <div className="text-4xl font-black tracking-tighter text-[#1F2933] mb-3 flex items-center gap-4">
                                        <FiActivity className="text-[#2F80ED] text-2xl" />
                                        <span>10k+</span>
                                    </div>
                                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#1F2933]/40">Visites Totales</span>
                                </div>
                                <div>
                                    <div className="text-4xl font-black tracking-tighter text-[#1F2933] mb-3 flex items-center gap-4">
                                        <FiClock className="text-[#2F80ED] text-2xl" />
                                        <span>24/7</span>
                                    </div>
                                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#1F2933]/40">Conciergerie Privée</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* The Precision Vault: Advanced Clinical Infrastructure */}
            <section className="py-40 bg-[#0F172A] text-white relative overflow-hidden">
                <motion.div style={{ y: y1 }} className="absolute inset-0 grain-overlay opacity-10" />
                <div className="container mx-auto px-8 relative z-10">
                    <div className="mb-32">
                        <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#2F80ED] block mb-8">Infrastructure Clinique</span>
                        <h2 className="text-[8vw] sm:text-[6vw] lg:text-[4vw] font-black uppercase tracking-tighter text-white">LE COFFRE DE PRÉCISION</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {vaultEquipment.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.1 }}
                                className="p-12 border border-white/5 bg-white/[0.02] rounded-[3rem] hover:bg-white/[0.05] transition-all duration-700 group ring-1 ring-white/0 hover:ring-[#2F80ED]/30"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-[#2F80ED]/10 flex items-center justify-center text-[#2F80ED] mb-10 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">{item.device}</h3>
                                <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">{item.function}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Gallery: Case Stories (Expanded Images) */}
            <section id="gallery" className="py-52 bg-white relative">
                <div className="container mx-auto px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
                        <div className="max-w-3xl">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#2F80ED] block mb-8">La Galerie</span>
                            <h2 className="text-[7vw] md:text-[5vw] font-black uppercase tracking-tighter leading-none text-[#1F2933]">
                                <span className="block font-serif italic font-extralight text-[#1F2933]/10 lowercase -mb-[1vw]">histoires</span>
                                <span>DE CAS SÉLECTIONNÉS</span>
                            </h2>
                        </div>
                        <p className="text-sm text-[#1F2933]/30 font-light max-w-xs leading-relaxed">
                            Documentation méticuleuse de nos parcours les plus transformateurs. Témoignez de l'intersection entre la science clinique et la beauté humaine.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {galleryImages.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative overflow-hidden group ${index % 2 === 1 ? 'md:mt-24' : ''}`}
                            >
                                <div className="relative aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-[#2F80ED]/0 group-hover:bg-[#2F80ED]/10 transition-colors duration-500" />

                                    <div aria-hidden="true" className="absolute bottom-8 left-8 right-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <span className="text-[8px] uppercase tracking-[0.3em] font-black text-white/60 mb-2 block">{item.category}</span>
                                        <h4 className="text-lg font-black uppercase tracking-tight text-white">{item.title}</h4>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Laboratory: Technology (Split-screen) */}
            <section id="tech" className="relative min-h-[80vh] flex items-center bg-[#F5F7FA]">
                <div className="container mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="order-2 lg:order-1">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#2F80ED] block mb-10">Le Laboratoire</span>
                            <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-12">
                                <span className="block font-serif italic lowercase font-extralight text-[#1F2933]/10 -mb-2">technologie de</span>
                                <span>PRÉCISION</span>
                            </h2>
                            <div className="space-y-10 max-w-xl">
                                <div className="flex gap-8 items-start">
                                    <div className="w-12 h-12 flex-shrink-0 border border-[#2F80ED]/20 flex items-center justify-center text-[#2F80ED]">01</div>
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest mb-3">Diagnostics IA</h4>
                                        <p className="text-xs text-[#1F2933]/40 leading-relaxed font-light">Réseaux neuronaux avancés analysant la symétrie squelettique et la densité dentaire pour une planification hyper-personnalisée.</p>
                                    </div>
                                </div>
                                <div className="flex gap-8 items-start">
                                    <div className="w-12 h-12 flex-shrink-0 border border-[#2F80ED]/20 flex items-center justify-center text-[#2F80ED]">02</div>
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest mb-3">Bio-Impression 3D</h4>
                                        <p className="text-xs text-[#1F2933]/40 leading-relaxed font-light">Prototypage rapide de restaurations sur mesure utilisant des résines céramiques biocompatibles pour une livraison le jour même.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="order-1 lg:order-2 relative aspect-square"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=1200&fit=crop"
                                alt="Laboratoire de Dentisterie Numérique"
                                fill
                                className="object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 rounded-full border border-[#2F80ED]/10 -m-8 animate-[spin_20s_linear_infinite]" />
                            <div className="absolute inset-0 rounded-full border border-[#2F80ED]/5 -m-16 animate-[spin_30s_linear_infinite_reverse]" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Aesthetic Alliances - Membership Tiers */}
            <section className="py-40 bg-white relative overflow-hidden">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-16 mb-32">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#2F80ED] block mb-8">Privilège</span>
                            <h2 className="text-[8vw] sm:text-[6vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-none text-[#1F2933]">Alliances ESTHÉTIQUES</h2>
                        </div>
                        <p className="text-sm text-[#1F2933]/30 font-light leading-relaxed max-w-[280px]">
                            Des paliers cliniques exclusifs conçus pour ceux qui exigent une souveraineté orale et une permanence esthétique ultimes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {membershipTiers.map((tier, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.1 }}
                                className={`relative p-12 rounded-[4rem] border ${index === 2 ? 'border-[#2F80ED]/30 bg-[#2F80ED]/[0.02]' : 'border-black/5 bg-slate-50/50'} hover:bg-white hover:shadow-2xl hover:shadow-[#2F80ED]/5 transition-all duration-700 overflow-hidden group`}
                            >
                                <div className="mb-12">
                                    <h3 className="text-3xl font-black uppercase tracking-tighter text-[#1F2933] mb-4">{tier.name}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xs font-bold text-[#1F2933]/30 uppercase tracking-widest">À partir de</span>
                                        <span className="text-5xl font-black tracking-tighter text-[#2F80ED]">${tier.price}</span>
                                        <span className="text-xs font-bold text-[#1F2933]/30 uppercase tracking-widest">/AN</span>
                                    </div>
                                </div>

                                <div className="space-y-6 mb-16">
                                    {tier.protocols.map((protocol, pi) => (
                                        <div key={pi} className="flex items-center gap-4 group/item">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#2F80ED] group-hover/item:scale-150 transition-transform" />
                                            <span className="text-[10px] uppercase font-bold tracking-[0.1em] text-[#1F2933]/70">{protocol}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={`w-full py-6 rounded-full text-[9px] uppercase font-black tracking-[0.4em] transition-all duration-500 ${index === 2 ? 'bg-[#2F80ED] text-white' : 'bg-[#1F2933] text-white hover:bg-[#2F80ED]'}`}>
                                    Initialiser le Protocole
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Sanctuary: Interior Gallery (Full-screen architectural reveals) */}
            <section id="sanctuary" className="py-52 bg-white flex flex-col items-center">
                <div className="container mx-auto px-8 mb-24 text-center">
                    <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#2F80ED] block mb-8">Le Sanctuaire</span>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-[#1F2933]">CALME Architectural</h2>
                </div>

                <div className="w-full h-[70vh] relative overflow-hidden group">
                    <div className="absolute inset-0 flex gap-4 px-4 overflow-x-auto no-scrollbar">
                        <div className="absolute inset-0 z-10 pointer-events-none">
                            <Image
                                src="/images/dentist/hero.png"
                                alt="Intérieur Principal"
                                fill
                                className="object-cover grayscale opacity-10"
                            />
                        </div>
                        {interiorImages.map((img, i) => (
                            <div key={i} className="min-w-[70vw] h-full relative overflow-hidden">
                                <Image
                                    src={img}
                                    alt={`Interior ${i}`}
                                    fill
                                    className="object-cover transition-transform duration-[4000ms] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Journal: Lifestyle Blog (Minimalist) */}
            <section id="journal" className="py-52 bg-[#F5F7FA]">
                <div className="container mx-auto px-8">
                    <div className="flex items-center justify-between mb-24">
                        <div className="max-w-2xl">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#2F80ED] block mb-6">Le Journal</span>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[#1F2933]">ART DE VIVRE & Science</h2>
                        </div>
                        <a href="javascript:void(0)" className="hidden md:flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest border-b border-[#1F2933]/10 pb-2 hover:border-[#2F80ED] transition-colors">
                            Voir tous les articles <FiArrowUpRight />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {journalPosts.map((post, i) => (
                            <motion.article
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...luxuryEaseTransition, delay: i * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[16/9] overflow-hidden mb-10 relative">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute top-8 left-8 bg-white px-4 py-2 text-[8px] font-black uppercase tracking-widest text-[#1F2933]">{post.date}</div>
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight text-[#1F2933] mb-4 group-hover:text-[#2F80ED] transition-colors">{post.title}</h3>
                                <p className="text-sm text-[#1F2933]/40 font-light leading-relaxed max-w-md">{post.excerpt}</p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Narrative: Guest Perspectives */}
            <section className="py-60 bg-[#F5F7FA] relative overflow-hidden">
                <div className="container mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
                        <div className="lg:col-span-5">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#2F80ED] block mb-12">Le Récit</span>
                            <div className="relative mb-20">
                                <span className="text-[20vw] font-serif italic text-[#2F80ED]/5 absolute -top-[12vw] -left-[4vw] pointer-events-none">"</span>
                                <h2 className="text-6xl font-black uppercase tracking-tighter text-[#1F2933] leading-[0.9] relative z-10">
                                    PERSPECTIVE<br />SOUVERAINE
                                </h2>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={luxuryEaseTransition}
                                className="relative"
                            >
                                <p className="text-2xl font-serif italic text-[#1F2933]/80 leading-relaxed mb-12 max-w-md">
                                    "Une expérience transformative qui a redéfini tout ce que je pensais des soins dentaires. L'attention portée aux détails est vraiment sans égale."
                                </p>
                                <div>
                                    <h4 className="text-lg font-black uppercase tracking-widest text-[#1F2933]">Leslie Alexander</h4>
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1F2933]/30">Invitée Privée</span>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-7 relative">
                            <div className="grid grid-cols-2 gap-8">
                                <motion.div
                                    style={{ y: y1 }}
                                    className="aspect-[3/4] rounded-[4rem] overflow-hidden border border-black/5"
                                >
                                    <Image
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                                        alt="Guest"
                                        fill
                                        className="object-cover grayscale"
                                    />
                                </motion.div>
                                <motion.div
                                    style={{ y: y2 }}
                                    className="aspect-[3/4] rounded-[4rem] overflow-hidden border border-black/5 mt-32"
                                >
                                    <Image
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"
                                        alt="Guest"
                                        fill
                                        className="object-cover grayscale"
                                    />
                                </motion.div>
                            </div>

                            {/* Vault Metric Float */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-3xl border border-white p-12 shadow-2xl rounded-[3rem] z-20"
                            >
                                <div className="text-center">
                                    <div className="text-4xl font-black tracking-tighter text-[#2F80ED] mb-2">99.2%</div>
                                    <span className="text-[8px] uppercase font-bold tracking-[0.3em] text-[#1F2933]/40">Indicateur de Rétention</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking: The Concierge Invitation */}
            <section id="consultation" className="py-52 bg-[#F5F7FA] relative overflow-hidden">
                <div className="absolute inset-0 bg-[#2F80ED]/[0.02] mix-blend-overlay" />

                <div className="container mx-auto px-8 relative z-10">
                    <div className="max-w-6xl mx-auto bg-white/80 border border-[#1F2933]/5 p-20 md:p-32 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.03)]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#2F80ED] block mb-10">Entrée Privée</span>
                                <h2 className="text-7xl font-black uppercase tracking-tighter leading-none mb-12 text-[#1F2933]">
                                    <span className="block font-serif italic lowercase font-extralight text-[#1F2933]/10 -mb-2">réserver une</span>
                                    <span className="block">CONSULTATION</span>
                                </h2>
                                <p className="text-lg text-[#1F2933]/40 font-light leading-relaxed mb-12">
                                    Commencez votre parcours par une session individuelle avec nos spécialistes principaux. Exclusivité, confidentialité et précision garanties.
                                </p>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-full border border-[#1F2933]/10 flex items-center justify-center text-[#2F80ED]">
                                            <FiMail />
                                        </div>
                                        <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1F2933]">concierge@berhayla.com</div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-full border border-[#1F2933]/10 flex items-center justify-center text-[#2F80ED]">
                                            <FiPhone />
                                        </div>
                                        <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1F2933]">+1 (000) 000-0000</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-12"
                            >
                                <div className="space-y-8">
                                    <div className="border-b border-[#1F2933]/10 pb-4">
                                        <label className="text-[8px] uppercase tracking-[0.4em] text-[#1F2933]/30 block mb-4">Nom de l'Invité</label>
                                        <input type="text" className="w-full bg-transparent border-none p-0 text-xl font-light focus:ring-0 text-[#1F2933] placeholder-[#1F2933]/5" placeholder="Votre nom complet" />
                                    </div>
                                    <div className="border-b border-[#1F2933]/10 pb-4">
                                        <label className="text-[8px] uppercase tracking-[0.4em] text-[#1F2933]/30 block mb-4">Type de Service</label>
                                        <select className="w-full bg-transparent border-none p-0 text-xl font-light focus:ring-0 text-[#1F2933] appearance-none cursor-pointer">
                                            <option className="bg-white">Restauration Esthétique</option>
                                            <option className="bg-white">Précision Structurelle</option>
                                            <option className="bg-white">Sanctuaire Préventif</option>
                                        </select>
                                    </div>
                                    <div className="border-b border-[#1F2933]/10 pb-4">
                                        <label className="text-[8px] uppercase tracking-[0.4em] text-[#1F2933]/30 block mb-4">Date Préférée</label>
                                        <input type="date" className="w-full bg-transparent border-none p-0 text-xl font-light focus:ring-0 text-[#1F2933] opacity-40" />
                                    </div>
                                </div>
                                <Magnetic>
                                    <button className="w-full py-6 bg-[#2F80ED] text-white text-[10px] uppercase font-black tracking-[0.4em] hover:bg-[#1F2933] transition-all">
                                        Demander un Rendez-vous
                                    </button>
                                </Magnetic>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer: The Lasting Impression */}
            <footer className="py-32 bg-[#1F2933] text-white border-t border-white/5">
                <div className="container mx-auto px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-24 mb-32">
                        <div className="max-w-sm">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 bg-[#2F80ED] rounded-full flex items-center justify-center text-xs font-black text-white">OU</div>
                                <span className="text-2xl font-black uppercase tracking-[0.4em] text-white">Berhayla</span>
                            </div>
                            <p className="text-sm text-white/40 font-light leading-relaxed mb-10">
                                Réaffirmer les soins dentaires comme une expérience d'art. Nous nous consacrons à la longévité de votre santé bucco-dentaire et à votre vitalité esthétique.
                            </p>
                            <div className="flex gap-6">
                                {['IG', 'TW', 'LI', 'FB'].map((social) => (
                                    <a key={social} href="javascript:void(0)" className="text-[10px] font-bold text-white/30 hover:text-[#2F80ED] transition-colors">{social}</a>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-24">
                            <div className="space-y-6">
                                <h4 aria-hidden="true" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 mb-10">Studio</h4>
                                <a href="javascript:void(0)" className="block text-[10px] uppercase font-bold tracking-[0.2em] hover:text-[#2F80ED]">La Galerie</a>
                                <a href="javascript:void(0)" className="block text-[10px] uppercase font-bold tracking-[0.2em] hover:text-[#2F80ED]">Héritage</a>
                                <a href="javascript:void(0)" className="block text-[10px] uppercase font-bold tracking-[0.2em] hover:text-[#2F80ED]">Conciergerie</a>
                            </div>
                            <div className="space-y-6">
                                <h4 aria-hidden="true" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20 mb-10">Journaux</h4>
                                <a href="javascript:void(0)" className="block text-[10px] uppercase font-bold tracking-[0.2em] hover:text-[#2F80ED]">Esthétique</a>
                                <a href="javascript:void(0)" className="block text-[10px] uppercase font-bold tracking-[0.2em] hover:text-[#2F80ED]">Clinique</a>
                                <a href="javascript:void(0)" className="block text-[10px] uppercase font-bold tracking-[0.2em] hover:text-[#2F80ED]">Science</a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center pt-20 border-t border-white/5 gap-12">
                        <span aria-hidden="true" className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/20">© 2025 Studio Privé Berhayla.</span>
                        <div aria-hidden="true" className="flex gap-12 text-[10px] uppercase font-bold tracking-[0.2em] text-white/20">
                            <a href="javascript:void(0)" className="hover:text-white">Conditions</a>
                            <a href="javascript:void(0)" className="hover:text-white">Politique</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
