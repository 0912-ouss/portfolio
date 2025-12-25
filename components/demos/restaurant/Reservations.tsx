'use client';

import React from 'react';
import { Magnetic } from './Magnetic';

export function Reservations() {
    return (
        <section className="py-32 bg-[#0F0F0F] text-[#E5E5E5] border-t border-white/5">
            <div className="container mx-auto px-6 max-w-4xl">

                <div className="text-center mb-16">
                    <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#D4AF37] block mb-6">
                        The Table
                    </span>
                    <h2 className="text-5xl font-serif mb-4">Secure Your Experience</h2>
                    <p className="font-sans font-light text-white/40">Limited seatings available nightly.</p>
                </div>

                <div className="bg-[#1A1A1A] p-12 rounded-3xl border border-white/5">
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#D4AF37]">Date</label>
                                <input
                                    type="date"
                                    className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg px-4 py-4 text-sm font-sans focus:border-[#D4AF37] outline-none transition-colors [color-scheme:dark] cursor-pointer"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#D4AF37]">Guests</label>
                                <div className="relative">
                                    <select className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg px-4 py-4 text-sm font-sans focus:border-[#D4AF37] outline-none transition-colors appearance-none cursor-pointer">
                                        <option>2 Guests</option>
                                        <option>3 Guests</option>
                                        <option>4 Guests</option>
                                        <option>5+ Guests</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#D4AF37]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#D4AF37]">Name</label>
                                <input
                                    type="text"
                                    placeholder="ALEXANDER VANCE"
                                    className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg px-4 py-4 text-sm font-sans focus:border-[#D4AF37] outline-none transition-colors placeholder:text-white/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-[#D4AF37]">Contact</label>
                                <input
                                    type="email"
                                    placeholder="AVANCE@EMAIL.COM"
                                    className="w-full bg-[#0F0F0F] border border-white/10 rounded-lg px-4 py-4 text-sm font-sans focus:border-[#D4AF37] outline-none transition-colors placeholder:text-white/20"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center pt-8">
                            <Magnetic>
                                <button className="px-16 py-5 bg-[#D4AF37] text-black text-xs uppercase font-bold tracking-[0.2em] hover:bg-white transition-colors duration-500 w-full md:w-auto">
                                    Confirm Reservation
                                </button>
                            </Magnetic>
                        </div>
                    </form>
                </div>

            </div>
        </section>
    );
}
