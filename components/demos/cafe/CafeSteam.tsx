'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function CafeSteam() {
    // Generate steam particles with variety
    const steamParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
        startX: (Math.random() - 0.5) * 100,
        drift: (Math.random() - 0.5) * 60,
        size: 20 + Math.random() * 40,
        opacity: 0.1 + Math.random() * 0.2
    }));

    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            {/* Main Steam Particles */}
            {steamParticles.map((particle) => (
                <motion.div
                    key={particle.id}
                    initial={{
                        opacity: 0,
                        y: 0,
                        x: particle.startX,
                        scale: 0.3
                    }}
                    animate={{
                        opacity: [0, particle.opacity, particle.opacity * 0.5, 0],
                        y: [-20, -150 - Math.random() * 100],
                        x: [particle.startX, particle.startX + particle.drift],
                        scale: [0.3, 1, 1.5, 2],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeOut"
                    }}
                    className="absolute bottom-1/3 left-1/2 rounded-full mix-blend-screen"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        background: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)`,
                        filter: 'blur(8px)',
                    }}
                />
            ))}

            {/* Wispy Steam Lines */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`wisp-${i}`}
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{
                        opacity: [0, 0.1, 0],
                        y: [-50, -200],
                        x: Math.sin(i) * 30,
                        rotate: [0, (i % 2 === 0 ? 15 : -15)],
                    }}
                    transition={{
                        duration: 4 + Math.random(),
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeOut"
                    }}
                    className="absolute bottom-1/3 left-1/2 w-1 h-24 origin-bottom"
                    style={{
                        marginLeft: `${(i - 2.5) * 25}px`,
                        background: `linear-gradient(to top, rgba(255,255,255,0.1), transparent)`,
                        filter: 'blur(4px)',
                        borderRadius: '50%',
                    }}
                />
            ))}

            {/* Ambient Glow */}
            <motion.div
                animate={{
                    opacity: [0.05, 0.1, 0.05],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full"
                style={{
                    background: 'radial-gradient(circle, rgba(200,170,110,0.1) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />
        </div>
    );
}

