'use client';

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import {
    FiCalendar,
    FiClock,
    FiMapPin,
    FiPhone,
    FiCheck,
    FiStar,
    FiHeart,
    FiActivity,
    FiUsers,
    FiShield,
    FiAward,
    FiMail,
    FiVideo,
    FiFileText,
    FiMessageCircle,
    FiArrowRight,
    FiMenu,
    FiX,
    FiChevronDown,
    FiChevronRight,
    FiChevronLeft,
    FiPlus,
    FiInstagram,
    FiTwitter,
    FiLinkedin,
    FiDownload,
    FiAlertCircle,
    FiTrendingUp,
    FiCreditCard,
    FiZap,
    FiLock,
    FiGlobe,
    FiCpu,
    FiLayers
} from "react-icons/fi";
import { useState, useRef } from "react";

// --- Luxury Data Structures ---

const services = [
    {
        title: "Suite de Diagnostic Numérique",
        description: "Analyses neuronales avancées et imagerie clinique depuis la sainteté de votre résidence privée.",
        icon: <FiVideo className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
    },
    {
        title: "Entrée Privée & Consultation",
        description: "Orchestration transparente de l'expertise clinique adaptée à votre profil anatomique individuel.",
        icon: <FiCalendar className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
    },
    {
        title: "Apothicaire Clinique",
        description: "Approvisionnement pharmaceutique boutique et livraison directe de protocoles thérapeutiques spécialisés.",
        icon: <FiShield className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80"
    }
];

const features = [
    {
        title: "Discrétion Administrative",
        description: "Orchestration invisible de la documentation médicale et des flux administratifs.",
        icon: <FiFileText className="w-8 h-8" />,
        color: "from-slate-700 to-slate-900"
    },
    {
        title: "Conciergerie Cryptée",
        description: "Portail de communication sécurisé en temps réel entre le corps clinique et les invités.",
        icon: <FiMessageCircle className="w-8 h-8" />,
        color: "from-emerald-700 to-emerald-900"
    },
    {
        title: "Protocoles Spécialisés",
        description: "Programmes thérapeutiques de haute précision conçus pour l'excellence métabolique.",
        icon: <FiAward className="w-8 h-8" />,
        color: "from-indigo-900 to-slate-900"
    }
];

const doctors = [
    {
        name: "Dr. Alistair Vaughn",
        specialty: "Cardiologie Clinique",
        experience: "Faculté Senior",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80"
    },
    {
        name: "Dr. Elena Thorne",
        specialty: "Pédiatrie de Précision",
        experience: "Consultante Principale",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80"
    },
    {
        name: "Dr. Julian Blackwood",
        specialty: "Dermatologie Avancée",
        experience: "Chaire de Recherche",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"
    }
];

const testimonials = [
    {
        name: "S. Montgomery",
        comment: "Un changement profond dans ma perception des soins médicaux. La discrétion et la précision clinique sont sans égal.",
        rating: 5,
        role: "Invité Privé"
    },
    {
        name: "L. Stanfield",
        comment: "Chaque point de contact reflète un engagement envers l'excellence. La suite numérique est exceptionnellement intuitive.",
        rating: 5,
        role: "Invité Privé"
    },
    {
        name: "R. Sterling",
        comment: "Enfin, une expérience médicale qui respecte le temps et la vie privée avec une rigueur clinique absolue.",
        rating: 5,
        role: "Invité Privé"
    }
];

const benefits = [
    {
        title: "Vigilance Perpétuelle",
        description: "Surveillance clinique ininterrompue et soutien de la faculté à la demande.",
        icon: <FiClock className="w-10 h-10" />,
        stat: "24/7",
        color: "from-slate-800 to-slate-950"
    },
    {
        title: "Faculté Certifiée",
        description: "Nos médecins subissent une certification biométrique et clinique rigoureuse.",
        icon: <FiAward className="w-10 h-10" />,
        stat: "100%",
        color: "from-emerald-800 to-emerald-950"
    },
    {
        title: "Sécurité Biométrique",
        description: "Plus haut niveau de souveraineté des données et cryptage aligné HIPAA.",
        icon: <FiShield className="w-10 h-10" />,
        stat: "AES-256",
        color: "from-indigo-800 to-indigo-950"
    },
    {
        title: "Réseau Global",
        description: "Accès intégré à des alliances médicales spécialisées dans le monde entier.",
        icon: <FiHeart className="w-10 h-10" />,
        stat: "Elite",
        color: "from-slate-900 to-black"
    }
];

