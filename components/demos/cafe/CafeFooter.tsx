'use client';

import React from 'react';
import { FiInstagram, FiTwitter, FiMapPin } from 'react-icons/fi';

export function CafeFooter() {
    return (
        <footer className="bg-[#1F1C18] text-[#E6DCCA] py-24 border-t border-white/5">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-6xl md:text-8xl font-serif text-[#C8AA6E]/10 mb-12">KŌHĪ</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-sm font-sans font-light opacity-80">
                    <div className="space-y-4">
                        <h4 className="uppercase tracking-widest text-[#C8AA6E] mb-6">Visite</h4>
                        <p>1080 Kyoto St.<br />Arts District, LA 90013</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="uppercase tracking-widest text-[#C8AA6E] mb-6">Horaires</h4>
                        <p>Lun - Ven : 7h - 16h<br />Sam - Dim : 8h - 18h</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="uppercase tracking-widest text-[#C8AA6E] mb-6">Contact</h4>
                        <p>hello@kohicoffee.com<br />213.555.0199</p>
                    </div>
                </div>

                <div className="flex justify-center gap-8 text-[#C8AA6E]">
                    <FiInstagram className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                    <FiTwitter className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                    <FiMapPin className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                </div>

                <div className="mt-16 text-[10px] uppercase tracking-widest text-white/20">
                    © 2024 KŌHĪ Atelier. Tous Droits Réservés.
                </div>
            </div>
        </footer>
    );
}
