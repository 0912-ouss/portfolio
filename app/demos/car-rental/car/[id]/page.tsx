'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap, FiSettings, FiUsers, FiClock, FiShield, FiArrowLeft, FiChevronRight, FiMapPin } from 'react-icons/fi';
import { carRentalFleet, Car } from '@/data/car-rental/fleet';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CarDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [car, setCar] = useState<Car | null>(null);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const found = carRentalFleet.find(c => c.id === Number(id));
        if (found) {
            setCar(found);
        }
    }, [id]);

    if (!car) return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-10 h-10 border-2 border-[#FF6B35] border-t-transparent rounded-full"
            />
        </div>
    );

    return (
        <div className="bg-[#0A0A0A] min-h-screen text-white pb-24 pt-[120px]">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-white/40 hover:text-[#FF6B35] transition-colors mb-12"
                >
                    <FiArrowLeft /> Back to Fleet
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left - Visuals */}
                    <div className="lg:col-span-7">
                        <div className="relative aspect-[16/10] bg-[#0F0F0F] border border-white/10 overflow-hidden mb-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeImage}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={car.gallery[activeImage]}
                                        alt={car.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Overlay info */}
                            <div className="absolute bottom-8 left-8 flex items-center gap-4">
                                <div className="px-4 py-2 bg-[#FF6B35] text-white text-[10px] uppercase tracking-widest font-black">
                                    {car.category}
                                </div>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4">
                            {car.gallery.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`relative w-32 aspect-video border transition-all ${activeImage === i ? 'border-[#FF6B35]' : 'border-white/10 opacity-40'
                                        }`}
                                >
                                    <Image src={img} alt={`${car.name} ${i}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right - Details */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 uppercase">
                                {car.name}
                            </h1>
                            <p className="text-[#FF6B35] text-xl font-bold italic mb-8">
                                "{car.tagline}"
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="p-6 bg-white/5 border border-white/10">
                                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Daily Rate</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-[#FF6B35]">${car.price}</span>
                                        <span className="text-xs text-white/40">/Day</span>
                                    </div>
                                </div>
                                <div className="p-6 bg-white/5 border border-white/10 flex flex-col justify-center">
                                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">Availability</p>
                                    <span className="text-sm font-black text-green-500 uppercase flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        In Stock
                                    </span>
                                </div>
                            </div>

                            <p className="text-white/60 font-light leading-relaxed mb-12">
                                {car.description}
                            </p>

                            {/* Technical Specs Grid */}
                            <div className="grid grid-cols-3 gap-y-10 mb-12">
                                {[
                                    { label: 'Horsepower', val: car.specs.hp, icon: FiZap },
                                    { label: 'Transmission', val: car.specs.transmission, icon: FiSettings },
                                    { label: 'Seats', val: car.specs.seats, icon: FiUsers },
                                    { label: '0-60 MPH', val: car.specs.accel, icon: FiClock },
                                    { label: 'Top Speed', val: car.specs.speed, icon: FiShield },
                                    { label: 'Engine', val: car.specs.engine, icon: FiZap },
                                ].map((spec, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <spec.icon className="w-5 h-5 text-[#FF6B35]" />
                                        <span className="text-[10px] uppercase tracking-widest text-white/30">{spec.label}</span>
                                        <span className="text-sm font-black">{spec.val}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col gap-4">
                                <button className="w-full py-5 bg-[#FF6B35] text-white text-xs uppercase tracking-[0.3em] font-black flex items-center justify-center gap-4 hover:bg-[#FF8C42] transition-colors group">
                                    Continue to Booking <FiChevronRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                                <button className="w-full py-5 border border-white/20 text-white text-xs uppercase tracking-[0.3em] font-black flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-colors">
                                    View Locations <FiMapPin />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Additional Details */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-20">
                    <div>
                        <h4 className="text-lg font-black mb-6 uppercase tracking-widest">Premium Service</h4>
                        <p className="text-white/40 text-sm leading-relaxed">
                            Every rental includes 24/7 roadside assistance, professional detailing, and a full tank of premium fuel upon delivery.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-black mb-6 uppercase tracking-widest">Insurance Included</h4>
                        <p className="text-white/40 text-sm leading-relaxed">
                            Drive with peace of mind. Our comprehensive premium insurance package covers theft, damage, and third-party liability.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-black mb-6 uppercase tracking-widest">Concierge Support</h4>
                        <p className="text-white/40 text-sm leading-relaxed">
                            Our dedicated styling and technical consultants are available around the clock to assist with your journey.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
