'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BedDouble, Bath, Square, MapPin, Heart, Layout, Info } from 'lucide-react';
import Image from 'next/image';
import { HeritageInquiry } from './HeritageInquiry';

interface Property {
    id: number;
    title: string;
    price: string;
    image: string;
    specs: { beds: number; baths: number; size: string };
    category: string;
    description: string;
    locationId: string;
}

export function PropertyDetailModal({
    property,
    onClose,
    isFavorite,
    onToggleFavorite
}: {
    property: Property | null;
    onClose: () => void;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
}) {
    const [isCinematic, setIsCinematic] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<'overview' | 'floorplan'>('overview');
    const [showInquiry, setShowInquiry] = React.useState(false);

    if (!property) return null;
    if (showInquiry) return <HeritageInquiry onClose={() => setShowInquiry(false)} />;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center px-6 py-12 md:p-12"
            >
                <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose} />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 50 }}
                    className="relative w-full max-w-7xl bg-[#FDFBF7] overflow-hidden rounded-sm flex flex-col md:flex-row h-full max-h-[90vh] shadow-2xl"
                >
                    {/* Header bar for navigation */}
                    <div className="absolute top-8 left-8 right-8 z-[210] flex justify-between items-center pointer-events-none">
                        <div className="flex gap-2 pointer-events-auto">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`px-5 py-2.5 text-[9px] uppercase tracking-widest font-bold rounded-full transition-all backdrop-blur-md border ${activeTab === 'overview' ? 'bg-[#C19A6B] text-white border-transparent' : 'bg-black/20 text-white border-white/10 hover:bg-black/40'}`}
                            >
                                Aperçu
                            </button>
                            <button
                                onClick={() => setActiveTab('floorplan')}
                                className={`px-5 py-2.5 text-[9px] uppercase tracking-widest font-bold rounded-full transition-all backdrop-blur-md border ${activeTab === 'floorplan' ? 'bg-[#C19A6B] text-white border-transparent' : 'bg-black/20 text-white border-white/10 hover:bg-black/40'}`}
                            >
                                Plan
                            </button>
                        </div>
                        <div className="flex gap-4 pointer-events-auto">
                            <button
                                onClick={() => onToggleFavorite(property.id)}
                                className={`p-3 rounded-full transition-all duration-300 backdrop-blur-md ${isFavorite ? 'bg-red-500 text-white' : 'bg-black/20 hover:bg-black/40 text-white'}`}
                            >
                                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-3 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Left Side: Visual Content */}
                    <div className="relative w-full md:w-3/5 h-[40vh] md:h-full overflow-hidden bg-black">
                        <AnimatePresence mode="wait">
                            {activeTab === 'overview' ? (
                                <motion.div
                                    key="image-content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="relative w-full h-full"
                                >
                                    <motion.div
                                        animate={isCinematic ? {
                                            scale: [1, 1.2, 1],
                                            x: [0, -50, 0],
                                            y: [0, -30, 0]
                                        } : {}}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="relative w-full h-full"
                                    >
                                        <Image
                                            src={property.image}
                                            alt={property.title}
                                            fill
                                            className="object-cover opacity-90 transition-opacity duration-1000"
                                        />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                    <button
                                        onClick={() => setIsCinematic(!isCinematic)}
                                        className="absolute bottom-10 left-10 z-50 flex items-center gap-4 px-8 py-4 bg-white/10 hover:bg-[#C19A6B] backdrop-blur-md text-white border border-white/10 rounded-full transition-all duration-500 group"
                                    >
                                        <div className={`w-2 h-2 rounded-full ${isCinematic ? 'bg-white' : 'bg-[#C19A6B]'} animate-pulse`} />
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                                            {isCinematic ? "Quitter la Visite" : "Visite Cinématographique"}
                                        </span>
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="floorplan-content"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="relative w-full h-full flex items-center justify-center p-20 bg-[#1A1A1A]"
                                >
                                    <svg viewBox="0 0 400 300" className="w-full h-full text-white/10 fill-none stroke-current stroke-[0.5]">
                                        {/* Minimalist Floor Plan SVG */}
                                        <path d="M50 50 L350 50 L350 250 L50 250 Z" />
                                        <path d="M50 150 L350 150 M200 50 L200 250" />
                                        <motion.rect
                                            x="60" y="60" width="130" height="80"
                                            className="fill-white/5 hover:fill-[#C19A6B]/20 transition-colors cursor-help"
                                            whileHover={{ scale: 1.02 }}
                                        />
                                        <text x="70" y="80" className="fill-white/40 text-[8px] font-bold uppercase tracking-widest">Suite Principale</text>

                                        <motion.rect
                                            x="210" y="60" width="130" height="180"
                                            className="fill-white/5 hover:fill-[#C19A6B]/20 transition-colors cursor-help"
                                        />
                                        <text x="220" y="80" className="fill-white/40 text-[8px] font-bold uppercase tracking-widest">Grand Salon</text>

                                        <motion.rect
                                            x="60" y="160" width="130" height="80"
                                            className="fill-white/5 hover:fill-[#C19A6B]/20 transition-colors cursor-help"
                                        />
                                        <text x="70" y="180" className="fill-white/40 text-[8px] font-bold uppercase tracking-widest">Spa Traditionnel</text>
                                    </svg>
                                    <div className="absolute bottom-10 left-10 text-white/30 text-[9px] uppercase tracking-widest font-light">
                                        Disposition Architecturale / V.1.0
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Side: Information */}
                    <div className="w-full md:w-2/5 p-10 md:p-14 overflow-y-auto bg-[#FDFBF7]">
                        <div className="mb-12">
                            <span className="text-[#C19A6B] text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">
                                Portefeuille Héritage
                            </span>
                            <h2 className="text-4xl lg:text-5xl font-serif text-[#2C2C2C] mb-6 leading-tight">
                                {property.title}
                            </h2>
                            <div className="flex items-center justify-between">
                                <p className="text-2xl font-light text-[#C19A6B] font-serif">{property.price}</p>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <MapPin size={14} className="text-[#C19A6B]" />
                                    <span className="text-[10px] uppercase tracking-widest font-bold">{property.locationId}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mb-12 py-10 border-y border-gray-100">
                            <div className="text-center group">
                                <BedDouble size={24} className="mx-auto text-gray-300 mb-3 group-hover:text-[#C19A6B] transition-colors" />
                                <span className="text-[12px] font-bold text-[#2C2C2C] block mb-1">{property.specs.beds}</span>
                                <span className="text-[8px] uppercase tracking-widest text-gray-400">Lits</span>
                            </div>
                            <div className="text-center group border-x border-gray-100">
                                <Bath size={24} className="mx-auto text-gray-300 mb-3 group-hover:text-[#C19A6B] transition-colors" />
                                <span className="text-[12px] font-bold text-[#2C2C2C] block mb-1">{property.specs.baths}</span>
                                <span className="text-[8px] uppercase tracking-widest text-gray-400">SDB</span>
                            </div>
                            <div className="text-center group">
                                <Square size={24} className="mx-auto text-gray-300 mb-3 group-hover:text-[#C19A6B] transition-colors" />
                                <span className="text-[12px] font-bold text-[#2C2C2C] block mb-1">{property.specs.size}</span>
                                <span className="text-[8px] uppercase tracking-widest text-gray-400">Surface</span>
                            </div>
                        </div>

                        <div className="mb-12">
                            <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#2C2C2C] mb-6 border-b border-gray-100 pb-2">Récit</h4>
                            <p className="text-gray-500 font-light text-sm leading-relaxed italic">
                                "{property.description}"
                            </p>
                        </div>

                        <div className="mb-14">
                            <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#2C2C2C] mb-6 border-b border-gray-100 pb-2">Équipements</h4>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                {["Terrasse Privée", "Zellige Historique", "Portes en Cèdre Sculpté", "Climatisation Intelligente", "Concierge Privé", "Vue sur l'Atlas"].map(item => (
                                    <div key={item} className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                                        <div className="w-1 h-1 rounded-full bg-[#C19A6B]" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => setShowInquiry(true)}
                            className="w-full py-6 bg-[#2C2C2C] text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#C19A6B] transition-all duration-700 rounded-sm shadow-2xl shadow-black/10 flex items-center justify-center gap-4 group"
                        >
                            Demander une Invitation Sur Mesure
                            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

import { ArrowUpRight } from 'lucide-react';
