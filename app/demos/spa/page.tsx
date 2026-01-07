"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import {
    FiCalendar,
    FiClock,
    FiArrowRight,
    FiPhone,
    FiMail,
    FiChevronLeft,
    FiChevronRight,
    FiStar,
    FiCheck,
    FiInstagram,
    FiTwitter,
    FiVolume1,
    FiVolumeX,
    FiFacebook,
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

// --- Data Architectures ---

const massageServices = [
    {
        title: "Le Rituel Carbone",
        tagline: "Décélération Thermique",
        duration: "90 min",
        price: "À partir de 380 €",
        description: "Un voyage en pierre d'obsidienne utilisant des minéraux volcaniques pour ancrer les voies neuronales et induire un repos cellulaire profond.",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
        features: ["Saturation Minérale", "Décompression Neurale", "Bouclier d'Obsidienne"]
    },
    {
        title: "Flux Chemin de Soie",
        tagline: "Optimisation Lymphatique",
        duration: "75 min",
        price: "À partir de 320 €",
        description: "Une séquence guidée avec précision utilisant des huiles de soie à haute viscosité pour restaurer la dynamique des fluides et la luminosité épidermique.",
        image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2070&auto=format&fit=crop",
        features: ["Infusion Huile de Soie", "Drainage Cinétique", "Boost Micro-Circulation"]
    },
    {
        title: "Souffle Éthéré",
        tagline: "Expansion Olfactive",
        duration: "60 min",
        price: "À partir de 280 €",
        description: "Une expérience sensorielle axée sur la libération crânio-sacrée et l'aromathérapie moléculaire sur mesure.",
        image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop",
        features: ["Synchronisation Crânienne", "Cartographie Moléculaire", "Activation Nerf Vague"]
    }
];

const botanicals = [
    {
        name: "Extrait de Lotus Blanc",
        property: "Longévité Cellulaire",
        description: "Sourcé de sanctuaires aquatiques de haute altitude pour sa rare résilience anti-oxydante.",
        potency: "Élevé"
    },
    {
        name: "Sel Marin d'Obsidienne",
        property: "Rétention Thermique",
        description: "Riche en oligo-éléments tectoniques pour stabiliser le transfert de chaleur lors des rituels des tissus profonds.",
        potency: "Maximum"
    },
    {
        name: "Peptides de Micro-Soie",
        property: "Éclat Structurel",
        description: "Bio-peptides conçus pour imiter la réponse élastique naturelle de la peau.",
        potency: "Avancé"
    }
];

const alliances = [
    {
        tier: "Le Ritualiste",
        privileges: ["4 Voyages Mensuels", "Accès à l'Observatoire Floral", "Réservation Prioritaire"],
        price: "850 €/mois"
    },
    {
        tier: "L'Architecte",
        privileges: ["8 Voyages Mensuels", "Hydro-Voute Privée", "Cartographie Olfactive Sur Mesure"],
        price: "1 600 €/mois"
    },
    {
        tier: "Le Souverain",
        privileges: ["Accès Illimité", "Conciergerie Bien-être 24/7", "Statut Sanctuaire Global"],
        price: "Allocation Sur Mesure"
    }
];

const journalEntries = [
    {
        title: "L'Anatomie du Silence",
        excerpt: "Explorer l'impact neurologique des environnements à fréquence zéro.",
        date: "Édition 01",
        image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Molecular Scent-Mapping",
        excerpt: "How bespoke olfaction dictates the physical response to stone.",
        date: "Issue 02",
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Obsidian Recovery",
        excerpt: "The thermal mechanics of volcanic minerals in cellular restoration.",
        date: "Issue 03",
        image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=2070&auto=format&fit=crop"
    }
];

const brandPartners = ["LA MER", "AESOP", "BYREDO", "DIPTYQUE", "LE LABO"];

const Magnetic = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
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

