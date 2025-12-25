'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronRight, FiCreditCard, FiTruck, FiShield, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { ecommerceProducts } from '@/data/ecommerce/products';
import Link from 'next/link';

export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const cartItems = [ecommerceProducts[0], ecommerceProducts[3]]; // Representative items
    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 3) setStep(step + 1);
        else setFormSubmitted(true);
    };

    if (formSubmitted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center pt-[100px]">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center p-12 max-w-lg"
                >
                    <div className="w-24 h-24 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto mb-10 border border-[#D4A574]">
                        <FiCheckCircle className="w-12 h-12 text-[#D4A574]" />
                    </div>
                    <h1 className="text-5xl font-light tracking-tight mb-8">Order <span className="font-serif italic text-[#D4A574]">Confirmed</span></h1>
                    <p className="text-[#666] font-light mb-12 leading-relaxed text-lg">
                        Thank you for your acquisition. A digital receipt has been dispatched to your inbox. Your curated items are being prepared at our Paris atelier.
                    </p>
                    <button
                        onClick={() => window.location.href = '/demos/ecommerce'}
                        className="px-12 py-5 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.4em] font-black hover:bg-[#D4A574] transition-all rounded-full"
                    >
                        Return to Boutique
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-[#FAF8F5] min-h-screen pb-32">
            <div className="container mx-auto px-6 lg:px-12 pt-12">
                {/* Checkout Navigation */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-20 border-b border-[#E5E5E5] pb-12">
                    <div>
                        <Link href="/demos/ecommerce/shop" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#999] hover:text-[#1A1A1A] mb-4 transition-colors font-bold">
                            <FiArrowLeft /> Return to Bag
                        </Link>
                        <h1 className="text-5xl font-light tracking-tight uppercase">Checkout<br /><span className="text-xl font-serif italic text-[#D4A574] lowercase tracking-normal">secure procurement</span></h1>
                    </div>

                    {/* Progress with Serif accents */}
                    <div className="flex items-center gap-8">
                        {[
                            { n: 1, label: 'Shipping' },
                            { n: 2, label: 'Payment' },
                            { n: 3, label: 'Review' }
                        ].map((s, i) => (
                            <React.Fragment key={s.n}>
                                <div className="flex flex-col items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all border ${step >= s.n ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#999] border-[#E5E5E5]'
                                        }`}>
                                        {s.n}
                                    </div>
                                    <span className={`text-[9px] uppercase tracking-[0.2em] font-black ${step >= s.n ? 'text-[#1A1A1A]' : 'text-[#999]'
                                        }`}>
                                        {s.label}
                                    </span>
                                </div>
                                {i < 2 && <div className={`w-12 h-[1px] ${step > s.n ? 'bg-[#1A1A1A]' : 'bg-[#E5E5E5]'}`} />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Left - Boutique Forms */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleNext} className="bg-white p-10 lg:p-16 border border-[#E5E5E5] shadow-sm">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-12"
                                    >
                                        <div className="border-b border-[#F5F5F5] pb-8">
                                            <h3 className="text-2xl font-light uppercase tracking-tight mb-2">Delivery Details</h3>
                                            <p className="text-xs text-[#999] uppercase tracking-[0.2em]">Enter your shipping destination</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#666]">Given Name</label>
                                                <input type="text" required placeholder="e.g. Alexander" className="w-full bg-[#FAF8F5] px-6 py-4 border-b border-transparent focus:border-[#D4A574] outline-none transition-all font-light" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#666]">Surname</label>
                                                <input type="text" required placeholder="e.g. McQueen" className="w-full bg-[#FAF8F5] px-6 py-4 border-b border-transparent focus:border-[#D4A574] outline-none transition-all font-light" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#666]">Street Address</label>
                                            <input type="text" required className="w-full bg-[#FAF8F5] px-6 py-4 border-b border-transparent focus:border-[#D4A574] outline-none transition-all font-light" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#666]">Metropolis</label>
                                                <input type="text" required className="w-full bg-[#FAF8F5] px-6 py-4 border-b border-transparent focus:border-[#D4A574] outline-none transition-all font-light" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#666]">Postal Code</label>
                                                <input type="text" required className="w-full bg-[#FAF8F5] px-6 py-4 border-b border-transparent focus:border-[#D4A574] outline-none transition-all font-light" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-12"
                                    >
                                        <div className="border-b border-[#F5F5F5] pb-8">
                                            <h3 className="text-2xl font-light uppercase tracking-tight mb-2">Monetary Selection</h3>
                                            <p className="text-xs text-[#999] uppercase tracking-[0.2em]">Select your preferred payment method</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="p-8 border-2 border-[#1A1A1A] flex items-center justify-between bg-[#FAF8F5]">
                                                <div className="flex items-center gap-6">
                                                    <FiCreditCard className="w-6 h-6 text-[#D4A574]" />
                                                    <div>
                                                        <span className="text-[10px] uppercase tracking-[0.2em] font-black block">Encrypted Credit Card</span>
                                                        <span className="text-xs text-[#999]">Direct Bank Authentication</span>
                                                    </div>
                                                </div>
                                                <div className="w-5 h-5 rounded-full border-4 border-[#1A1A1A]" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#666]">Identification Number</label>
                                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#FAF8F5] px-6 py-5 border-b border-transparent focus:border-[#D4A574] outline-none transition-all font-light text-lg tracking-[0.2em]" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#666]">Validity Date</label>
                                                <input type="text" placeholder="MM / YY" className="w-full bg-[#FAF8F5] px-6 py-4 border-b border-transparent focus:border-[#D4A574] outline-none transition-all font-light" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-[#666]">Security Code</label>
                                                <input type="password" placeholder="***" className="w-full bg-[#FAF8F5] px-6 py-4 border-b border-transparent focus:border-[#D4A574] outline-none transition-all font-light" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-12"
                                    >
                                        <div className="border-b border-[#F5F5F5] pb-8">
                                            <h3 className="text-2xl font-light uppercase tracking-tight mb-2">Final Review</h3>
                                            <p className="text-xs text-[#999] uppercase tracking-[0.2em]">Validate your boutique acquisition</p>
                                        </div>

                                        <div className="bg-[#FAF8F5] p-12 space-y-8 border border-[#E5E5E5]">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-[10px] uppercase tracking-widest text-[#D4A574] font-black block mb-2">Destination</span>
                                                    <div className="text-sm font-light">Alexander McQueen<br />Savile Row, London, UK</div>
                                                </div>
                                                <button onClick={() => setStep(1)} className="text-[9px] uppercase tracking-widest font-bold border-b border-[#1A1A1A]">Edit</button>
                                            </div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-[10px] uppercase tracking-widest text-[#D4A574] font-black block mb-2">Atmosphere</span>
                                                    <div className="text-sm font-light">Visa ending in 9876</div>
                                                </div>
                                                <button onClick={() => setStep(2)} className="text-[9px] uppercase tracking-widest font-bold border-b border-[#1A1A1A]">Edit</button>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-[#999] leading-relaxed uppercase tracking-widest text-center">By confirming, you agree to our heritage terms and artisanal procurement policy.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex justify-between items-center mt-20 pt-10 border-t border-[#F5F5F5]">
                                {step > 1 ? (
                                    <button
                                        type="button"
                                        onClick={() => setStep(step - 1)}
                                        className="text-[10px] uppercase tracking-[0.3em] font-black text-[#999] hover:text-[#1A1A1A] transition-colors"
                                    >
                                        Go Back
                                    </button>
                                ) : <div />}

                                <button
                                    type="submit"
                                    className="px-16 py-6 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.4em] font-black flex items-center gap-6 hover:bg-[#D4A574] transition-all rounded-full"
                                >
                                    {step === 3 ? 'Place Acquisition' : 'Continue Journey'} <FiChevronRight />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right - Curated Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-[#1A1A1A] text-white p-12 lg:p-16 lg:sticky lg:top-[120px] shadow-2xl overflow-hidden relative">
                            {/* Decorative serif text background */}
                            <span className="absolute top-0 right-0 text-[120px] font-serif italic text-white/[0.03] pointer-events-none -translate-y-1/2 translate-x-1/4">Legacy</span>

                            <h3 className="text-2xl font-light uppercase tracking-tight mb-12 border-b border-white/10 pb-8">Your <span className="font-serif italic text-[#D4A574]">Selection</span></h3>

                            <div className="space-y-10 mb-16">
                                {cartItems.map((item, i) => (
                                    <div key={i} className="flex gap-6 items-center">
                                        <div className="w-20 h-24 relative bg-white/5 flex-shrink-0 group overflow-hidden">
                                            <Image src={item.image} alt={item.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-[9px] uppercase tracking-widest text-[#D4A574] font-black block mb-1">{item.category}</span>
                                            <h4 className="text-sm font-light uppercase tracking-widest">{item.name}</h4>
                                            <p className="text-xs text-white/40 mt-2">Qty: 01</p>
                                        </div>
                                        <span className="text-sm font-light">${item.price}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6 pt-12 border-t border-white/10">
                                <div className="flex justify-between text-xs uppercase tracking-widest text-white/60">
                                    <span>Subtotal</span>
                                    <span>${subtotal}</span>
                                </div>
                                <div className="flex justify-between text-xs uppercase tracking-widest text-[#D4A574]">
                                    <span>Shipping</span>
                                    <span className="font-black">Complimentary</span>
                                </div>
                                <div className="flex justify-between font-light text-4xl pt-10 border-t border-white/10">
                                    <span className="uppercase text-xs tracking-[0.4em]">Total</span>
                                    <span className="font-serif italic">${total}</span>
                                </div>
                            </div>

                            <div className="mt-16 grid grid-cols-2 gap-8">
                                <div className="flex flex-col gap-3">
                                    <FiTruck className="w-6 h-6 text-[#D4A574]" />
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-black leading-relaxed">Artisanal Express Delivery</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <FiShield className="w-6 h-6 text-[#D4A574]" />
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-black leading-relaxed">Cryptographic Security</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
