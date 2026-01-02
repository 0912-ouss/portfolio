'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ArrowRightLeft, BedDouble, Bath, Square } from 'lucide-react';
import Image from 'next/image';

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

export function RealEstateComparison({
    favorites,
    onRemoveFavorite,
    isOpen,
    onClose
}: {
    favorites: Property[];
    onRemoveFavorite: (id: number) => void;
    isOpen: boolean;
    onClose: () => void;
}) {
    if (favorites.length === 0 || !isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="fixed bottom-0 left-0 right-0 z-[150] bg-white border-t border-gray-200 shadow-2xl p-8"
            >
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                            <ArrowRightLeft className="text-[#C19A6B]" size={20} />
                            <h3 className="text-[12px] uppercase tracking-[0.3em] font-bold text-[#2C2C2C]">Property Comparison</h3>
                            <span className="bg-[#FDFBF7] text-gray-400 px-3 py-1 text-[10px] rounded-full border border-gray-100">{favorites.length} Selected</span>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {favorites.map(prop => (
                            <motion.div
                                key={prop.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative group bg-[#FDFBF7] rounded-sm p-4 border border-transparent hover:border-[#C19A6B] transition-colors"
                            >
                                <button
                                    onClick={() => onRemoveFavorite(prop.id)}
                                    className="absolute top-2 right-2 z-10 p-1.5 bg-white shadow-md rounded-full text-red-500 hover:scale-110 transition-transform"
                                >
                                    <Heart size={14} fill="currentColor" />
                                </button>

                                <div className="relative aspect-[16/10] overflow-hidden mb-4 rounded-sm">
                                    <Image src={prop.image} alt={prop.title} fill className="object-cover" />
                                </div>

                                <h4 className="text-sm font-serif text-[#2C2C2C] mb-1 line-clamp-1">{prop.title}</h4>
                                <p className="text-[#C19A6B] text-[12px] font-medium mb-4">{prop.price}</p>

                                <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-100">
                                    <div className="flex flex-col items-center gap-1 opacity-60">
                                        <BedDouble size={12} />
                                        <span className="text-[9px] uppercase tracking-tighter">{prop.specs.beds}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 opacity-60">
                                        <Bath size={12} />
                                        <span className="text-[9px] uppercase tracking-tighter">{prop.specs.baths}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 opacity-60">
                                        <Square size={12} />
                                        <span className="text-[9px] uppercase tracking-tighter">{prop.specs.size.split(' ')[0]}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {favorites.length < 4 && (
                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-sm p-8 text-center bg-gray-50/30">
                                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-300 mb-4">
                                    <ArrowRightLeft size={18} />
                                </div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Ajouter une Propriété <br /> à Comparer</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
