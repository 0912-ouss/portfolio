'use client';

import React from 'react';
import '@/app/globals.css';
import { Hero } from '@/components/demos/restaurant/Hero';
import { Philosophy } from '@/components/demos/restaurant/Philosophy';
import { TheArchitects } from '@/components/demos/restaurant/TheArchitects';
import { MenuSection } from '@/components/demos/restaurant/MenuSection';
import { TheCellar } from '@/components/demos/restaurant/TheCellar';
import { CriticalAcclaim } from '@/components/demos/restaurant/CriticalAcclaim';
import { PrivateDining } from '@/components/demos/restaurant/PrivateDining';
import { Reservations } from '@/components/demos/restaurant/Reservations';
import { RestaurantLoading } from '@/components/demos/restaurant/RestaurantLoading';
import { RestaurantCursor } from '@/components/demos/restaurant/RestaurantCursor';

export default function RestaurantDemoPage() {
    return (
        <main className="min-h-screen bg-[#0F0F0F] font-sans text-[#E5E5E5] overflow-x-hidden selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
            <RestaurantLoading />
            <RestaurantCursor />
            <Hero />
            <Philosophy />
            <TheArchitects />
            <MenuSection />
            <TheCellar />
            <CriticalAcclaim />
            <PrivateDining />
            <Reservations />

            {/* Footer minimal */}
            <footer className="py-24 text-center text-[10px] text-white/20 uppercase tracking-widest border-t border-white/5 bg-[#0F0F0F] flex flex-col gap-8">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full mx-auto flex items-center justify-center text-black font-serif font-bold text-xl">L</div>
                <p>© 2024 LUMIÈRE. Gastronomie en Ambre & Onyx.</p>
            </footer>
        </main>
    );
}