export default function SpaDemo() {
    // Advanced Motion Constants
    const LUXURY_EASE = [0.6, 0.05, 0.01, 0.9];
    const luxuryEaseTransition = { duration: 1.4, ease: [0.6, 0.05, 0.01, 0.9] };

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Counter animation state
    const [yearsCount, setYearsCount] = useState(0);
    const [clientsCount, setClientsCount] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const statsRef = useRef<HTMLDivElement>(null);

    // Services carousel state
    const [activeService, setActiveService] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // UI state
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Form validation state
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Audio state
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    // Scroll handler for back-to-top button
    useEffect(() => {
        document.title = "The Zenith Spa | Silk & Stone Sanctuary";
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Auto-play carousel
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveService((prev) => (prev + 1) % massageServices.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    // Counter animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);

                    let years = 0;
                    const yearsInterval = setInterval(() => {
                        years += 1;
                        setYearsCount(years);
                        if (years >= 20) clearInterval(yearsInterval);
                    }, 40);

                    let clients = 0;
                    const clientsInterval = setInterval(() => {
                        clients += 200;
                        setClientsCount(clients);
                        if (clients >= 5000) clearInterval(clientsInterval);
                    }, 15);

                    let rating = 0;
                    const ratingInterval = setInterval(() => {
                        rating += 0.1;
                        setRatingCount(rating);
                        if (rating >= 4.9) clearInterval(ratingInterval);
                    }, 80);
                }
            },
            { threshold: 0.5 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const nextService = () => {
        setActiveService((prev) => (prev + 1) % massageServices.length);
        setIsAutoPlaying(false);
    };

    const prevService = () => {
        setActiveService((prev) => (prev - 1 + massageServices.length) % massageServices.length);
        setIsAutoPlaying(false);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const validateForm = (formData: FormData) => {
        const errors: Record<string, string> = {};
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;

        if (!firstName?.trim()) errors.firstName = 'First name is required';
        if (!lastName?.trim()) errors.lastName = 'Last name is required';
        if (!email?.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Invalid email format';
        }
        if (!phone?.trim()) {
            errors.phone = 'Phone is required';
        } else if (!/^[\d\s\-\(\)\+]+$/.test(phone)) {
            errors.phone = 'Invalid phone format';
        }

        return errors;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const errors = validateForm(formData);

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            // Form is valid - would send to backend here
            alert('Thank you! Your appointment request has been received. We\'ll contact you shortly.');
            e.currentTarget.reset();
            setFormErrors({});
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-[#2A2A2A] selection:bg-[#9C8461]/20 selection:text-[#9C8461] font-sans">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@100..900&display=swap');
                
                .font-serif { font-family: 'Instrument Serif', serif; }
                .font-sans { font-family: 'Outfit', sans-serif; }
                
                .silk-text-stroke {
                    -webkit-text-stroke: 1px rgba(156, 132, 97, 0.2);
                    color: transparent;
                }
                
                .grain-overlay {
                    background-image: url("https://www.transparenttextures.com/patterns/natural-paper.png");
                    opacity: 0.05;
                    pointer-events: none;
                }

                .bronze-glow {
                    background: radial-gradient(circle at center, rgba(156, 132, 97, 0.1) 0%, transparent 70%);
                }
            `}</style>

            <div className="fixed inset-0 grain-overlay z-50 overflow-hidden" />

            {/* Navigation */}
            <nav className="fixed top-8 left-0 right-0 z-[100] px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="bg-white/40 backdrop-blur-3xl border border-white/50 h-24 rounded-[2.5rem] px-8 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.03)]">
                        <motion.div
                            className="flex items-center gap-4"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="w-12 h-12 bg-[#9C8461] rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(156,132,97,0.2)]">
                                <span className="text-xl font-serif">Z</span>
                            </div>
                            <div>
                                <div className="text-2xl font-serif font-bold tracking-tight text-[#2A2A2A] uppercase">Zenith Spa</div>
                                <div className="text-[8px] text-[#9C8461] tracking-[0.5em] font-black uppercase -mt-1">Silk & Stone Sanctuary</div>
                            </div>
                        </motion.div>

                        <div className="hidden lg:flex items-center gap-12">
                            {[
                                { href: "#home", label: "Sanctuary" },
                                { href: "#services", label: "Rituals" },
                                { href: "#botanicals", label: "Observatory" },
                                { href: "#memberships", label: "Alliances" },
                            ].map((item, index) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#2A2A2A]/40 hover:text-[#9C8461] transition-all relative group"
                                >
                                    {item.label}
                                    <span aria-hidden="true" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#9C8461] rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                                </motion.a>
                            ))}
                        </div>

                        <div className="flex items-center gap-8">
                            <Magnetic>
                                <a href="#contact" className="hidden sm:block px-10 py-4 bg-[#9C8461] text-white text-[10px] uppercase font-black tracking-[0.3em] rounded-xl hover:bg-[#2A2A2A] transition-all shadow-xl shadow-[#9C8461]/10">
                                    Reserve Journey
                                </a>
                            </Magnetic>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 text-[#2A2A2A]"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Floating Contact Widget */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ...luxuryEaseTransition, delay: 2 }}
                className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-8"
            >
                <div className="flex flex-col gap-12 items-center">
                    <button
                        onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                        className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-[#9C8461] border border-[#9C8461]/20 hover:bg-[#9C8461] hover:text-white transition-all group relative overflow-hidden"
                    >
                        {isAudioPlaying ? <FiVolumeX className="w-4 h-4 z-10" /> : <FiVolume1 className="w-4 h-4 z-10" />}
                        {isAudioPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span aria-hidden="true" className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9C8461] opacity-20"></span>
                            </div>
                        )}
                    </button>
                    <div className="w-px h-12 bg-gradient-to-b from-[#9C8461]/10 to-[#9C8461]" />
                    <span className="[writing-mode:vertical-lr] text-[8px] uppercase font-black tracking-[1em] text-[#9C8461] rotate-180">Connectez-vous au silence</span>
                    <div className="w-px h-12 bg-gradient-to-b from-[#9C8461] to-[#9C8461]/10" />
                    <Magnetic>
                        <a href="tel:8088770171" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#9C8461] border border-[#9C8461]/20 hover:bg-[#9C8461] hover:text-white transition-all shadow-xl hover:translate-x-[-4px]">
                            <FiPhone className="w-4 h-4" />
                        </a>
                    </Magnetic>
                </div>
            </motion.div>

            {/* Hero Section: The Ethereal Arrival */}
            <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-32">
                <motion.div
                    initial={{ clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ clipPath: 'inset(0% 0 0 0)' }}
                    transition={{ duration: 1.8, ease: "anticipate", delay: 0.2 }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
                        alt="Zenith Sanctuary Interior"
                        fill
                        className="object-cover opacity-60 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-transparent to-[#FAF9F6]" />
                    <motion.div style={{ y: y1 }} className="absolute inset-0 bronze-glow opacity-40" />
                </motion.div>

                <div className="container mx-auto px-8 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ ...luxuryEaseTransition, delay: 0.8 }}
                        >
                            <span className="text-[10px] uppercase tracking-[1em] font-black text-[#9C8461] block mb-12">Établi dans le Silence</span>
                            <h1 className="text-[12vw] sm:text-[10vw] lg:text-[8vw] font-black uppercase tracking-tighter leading-[0.85] text-[#2A2A2A] mb-12">
                                TRANSCENDEZ<br />
                                <span className="silk-text-stroke font-serif italic font-thin lowercase">le physique</span>
                            </h1>

                            <div className="flex flex-col md:flex-row items-center gap-12 mt-16">
                                <Magnetic>
                                    <button className="px-12 py-6 bg-[#9C8461] text-white text-xs uppercase font-black tracking-[0.4em] rounded-full hover:bg-[#2A2A2A] transition-all shadow-2xl flex items-center gap-4 group">
                                        Commencez Votre Voyage
                                        <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </Magnetic>

                                <div className="flex items-center gap-4 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border border-white/60">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-[8px] font-black tracking-widest text-[#2A2A2A]/60 uppercase">Capacité du Sanctuaire : 38%</span>
                                </div>
                                <div className="flex -space-x-4">
                                    {[
                                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
                                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
                                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                                    ].map((url, i) => (
                                        <div key={i} className="w-12 h-12 rounded-full border-2 border-[#FAF9F6] bg-[#E5E1DA] overflow-hidden">
                                            <Image
                                                src={url}
                                                alt="Guest"
                                                width={48}
                                                height={48}
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                    <div className="flex items-center ml-8 text-[10px] uppercase font-black tracking-widest text-[#2A2A2A]/40">
                                        Utilisé par 4 000+ Chercheurs
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            ref={statsRef}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 2 }}
                            className="grid grid-cols-2 lg:grid-cols-4 gap-12 mt-32 pt-16 border-t border-black/5"
                        >
                            <div>
                                <div className="text-4xl font-serif italic text-[#9C8461]">{yearsCount}</div>
                                <div className="text-[8px] uppercase font-black tracking-[0.3em] text-[#2A2A2A]/40">Années de Silence</div>
                            </div>
                            <div>
                                <div className="text-4xl font-serif italic text-[#9C8461]">{(clientsCount / 1000).toFixed(0)}k+</div>
                                <div className="text-[8px] uppercase font-black tracking-[0.3em] text-[#2A2A2A]/40">Âmes Décélérées</div>
                            </div>
                            <div>
                                <div className="text-4xl font-serif italic text-[#9C8461]">{ratingCount.toFixed(1)}</div>
                                <div className="text-[8px] uppercase font-black tracking-[0.3em] text-[#2A2A2A]/40">Note de Pureté</div>
                            </div>
                            <div>
                                <div className="text-4xl font-serif italic text-[#9C8461]">100%</div>
                                <div className="text-[8px] uppercase font-black tracking-[0.3em] text-[#2A2A2A]/40">Sourcé Naturellement</div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Floating Navigation Widget */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 }}
                    className="fixed right-0 top-1/2 -translate-y-1/2 z-[110] flex flex-col gap-2"
                >
                    <a href="tel:8088770171" className="bg-[#9C8461] text-white p-4 rounded-l-2xl shadow-xl hover:translate-x-[-4px] transition-all">
                        <FiPhone className="w-6 h-6" />
                    </a>
                </motion.div>
            </section>

            {/* Rituals: Chrono-Wellness Journey */}
            <section id="services" className="py-40 bg-white relative overflow-hidden">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
                        <div className="max-w-2xl">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#9C8461] block mb-8 underline underline-offset-8 decoration-[#9C8461]/20">La Collection</span>
                            <h2 className="text-[8vw] sm:text-[6vw] lg:text-[4vw] font-black uppercase tracking-tighter leading-none text-[#2A2A2A]">
                                CHRONO<br />
                                <span className="font-serif italic font-extralight text-[#9C8461] lowercase -mt-4 block">rituels</span>
                            </h2>
                        </div>
                        <div className="flex gap-4">
                            <motion.button
                                onClick={prevService}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-16 h-16 rounded-full border border-black/5 flex items-center justify-center hover:bg-[#9C8461] hover:text-white transition-all"
                            >
                                <FiChevronLeft className="w-6 h-6" />
                            </motion.button>
                            <motion.button
                                onClick={nextService}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-16 h-16 rounded-full border border-black/5 flex items-center justify-center hover:bg-[#9C8461] hover:text-white transition-all"
                            >
                                <FiChevronRight className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </div>

                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeService}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={luxuryEaseTransition}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center"
                            >
                                <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden group">
                                    <Image
                                        src={massageServices[activeService].image}
                                        alt={massageServices[activeService].title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms] scale-110 group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />

                                    {/* Floating Duration Badge */}
                                    <div className="absolute top-12 left-12 p-8 bg-white/40 backdrop-blur-2xl rounded-[2rem] border border-white/50">
                                        <div className="flex items-center gap-3">
                                            <FiClock className="text-[#9C8461]" />
                                            <span className="text-[10px] uppercase font-black tracking-widest">{massageServices[activeService].duration}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[#9C8461] mb-6 block">
                                        {massageServices[activeService].tagline}
                                    </span>
                                    <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-[#2A2A2A] mb-12">
                                        {massageServices[activeService].title}
                                    </h3>
                                    <p className="text-lg text-black/50 font-light leading-relaxed mb-16 max-w-xl">
                                        {massageServices[activeService].description}
                                    </p>

                                    <div className="flex flex-wrap gap-4 mb-16">
                                        {massageServices[activeService].features.map((feature, i) => (
                                            <span key={i} className="px-6 py-3 rounded-full bg-[#FAF9F6] border border-black/5 text-[8px] uppercase font-black tracking-widest text-[#2A2A2A]/60">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-12">
                                        <span className="text-3xl font-serif italic text-[#9C8461]">{massageServices[activeService].price}</span>
                                        <Magnetic>
                                            <button className="px-10 py-5 bg-[#2A2A2A] text-white text-[10px] uppercase font-black tracking-[0.3em] rounded-xl hover:bg-[#9C8461] transition-all">
                                                Initialiser le Rituel
                                            </button>
                                        </Magnetic>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* The Visual Sanctuary (Gallery) */}
            <section className="py-32 bg-[#FAF9F6] border-t border-black/5 overflow-hidden">
                <div className="container mx-auto px-8 mb-24">
                    <span className="text-[10px] uppercase tracking-[1em] font-black text-[#9C8461] mb-8 block text-center">L'Architecture du Silence</span>
                    <h2 className="text-4xl md:text-6xl font-serif italic text-center silk-text-stroke leading-tight max-w-2xl mx-auto">
                        Où le physique se dissout dans l'éthéré
                    </h2>
                </div>

                <div className="flex gap-16 px-8 overflow-x-auto pb-16 scrollbar-hide snap-x">
                    {[
                        "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2700&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=2700&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=2700&auto=format&fit=crop"
                    ].map((image, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ ...luxuryEaseTransition, delay: i * 0.1 }}
                            className="relative min-w-[80vw] md:min-w-[50vw] aspect-video rounded-[3rem] overflow-hidden group snap-center"
                        >
                            <Image
                                src={image}
                                alt={`Sanctuary View ${i + 1}`}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] scale-105 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-700" />
                            <div className="absolute bottom-12 left-12">
                                <span className="text-white/60 text-[10px] uppercase tracking-[0.4em] font-black backdrop-blur-md bg-white/10 px-6 py-3 rounded-full border border-white/20">
                                    Zone {i + 1}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* The Hydro-Vault: Immersive Element */}
            <section className="py-60 bg-[#1A1A1A] text-white relative overflow-hidden">
                <motion.div style={{ y: y2 }} className="absolute inset-0 bronze-glow opacity-20" />
                <div className="container mx-auto px-8 relative z-10 text-center">
                    <span className="text-[10px] uppercase tracking-[1em] font-black text-[#9C8461] mb-12 block">Le Cœur Élémentaire</span>
                    <h2 className="text-[10vw] md:text-[8vw] font-serif italic font-thin silk-text-stroke leading-none mb-16">L'Hydro-Voute</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
                        <div className="p-12 border border-white/5 bg-white/[0.02] rounded-[3rem] group hover:bg-white/[0.05] transition-all">
                            <span className="text-4xl block mb-8">🪨</span>
                            <h4 className="text-lg font-black uppercase tracking-widest mb-4">Pierre Thermique</h4>
                            <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest leading-loose">Suites cristallines sub-zéro conçues pour le choc thermique lymphatique.</p>
                        </div>
                        <div className="p-12 border border-[#9C8461]/30 bg-[#9C8461]/5 rounded-[3rem] group hover:bg-[#9C8461]/10 transition-all scale-110 relative z-10">
                            <span className="text-4xl block mb-8">💧</span>
                            <h4 className="text-lg font-black uppercase tracking-widest mb-4 text-[#9C8461]">Bassin de Vitalité</h4>
                            <p className="text-[10px] text-[#9C8461]/60 uppercase font-bold tracking-widest leading-loose">Jets hydrocinétiques orchestrés pour la décélération musculaire ciblée.</p>
                        </div>
                        <div className="p-12 border border-white/5 bg-white/[0.02] rounded-[3rem] group hover:bg-white/[0.05] transition-all">
                            <span className="text-4xl block mb-8">🌫️</span>
                            <h4 className="text-lg font-black uppercase tracking-widest mb-4">Brume Hammam</h4>
                            <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest leading-loose">Atomisation de vapeur d'eucalyptus et de bois de cèdre sur mesure.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Flora Observatory: Botanical Science */}
            <section id="botanicals" className="py-40 bg-[#FAF9F6] relative overflow-hidden">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="mb-32">
                        <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#9C8461] block mb-8 underline underline-offset-8 decoration-[#9C8461]/20">Botaniques Cliniques</span>
                        <h2 className="text-[8vw] sm:text-[6vw] lg:text-[4vw] font-black uppercase tracking-tighter text-[#2A2A2A]">L'OBSERVATOIRE<br /><span className="font-serif italic font-thin lowercase text-[#9C8461]">floral</span></h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {botanicals.map((plant, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.1 }}
                                className="group p-12 bg-white rounded-[3rem] border border-black/5 hover:border-[#9C8461]/30 transition-all duration-700"
                            >
                                <div className="w-16 h-16 bg-[#FAF9F6] rounded-2xl flex items-center justify-center text-2xl mb-12 group-hover:scale-110 transition-transform">
                                    🌿
                                </div>
                                <div className="flex justify-between items-start mb-6 text-[#2A2A2A]">
                                    <h3 className="text-2xl font-black uppercase tracking-tight">{plant.name}</h3>
                                    <span className="px-3 py-1 bg-[#9C8461]/10 text-[#9C8461] text-[8px] font-black uppercase tracking-widest rounded-md">{plant.potency} Potency</span>
                                </div>
                                <p className="text-[10px] text-[#9C8461] uppercase font-bold tracking-widest mb-6">{plant.property}</p>
                                <p className="text-sm text-black/40 font-light leading-relaxed">
                                    {plant.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-32 p-16 bg-[#2A2A2A] rounded-[4rem] text-white overflow-hidden relative">
                        <div aria-hidden="true" className="absolute top-0 right-0 w-1/2 h-full opacity-20">
                            <Image
                                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
                                alt="Laboratory"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative z-10 max-w-xl">
                            <h4 className="text-3xl font-serif italic mb-8">Extraction Moléculaire</h4>
                            <p className="text-white/40 text-sm font-light leading-relaxed mb-12">
                                Nos alchimistes internes utilisent l'extraction au CO2 supercritique pour préserver l'intégrité cristalline de chaque actif botanique.
                            </p>
                            <Magnetic>
                                <button className="px-8 py-4 border border-white/20 rounded-xl text-[10px] uppercase font-black tracking-widest hover:bg-white hover:text-[#2A2A2A] transition-all">
                                    Voir les Rapports de Puissance
                                </button>
                            </Magnetic>
                        </div>
                    </div>
                </div>
            </section>

            {/* Zenith Alliances: Memberships */}
            <section id="memberships" className="py-40 bg-[#1A1A1A] text-white relative overflow-hidden">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="text-center mb-32">
                        <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#9C8461] block mb-8">Accès Élite</span>
                        <h2 className="text-[6vw] font-black uppercase tracking-tighter">ALLIANCES ZENITH</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {alliances.map((alliance, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.1 }}
                                className={`p-16 rounded-[4rem] border relative overflow-hidden group ${index === 1 ? 'border-[#9C8461] bg-[#9C8461]/5' : 'border-white/5 bg-white/[0.02]'}`}
                            >
                                {index === 1 && <div className="absolute top-12 right-12 bg-[#9C8461] text-white text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-full">Plus Recherché</div>}

                                <h3 className="text-3xl font-serif italic mb-4">{alliance.tier}</h3>
                                <div className="text-4xl font-black uppercase tracking-tighter text-[#9C8461] mb-12">{alliance.price}</div>

                                <ul className="space-y-6 mb-16">
                                    {alliance.privileges.map((privilege, pIndex) => (
                                        <li key={pIndex} className="flex items-center gap-4 text-white/40 text-xs font-light tracking-wide">
                                            <div className="w-1.5 h-1.5 bg-[#9C8461] rounded-full" />
                                            {privilege}
                                        </li>
                                    ))}
                                </ul>

                                <Magnetic>
                                    <button className={`w-full py-6 rounded-2xl text-[10px] uppercase font-black tracking-[0.3em] transition-all ${index === 1 ? 'bg-[#9C8461] text-white' : 'bg-white/5 text-white hover:bg-white hover:text-black'}`}>
                                        Postuler pour l'Alliance
                                    </button>
                                </Magnetic>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Curators: Expert Practitioners */}
            <section id="curators" className="py-40 bg-white relative overflow-hidden">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-32">
                        <h2 className="text-[10vw] md:text-[6vw] font-black uppercase tracking-tighter text-[#2A2A2A]">LES CURATEURS</h2>
                        <p className="text-[#9C8461] font-serif italic text-2xl">Maîtres praticiens des arts silencieux.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            {
                                name: "Keiko Tanaka",
                                role: "Alchimiste Principale",
                                bio: "Spécialisée en shiatsu moléculaire et décélération neurologique.",
                                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                            },
                            {
                                name: "Leilani Wong",
                                role: "Architecte de Rituel",
                                bio: "Maître du flux Lomi Lomi et de la médecine thermique ancestrale.",
                                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80"
                            },
                            {
                                name: "Michael Chen",
                                role: "Spécialiste Structurel",
                                bio: "Expert en recalibrage des tissus profonds et alignement cinétique.",
                                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80"
                            }
                        ].map((curator, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden mb-8">
                                    <Image
                                        src={curator.image}
                                        alt={curator.name}
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s] scale-105 group-hover:scale-100"
                                    />
                                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight text-[#2A2A2A] mb-2">{curator.name}</h3>
                                <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#9C8461] mb-4">{curator.role}</p>
                                <p className="text-sm text-black/40 font-light leading-relaxed max-w-xs">{curator.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Perspectives: Editorial Testimonials */}
            <section id="reviews" className="py-40 bg-[#FAF9F6] relative overflow-hidden">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-32">
                        <span className="text-[10px] uppercase tracking-[1em] font-black text-[#9C8461] mb-12 block">Échos Vérifiés</span>
                        <h2 className="text-6xl md:text-8xl font-serif italic silk-text-stroke leading-none">Perspectives</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                name: "Sarah Johnson",
                                quote: "Le silence ici est physique. Ce n'est pas juste un spa ; c'est un recalibrage de l'âme. Le Rituel Carbone a changé ma perception du temps.",
                                date: "Octobre 2025"
                            },
                            {
                                name: "David Martinez",
                                quote: "Une attention aux détails époustouflante. De l'extraction moléculaire des huiles au retour haptique personnalisé des bassins.",
                                date: "Novembre 2025"
                            }
                        ].map((perspective, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={luxuryEaseTransition}
                                className="p-16 bg-white rounded-[4rem] border border-black/5 flex flex-col justify-between"
                            >
                                <div>
                                    <FiStar className="text-[#9C8461] mb-12" />
                                    <p className="text-2xl md:text-3xl font-light leading-tight text-[#2A2A2A] mb-12">"{perspective.quote}"</p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h4 className="font-black uppercase tracking-widest text-[#2A2A2A] text-[10px] mb-2">{perspective.name}</h4>
                                        <span className="text-[8px] text-black/30 uppercase font-bold tracking-widest">{perspective.date}</span>
                                    </div>
                                    <Magnetic>
                                        <button className="text-[10px] uppercase font-black tracking-widest text-[#9C8461] hover:underline">Lire l'Histoire</button>
                                    </Magnetic>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* The Journal: Editorial Wellness */}
            <section className="py-40 bg-[#F5F5F5] relative overflow-hidden">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                        <div>
                            <span className="text-[10px] uppercase tracking-[1em] font-black text-[#9C8461] mb-8 block">Notes du Sanctuaire</span>
                            <h2 className="text-6xl font-serif italic silk-text-stroke leading-none">Le Journal</h2>
                        </div>
                        <Magnetic>
                            <button className="text-[10px] uppercase font-black tracking-widest text-[#2A2A2A] hover:text-[#9C8461] transition-colors mt-8 md:mt-0">
                                Voir les Archives
                            </button>
                        </Magnetic>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {journalEntries.map((entry, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...luxuryEaseTransition, delay: i * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden mb-8 rounded-2xl">
                                    <Image
                                        src={entry.image}
                                        alt={entry.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] scale-105 group-hover:scale-100"
                                    />
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full">
                                        <span className="text-[8px] uppercase tracking-widest font-black text-[#2A2A2A]">{entry.date}</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-serif text-[#2A2A2A] mb-4 group-hover:italic transition-all">{entry.title}</h3>
                                <p className="text-sm text-black/40 font-light leading-relaxed mb-8">{entry.excerpt}</p>
                                <Magnetic>
                                    <span aria-hidden="true" className="text-[10px] uppercase font-black tracking-widest text-[#9C8461] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 inline-block duration-500">Lire l'Article</span>
                                </Magnetic>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Enquiry: Bespoke Reservation Form */}
            <section id="contact" className="py-40 bg-white relative overflow-hidden">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
                        <div>
                            <span className="text-[10px] uppercase tracking-[1em] font-black text-[#9C8461] mb-12 block">Sécurisez Votre Espace</span>
                            <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-[#2A2A2A] mb-16 leading-none">LA<br /><span className="silk-text-stroke font-serif italic font-thin lowercase">demande</span></h2>

                            <div className="space-y-12">
                                {[
                                    { q: "Protocole d'Arrivée", a: "Nous recommandons d'arriver 30 minutes avant l'initialisation du rituel pour un ancrage sensoriel." },
                                    { q: "Le Code Vestimentaire", a: "Peignoirs en soie et chaussures artisanales fournis à l'entrée. Veuillez arriver dans une tenue confortable." },
                                    { q: "Sanctuaire Numérique", a: "Le Spa Zenith est une zone à fréquence zéro. Tous les appareils numériques doivent être remis à l'entrée." }
                                ].map((faq, i) => (
                                    <div key={i} className="group cursor-help">
                                        <h4 className="text-[10px] uppercase font-black tracking-[0.3em] text-[#9C8461] mb-4 group-hover:pl-4 transition-all duration-500">{faq.q}</h4>
                                        <p className="text-black/40 text-sm font-light leading-relaxed max-w-md">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-16 bg-[#FAF9F6] rounded-[4rem] border border-black/5">
                            <form className="space-y-12" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-black/40 px-4">Identité Complète</label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        placeholder="ALEXANDER VANCE"
                                        className="w-full bg-white px-8 py-6 rounded-2xl border border-black/5 focus:border-[#9C8461] outline-none transition-all placeholder:text-black/10 text-[10px] uppercase font-bold tracking-widest"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-black/40 px-4">Adresse Numérique</label>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="AVANCE@EMAIL.COM"
                                        className="w-full bg-white px-8 py-6 rounded-2xl border border-black/5 focus:border-[#9C8461] outline-none transition-all placeholder:text-black/10 text-[10px] uppercase font-bold tracking-widest"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-black/40 px-4">Rituel Spécifié</label>
                                    <select name="service" className="w-full bg-white px-8 py-6 rounded-2xl border border-black/5 focus:border-[#9C8461] outline-none transition-all text-[10px] uppercase font-bold tracking-widest text-black/40">
                                        <option>Sélectionner le Rituel</option>
                                        <option>Le Rituel Carbone</option>
                                        <option>Flux Chemin de Soie</option>
                                        <option>Tissus Profonds Moléculaires</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-black/40 px-4">Notes d'Intention</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        placeholder="EXIGENCES SPÉCIALES OU ALLERGIES"
                                        className="w-full bg-white px-8 py-6 rounded-2xl border border-black/5 focus:border-[#9C8461] outline-none transition-all placeholder:text-black/10 text-[10px] uppercase font-bold tracking-widest resize-none"
                                    />
                                </div>
                                <Magnetic>
                                    <button className="w-full py-8 bg-[#2A2A2A] text-white rounded-2xl text-[10px] uppercase font-black tracking-[0.5em] hover:bg-[#9C8461] transition-all">
                                        DEMANDER L'ADMISSION
                                    </button>
                                </Magnetic>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="py-24 bg-[#FAF9F6] border-t border-black/5">
                <div className="container mx-auto px-8">
                    {/* Elemental Partners (Brand Marquee) */}
                    <div className="border-b border-black/5 pb-24 mb-24">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-1000">
                            {brandPartners.map((brand, i) => (
                                <div key={i} className="text-center group">
                                    <span className="text-xl font-black uppercase tracking-[0.2em] font-serif text-[#2A2A2A] group-hover:text-[#9C8461] transition-colors cursor-default">{brand}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                        <div className="col-span-2">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-[#2A2A2A] rounded-2xl flex items-center justify-center text-white text-xl font-black">Z</div>
                                <span className="text-2xl font-black uppercase tracking-tighter text-[#2A2A2A]">Zenith Spa</span>
                            </div>
                            <p className="text-sm text-black/40 font-light leading-relaxed max-w-sm mb-12">
                                Une architecture de silence conçue pour le chercheur moderne. Établi pour décélérer le physique et transcender l'ordinaire.
                            </p>
                            <div className="flex gap-6">
                                {[FiInstagram, FiTwitter, FiFacebook].map((Icon, i) => (
                                    <Magnetic key={i}>
                                        <a href="javascript:void(0)" className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#2A2A2A] border border-black/5 hover:bg-[#9C8461] hover:text-white transition-all shadow-sm">
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    </Magnetic>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h5 className="text-[10px] uppercase font-black tracking-widest text-[#2A2A2A] mb-8">Navigation</h5>
                            <ul className="space-y-4 text-xs font-light text-black/40">
                                <li><a href="#rituals" className="hover:text-[#9C8461] transition-colors">Rituels</a></li>
                                <li><a href="#observatory" className="hover:text-[#9C8461] transition-colors">Observatoire</a></li>
                                <li><a href="#alliances" className="hover:text-[#9C8461] transition-colors">Alliances</a></li>
                                <li><a href="#curators" className="hover:text-[#9C8461] transition-colors">Curateurs</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-[10px] uppercase font-black tracking-widest text-[#2A2A2A] mb-8">Emplacement</h5>
                            <p className="text-xs font-light text-black/40 leading-loose">
                                2259 Av. Kalakaua<br />
                                Honolulu, HI 96815<br />
                                O'ahu, Hawaii
                            </p>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
                        <span className="text-[8px] uppercase font-black tracking-widest text-black/20">© 2025 Systèmes Spa Zenith. Tous droits réservés.</span>
                        <div className="flex gap-12 text-[8px] uppercase font-black tracking-widest text-black/20">
                            <a href="javascript:void(0)" className="hover:text-[#9C8461]">Protocole de Confidentialité</a>
                            <a href="javascript:void(0)" className="hover:text-[#9C8461]">Conditions d'Accès</a>
                        </div>
                    </div>
                </div>
            </footer>

            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#8B7355] text-white shadow-xl hover:bg-[#A68A6E] transition-colors"
                        aria-label="Back to top"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </div >
    );
}
