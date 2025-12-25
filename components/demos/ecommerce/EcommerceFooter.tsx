'use client';

import React from 'react';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';

export function EcommerceFooter() {
    return (
        <footer className="bg-[#1A1A1A] text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-6 lg:px-12 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-light tracking-wider mb-6">
                            FASHION<span className="text-[#D4A574]">.</span>
                        </h3>
                        <p className="text-white/50 text-sm mb-6 leading-relaxed">
                            Curating timeless elegance since 2015. Luxury fashion for the modern individual.
                        </p>
                        <div className="flex gap-4">
                            {[FiInstagram, FiTwitter, FiFacebook, FiYoutube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-[#D4A574] hover:border-[#D4A574] transition-colors">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-medium uppercase tracking-wider text-sm mb-6">Shop</h4>
                        <ul className="space-y-3">
                            {['New Arrivals', 'Best Sellers', 'Dresses', 'Outerwear', 'Accessories', 'Sale'].map(link => (
                                <li key={link}>
                                    <a href="#" className="text-white/50 hover:text-[#D4A574] transition-colors text-sm">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h4 className="font-medium uppercase tracking-wider text-sm mb-6">Help</h4>
                        <ul className="space-y-3">
                            {['Contact Us', 'FAQs', 'Shipping Info', 'Returns', 'Size Guide', 'Track Order'].map(link => (
                                <li key={link}>
                                    <a href="#" className="text-white/50 hover:text-[#D4A574] transition-colors text-sm">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h4 className="font-medium uppercase tracking-wider text-sm mb-6">About</h4>
                        <ul className="space-y-3">
                            {['Our Story', 'Sustainability', 'Careers', 'Press', 'Affiliates'].map(link => (
                                <li key={link}>
                                    <a href="#" className="text-white/50 hover:text-[#D4A574] transition-colors text-sm">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-white/10 py-6">
                <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/30 text-xs">
                        © 2024 Fashion Boutique. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-white/30">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
