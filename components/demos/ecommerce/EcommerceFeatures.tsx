'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiTruck, FiRefreshCw, FiShield, FiHeadphones } from 'react-icons/fi';

const features = [
    {
        icon: FiTruck,
        title: "Free Shipping",
        description: "Complimentary shipping on orders over $200"
    },
    {
        icon: FiRefreshCw,
        title: "Easy Returns",
        description: "30-day hassle-free return policy"
    },
    {
        icon: FiShield,
        title: "Secure Payment",
        description: "100% secure checkout with encryption"
    },
    {
        icon: FiHeadphones,
        title: "24/7 Support",
        description: "Dedicated styling consultants"
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
