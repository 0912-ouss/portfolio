'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function RestaurantLoading() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => setIsComplete(true),
        });

        // Initial State
        gsap.set('.char', { y: 100, opacity: 0 });
        gsap.set('.line', { scaleX: 0 });
        gsap.set(containerRef.current, { visibility: 'visible' });

        // 1. Reveal "LUMIÈRE" text
        tl.to('.char', {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.05,
            ease: 'power3.out',
        })
            // 2. Expand amber line
            .to('.line', {
                scaleX: 1,
                duration: 0.8,
                ease: 'power2.inOut',
            }, '-=0.5')
            // 3. Pause for impact
            .to({}, { duration: 0.5 })
            // 4. Reveal "Gastronomy" text
            .to('.subtext', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
            }, '-=0.8')
            // 5. Exit: Slide everything up like a curtain
            .to('.loader-content', {
                y: -50,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
                delay: 0.5,
            })
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1,
                ease: 'power4.inOut',
            });

    }, { scope: containerRef });

    if (isComplete) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-[#0F0F0F] text-[#E5E5E5] flex flex-col items-center justify-center invisible">
            <div className="loader-content flex flex-col items-center">
                <div className="overflow-hidden mb-6 flex space-x-2">
                    {['L', 'U', 'M', 'I', 'È', 'R', 'E'].map((letter, i) => (
                        <span key={i} className="char block text-6xl md:text-8xl font-serif font-medium tracking-tight text-[#D4AF37]">
                            {letter}
                        </span>
                    ))}
                </div>

                <div className="w-24 h-[1px] bg-[#D4AF37]/50 line mb-6" />

                <div className="overflow-hidden">
                    <span className="subtext block text-xs font-sans uppercase tracking-[0.4em] text-white/40 translate-y-full opacity-0">
                        Sanctuary of Taste
                    </span>
                </div>
            </div>

            {/* Ambient Noise Texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
}
