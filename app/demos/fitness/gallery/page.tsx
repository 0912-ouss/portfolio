"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FitnessNavbar } from "@/components/demos/fitness/FitnessNavbar";
import { FitnessFooter } from "@/components/demos/fitness/FitnessFooter";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const galleryImages = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
        category: "Training Floor",
        title: "Espace Musculation"
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1200",
        category: "Recovery",
        title: "Zone Récupération"
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200",
        category: "Cardio",
        title: "Espace Cardio"
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200",
        category: "Training Floor",
        title: "Free Weights"
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
        category: "Studios",
        title: "Studio Pilates"
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1200",
        category: "Studios",
        title: "Studio Yoga"
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200",
        category: "Combat",
        title: "Ring de Boxe"
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200",
        category: "Recovery",
        title: "Spa & Wellness"
    }
];

const categories = ["Tous", "Training Floor", "Studios", "Recovery", "Cardio", "Combat"];

export default function GalleryPage() {
    const [selectedCategory, setSelectedCategory] = useState("Tous");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filteredImages = selectedCategory === "Tous"
        ? galleryImages
        : galleryImages.filter(img => img.category === selectedCategory);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const goNext = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
        }
    };

    const goPrev = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white font-sans">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
                .font-serif { font-family: 'Cinzel', serif; }
                .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
            `}</style>

            <FitnessNavbar />

            {/* Hero */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)]" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-black block mb-6">
                            Visite Virtuelle
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                            Notre <span className="text-[#D4AF37]">Sanctuaire</span>
                        </h1>
                        <p className="text-white/60 text-lg max-w-xl mx-auto">
                            Découvrez nos installations de classe mondiale, conçues pour l'excellence.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="pb-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                        ? "bg-[#D4AF37] text-black"
                                        : "bg-white/5 text-white/60 hover:bg-white/10"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="pb-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    >
                        <AnimatePresence>
                            {filteredImages.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className={`relative overflow-hidden rounded-xl cursor-pointer group ${index === 0 ? "md:col-span-2 md:row-span-2" : ""
                                        }`}
                                    onClick={() => openLightbox(index)}
                                >
                                    <div className={`relative ${index === 0 ? "h-[500px]" : "h-60"}`}>
                                        <Image
                                            src={image.src}
                                            alt={image.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                                            <span className="text-[#D4AF37] text-[10px] uppercase tracking-wider font-bold">
                                                {image.category}
                                            </span>
                                            <h3 className="text-white font-bold">{image.title}</h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/60 hover:text-white"
                            onClick={closeLightbox}
                        >
                            <FiX size={32} />
                        </button>

                        <button
                            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                        >
                            <FiChevronLeft size={24} />
                        </button>

                        <motion.div
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative w-full max-w-5xl h-[80vh] mx-16"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={filteredImages[lightboxIndex].src}
                                alt={filteredImages[lightboxIndex].title}
                                fill
                                className="object-contain"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                <span className="text-[#D4AF37] text-xs uppercase tracking-wider font-bold">
                                    {filteredImages[lightboxIndex].category}
                                </span>
                                <h3 className="text-white text-2xl font-bold mt-1">
                                    {filteredImages[lightboxIndex].title}
                                </h3>
                            </div>
                        </motion.div>

                        <button
                            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                        >
                            <FiChevronRight size={24} />
                        </button>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm">
                            {lightboxIndex + 1} / {filteredImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <FitnessFooter />
        </main>
    );
}
