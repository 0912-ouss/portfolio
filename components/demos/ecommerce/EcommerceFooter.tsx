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
                            Une élégance intemporelle sélectionnée depuis 2015. La mode de luxe pour l'individu moderne.
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
                        <h4 className="font-medium uppercase tracking-wider text-sm mb-6">Boutique</h4>
                        <ul className="space-y-3">
                            {['Nouveautés', 'Meilleures Ventes', 'Robes', 'Manteaux', 'Accessoires', 'Soldes'].map(link => (
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
                        <h4 className="font-medium uppercase tracking-wider text-sm mb-6">Aide</h4>
                        <ul className="space-y-3">
                            {['Contactez-nous', 'FAQ', 'Livraison', 'Retours', 'Guide des Tailles', 'Suivi de Commande'].map(link => (
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
                        <h4 className="font-medium uppercase tracking-wider text-sm mb-6">À Propos</h4>
                        <ul className="space-y-3">
                            {['Notre Histoire', 'Durabilité', 'Carrières', 'Presse', 'Affiliés'].map(link => (
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
                        © 2024 FASHION Boutique. Tous droits réservés.
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
