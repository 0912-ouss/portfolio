"use client";

import React, { useEffect } from 'react';

// Core Components
import { CafeHero } from "@/components/demos/cafe/CafeHero";
import { CafeAbout } from "@/components/demos/cafe/CafeAbout";
import { BrewingGuide } from "@/components/demos/cafe/BrewingGuide";
import { BeanShowcase } from "@/components/demos/cafe/BeanShowcase";
import { MenuBook } from "@/components/demos/cafe/MenuBook";
import { CafeGallery } from "@/components/demos/cafe/CafeGallery";
import { CafeTestimonials } from "@/components/demos/cafe/CafeTestimonials";
import { CafeReservation } from "@/components/demos/cafe/CafeReservation";
import { CafeNewsletter } from "@/components/demos/cafe/CafeNewsletter";
import { CafeFooter } from "@/components/demos/cafe/CafeFooter";

// NEW Premium Components
import { CafeLoading } from "@/components/demos/cafe/CafeLoading";
import { CafeCursor } from "@/components/demos/cafe/CafeCursor";
import { CafeScrollProgress } from "@/components/demos/cafe/CafeScrollProgress";
import { CafeBackToTop } from "@/components/demos/cafe/CafeBackToTop";
import { CafeBaristas } from "@/components/demos/cafe/CafeBaristas";
import { CafeProcess } from "@/components/demos/cafe/CafeProcess";
import { CafeFAQ } from "@/components/demos/cafe/CafeFAQ";

// Effects
import { CafeGrain } from "@/components/demos/cafe/CafeGrain";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function CafeDemo() {
    useEffect(() => {
        document.title = "KŌHĪ | L'Atelier Café";
    }, []);

    return (
        <ReactLenis root>
            <div className="min-h-screen bg-[#1F1C18] font-sans text-[#E6DCCA]">
                {/* Premium Animations & UI */}
                <CafeLoading />
                <CafeCursor />
                <CafeScrollProgress />
                <CafeBackToTop />
                <CafeGrain />

                {/* KŌHĪ Atelier Sections */}
                <CafeHero />
                <CafeAbout />
                <CafeProcess />
                <BrewingGuide />
                <BeanShowcase />
                <CafeBaristas />
                <MenuBook />
                <CafeGallery />
                <CafeTestimonials />
                <CafeFAQ />
                <CafeReservation />
                <CafeNewsletter />
                <CafeFooter />
            </div>
        </ReactLenis>
    );
}