const processSteps = [
    {
        number: "01",
        title: "Admission Privée",
        description: "Intégration soignée via notre portail numérique sécurisé.",
        icon: <FiCalendar className="w-6 h-6" />
    },
    {
        number: "02",
        title: "Revue de la Faculté",
        description: "Analyse approfondie de votre profil biométrique et clinique.",
        icon: <FiVideo className="w-6 h-6" />
    },
    {
        number: "03",
        title: "Conception de Protocole",
        description: "Feuille de route thérapeutique sur mesure et orchestration des prescriptions.",
        icon: <FiFileText className="w-6 h-6" />
    },
    {
        number: "04",
        title: "Soins Continus",
        description: "Surveillance proactive et ajustement clinique continu.",
        icon: <FiActivity className="w-6 h-6" />
    }
];

const insuranceProviders = [
    { name: "Global Health Elite", logo: "⚜️" },
    { name: "Prestige Medical", logo: "🏛️" },
    { name: "Vanguard Mutual", logo: "🛡️" },
    { name: "LuxeCare Int.", logo: "💎" }
];

const faqs = [
    {
        question: "Comment initier mon entrée privée ?",
        answer: "L'entrée est gérée via notre portail de conciergerie crypté. Sélectionnez votre domaine d'intérêt, et un coordinateur clinique orchestrera votre revue initiale par la faculté."
    },
    {
        question: "Mes données sont-elles vraiment souveraines ?",
        answer: "Nous utilisons un cryptage multicouche et une infrastructure cloud privée pour garantir que votre historique médical reste exclusivement accessible à vous et à votre faculté désignée."
    }
];

const articles = [
    {
        title: "La Neuro-Esthétique du Calme Clinique",
        excerpt: "Explorer l'intersection entre le design architectural et les résultats de récupération thérapeutique.",
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
        category: "Recherche",
        readTime: "8 min",
        date: "15 Déc 2024"
    },
    {
        title: "Nutri-Génomique de Précision",
        excerpt: "Exploiter les profils génétiques pour concevoir des protocoles d'optimisation métabolique hyper-personnalisés.",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
        category: "Métabolique",
        readTime: "12 min",
        date: "10 Déc 2024"
    }
];

const partners = [
    { name: "City Hospital", badge: "🏥" },
    { name: "Medical Board", badge: "✓" },
    { name: "Health Alliance", badge: "🤝" },
    { name: "HIPAA Certified", badge: "🔒" },
    { name: "JCI Accredited", badge: "⭐" },
    { name: "ISO Certified", badge: "📜" }
];

const sanctuaries = [
    { site: "Manhattan", specialized: "Restauration Esthétique", metric: "Site 01" },
    { site: "Genève", specialized: "Optimisation Métabolique", metric: "Site 02" },
    { site: "Dubai", specialized: "Conseil de Longévité", metric: "Site 03" },
    { site: "Singapour", specialized: "Séquençage Génomique", metric: "Site 04" }
];

const membershipTiers = [
    { name: "Essentiel", protocols: ["Analyses Bi-Annuelles", "Conciergerie Sécurisée", "Portail Membre"], price: "2.5k" },
    { name: "Élite", protocols: ["Diagnostics Trimestriels", "Répartition 24/7", "Entrée Privée", "Accès au Sanctuaire"], price: "10k" },
    { name: "Souverain", protocols: ["Protocoles Immortels", "Faculté Dédiée", "Accès Sanctuaire Global", "Répartition Alpha"], price: "25k" }
];

const vaultEquipment = [
    { device: "Imagerie Quantique", function: "Diagnostics Moléculaires", icon: <FiCpu /> },
    { device: "Bio-Métier Holographique", function: "Régénération Tissulaire", icon: <FiLayers /> },
    { device: "Lien Neural v4", function: "Optimisation Cognitive", icon: <FiZap /> },
    { device: "IA Médi-Souveraine", function: "Analyses Prédictives", icon: <FiLock /> }
];

