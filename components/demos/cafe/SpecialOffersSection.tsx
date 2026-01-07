"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiPercent, FiClock, FiArrowRight } from "react-icons/fi";

const offers = [
    {
        id: 1,
        title: "Happy Hour Special",
        discount: "30% OFF",
        description: "Get 30% off on all cold beverages from 3 PM to 6 PM, every weekday!",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop",
        validUntil: "Daily Offer",
        badge: "HOT",
    },
    {
        id: 2,
        title: "Buy 5, Get 1 Free",
        discount: "FREE COFFEE",
        description: "Join our loyalty program and get your 6th coffee absolutely free!",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
        validUntil: "Ongoing",
        badge: "LOYALTY",
    },
    {
        id: 3,
        title: "Weekend Brunch Combo",
        discount: "Rs. 399",
        description: "Coffee + Croissant + Fresh Juice for just Rs. 399 every Saturday & Sunday!",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
        validUntil: "Weekends Only",
        badge: "COMBO",
    },
];

export default function SpecialOffersSection() {
    return (
        <section className="py-24 bg-gradient-to-br from-[#D5CEA3] to-[#C4B896] relative overflow-hidden">
            {/* Decorative Elements */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 right-10 w-48 h-48 bg-[#3C2A21]/10 rounded-full blur-3xl"
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#3C2A21] rounded-full text-white font-semibold text-sm tracking-wider mb-4"
                    >
                        <FiPercent className="animate-pulse" />
                        SPECIAL OFFERS
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1A120B] mb-4">
                        Today&apos;s Best Deals
                    </h2>
                    <p className="text-lg text-[#3C2A21]/80 max-w-2xl mx-auto">
                        Don&apos;t miss out on our amazing promotions and exclusive offers
                    </p>
                </motion.div>

                {/* Offers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {offers.map((offer, index) => (
                        <motion.div
                            key={offer.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-2xl group"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={offer.image}
                                    alt={offer.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                {/* Badge */}
                                <motion.div
                                    initial={{ x: -100 }}
                                    animate={{ x: 0 }}
                                    transition={{ type: "spring", delay: index * 0.1 + 0.3 }}
                                    className="absolute top-4 left-4 px-3 py-1 bg-[#E74C3C] text-white text-xs font-bold rounded-full"
                                >
                                    {offer.badge}
                                </motion.div>

                                {/* Discount Badge */}
                                <div className="absolute bottom-4 left-4">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: index * 0.1 + 0.4 }}
                                        className="px-4 py-2 bg-[#D5CEA3] text-[#1A120B] font-bold text-xl rounded-xl"
                                    >
                                        {offer.discount}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#1A120B] mb-2 group-hover:text-[#3C2A21] transition-colors">
                                    {offer.title}
                                </h3>
                                <p className="text-[#3C2A21]/70 text-sm mb-4 line-clamp-2">
                                    {offer.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[#3C2A21]/60 text-sm">
                                        <FiClock />
                                        <span>{offer.validUntil}</span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-10 h-10 bg-[#3C2A21] text-white rounded-full flex items-center justify-center hover:bg-[#1A120B] transition-colors"
                                    >
                                        <FiArrowRight />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-16"
                >
                    <motion.a
                        href="#menu"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#1A120B] text-white rounded-full font-bold hover:shadow-xl hover:shadow-[#1A120B]/30 transition-all"
                    >
                        View Full Menu
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <FiArrowRight />
                        </motion.span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
