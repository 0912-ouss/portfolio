'use client';

import React from 'react';
import { FiInstagram, FiTwitter, FiFacebook, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

export function CarRentalFooter() {
    return (
        <footer className="bg-[#0A0A0A] text-white border-t border-white/10">
            {/* Main Footer */}
            <div className="container mx-auto px-6 lg:px-12 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-black tracking-tighter mb-6">
                            AUTO<span className="text-[#FF6B35]">RENT</span>
                        </h3>
                        <p className="text-white/50 text-sm mb-6 leading-relaxed">
                            Service de location de voitures premium avec une flotte de véhicules de luxe. Vivez la conduite de vos rêves.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center hover:bg-[#FF6B35] transition-colors">
                                <FiInstagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center hover:bg-[#FF6B35] transition-colors">
                                <FiTwitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 flex items-center justify-center hover:bg-[#FF6B35] transition-colors">
                                <FiFacebook className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold uppercase tracking-wider text-sm mb-6">Liens Rapides</h4>
                        <ul className="space-y-3">
                            {['Notre Flotte', 'Agences', 'Tarifs', 'Assurance', 'Entreprise'].map(link => (
                                <li key={link}>
                                    <a href="#" className="text-white/50 hover:text-[#FF6B35] transition-colors text-sm">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold uppercase tracking-wider text-sm mb-6">Aide</h4>
                        <ul className="space-y-3">
                            {['Centre d\'Aide', 'Guide de Réservation', 'Conditions Générales', 'Politique de Confidentialité', 'Contactez-nous'].map(link => (
                                <li key={link}>
                                    <a href="#" className="text-white/50 hover:text-[#FF6B35] transition-colors text-sm">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold uppercase tracking-wider text-sm mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <FiMapPin className="w-4 h-4 text-[#FF6B35] mt-1" />
                                <span className="text-white/50 text-sm">
                                    1234 Sunset Boulevard<br />
                                    Los Angeles, CA 90028
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FiPhone className="w-4 h-4 text-[#FF6B35]" />
                                <span className="text-white/50 text-sm">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FiMail className="w-4 h-4 text-[#FF6B35]" />
                                <span className="text-white/50 text-sm">hello@autorent.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 py-6">
                <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/30 text-xs">
                        © 2024 AutoRent. Tous droits réservés.
                    </p>
                    <div className="flex gap-6 text-xs text-white/30">
                        <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
                        <a href="#" className="hover:text-white transition-colors">Conditions</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
