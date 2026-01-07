'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';

const reviews = [
    {
        id: 1,
        name: "Emma Thompson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        rating: 5,
        date: "15 Déc 2024",
        title: "Qualité absolument stupéfiante",
        text: "La robe midi en soie a dépassé toutes mes attentes. Le tissu est luxueux et la coupe est parfaite. Je prévois déjà mon prochain achat !",
        product: "Robe Midi en Soie",
        verified: true
    },
    {
        id: 2,
        name: "Sophie Laurent",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        rating: 5,
        date: "12 Déc 2024",
        title: "Vaut chaque centime",
        text: "Le manteau en cachemire est un rêve. Incroyablement chaud et pourtant léger. L'attention portée aux détails des coutures est remarquable.",
        product: "Manteau en Cachemire",
        verified: true
    },
    {
        id: 3,
        name: "Isabella Chen",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
        rating: 4,
        date: "8 Déc 2024",
        title: "Élégant et intemporel",
        text: "J'adore le design classique du blazer ajusté. Il s'accorde parfaitement avec tout ce qu'il y a dans ma garde-robe. Livraison rapide aussi !",
        product: "Blazer Ajusté",
        verified: true
    },
    {
        id: 4,
        name: "Olivia Martinez",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
        rating: 5,
        date: "5 Déc 2024",
        title: "Service client exceptionnel",
        text: "Non seulement le sac à main en cuir est magnifique, mais l'emballage donnait l'impression d'une véritable expérience de luxe. Je recommande vivement !",
        product: "Sac à Main en Cuir",
        verified: true
    }
];

export function EcommerceReviews() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleReviews = 2;

    const next = () => {
        setCurrentIndex(prev =>
            prev + visibleReviews >= reviews.length ? 0 : prev + 1
        );
    };

    const prev = () => {
        setCurrentIndex(prev =>
            prev === 0 ? reviews.length - visibleReviews : prev - 1
        );
    };

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[#D4A574] text-xs uppercase tracking-[0.3em] block mb-4"
                        >
                            Avis Clients
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-light tracking-tight"
                        >
                            Ce Qu'ils <span className="font-serif italic">Disent</span>
                        </motion.h2>
                    </div>

                    {/* Rating Summary */}
                    <div className="mt-8 md:mt-0 flex items-center gap-6">
                        <div className="text-right">
                            <div className="flex gap-1 justify-end mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar key={i} className="w-4 h-4 fill-[#D4A574] text-[#D4A574]" />
                                ))}
                            </div>
                            <p className="text-sm text-[#666]">4.9 sur 5 • 2,847 avis</p>
                        </div>
                    </div>
                </div>

                {/* Reviews Carousel */}
                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AnimatePresence mode="popLayout">
                            {reviews.slice(currentIndex, currentIndex + visibleReviews).map((review, index) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-8 bg-[#FAF8F5] border border-[#E5E5E5]"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                                <Image
                                                    src={review.avatar}
                                                    alt={review.name}
                                                    width={48}
                                                    height={48}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-medium">{review.name}</h4>
                                                    {review.verified && (
                                                        <span className="flex items-center gap-1 text-[10px] text-green-600 uppercase">
                                                            <FiCheck className="w-3 h-3" /> Vérifié
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-[#999]">{review.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <FiStar
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating
                                                        ? 'fill-[#D4A574] text-[#D4A574]'
                                                        : 'text-[#E5E5E5]'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h5 className="font-medium mb-2">{review.title}</h5>
                                    <p className="text-[#666] leading-relaxed mb-4">
                                        "{review.text}"
                                    </p>
                                    <span className="text-xs text-[#D4A574] uppercase tracking-wider">
                                        {review.product}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-center gap-4 mt-12">
                        <button
                            onClick={prev}
                            className="w-12 h-12 border border-[#E5E5E5] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-colors"
                        >
                            <FiChevronLeft />
                        </button>
                        <button
                            onClick={next}
                            className="w-12 h-12 border border-[#E5E5E5] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-colors"
                        >
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
