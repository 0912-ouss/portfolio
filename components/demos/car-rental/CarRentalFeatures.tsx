'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiClock, FiMapPin, FiHeadphones, FiDollarSign, FiTruck } from 'react-icons/fi';

const features = [
    {
        icon: FiShield,
        title: "Full Insurance",
        description: "Comprehensive coverage included with every rental. Drive with complete peace of mind."
    },
    {
        icon: FiClock,
        title: "24/7 Availability",
        description: "Pick up and drop off anytime. Our service runs around the clock, every day."
    },
    {
        icon: FiMapPin,
        title: "15+ Locations",
        description: "Convenient pick-up points across the city. Airport, downtown, and suburban locations."
    },
    {
        icon: FiHeadphones,
        title: "24/7 Support",
        description: "Our dedicated team is always ready to assist you with any questions or emergencies."
    },
    {
        icon: FiDollarSign,
        title: "Best Price",
        description: "Competitive rates with no hidden fees. Price match guarantee on all bookings."
    },
    {
        icon: FiTruck,
        title: "Free Delivery",
        description: "We bring the car to you. Free delivery within city limits for rentals over 3 days."
    }
];

export function CarRentalFeatures() {
    return (
        <section className="py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
            {/* Accent Lines */}
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#FF6B35]/20 to-transparent" />
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-[#FF6B35]/20 to-transparent" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-[#FF6B35] text-xs uppercase tracking-[0.3em] block mb-4"
                    >
                        Why Choose Us
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black tracking-tight mb-6"
                    >
                        The AutoRent<br />
                        <span className="text-white/20">Advantage</span>
                    </motion.h2>
                    <p className="max-w-lg mx-auto text-white/50 font-light">
                        Experience premium service with every rental. We go beyond just providing cars.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 bg-white/[0.02] border border-white/5 hover:border-[#FF6B35]/30 transition-all duration-500"
                        >
                            <div className="w-14 h-14 bg-[#FF6B35]/10 flex items-center justify-center mb-6 group-hover:bg-[#FF6B35] transition-colors duration-500">
                                <feature.icon className="w-6 h-6 text-[#FF6B35] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-[#FF6B35] transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
