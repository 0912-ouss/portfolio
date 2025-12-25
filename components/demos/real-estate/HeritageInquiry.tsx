'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle2, Plane, Key, History, Users } from 'lucide-react';
import { MagnetButton } from './MagnetButton';

export function HeritageInquiry({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const nextStep = () => setStep(prev => prev + 1);

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsComplete(true);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
                onClick={onClose}
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-sm overflow-hidden p-12 md:p-20 shadow-2xl"
            >
                <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors">
                    <X size={24} />
                </button>

                <AnimatePresence mode="wait">
                    {!isComplete ? (
                        <motion.div
                            key="form-content"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            {/* Progress Indicator */}
                            <div className="flex gap-2 mb-12">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`h-[2px] flex-1 transition-all duration-700 ${i <= step ? 'bg-[#C19A6B]' : 'bg-gray-100'}`} />
                                ))}
                            </div>

                            {step === 1 && (
                                <div className="space-y-10">
                                    <div>
                                        <span className="text-[#C19A6B] text-[10px] uppercase tracking-[0.6em] font-bold mb-4 block underline underline-offset-8">Step 01</span>
                                        <h2 className="text-4xl md:text-5xl font-serif text-[#2C2C2C] mb-6">Select Your <br /><span className="italic">Area of Interest</span></h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { icon: <History />, label: "Heritage Restoration" },
                                            { icon: <Key />, label: "New Acquisition" },
                                            { icon: <Plane />, label: "Private Viewing Tour" },
                                            { icon: <Users />, label: "Investment Advisory" }
                                        ].map(item => (
                                            <button
                                                key={item.label}
                                                onClick={nextStep}
                                                className="flex items-center gap-6 p-6 border border-gray-100 hover:border-[#C19A6B] hover:bg-white transition-all duration-500 group text-left"
                                            >
                                                <div className="text-gray-300 group-hover:text-[#C19A6B] transition-colors">{item.icon}</div>
                                                <span className="text-[10px] uppercase tracking-widest font-bold text-[#2C2C2C]">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-10">
                                    <div>
                                        <span className="text-[#C19A6B] text-[10px] uppercase tracking-[0.6em] font-bold mb-4 block underline underline-offset-8">Step 02</span>
                                        <h2 className="text-4xl md:text-5xl font-serif text-[#2C2C2C] mb-6">Tell Us <br /><span className="italic">About the Legacy</span></h2>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="relative">
                                            <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-gray-200 py-4 text-lg focus:border-[#C19A6B] transition-colors outline-none font-light placeholder:text-gray-300" />
                                        </div>
                                        <div className="relative">
                                            <input type="email" placeholder="Private Email" className="w-full bg-transparent border-b border-gray-200 py-4 text-lg focus:border-[#C19A6B] transition-colors outline-none font-light placeholder:text-gray-300" />
                                        </div>
                                        <div className="py-8">
                                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-4">Investment Scale</p>
                                            <div className="flex gap-4">
                                                {["€1M - €3M", "€3M - €7M", "€7M+"].map(range => (
                                                    <button key={range} className="px-6 py-3 border border-gray-100 text-[10px] uppercase tracking-widest font-bold hover:border-[#C19A6B] transition-all">
                                                        {range}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <MagnetButton onClick={nextStep} className="w-full bg-[#2C2C2C] text-white py-6 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#C19A6B] transition-colors">
                                        Finalize Invitation
                                    </MagnetButton>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-10">
                                    <div>
                                        <span className="text-[#C19A6B] text-[10px] uppercase tracking-[0.6em] font-bold mb-4 block underline underline-offset-8">Step 03</span>
                                        <h2 className="text-4xl md:text-5xl font-serif text-[#2C2C2C] mb-6">Bespoke <br /><span className="italic">Verification</span></h2>
                                        <p className="text-gray-400 text-sm font-light leading-relaxed">By submitting, you are requesting a private callback from our Senior Partner. All information is held in the strictest professional confidence.</p>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="flex items-start gap-4 cursor-pointer group">
                                            <input type="checkbox" className="mt-1 accent-[#C19A6B]" />
                                            <span className="text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-[#2C2C2C]">I authorize private concierge contact</span>
                                        </label>
                                        <label className="flex items-start gap-4 cursor-pointer group">
                                            <input type="checkbox" className="mt-1 accent-[#C19A6B]" />
                                            <span className="text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-[#2C2C2C]">Receive exclusive off-market portfolio updates</span>
                                        </label>
                                    </div>
                                    <MagnetButton
                                        onClick={handleSubmit}
                                        className={`w-full py-6 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-700 ${isSubmitting ? 'bg-gray-100 text-gray-400' : 'bg-[#C19A6B] text-white hover:bg-[#2C2C2C]'}`}
                                    >
                                        {isSubmitting ? 'Securing Connection...' : 'Secure Private Callback'}
                                    </MagnetButton>
                                    <button onClick={() => setStep(1)} className="w-full text-[9px] uppercase tracking-widest text-gray-400 hover:text-[#C19A6B] transition-colors">
                                        ← Back to start
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20"
                        >
                            <div className="flex justify-center mb-10">
                                <motion.div
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    className="w-24 h-24 rounded-full border border-[#C19A6B] flex items-center justify-center text-[#C19A6B]"
                                >
                                    <CheckCircle2 size={48} />
                                </motion.div>
                            </div>
                            <h2 className="text-4xl font-serif mb-6 text-[#2C2C2C]">Invitation <br /><span className="italic">Confirmed</span></h2>
                            <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold leading-loose max-w-sm mx-auto">Our specialized Heritage Advisor will contact you within 24 business hours as per your preference.</p>
                            <MagnetButton onClick={onClose} className="mt-12 px-12 py-5 bg-[#C19A6B] text-white text-[10px] uppercase tracking-widest font-bold">
                                Return to Portfolio
                            </MagnetButton>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