const clientJourneys = [
    { identity: "A. Sterling", role: "Directeur de Capital-Risque", narrative: "La rigueur clinique chez MediVault n'a d'égal que le sanctuaire absolu de leur service.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
    { identity: "S. Chen", role: "Directeur de Design", narrative: "Une approche souveraine du bien-être qui semble avoir des années-lumière d'avance sur les institutions traditionnelles.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" }
];

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
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        x.set(distanceX * 0.35);
        y.set(distanceY * 0.35);
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

export default function MediCareDemo() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', date: '', service: '', message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [emergencyBannerVisible, setEmergencyBannerVisible] = useState(true);
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

    // Advanced Motion Constants
    const LUXURY_EASE = "cubic-bezier(0.6, 0.05, 0.01, 0.9)";
    const transition = { duration: 1.4, ease: "anticipate" };
    const luxuryEaseTransition = { duration: 1.4, ease: [0.6, 0.05, 0.01, 0.9] };

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setNewsletterSubmitted(true);
        setTimeout(() => setNewsletterSubmitted(false), 3000);
        setNewsletterEmail('');
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-emerald-100 selection:text-emerald-900">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@100..900&display=swap');
                
                .font-serif { font-family: 'Instrument Serif', serif; }
                .font-sans { font-family: 'Outfit', sans-serif; }
                
                .luxury-text-stroke {
                    -webkit-text-stroke: 1px rgba(26, 26, 26, 0.1);
                    color: transparent;
                }
                .grain-overlay {
                    background-image: url("https://www.transparenttextures.com/patterns/dark-matter.png");
                    filter: invert(1);
                    opacity: 0.015;
                    pointer-events: none;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 12s linear infinite;
                }
            `}</style>

            {/* Cinematic Grain Overlay */}
            <div className="fixed inset-0 grain-overlay z-[100]" />

            {/* Emergency Banner - Sophisticated Redesign */}
            <AnimatePresence>
                {emergencyBannerVisible && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-[#1A1A1A] text-white relative z-[60] border-b border-white/10"
                    >
                        <div className="container mx-auto px-6 py-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-bold">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-2 text-emerald-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Support Clinique Actif
                                </span>
                                <span className="hidden sm:inline opacity-40">|</span>
                                <span className="hidden sm:inline opacity-60">Urgences : Composez le 112</span>
                            </div>
                            <button
                                onClick={() => setEmergencyBannerVisible(false)}
                                className="hover:text-emerald-400 transition-colors p-1"
                            >
                                <FiX className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation - Ultra Premium */}
            <nav className="bg-white/80 backdrop-blur-3xl sticky top-0 z-50 border-b border-slate-100">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between h-24">
                        {/* Logo */}
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white group-hover:bg-emerald-600 transition-colors duration-500">
                                <FiActivity className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-black uppercase tracking-[0.4em] text-[#1A1A1A]">MediVault</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-12 text-[10px] uppercase font-bold tracking-[0.3em] text-[#1A1A1A]/40">
                            {[
                                { name: 'Arrivée', href: '#home' },
                                { name: 'Portefeuille', href: '#services' },
                                { name: 'Protocole', href: '#process' },
                                { name: 'Faculté', href: '#doctors' },
                                { name: 'Journal', href: '#blog' }
                            ].map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="hover:text-emerald-600 transition-colors relative group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-600 transition-all duration-500 group-hover:w-full" />
                                </a>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="hidden md:block">
                            <Magnetic>
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-4 bg-[#1A1A1A] text-white text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-emerald-600 transition-colors shadow-2xl shadow-black/10"
                                >
                                    Entrée Privée
                                </motion.button>
                            </Magnetic>
                        </div>

                        {/* Mobile Hamburger Menu */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 lg:hidden text-[#1A1A1A]"
                        >
                            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden shadow-2xl"
                        >
                            <div className="container mx-auto px-6 py-12 flex flex-col gap-8 text-center uppercase tracking-[0.3em] font-bold text-[10px] text-[#1A1A1A]/50">
                                {['Arrivée', 'Portefeuille', 'Protocole', 'Faculté', 'Journal'].map((item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="hover:text-emerald-600 transition-colors"
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section - The Grand Arrival */}
            <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden pt-12">
                {/* Asymmetric Orbs */}
                <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-emerald-50/50 blur-[120px] -translate-y-1/2 translate-x-1/2 rounded-full" />
                <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-slate-100/50 blur-[100px] translate-y-1/3 -translate-x-1/4 rounded-full" />

                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                            {/* Text Content - Left 7 columns */}
                            <motion.div
                                className="lg:col-span-7"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={luxuryEaseTransition}
                            >
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="h-[1px] w-16 bg-emerald-600/30" />
                                    <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-emerald-600">L'Avenir des Soins</span>
                                </div>

                                <h1 className="text-[12vw] sm:text-[10vw] lg:text-[7.5vw] font-black leading-[0.85] tracking-tighter text-[#1A1A1A] mb-12">
                                    <span className="block font-serif italic font-extralight text-[#1A1A1A]/5 lowercase -mb-[2vw] ml-[1vw]">orchestrée</span>
                                    <span>CLINIQUE</span>
                                    <br />
                                    <span className="flex items-center gap-6">
                                        <span className="luxury-text-stroke uppercase">EXCELLENCE</span>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "15vw" }}
                                            transition={{ delay: 1, duration: 2 }}
                                            className="h-[1px] bg-emerald-600 hidden xl:block"
                                        />
                                    </span>
                                </h1>

                                <p className="text-xl md:text-2xl text-[#1A1A1A]/40 font-light leading-snug tracking-tight max-w-xl mb-16">
                                    Un sanctuaire privé pour des diagnostics avancés et des thérapies spécialisées. Où l'expertise de la faculté rencontre la tranquillité de l'hospitalité clinique haut de gamme.
                                </p>

                                <div className="flex flex-wrap gap-12 items-center">
                                    <Magnetic>
                                        <motion.a
                                            href="#services"
                                            whileHover={{ x: 10 }}
                                            className="group flex flex-col gap-4"
                                        >
                                            <div className="w-16 h-16 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-[#1A1A1A] transition-all duration-500">
                                                <FiArrowRight className="w-6 h-6 group-hover:text-white" />
                                            </div>
                                            <span className="text-[9px] uppercase font-bold tracking-[0.4em]">Explorer le Portefeuille</span>
                                        </motion.a>
                                    </Magnetic>

                                    <div className="h-16 w-[1px] bg-black/5 hidden sm:block" />

                                    <div className="flex gap-12">
                                        <div>
                                            <div className="text-3xl font-black tracking-tighter text-[#1A1A1A]">99.9%</div>
                                            <span className="text-[8px] uppercase font-bold tracking-[0.3em] text-[#1A1A1A]/30">Précision Clinique</span>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-black tracking-tighter text-[#1A1A1A]">500+</div>
                                            <span className="text-[8px] uppercase font-bold tracking-[0.3em] text-[#1A1A1A]/30">Faculté Experte</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Hero Visual - Right 5 columns */}
                            <motion.div
                                className="lg:col-span-5 relative"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ ...luxuryEaseTransition, delay: 0.2 }}
                            >
                                <motion.div
                                    initial={{ clipPath: 'inset(100% 0 0 0)' }}
                                    animate={{ clipPath: 'inset(0% 0 0 0)' }}
                                    transition={{ duration: 1.8, ease: LUXURY_EASE, delay: 0.4 }}
                                    className="relative aspect-[4/5] bg-white border border-black/5 p-4 rounded-[4rem] group overflow-hidden"
                                >
                                    <div className="relative w-full h-full overflow-hidden rounded-[3.2rem]">
                                        <img
                                            src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80"
                                            alt="Clinical Sanctuary"
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-[2000ms] brightness-90 group-hover:brightness-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>

                                    {/* Floating Stats Card */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute bottom-12 -left-8 bg-white/80 backdrop-blur-xl border border-white p-6 shadow-2xl rounded-3xl"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                                                <FiActivity />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold tracking-widest text-[#1A1A1A] uppercase">Vitalité Temps Réel</div>
                                                <div className="text-[10px] text-[#1A1A1A]/40 mt-1 uppercase font-bold">Flux Crypté Actif</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us - The Clinical Edge */}
            <section className="py-40 bg-white border-y border-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-end">
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-emerald-600 block mb-8">L'Avantage Clinique</span>
                                <h2 className="text-[8vw] sm:text-[6vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-[0.8] text-[#1A1A1A]">
                                    <span className="block font-serif italic font-extralight text-[#1A1A1A]/5 lowercase -mb-[1.5vw]">intransigeant</span>
                                    <span>STANDARDS</span>
                                </h2>
                            </motion.div>
                        </div>
                        <div className="lg:col-span-4 text-right">
                            <p className="text-sm text-[#1A1A1A]/40 font-light leading-relaxed max-w-[280px] ml-auto">
                                Chaque interaction est régie par un engagement méticuleux envers la rigueur clinique et la discrétion personnelle.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="bg-[#FDFCFB] border border-black/[0.03] p-10 rounded-[2.5rem] h-full hover:border-emerald-600/20 transition-all duration-700 hover:shadow-2xl hover:shadow-emerald-600/5">
                                    <div className="text-4xl font-serif italic text-emerald-600/20 group-hover:text-emerald-600 transition-colors duration-500 mb-8">
                                        {benefit.stat}
                                    </div>
                                    <h3 className="text-lg font-black uppercase tracking-widest text-[#1A1A1A] mb-4">{benefit.title}</h3>
                                    <p className="text-xs text-[#1A1A1A]/40 leading-relaxed font-light">{benefit.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Digital Vault - High-Tech Infrastructure */}
            <section className="py-40 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-emerald-500/5 blur-[150px] rounded-full" />
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="text-center mb-32">
                        <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-emerald-600 block mb-8">Infrastructure</span>
                        <h2 className="text-[8vw] sm:text-[6vw] lg:text-[4vw] font-black uppercase tracking-tighter text-[#1A1A1A]">LE COFFRE NUMÉRIQUE</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {vaultEquipment.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/40 backdrop-blur-3xl border border-white p-12 rounded-[3.5rem] group hover:bg-white transition-all duration-700 shadow-xl shadow-black/[0.02]"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-emerald-600 mb-10 shadow-lg border border-black/[0.03] group-hover:scale-110 transition-transform duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-widest text-[#1A1A1A] mb-4">{item.device}</h3>
                                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/30">{item.function}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sovereign Access - Membership Tiers */}
            <section className="py-40 bg-[#1A1A1A] text-white relative overflow-hidden">
                <motion.div style={{ y: y2 }} className="absolute inset-0 grain-overlay opacity-5" />
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-16 mb-32">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-emerald-400 block mb-8">Privilège</span>
                            <h2 className="text-[8vw] sm:text-[6vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-none text-white">ACCÈS SOUVERAIN</h2>
                        </div>
                        <p className="text-xs text-white/40 font-light leading-relaxed max-w-[240px]">
                            Niveaux d'adhésion exclusifs conçus pour ceux qui exigent une souveraineté clinique ultime et une discrétion personnelle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {membershipTiers.map((tier, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.1 }}
                                className={`relative p-12 rounded-[4rem] border ${index === 2 ? 'border-emerald-500/30' : 'border-white/5'} bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-700 overflow-hidden group`}
                            >
                                {index === 2 && (
                                    <div className="absolute top-10 right-10">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                    </div>
                                )}
                                <h3 className="text-2xl font-black uppercase tracking-[0.2em] mb-12">{tier.name}</h3>
                                <div className="flex items-baseline gap-2 mb-16">
                                    <span className="text-4xl font-serif italic text-emerald-400">dès</span>
                                    <span className="text-6xl font-black tracking-tighter">${tier.price}</span>
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">/ an</span>
                                </div>
                                <ul className="space-y-6 mb-16">
                                    {tier.protocols.map((protocol, pi) => (
                                        <li key={pi} className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">
                                            <div className="w-1 h-1 rounded-full bg-emerald-400/40" />
                                            {protocol}
                                        </li>
                                    ))}
                                </ul>
                                <button className={`w-full py-6 rounded-full text-[10px] uppercase font-bold tracking-[0.4em] transition-all duration-500 ${index === 2 ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'border border-white/10 hover:border-white/40 text-white/60 hover:text-white'}`}>
                                    Initialiser le Protocole
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Portfolio - The Clinical Portfolio */}
            <section id="services" className="py-40 bg-[#FDFCFB]">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
                        <div className="max-w-2xl">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-emerald-600 block mb-8 underline underline-offset-8 decoration-emerald-600/10">La Suite</span>
                            <h2 className="text-[8vw] sm:text-[6vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-none text-[#1A1A1A]">
                                <span className="block font-serif italic font-extralight text-[#1A1A1A]/5 lowercase -mb-[1.5vw]">avancé</span>
                                <span>PORTEFEUILLE</span>
                            </h2>
                        </div>
                        <div className="flex gap-4">
                            <button className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all"><FiChevronLeft /></button>
                            <button className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all"><FiChevronRight /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] border border-black/[0.03] bg-white mb-10">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1500ms] group-hover:scale-110 brightness-95"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700" />

                                    <div className="absolute bottom-10 left-10 p-2">
                                        <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-xl flex items-center justify-center text-[#1A1A1A] shadow-xl border border-white mb-6">
                                            {service.icon}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-[#1A1A1A] mb-4 group-hover:text-emerald-600 transition-colors">{service.title}</h3>
                                <p className="text-xs text-[#1A1A1A]/40 font-light leading-relaxed max-w-[240px]">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Clinical Sanctuaries - Global Sites */}
            <section className="py-40 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-16 mb-32">
                        <div className="max-w-xl">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-emerald-600 block mb-8 underline underline-offset-8 decoration-emerald-600/10">Présence Globale</span>
                            <h2 className="text-[8vw] sm:text-[6vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-none text-[#1A1A1A]">SANCTUAIRES CLINIQUES</h2>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-[0.4em] text-emerald-600">
                            <FiGlobe className="animate-spin-slow" />
                            Carte Souveraine v4.2
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {sanctuaries.map((site, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="text-[10px] uppercase tracking-[0.5em] font-black text-[#1A1A1A]/10 mb-6 group-hover:text-emerald-600 transition-colors duration-500">{site.metric}</div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter text-[#1A1A1A] mb-4">{site.site}</h3>
                                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-600 underline underline-offset-4 decoration-emerald-600/20">{site.specialized}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="process" className="py-40 bg-[#1A1A1A] text-white relative overflow-hidden">
                <div className="absolute inset-0 grain-overlay opacity-10" />
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="text-center mb-32">
                        <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-emerald-400 block mb-8">Le Voyage</span>
                        <h2 className="text-[8vw] sm:text-[6vw] lg:text-[4.5vw] font-black uppercase tracking-tighter text-white">FLUX ORCHESTRÉ</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.1 }}
                                className="relative group"
                            >
                                <div className="text-[12vw] font-black text-white/[0.03] absolute -top-[6vw] -left-[2vw] transition-all duration-700 group-hover:text-emerald-500/10">
                                    {step.number}
                                </div>
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-10 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-500">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-lg font-black uppercase tracking-widest mb-6">{step.title}</h3>
                                    <p className="text-xs text-white/40 leading-relaxed font-light">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Specialty Enrollment - High-Precision features */}
            <section className="py-40 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={transition}
                            className="space-y-12"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ x: 20 }}
                                    className="flex items-start gap-10 group"
                                >
                                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-all duration-500">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black uppercase tracking-widest text-[#1A1A1A] mb-3">{feature.title}</h4>
                                        <p className="text-xs text-[#1A1A1A]/40 leading-relaxed font-light">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-emerald-600 block mb-8">Infrastructure</span>
                            <h2 className="text-[8vw] sm:text-[6vw] lg:text-[4vw] font-black uppercase tracking-tighter leading-tight text-[#1A1A1A] mb-12">
                                <span className="block font-serif italic font-extralight text-[#1A1A1A]/5 lowercase -mb-[1vw]">méticuleuse</span>
                                <span>INSCRIPTION</span>
                            </h2>
                            <p className="text-sm text-[#1A1A1A]/40 font-light leading-relaxed mb-12 max-w-lg">
                                Vivez une transition fluide vers notre écosystème médical. Notre discrétion administrative assure que votre intégration est aussi tranquille que les soins qui suivent.
                            </p>
                            <motion.button
                                whileHover={{ x: 10 }}
                                className="flex items-center gap-6 group"
                            >
                                <div className="w-14 h-14 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                                    <FiArrowRight className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] uppercase font-bold tracking-[0.4em]">Initialiser l'Admission</span>
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Insurance & Alliances */}
            <section className="py-24 bg-slate-50 relative">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="text-center lg:text-left">
                            <h3 className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#1A1A1A]/30 mb-2">Alliances Globales</h3>
                            <div className="text-xl font-serif italic text-[#1A1A1A]">Partenaires Cliniques Acceptés</div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-12 lg:gap-24 items-center">
                            {insuranceProviders.map((provider, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-all duration-500 cursor-none grayscale hover:grayscale-0"
                                >
                                    <span className="text-2xl">{provider.logo}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{provider.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Faculty Section - The Medical Board */}
            <section id="doctors" className="py-40 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-32">
                        <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-emerald-600 block mb-8">La Faculté</span>
                        <h2 className="text-[8vw] sm:text-[6vw] lg:text-[5vw] font-black uppercase tracking-tighter text-[#1A1A1A]">CONSEIL MÉDICAL</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {doctors.map((doctor, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="group"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] bg-slate-50 mb-10">
                                    <img
                                        src={doctor.image}
                                        alt={doctor.name}
                                        className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-12">
                                        <div className="text-white">
                                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400 mb-2">Prêt pour Consultation Privée</p>
                                            <div className="h-[1px] w-12 bg-white/20" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-black uppercase tracking-tighter text-[#1A1A1A] mb-2">{doctor.name}</h3>
                                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-600 mb-2">{doctor.specialty}</p>
                                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/20">{doctor.experience}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ - Specialized Inquiries */}
            <section className="py-40 bg-slate-50">
                <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                        <div className="lg:col-span-5">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-emerald-600 block mb-8">Questions</span>
                            <h2 className="text-4xl font-black uppercase tracking-tighter text-[#1A1A1A] mb-8 leading-none">DEMANDES<br />SPÉCIALISÉES</h2>
                            <p className="text-xs text-[#1A1A1A]/40 leading-relaxed font-light">
                                Pour des exigences cliniques uniques ou des questions administratives, veuillez contacter notre conciergerie cryptée.
                            </p>
                        </div>
                        <div className="lg:col-span-7 space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-black/5 pb-6">
                                    <button
                                        onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                        className="w-full py-4 text-left flex items-start justify-between group"
                                    >
                                        <span className="font-bold text-[#1A1A1A] text-sm uppercase tracking-widest group-hover:text-emerald-600 transition-colors uppercase">{faq.question}</span>
                                        <FiPlus className={`w-5 h-5 transition-transform duration-500 ${openFAQ === index ? 'rotate-45' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openFAQ === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="pb-4 text-[11px] text-[#1A1A1A]/40 font-light leading-relaxed"
                                            >
                                                {faq.answer}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Journal Section - The Clinical Journal */}
            <section id="blog" className="py-40 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
                        <div className="max-w-2xl">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-emerald-600 block mb-8">Journal</span>
                            <h2 className="text-[8vw] sm:text-[6vw] lg:text-[5vw] font-black uppercase tracking-tighter text-[#1A1A1A]">LE JOURNAL</h2>
                        </div>
                        <motion.a
                            href="#"
                            whileHover={{ x: 10 }}
                            className="flex items-center gap-6 group"
                        >
                            <span className="text-[10px] uppercase font-bold tracking-[0.4em]">Voir Archives</span>
                            <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:text-white transition-all">
                                <FiArrowRight />
                            </div>
                        </motion.a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        {articles.map((article, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-[16/9] overflow-hidden rounded-[3rem] bg-slate-50 mb-10 relative">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1500ms] group-hover:scale-105"
                                    />
                                    <div className="absolute top-8 left-8">
                                        <span className="px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full text-[8px] font-bold uppercase tracking-[0.2em]">{article.category}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start gap-8">
                                    <div className="max-w-md">
                                        <h3 className="text-3xl font-black tracking-tighter text-[#1A1A1A] mb-4 group-hover:text-emerald-600 transition-colors uppercase">{article.title}</h3>
                                        <p className="text-xs text-[#1A1A1A]/40 font-light leading-relaxed">{article.excerpt}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/20 mb-1">{article.date}</div>
                                        <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-600">{article.readTime}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Perspectives - Editorial Testimonials */}
            <section className="py-80 bg-[#FDFCFB] relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
                        <div className="lg:col-span-5">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-emerald-600 block mb-12">Le Récit</span>
                            <div className="relative mb-20">
                                <span className="text-[20vw] font-serif italic text-emerald-600/5 absolute -top-[12vw] -left-[4vw] pointer-events-none">"</span>
                                <h2 className="text-6xl font-black uppercase tracking-tighter text-[#1A1A1A] leading-[0.9] relative z-10">
                                    PERSPECTIVE<br />SOUVERAINE
                                </h2>
                            </div>
                            <div className="space-y-32">
                                {clientJourneys.map((client, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.3 }}
                                        className="relative"
                                    >
                                        <p className="text-2xl font-serif italic text-[#1A1A1A]/80 leading-relaxed mb-12 max-w-md">
                                            {client.narrative}
                                        </p>
                                        <div className="flex items-center gap-8">
                                            <div className="w-16 h-16 rounded-full overflow-hidden grayscale border border-black/5">
                                                <img src={client.image} alt={client.identity} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#1A1A1A]">{client.identity}</h4>
                                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/40 mt-1">{client.role}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-1" />
                        <div className="lg:col-span-6 relative">
                            <motion.div
                                animate={{ y: [0, -30, 0] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                className="aspect-[4/5] rounded-[4.5rem] overflow-hidden border border-black/[0.03] p-5 bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)]"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                                    alt="Clinical Sanctuary"
                                    className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 transition-all duration-[2000ms] rounded-[3.8rem]"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="absolute -bottom-16 -left-16 bg-[#1A1A1A] text-white p-14 rounded-[4rem] shadow-3xl max-w-xs z-20"
                            >
                                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-400 mb-8 underline decoration-emerald-400/20 underline-offset-8">Métrique Coffre</p>
                                <div className="text-5xl font-black tracking-tighter mb-4">98.4%</div>
                                <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/30">Score Souveraineté Clinique</div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry Section - The Private Intake */}
            <section id="contact" className="py-40 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                        <div className="lg:col-span-5">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-emerald-600 block mb-8">Demande</span>
                            <h2 className="text-4xl font-black uppercase tracking-tighter text-[#1A1A1A] mb-8 leading-none">ADMISSION<br />PRIVÉE</h2>
                            <p className="text-xs text-[#1A1A1A]/40 leading-relaxed font-light mb-12">
                                Pour des protocoles médicaux spécialisés ou des demandes d'entrée privée, veuillez utiliser notre portail d'admission crypté.
                            </p>

                            <div className="space-y-10">
                                {[
                                    { icon: <FiPhone />, title: "Support Clinique", content: "1-800-VAULT-ME" },
                                    { icon: <FiMail />, title: "Envoi Sécurisé", content: "concierge@medivault.com" },
                                    { icon: <FiMapPin />, title: "Site Souverain", content: "Medical District v2.0" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-[#1A1A1A] group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#1A1A1A] mb-1">{item.title}</h4>
                                            <p className="text-xs text-[#1A1A1A]/40 font-light">{item.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-1" />

                        <div className="lg:col-span-6">
                            <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-black/[0.03]">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/40 ml-4">Identité du Sujet</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-8 py-5 bg-white border border-black/5 rounded-2xl focus:ring-1 focus:ring-emerald-600 outline-none text-xs font-light tracking-wide transition-all"
                                                placeholder="Nom Légal"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/40 ml-4">Alpha Crypté</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full px-8 py-5 bg-white border border-black/5 rounded-2xl focus:ring-1 focus:ring-emerald-600 outline-none text-xs font-light tracking-wide transition-all"
                                                placeholder="email@secure.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/40 ml-4">Protocole Clinique</label>
                                        <select className="w-full px-8 py-5 bg-white border border-black/5 rounded-2xl focus:ring-1 focus:ring-emerald-600 outline-none text-xs font-light tracking-wide transition-all appearance-none cursor-pointer">
                                            <option>Restauration Esthétique</option>
                                            <option>Pédiatrie de Précision</option>
                                            <option>Suite de Diagnostic Numérique</option>
                                            <option>Apothicaire Clinique</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]/40 ml-4">Entrée de Journal</label>
                                        <textarea
                                            rows={4}
                                            className="w-full px-8 py-5 bg-white border border-black/5 rounded-2xl focus:ring-1 focus:ring-emerald-600 outline-none text-xs font-light tracking-wide transition-all resize-none"
                                            placeholder="Transmission de Message..."
                                        ></textarea>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        type="submit"
                                        className="w-full py-6 bg-[#1A1A1A] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.5em] shadow-2xl hover:bg-emerald-600 transition-all duration-500"
                                    >
                                        {submitted ? "Protocole Transmis" : "Initialiser Demande"}
                                    </motion.button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer - The Final Sanctuary */}
            <footer className="bg-[#1A1A1A] text-white pt-40 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 grain-overlay opacity-5" />
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-40">
                        <div className="lg:col-span-5">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1A1A1A]">
                                    <FiActivity className="w-5 h-5" />
                                </div>
                                <span className="text-xl font-black uppercase tracking-[0.4em]">MediVault</span>
                            </div>
                            <p className="text-xs text-white/40 leading-relaxed font-light mb-12 max-w-sm">
                                Standardisation de l'excellence médicale par une synthèse de rigueur clinique et de protocoles de sanctuaire privé.
                            </p>
                            <div className="flex gap-8">
                                {[FiInstagram, FiTwitter, FiLinkedin].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center hover:bg-white hover:text-[#1A1A1A] transition-all">
                                        <Icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-16">
                            {[
                                { title: 'Faculté', links: ['Esthétique', 'Pédiatrie', 'Cardiologie', 'Neuro'] },
                                { title: 'Portefeuille', links: ['Arrivée', 'Demande', 'Protocoles', 'Archives'] },
                                { title: 'Sécurité', links: ['Souveraineté', 'Conformité', 'Éthique', 'Légal'] }
                            ].map((group, i) => (
                                <div key={i}>
                                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-white/30">{group.title}</h4>
                                    <ul className="space-y-4">
                                        {group.links.map((link, j) => (
                                            <li key={j}>
                                                <a href="#" className="text-[10px] uppercase font-bold tracking-[0.2em] hover:text-emerald-400 transition-colors">{link}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-12 border-t border-white/5">
                        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
                            © 2024 MediVault Clinique. Tous Droits Souverains.
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
                            Conçu pour l'Excellence Clinique
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
