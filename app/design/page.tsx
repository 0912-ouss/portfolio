"use client";

import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { DesignHero } from "@/components/design/DesignHero";
import { WebsiteShowcase } from "@/components/design/WebsiteShowcase";
import { DarkProjectSlider } from "@/components/design/DarkProjectSlider";
import { FeatureSection } from "@/components/design/FeatureSection";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export default function DesignPage() {
    return (
        <SmoothScroll>
            <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
                <CustomCursor />
                <Navbar />

                <DesignHero />
                <WebsiteShowcase />
                <DarkProjectSlider />
                <FeatureSection />

                {/* Scrolling Marquee */}
                <div className="py-20 border-t border-gray-100 overflow-hidden bg-white">
                    <div className="flex items-center gap-16 whitespace-nowrap mask-image-gradient-r">
                        <div className="flex gap-16 animate-marquee-infinite">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex gap-16 items-center">
                                    <span className="text-4xl md:text-6xl font-black text-transparent stroke-text hover:text-black transition-colors duration-500 cursor-default select-none">Maroc Telecom</span>
                                    <span className="text-4xl md:text-6xl font-black text-transparent stroke-text hover:text-black transition-colors duration-500 cursor-default select-none">Royal Air Maroc</span>
                                    <span className="text-4xl md:text-6xl font-black text-transparent stroke-text hover:text-black transition-colors duration-500 cursor-default select-none">CIH Bank</span>
                                    <span className="text-4xl md:text-6xl font-black text-transparent stroke-text hover:text-black transition-colors duration-500 cursor-default select-none">OCP Group</span>
                                    <span className="text-4xl md:text-6xl font-black text-transparent stroke-text hover:text-black transition-colors duration-500 cursor-default select-none">Inwi</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Basic footer placeholder */}
                <footer className="bg-white py-20 px-6 md:px-12 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-end">
                        <h1 className="text-[10vw] font-black tracking-tighter leading-none">
                            Let's Talk.
                        </h1>
                        <div className="flex gap-4 mb-4">
                            <a href="mailto:hello@bazil.fr" className="text-xl font-bold underline decoration-2 underline-offset-4">hello@bazil.fr</a>
                        </div>
                    </div>
                </footer>
            </main>
        </SmoothScroll>
    );
}
