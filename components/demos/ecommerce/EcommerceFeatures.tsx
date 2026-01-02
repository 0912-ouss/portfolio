'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiTruck, FiRefreshCw, FiShield, FiHeadphones } from 'react-icons/fi';

const features = [
    {
        icon: FiTruck,
        title: "Livraison Gratuite",
        description: "Livraison offerte pour les commandes de plus de 200 $"
    },
    {
        icon: FiRefreshCw,
        title: "Retours Faciles",
        description: "Politique de retour sans tracas de 30 jours"
    },
    {
        icon: FiShield,
        title: "Paiement Sécurisé",
        description: "Paiement 100% sécurisé avec cryptage"
    },
    {
        icon: FiHeadphones,
        title: "Assistance 24/7",
        description: "Conseillers en style dédiés"
    }
];

export function EcommerceFeatures() {
    return (
        <section className="py-16 bg-[#1A1A1A] text-white">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <feature.icon className="w-8 h-8 mx-auto mb-4 text-[#D4A574]" />
                            <h4 className="font-medium mb-2">{feature.title}</h4>
                            <p className="text-sm text-white/50">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
