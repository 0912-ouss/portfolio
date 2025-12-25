'use client';

import React, { useEffect, useState } from 'react';
import { ReactLenis } from "@studio-freight/react-lenis";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft } from 'lucide-react';

// Components
import { RealEstateNav } from "@/components/demos/real-estate/RealEstateNav";
import { RealEstateHero } from "@/components/demos/real-estate/RealEstateHero";
import { RealEstateStats } from "@/components/demos/real-estate/RealEstateStats";
import { RealEstateFeatured } from "@/components/demos/real-estate/RealEstateFeatured";
import { RealEstateCursor } from "@/components/demos/real-estate/RealEstateCursor";
import { PropertyDetailModal } from "@/components/demos/real-estate/PropertyDetailModal";
import { RealEstateMap } from "@/components/demos/real-estate/RealEstateMap";
import { RealEstateConcierge } from "@/components/demos/real-estate/RealEstateConcierge";
import { RealEstateComparison } from "@/components/demos/real-estate/RealEstateComparison";
import { RealEstateJournal } from "@/components/demos/real-estate/RealEstateJournal";
import { RealEstateVault } from "@/components/demos/real-estate/RealEstateVault";
import { RealEstateTimeline } from "@/components/demos/real-estate/RealEstateTimeline";
import { RealEstateRestoration } from "@/components/demos/real-estate/RealEstateRestoration";
import { RealEstateAtmosphere } from "@/components/demos/real-estate/RealEstateAtmosphere";
import { GoldenHourToggle } from "@/components/demos/real-estate/GoldenHourToggle";
import { HeritageInquiry } from "@/components/demos/real-estate/HeritageInquiry";
import { RealEstateFooter } from "@/components/demos/real-estate/RealEstateFooter";
import { properties } from "@/components/demos/real-estate/data";

export default function RealEstateDemo() {
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [selectedProperty, setSelectedProperty] = useState<any>(null);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isComparisonOpen, setIsComparisonOpen] = useState(false);
    const [isGoldenHour, setIsGoldenHour] = useState(false);
    const [showInquiry, setShowInquiry] = useState(false);

    useEffect(() => {
        document.title = "Atlas Estates | Luxury Real Estate Morocco";
    }, []);

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const favoriteProperties = properties.filter(p => favorites.includes(p.id));

    return (
        <ReactLenis root>
            <main className={`min-h-screen bg-[#FDFBF7] transition-colors duration-1000 ${isGoldenHour ? 'golden-hour' : ''}`}>
                <RealEstateAtmosphere isGoldenHour={isGoldenHour} />
                <RealEstateCursor />
                <RealEstateNav />
                <RealEstateHero />
                <RealEstateStats />
                <RealEstateTimeline />
                <RealEstateMap
                    selectedLocation={selectedLocation || ""}
                    onSelectLocation={setSelectedLocation}
                />
                <RealEstateRestoration />

                <RealEstateFeatured
                    selectedLocation={selectedLocation || ""}
                    onPropertyClick={setSelectedProperty}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                />

                <RealEstateJournal />
                <RealEstateVault />

                <RealEstateConcierge onInquiryClick={() => setShowInquiry(true)} />
                <RealEstateFooter />

                {/* Overlays & Modals */}
                <PropertyDetailModal
                    property={selectedProperty}
                    onClose={() => setSelectedProperty(null)}
                    isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
                    onToggleFavorite={toggleFavorite}
                />

                <AnimatePresence>
                    {showInquiry && <HeritageInquiry onClose={() => setShowInquiry(false)} />}
                </AnimatePresence>

                <RealEstateComparison
                    favorites={favoriteProperties}
                    onRemoveFavorite={toggleFavorite}
                    isOpen={isComparisonOpen}
                    onClose={() => setIsComparisonOpen(false)}
                />

                <GoldenHourToggle
                    isGoldenHour={isGoldenHour}
                    onToggle={() => setIsGoldenHour(!isGoldenHour)}
                />

                {/* Comparison Trigger */}
                <AnimatePresence>
                    {favorites.length > 0 && (
                        <motion.button
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            onClick={() => setIsComparisonOpen(true)}
                            className="fixed bottom-12 right-12 z-[100] bg-[#2C2C2C] text-white px-8 py-4 rounded-full flex items-center gap-4 hover:bg-[#C19A6B] transition-all duration-500 shadow-2xl"
                        >
                            <ArrowRightLeft size={18} />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Compare Collection ({favorites.length})</span>
                        </motion.button>
                    )}
                </AnimatePresence>
            </main>
        </ReactLenis>
    );
}
