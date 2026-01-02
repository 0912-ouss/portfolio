'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Key, Shield, PenTool, Globe } from 'lucide-react';

const services = [
    {
        title: "Restauration du Patrimoine",
        description: "Conseil spécialisé pour la restauration de Riads historiques tout en intégrant des équipements de luxe modernes.",
        icon: <PenTool className="w-8 h-8" />
    },
    {
        title: "Gestion Immobilière de Luxe",
        description: "Gestion complète pour villas haut de gamme, assurant le maintien de votre investissement aux normes les plus élevées.",
        icon: <Shield className="w-8 h-8" />
    },
    {
        title: "Conseil en Investissement Global",
        description: "Conseils d'experts pour les investisseurs internationaux naviguant dans le paysage immobilier marocain.",
        icon: <Globe className="w-8 h-8" />
    },
    {
        title: "Conciergerie Privée",
        description: "Accès exclusif aux propriétés hors marché et visites personnalisées à travers le royaume.",
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
