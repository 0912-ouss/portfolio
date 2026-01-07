"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import {
    FiCalendar,
    FiClock,
    FiMapPin,
    FiPhone,
    FiCheck,
    FiStar,
    FiX,
    FiChevronDown,
    FiMail,
    FiFacebook,
    FiTwitter,
    FiInstagram,
    FiArrowRight,
    FiScissors,
    FiHeart,
    FiAward,
} from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

// Services Data
// Artisanal Services Data
const services = [
    {
        title: "Architecture Pigmentaire",
        tagline: "L'Atelier Couleur : Précision Moléculaire",
        description: "Orchestration avancée des couleurs utilisant des pigments à faible additif. Des profondeurs d'obsidienne haute couture au platine structurel, nos architectes créent des nuances qui évoluent avec votre mouvement.",
        price: "Admission dès 350 €",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2070&auto=format&fit=crop",
        features: ["Réparation de Liaison Moléculaire", "Protection UV-Cinétique", "Finition Gloss Sculptural"]
    },
    {
        title: "Silhouette Structurelle",
        tagline: "Ingénierie de Précision",
        description: "Une approche architecturale de la silhouette. Utilisation de techniques de coupe à sec pour créer une géométrie fluide qui respecte la chute naturelle et la densité de l'ADN unique de vos cheveux.",
        price: "Admission dès 150 €",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2070&auto=format&fit=crop",
        features: ["Analyse Anatomique", "Cartographie de Silhouette", "Texture Mouvement Fluide"]
    },
    {
        title: "Alchimie de Texture",
        tagline: "Transformation Matérielle",
        description: "Resurfaçage moléculaire complet. Utilisation de kératine bio-synthétique et d'huiles artisanales pour reconstruire la cuticule du cheveu, offrant une finition miroir et une intégrité structurelle.",
        price: "Protocole Sur Mesure",
        image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=2070&auto=format&fit=crop",
        features: ["Restauration Intra-Lipidique", "Bouclier Thermique", "Finition Miroir"]
    }
];

// Lab Equipment Data
const labEquipment = [
    {
        device: "Centrifugeuse Moléculaire",
        function: "Optimisation Pigmentaire",
        description: "Sépare et concentre précisément les pigments organiques pour des formules couleur sur mesure.",
        icon: <FiScissors />
    },
    {
        device: "Diffuseur Hydra-Sonic",
        function: "Hydratation du Cortex",
        description: "Utilise des ondes sonores haute fréquence pour atomiser des sérums riches en nutriments pour une pénétration profonde de la cuticule.",
        icon: <FiClock />
    },
    {
        device: "Spectro-Analyse",
        function: "Cartographie Structurelle",
        description: "Scan infrarouge de la fibre capillaire pour identifier les faiblesses structurelles et l'historique chimique.",
        icon: <FiCheck />
    },
    {
        device: "Bouclier Cinétique-Thermique",
        function: "Maîtrise Thermique",
        description: "Technologie d'induction protectrice qui scelle la cuticule lors des transitions textuelles avancées.",
        icon: <FiScissors />
    }
];

// Team Members (The Faculty)
const teamMembers = [
    {
        name: "Emma Richardson",
        role: "Maître Styliste",
        specialty: "Spécialiste Couleur",
        experience: "12+ ans",
        image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop",
        social: { instagram: "#", facebook: "#" }
    },
    {
        name: "Michael Chen",
        role: "Styliste Senior",
        specialty: "Expert Coupe",
        experience: "10+ ans",
        image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&h=500&fit=crop",
        social: { instagram: "#", facebook: "#" }
    },
    {
        name: "Sarah Martinez",
        role: "Directrice Créative",
        specialty: "Spécialiste Transformation",
        experience: "15+ ans",
        image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop&sat=-100",
        social: { instagram: "#", facebook: "#" }
    },
    {
        name: "David Thompson",
        role: "Consultant Style",
        specialty: "Soins Hommes",
        experience: "8+ ans",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
        social: { instagram: "#", facebook: "#" }
    },
];

// Transformations Gallery
const transformations = [
    {
        before: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?w=400&h=500&fit=crop",
        after: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=500&fit=crop",
        title: "Balayage Brunette vers Blond",
        client: "Jessica M.",
        description: "Une transformation étonnante d'un brun foncé vers un balayage blond ensoleillé."
    },
    {
        before: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=400&h=500&fit=crop",
        after: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=500&fit=crop",
        title: "Long vers Bob Chic",
        client: "Amanda K.",
        description: "Nouveau look audacieux avec un bob texturé moderne et de riches tons cuivrés."
    },
    {
        before: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400&h=500&fit=crop",
        after: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=500&fit=crop",
        title: "Abîmé vers Éclat Sain",
        client: "Maria L.",
        description: "Restauration capillaire complète avec notre programme de traitement premium."
    },
];

