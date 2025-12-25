'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Key, Shield, PenTool, Globe } from 'lucide-react';

const services = [
    {
        title: "Heritage Restoration",
        description: "Specialized consultancy for restoring historic Riads while integrating modern luxury amenities.",
        icon: <PenTool className="w-8 h-8" />
    },
    {
        title: "Luxury Property Management",
        description: "Full-service management for high-end villas, ensuring your investment is maintained to the highest standards.",
        icon: <Shield className="w-8 h-8" />
    },
    {
        title: "Global Investment Advisory",
        description: "Expert guidance for international investors navigating the Moroccan real estate market landscape.",
        icon: <Globe className="w-8 h-8" />
    },
    {
        title: "Private Concierge",
        description: "Exclusive access to off-market properties and personalized viewings across the kingdom.",
        icon: <Key className="w-8 h-8" />
    }
];

export function RealEstateServices() {
    return (
        <section id="services" className="py-32 bg-white px-6">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="p-10 bg-[#FDFBF7] border border-gray-100 hover:border-[#C19A6B] transition-colors group"
                        >
                            <div className="text-[#C19A6B] mb-8 group-hover:scale-110 transition-transform duration-500">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-serif text-[#2C2C2C] mb-4">{service.title}</h3>
                            <p className="text-gray-500 font-light text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
