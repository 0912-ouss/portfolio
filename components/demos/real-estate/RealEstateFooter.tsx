'use client';

import React from 'react';
import Link from 'next/link';
import { Landmark, Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function RealEstateFooter() {
    return (
        <footer className="bg-[#FDFBF7] pt-32 pb-12 px-6 border-t border-gray-200">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    <div className="lg:col-span-1">
                        <Link href="/demos/real-estate" className="flex items-center gap-2 mb-8">
                            <Landmark className="w-8 h-8 text-[#C19A6B]" />
                            <span className="text-2xl font-serif font-medium tracking-tighter text-[#2C2C2C]">
                                ATLAS<span className="text-[#C19A6B]">ESTATES</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 font-light text-sm leading-relaxed mb-8">
                            Redefining the Moroccan real estate experience through uncompromising quality and historic preservation.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#C19A6B] hover:text-[#C19A6B] transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#C19A6B] hover:text-[#C19A6B] transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#C19A6B] hover:text-[#C19A6B] transition-colors">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-[#2C2C2C] mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {['Heritage Collection', 'Coastal Villas', 'Modern Living', 'Investment Guide'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-gray-400 text-sm hover:text-[#C19A6B] transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-[#2C2C2C] mb-8">Inquiries</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <Mail className="text-[#C19A6B] mt-1" size={16} />
                                <span className="text-gray-400 text-sm">concierge@atlasestates.ma</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <Phone className="text-[#C19A6B] mt-1" size={16} />
                                <span className="text-gray-400 text-sm">+212 (0) 524 33 44 55</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <MapPin className="text-[#C19A6B] mt-1" size={16} />
                                <span className="text-gray-400 text-sm leading-relaxed">
                                    42 Avenue Hassan II,<br />
                                    Marrakech 40000, Morocco
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-[#2C2C2C] mb-8">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-6 font-light">Join our list for exclusive off-market opportunities.</p>
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full bg-white border border-gray-200 px-6 py-4 text-sm focus:outline-none focus:border-[#C19A6B]"
                            />
                            <button className="absolute right-2 top-2 bg-[#2C2C2C] text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-[#C19A6B] transition-colors">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] text-gray-400 uppercase tracking-widest font-medium">
                    <p>© 2024 Atlas Estates Morocco. All rights reserved.</p>
                    <div className="flex gap-12">
                        <Link href="#" className="hover:text-[#2C2C2C] transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-[#2C2C2C] transition-colors">Terms of Service</Link>
                    </div>
                    <Link href="/" className="hover:text-[#2C2C2C] transition-colors">Back to Portfolio</Link>
                </div>
            </div>
        </footer>
    );
}