// Testimonials
const testimonials = [
    {
        name: "Rachel Williams",
        text: "J'adore absolument mon nouveau look ! L'équipe est incroyablement talentueuse et m'a fait sentir si à l'aise. La meilleure expérience en salon !",
        rating: 5,
        service: "Transformation Capillaire",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    {
        name: "Jennifer Brown",
        text: "Je viens ici depuis 3 ans et je ne confierais mes cheveux à personne d'autre. Professionnels, créatifs et dépassant toujours les attentes.",
        rating: 5,
        service: "Couleur & Style",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
        name: "Lisa Anderson",
        text: "L'attention aux détails et la qualité du service sont inégalées. Mes cheveux n'ont jamais été aussi beaux !",
        rating: 5,
        service: "Traitements",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
    },
];

// FAQ Data
const faqs = [
    {
        question: "Comment puis-je prendre rendez-vous ?",
        answer: "Vous pouvez réserver via notre formulaire en ligne ci-dessous, nous appeler directement ou nous envoyer un message sur les réseaux sociaux. Nous recommandons de réserver au moins une semaine à l'avance pour les créneaux populaires."
    },
    {
        question: "Que dois-je apporter à mon rendez-vous ?",
        answer: "Juste vous-même ! Si vous avez des photos d'inspiration de coiffures que vous aimez, n'hésitez pas à les apporter ou à les enregistrer sur votre téléphone pour les montrer à votre styliste."
    },
    {
        question: "Combien de temps prennent les services généralement ?",
        answer: "Les coupes prennent 45-60 minutes, la coloration 2-3 heures, et les transformations complètes peuvent prendre 4-6 heures. Nous vous donnerons une estimation du temps lors de votre réservation."
    },
    {
        question: "Proposez-vous des consultations ?",
        answer: "Oui ! Tous les services incluent une consultation complémentaire pour discuter de vos objectifs capillaires, de la forme de votre visage, de votre style de vie et de vos préférences d'entretien."
    },
    {
        question: "Quelle est votre politique d'annulation ?",
        answer: "Nous demandons un préavis de 24 heures pour les annulations ou les reprogrammations. Les annulations tardives ou les non-présentations peuvent entraîner des frais."
    },
    {
        question: "Vendez-vous des produits de soins capillaires ?",
        answer: "Oui ! Nous proposons des produits professionnels haut de gamme recommandés par nos stylistes. Demandez des recommandations personnalisées lors de votre rendez-vous."
    },
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

export default function HairSalonDemo() {
    // Advanced Motion Constants
    const LUXURY_EASE = [0.6, 0.05, 0.01, 0.9];
    const luxuryEaseTransition = { duration: 1.4, ease: [0.6, 0.05, 0.01, 0.9] };

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        stylist: "Tout disponible",
        date: "",
        time: "10:00",
        notes: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [activeTransformation, setActiveTransformation] = useState(0);
    const [showBefore, setShowBefore] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState<number | null>(null);
    const [lightboxType, setLightboxType] = useState<'services' | 'team' | 'transformations'>('transformations');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [sliderPositions, setSliderPositions] = useState<number[]>(transformations.map(() => 50));
    const [isDragging, setIsDragging] = useState<number | null>(null);

    // Counter animation refs
    const [yearsCount, setYearsCount] = useState(0);
    const [clientsCount, setClientsCount] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const statsRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: "",
                phone: "",
                email: "",
                service: "",
                stylist: "Any Available",
                date: "",
                time: "10:00 AM",
                notes: ""
            });
        }, 3000);
    };

    // Scroll handler for back-to-top button
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Counter animation when stats come into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    // Animate years
                    let years = 0;
                    const yearsInterval = setInterval(() => {
                        years += 1;
                        setYearsCount(years);
                        if (years >= 15) clearInterval(yearsInterval);
                    }, 50);

                    // Animate clients
                    let clients = 0;
                    const clientsInterval = setInterval(() => {
                        clients += 500;
                        setClientsCount(clients);
                        if (clients >= 10000) clearInterval(clientsInterval);
                    }, 20);

                    // Animate rating
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

    // Keyboard handler for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxOpen === null) return;

            if (e.key === 'Escape') {
                setLightboxOpen(null);
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox('prev');
            } else if (e.key === 'ArrowRight') {
                navigateLightbox('next');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen]);

    // Lightbox navigation
    const navigateLightbox = (direction: 'prev' | 'next') => {
        if (lightboxOpen === null) return;
        const length = lightboxType === 'transformations' ? transformations.length :
            lightboxType === 'team' ? teamMembers.length : services.length;

        if (direction === 'next') {
            setLightboxOpen((lightboxOpen + 1) % length);
        } else {
            setLightboxOpen((lightboxOpen - 1 + length) % length);
        }
    };

    // Before/After slider handler
    const handleSliderMove = (e: React.MouseEvent | React.TouchEvent, index: number) => {
        if (isDragging !== index) return;

        const container = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const x = clientX - container.left;
        const percentage = (x / container.width) * 100;

        setSliderPositions(prev => {
            const newPositions = [...prev];
            newPositions[index] = Math.max(0, Math.min(100, percentage));
            return newPositions;
        });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-[#C5A059]/30 selection:text-[#C5A059] font-sans">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@100..900&display=swap');
                
                .font-serif { font-family: 'Instrument Serif', serif; }
                .font-sans { font-family: 'Outfit', sans-serif; }
                
                .luxury-text-stroke {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
                    color: transparent;
                }
                
                .grain-overlay {
                    background-image: url("https://www.transparenttextures.com/patterns/dark-matter.png");
                    opacity: 0.03;
                    pointer-events: none;
                }

                .gold-gradient {
                    background: linear-gradient(135deg, #C5A059 0%, #F1D39B 50%, #C5A059 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .bg-gold-glow {
                    background: radial-gradient(circle at center, rgba(197, 160, 89, 0.15) 0%, transparent 70%);
                }
            `}</style>

            <div className="fixed inset-0 grain-overlay z-50 overflow-hidden" />

            {/* Navigation */}
            <nav className="fixed top-8 left-0 right-0 z-[100] px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="bg-[#141416]/80 backdrop-blur-3xl border border-white/5 h-24 rounded-[2rem] px-8 flex items-center justify-between shadow-2xl">
                        <motion.div
                            className="flex items-center gap-4"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="w-12 h-12 bg-[#C5A059] rounded-2xl flex items-center justify-center text-[#0A0A0B] shadow-[0_0_20px_rgba(197,160,89,0.3)]">
                                <FiScissors className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-2xl font-serif font-bold tracking-tight text-white uppercase">Mill Berry</div>
                                <div className="text-[8px] text-[#C5A059] tracking-[0.5em] font-black uppercase -mt-1">Signature Studio</div>
                            </div>
                        </motion.div>

                        <div className="hidden lg:flex items-center gap-12">
                            {[
                                { href: "#home", label: "Studio" },
                                { href: "#services", label: "Art" },
                                { href: "#transformations", label: "Archives" },
                                { href: "#team", label: "Faculté" },
                            ].map((item, index) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40 hover:text-[#C5A059] transition-all relative group"
                                >
                                    {item.label}
                                    <span aria-hidden="true" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#C5A059] rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                                </motion.a>
                            ))}
                        </div>

                        <div className="flex items-center gap-8">
                            <Magnetic>
                                <a href="#booking" className="hidden sm:block px-10 py-4 bg-[#C5A059] text-[#0A0A0B] text-[10px] uppercase font-black tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-xl shadow-[#C5A059]/10">
                                    Prendre Rendez-vous
                                </a>
                            </Magnetic>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 text-white"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section: The Grand Arrival */}
            <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-32">
                <motion.div
                    initial={{ clipPath: 'inset(100% 0 0 0)' }}
                    animate={{ clipPath: 'inset(0% 0 0 0)' }}
                    transition={{ duration: 1.8, ease: "anticipate", delay: 0.2 }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=2070&auto=format&fit=crop"
                        alt="Signature Studio Interior"
                        fill
                        className="object-cover opacity-20 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B]" />
                </motion.div>

                <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-[#C5A059]/5 blur-[200px] -translate-y-1/2 translate-x-1/2 rounded-full" />
                <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#FFFFFF]/5 blur-[150px] translate-y-1/2 -translate-x-1/2 rounded-full" />

                <div className="container mx-auto px-8 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={luxuryEaseTransition}
                        >
                            <div className="flex items-center gap-6 mb-16">
                                <div className="h-[1px] w-24 bg-[#C5A059]/30" />
                                <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#C5A059]">Maîtrise Capillaire Artisanale</span>
                            </div>

                            <h1 className="text-[15vw] sm:text-[13vw] md:text-[11vw] font-black leading-[0.7] uppercase tracking-tighter text-white">
                                <span className="block italic font-serif font-extralight text-white/5 lowercase -mb-[3vw] ml-[2vw]">redéfinir</span>
                                <span className="block">LA SILHOUETTE</span>
                                <span className="flex items-center gap-6">
                                    <span className="luxury-text-stroke">STUDIO</span>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "20vw" }}
                                        transition={{ delay: 1, duration: 1.5, ease: [0.6, 0.05, 0.01, 0.9] }}
                                        className="h-[0.5vw] bg-[#C5A059] hidden lg:block"
                                    />
                                </span>
                            </h1>

                            <div className="mt-20 flex flex-col lg:flex-row lg:items-end justify-between gap-16">
                                <p className="text-xl md:text-2xl text-white/40 max-w-2xl font-light leading-snug tracking-tight">
                                    Un sanctuaire souterrain pour une architecture capillaire avancée. Où la chimie organique rencontre la précision raffinée de l'artisanat.
                                </p>

                                <div className="flex items-center gap-12">
                                    <Magnetic>
                                        <motion.a
                                            href="#booking"
                                            whileHover={{ x: 10 }}
                                            className="group flex flex-col gap-6"
                                        >
                                            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#C5A059] group-hover:border-transparent transition-all duration-500 hover:shadow-[0_0_30px_rgba(197,160,89,0.3)]">
                                                <FiArrowRight className="w-8 h-8 group-hover:text-[#0A0A0B] text-white" />
                                            </div>
                                            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/60">Admission</span>
                                        </motion.a>
                                    </Magnetic>

                                    <div className="h-24 w-[1px] bg-white/10" />

                                    <div className="flex flex-col gap-2">
                                        <span className="text-4xl font-black tracking-tighter text-white">15+</span>
                                        <span aria-hidden="true" className="text-[8px] uppercase font-bold tracking-[0.3em] text-white/20">Années de Maîtrise</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* The Collection: Artisanal Services */}
            <section id="services" className="py-40 bg-[#0A0A0B] relative overflow-hidden">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
                        <div className="max-w-2xl">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#C5A059] block mb-8 underline underline-offset-8 decoration-[#C5A059]/10">La Suite</span>
                            <h2 className="text-[8vw] sm:text-[6vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-none text-white">
                                <span className="block font-serif italic font-extralight text-white/5 lowercase -mb-[1.5vw]">avancé</span>
                                <span>PORTFOLIO</span>
                            </h2>
                        </div>
                        <p className="text-sm text-white/30 font-light leading-relaxed max-w-[280px]">
                            Une sélection curée de protocoles capillaires avancés conçus pour l'intégrité structurelle et l'esthétique haute couture.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.2 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] border border-white/5 bg-[#141416] mb-10 overflow-hidden">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1500ms] group-hover:scale-110 brightness-90 shadow-2xl"
                                    />
                                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700" />

                                    <div className="absolute bottom-10 left-10 p-2">
                                        <div className="w-12 h-12 rounded-2xl bg-[#C5A059] flex items-center justify-center text-[#0A0A0B] shadow-2xl border border-white/10 mb-6">
                                            <FiScissors className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4 group-hover:text-[#C5A059] transition-colors">{service.title}</h3>
                                <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-6">{service.tagline}</p>
                                <p className="text-xs text-white/30 font-light leading-relaxed max-w-xs mb-8">
                                    {service.description}
                                </p>
                                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                    <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">{service.price}</span>
                                    <FiArrowRight className="text-white/20 group-hover:text-[#C5A059] group-hover:translate-x-2 transition-all" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Color Atelier: Chromatic Mastery */}
            <section className="py-40 bg-[#0A0A0B] relative overflow-hidden">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-32">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={luxuryEaseTransition}
                            className="lg:w-1/2 relative"
                        >
                            <div className="aspect-[4/5] relative rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=1974&auto=format&fit=crop"
                                    alt="Color Alchemy"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms] scale-110 hover:scale-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Floating Pigment Card */}
                            <motion.div
                                style={{ y: y1 }}
                                className="absolute -right-12 top-1/2 -translate-y-1/2 p-12 bg-[#141416]/90 backdrop-blur-3xl border border-[#C5A059]/30 rounded-[3rem] hidden md:block max-w-[280px] z-20"
                            >
                                <span className="text-[8px] uppercase font-black tracking-[0.4em] text-[#C5A059] block mb-4">Formule Actuelle</span>
                                <h4 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Obsidienne No. 04</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-[10px] text-white/40 uppercase font-black">
                                        <span>Saturation</span>
                                        <span className="text-[#C5A059]">98%</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="w-[98%] h-full bg-[#C5A059]" />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        <div className="lg:w-1/2">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#C5A059] block mb-8">L'Atelier Couleur</span>
                            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white mb-12">
                                SOUVERAINETÉ<br />
                                <span className="luxury-text-stroke">CHROMATIQUE</span>
                            </h2>
                            <p className="text-lg text-white/50 font-light leading-relaxed mb-16 max-w-xl">
                                Entrez dans un espace où le pigment rencontre la physique. Notre atelier se spécialise dans l'architecture moléculaire des couleurs, assurant une vibrance durable et une santé structurelle des cheveux grâce à des additifs de qualité quantique.
                            </p>

                            <div className="grid grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-[#C5A059] mb-4">Dosage de Précision</h4>
                                    <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest leading-loose">
                                        Formulations mesurées au milligramme pour une consistance absolue.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-[#C5A059] mb-4">Résistance Solaire</h4>
                                    <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest leading-loose">
                                        Boucliers UV-cinétiques intégrés dans chaque couche de pigment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Alchemist's Lab: Technical Showcase */}
            <section className="py-40 bg-[#0A0A0B] relative overflow-hidden">
                <motion.div style={{ y: y1 }} className="absolute inset-0 bg-gold-glow opacity-30" />
                <div className="container mx-auto px-8 relative z-10">
                    <div className="mb-32 max-w-2xl">
                        <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#C5A059] block mb-8">Infrastructure Clinique</span>
                        <h2 className="text-[8vw] sm:text-[6vw] lg:text-[4vw] font-black uppercase tracking-tighter text-white">LE COFFRE DE L'ALCHIMISTE</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {labEquipment.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.1 }}
                                className="p-12 border border-white/5 bg-white/[0.02] rounded-[3rem] hover:bg-white/[0.05] transition-all duration-700 group ring-1 ring-white/0 hover:ring-[#C5A059]/30"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] mb-10 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">{item.device}</h3>
                                <p className="text-[10px] text-[#C5A059] uppercase font-black tracking-widest mb-4">{item.function}</p>
                                <p className="text-xs text-white/30 font-light leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Sensory Sanctuary: The Wash Experience */}
            <section className="py-60 bg-[#0A0A0B] relative overflow-hidden">
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.15 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop"
                        alt="Sensory Sancuary"
                        fill
                        className="object-cover"
                    />
                </motion.div>

                <div className="container mx-auto px-8 relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <span className="text-[10px] uppercase tracking-[0.8em] font-black text-[#C5A059] mb-12">Le Protocole Zénith</span>
                        <h2 className="text-[10vw] md:text-[8vw] font-serif italic font-extralight text-white leading-none mb-16">SANCTUAIRE Sensoriel</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 max-w-5xl">
                            <div className="flex flex-col gap-6">
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Architecture Acoustique</span>
                                <p className="text-sm text-white/30 font-light leading-relaxed italic">"Conçu pour absorber la fréquence du monde extérieur, ramenant la présence au rituel."</p>
                            </div>
                            <div className="flex flex-col gap-6">
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Voyage Olfactif</span>
                                <p className="text-sm text-white/30 font-light leading-relaxed italic">"Bois de cèdre sur mesure et aromathérapie au sel d'obsidienne curés pour la restauration neurale."</p>
                            </div>
                            <div className="flex flex-col gap-6">
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Massage Cinétique</span>
                                <p className="text-sm text-white/30 font-light leading-relaxed italic">"Orchestration du cuir chevelu au ralenti pour stimuler la circulation sanguine et la relaxation profonde."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transformations: Before & After Archive */}
            <section id="transformations" className="py-40 bg-[#0A0A0B] relative overflow-hidden">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
                        <div className="max-w-2xl">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#C5A059] block mb-8 underline underline-offset-8 decoration-[#C5A059]/10">Les Archives</span>
                            <h2 className="text-[8vw] sm:text-[6vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-none text-white">
                                <span className="block font-serif italic font-extralight text-white/5 lowercase -mb-[1.5vw]">évolution</span>
                                <span>SILHOUETTES</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {transformations.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-[#141416] rounded-[3rem] overflow-hidden border border-white/5 hover:border-[#C5A059]/30 transition-all duration-700 shadow-2xl">
                                    {/* Interactive Before/After Slider */}
                                    <div
                                        className="relative aspect-[3/4] overflow-hidden cursor-ew-resize select-none"
                                        onMouseDown={() => setIsDragging(index)}
                                        onMouseUp={() => setIsDragging(null)}
                                        onMouseLeave={() => setIsDragging(null)}
                                        onMouseMove={(e) => handleSliderMove(e, index)}
                                        onTouchStart={() => setIsDragging(index)}
                                        onTouchEnd={() => setIsDragging(null)}
                                        onTouchMove={(e) => handleSliderMove(e, index)}
                                    >
                                        {/* After Image (Full width) */}
                                        <div className="absolute inset-0">
                                            <Image
                                                src={item.after}
                                                alt="After"
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                            <div className="absolute top-8 right-8 bg-[#C5A059] text-[#0A0A0B] px-4 py-2 rounded-full text-[10px] font-black tracking-widest z-10">
                                                AFTER
                                            </div>
                                        </div>

                                        {/* Before Image (Clipped) */}
                                        <div
                                            className="absolute inset-0 transition-all duration-100"
                                            style={{ clipPath: `inset(0 ${100 - sliderPositions[index]}% 0 0)` }}
                                        >
                                            <Image
                                                src={item.before}
                                                alt="Before"
                                                fill
                                                className="object-cover grayscale brightness-50"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                            <div className="absolute top-8 left-8 bg-black/60 text-white/40 px-4 py-2 rounded-full text-[10px] font-black tracking-widest z-10 border border-white/5">
                                                AVANT
                                            </div>
                                        </div>

                                        {/* Slider Handle */}
                                        <div
                                            className="absolute top-0 bottom-0 w-[1px] bg-[#C5A059] z-20 pointer-events-none"
                                            style={{ left: `${sliderPositions[index]}%` }}
                                        >
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#0A0A0B] border border-[#C5A059] rounded-full shadow-[0_0_20px_rgba(197,160,89,0.5)] flex items-center justify-center pointer-events-auto cursor-ew-resize">
                                                <div className="flex gap-1">
                                                    <div className="w-[1px] h-4 bg-[#C5A059]/40"></div>
                                                    <div className="w-[1px] h-4 bg-[#C5A059]/40"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Instructional Hint (shows on hover) */}
                                        <div aria-hidden="true" className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#0A0A0B]/80 backdrop-blur-md text-[#C5A059] px-6 py-3 rounded-full text-[8px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#C5A059]/20">
                                            Glisser pour Contraster
                                        </div>
                                    </div>

                                    <div className="p-12">
                                        <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-2">{item.title}</h3>
                                        <p className="text-xs text-white/30 font-light leading-relaxed mb-6">{item.description}</p>
                                        <div className="flex items-center gap-3 text-[10px] text-[#C5A059] uppercase font-bold tracking-[0.2em]">
                                            <FiHeart className="w-4 h-4" />
                                            <span>MEMBER: {item.client}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* The Faculty: Expert Stylists */}
            <section id="team" className="py-40 bg-[#0A0A0B] relative overflow-hidden">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
                        <div className="max-w-2xl">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#C5A059] block mb-8 underline underline-offset-8 decoration-[#C5A059]/10">La Faculté</span>
                            <h2 className="text-[8vw] sm:text-[6vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-none text-white">
                                <span className="block font-serif italic font-extralight text-white/5 lowercase -mb-[1.5vw]">maîtres</span>
                                <span>ARCHITECTES</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/5 bg-[#141416] mb-8 group-hover:border-[#C5A059]/30 transition-all duration-700">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1200ms] group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent opacity-60" />

                                    <div aria-hidden="true" className="absolute bottom-8 left-8 right-8 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                        <motion.a href="javascript:void(0)" whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#C5A059] hover:text-[#0A0A0B] transition-all">
                                            <FiInstagram className="w-4 h-4" />
                                        </motion.a>
                                        <motion.a href="javascript:void(0)" whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#C5A059] hover:text-[#0A0A0B] transition-all">
                                            <FiFacebook className="w-4 h-4" />
                                        </motion.a>
                                    </div>
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-1">{member.name}</h3>
                                <p className="text-[10px] text-[#C5A059] uppercase font-black tracking-widest mb-4">{member.role}</p>
                                <div aria-hidden="true" className="flex items-center gap-2 text-[10px] text-white/20 uppercase font-bold tracking-widest">
                                    <FiAward className="w-3 h-3" />
                                    <span>{member.experience} Discipline</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {/* Editorial Testimonials: Sovereign Perspective */}
            <section className="py-40 bg-[#0A0A0B] relative overflow-hidden">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-32">
                        <div className="lg:w-1/3">
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#C5A059] block mb-8">Témoignages</span>
                            <h2 className="text-6xl font-black uppercase tracking-tighter text-white leading-[0.8] mb-12">
                                PERSPECTIVE<br /><span className="luxury-text-stroke">SOUVERAINE</span>
                            </h2>
                            <p className="text-sm text-white/30 font-light leading-relaxed mb-12">
                                Réflexions de nos membres sur l'intersection de la structure, de la chimie et de l'identité.
                            </p>
                            <div className="flex flex-col gap-4">
                                <span className="text-4xl font-serif italic font-extralight text-[#C5A059]">98%</span>
                                <span aria-hidden="true" className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/20">Métrique de Rétention</span>
                            </div>
                        </div>

                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
                            {testimonials.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ ...luxuryEaseTransition, delay: index * 0.1 }}
                                    className={`p-16 rounded-[4rem] border border-white/5 bg-white/[0.02] relative ${index === 1 ? 'md:mt-24' : ''}`}
                                >
                                    <FiHeart className="text-[#C5A059] mb-10 w-8 h-8 opacity-20" />
                                    <p className="text-xl text-white/80 font-light leading-relaxed italic mb-12 tracking-tight">
                                        "{item.text}"
                                    </p>
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-2xl overflow-hidden grayscale">
                                            <Image src={item.image} alt={item.name} width={48} height={48} className="object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-widest text-white">{item.name}</h4>
                                            <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.2em]">{item.service}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Signature Memberships: Privilege Tiers */}
            <section className="py-40 bg-white relative overflow-hidden rounded-[5rem] mx-6 my-20">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-end gap-16 mb-32">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-[#C5A059] block mb-8">Accès</span>
                            <h2 className="text-[8vw] sm:text-[6vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-none text-[#0A0A0B]">Alliances SIGNATURE</h2>
                        </div>
                        <p className="text-sm text-[#0A0A0B]/30 font-light leading-relaxed max-w-[280px]">
                            Protocoles d'adhésion sur mesure pour ceux qui exigent une souveraineté pigmentaire ultime et une permanence structurelle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: "Le Ritualiste", price: "250 €/mois", features: ["Cartographie Silhouette Mensuelle", "Accès Studio Prioritaire", "Finition Gloss Moléculaire"] },
                            { name: "L'Architecte", price: "650 €/mois", features: ["Architecture Pigmentaire (4 Sessions)", "Accès Coffre à Domicile", "Le Protocole Zénith"] },
                            { name: "Le Souverain", price: "1200 €/mois", features: ["Accès Faculté Illimité", "Conciergerie Studio Globale", "Priorité Labos Artisanaux"] }
                        ].map((tier, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ ...luxuryEaseTransition, delay: index * 0.1 }}
                                className={`relative p-12 rounded-[4rem] border ${index === 2 ? 'border-[#C5A059]/30 bg-[#C5A059]/[0.02]' : 'border-black/5 bg-slate-50/50'} hover:bg-white hover:shadow-2xl hover:shadow-[#C5A059]/5 transition-all duration-700 overflow-hidden group`}
                            >
                                <div className="mb-12">
                                    <h3 className="text-3xl font-black uppercase tracking-tighter text-[#0A0A0B] mb-4">{tier.name}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-[10px] font-bold text-[#0A0A0B]/30 uppercase tracking-widest">Investissement</span>
                                        <span className="text-4xl font-black text-[#0A0A0B]">{tier.price}</span>
                                    </div>
                                </div>
                                <div className="space-y-6 mb-16">
                                    {tier.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#0A0A0B]/60">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                                <Magnetic>
                                    <button className={`w-full py-6 rounded-2xl text-[10px] uppercase font-black tracking-[0.4em] transition-all ${index === 2 ? 'bg-[#0A0A0B] text-white hover:bg-[#C5A059]' : 'bg-transparent border border-black/10 text-[#0A0A0B] hover:bg-[#0A0A0B] hover:text-white'}`}>
                                        Initialiser Palier
                                    </button>
                                </Magnetic>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking: Final Initialization */}
            <section id="booking" className="py-40 bg-[#0A0A0B] relative overflow-hidden">
                <div className="container mx-auto px-8 relative z-10">
                    <div className="max-w-4xl mx-auto bg-[#141416] p-16 md:p-32 rounded-[5rem] border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div className="text-center mb-20">
                            <span className="text-[10px] uppercase tracking-[0.8em] font-black text-[#C5A059] mb-8 block">Admission Finale</span>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-10 leading-none">RÉSERVEZ<br /><span className="luxury-text-stroke">VOTRE INITIALISATION</span></h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="text-[8px] uppercase font-black tracking-[0.4em] text-white/30 ml-4">Nom du Sujet</label>
                                    <input type="text" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-6 text-white focus:outline-none focus:border-[#C5A059]/50 transition-all font-light" placeholder="Identité Complète" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[8px] uppercase font-black tracking-[0.4em] text-white/30 ml-4">Terminal Email</label>
                                    <input type="email" className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-6 text-white focus:outline-none focus:border-[#C5A059]/50 transition-all font-light" placeholder="contact@domaine.com" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[8px] uppercase font-black tracking-[0.4em] text-white/30 ml-4">Protocole Désiré</label>
                                <select className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-8 py-6 text-white/40 focus:outline-none focus:border-[#C5A059]/50 transition-all font-light appearance-none">
                                    <option>Architecture Pigmentaire</option>
                                    <option>Silhouette Structurelle</option>
                                    <option>Alchimie de Texture</option>
                                </select>
                            </div>
                            <Magnetic>
                                <button className="w-full py-8 bg-[#C5A059] text-[#0A0A0B] text-xs uppercase font-black tracking-[0.5em] rounded-2xl hover:bg-white transition-all shadow-2xl shadow-[#C5A059]/20 group">
                                    Initialiser Admission <FiArrowRight className="inline-block ml-4 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </Magnetic>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer: The Last Look */}
            <footer className="py-20 bg-[#050505] border-t border-white/5">
                <div className="container mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-24">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-10 h-10 bg-[#C5A059] rounded-xl flex items-center justify-center text-[#0A0A0B]">
                                    <FiScissors className="w-5 h-5" />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-white">MILL BERRY</h3>
                            </div>
                            <p aria-hidden="true" className="text-white/20 text-sm font-light leading-relaxed max-w-sm mb-12">
                                Une faculté souterraine dédiée à l'architecture avancée du cheveu. Redéfinition des silhouettes par la précision moléculaire.
                            </p>
                            <div className="flex gap-8">
                                <motion.a href="javascript:void(0)" whileHover={{ y: -5 }} className="text-white/20 hover:text-[#C5A059] transition-colors"><FiInstagram className="w-6 h-6" /></motion.a>
                                <motion.a href="javascript:void(0)" whileHover={{ y: -5 }} className="text-white/20 hover:text-[#C5A059] transition-colors"><FiFacebook className="w-6 h-6" /></motion.a>
                                <motion.a href="javascript:void(0)" whileHover={{ y: -5 }} className="text-white/20 hover:text-[#C5A059] transition-colors"><FiTwitter className="w-6 h-6" /></motion.a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[10px] uppercase font-black tracking-[0.5em] text-[#C5A059] mb-10">Protocoles</h4>
                            <ul className="space-y-4 text-white/30 text-[10px] uppercase font-bold tracking-[0.2em]">
                                <li className="hover:text-white transition-colors cursor-pointer">Architecture</li>
                                <li className="hover:text-white transition-colors cursor-pointer">Art</li>
                                <li className="hover:text-white transition-colors cursor-pointer">Chimie</li>
                                <li className="hover:text-white transition-colors cursor-pointer">Archives</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[10px] uppercase font-black tracking-[0.5em] text-[#C5A059] mb-10">Station</h4>
                            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest leading-loose">
                                123 Main Street<br />
                                Mill Berry Studio<br />
                                @MB_SIGNATURE
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 gap-8">
                        <p aria-hidden="true" className="text-[8px] uppercase font-black tracking-[0.5em] text-white/10 italic">© 2024 MILL BERRY FACULTÉ. TOUS DROITS RÉSERVÉS.</p>
                        <div aria-hidden="true" className="flex gap-12 text-[8px] uppercase font-black tracking-[0.3em] text-white/10">
                            <span className="hover:text-[#C5A059] transition-colors cursor-pointer">Protocole Confidentialité</span>
                            <span className="hover:text-[#C5A059] transition-colors cursor-pointer">Conditions Service</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-3xl z-[60] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-full md:w-96 bg-[#0A0A0B] z-[70] lg:hidden border-l border-white/5 p-12"
                        >
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="absolute top-12 right-12 text-white/40 hover:text-white transition-colors"
                            >
                                <FiX className="w-8 h-8" />
                            </button>

                            <div className="mt-24 space-y-12">
                                {[
                                    { href: "#home", label: "Studio" },
                                    { href: "#services", label: "Architecture" },
                                    { href: "#transformations", label: "Archives" },
                                    { href: "#team", label: "Faculté" },
                                    { href: "#booking", label: "Admission" },
                                ].map((item, index) => (
                                    <motion.a
                                        key={item.href}
                                        href={item.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block text-4xl font-black uppercase tracking-tighter text-white hover:text-[#C5A059] transition-colors"
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
