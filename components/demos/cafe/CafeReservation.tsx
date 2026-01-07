'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiUsers, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export function CafeReservation() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '10:00',
        guests: '2',
        experience: 'tasting',
        notes: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({
                name: '', email: '', phone: '', date: '', time: '10:00', guests: '2', experience: 'tasting', notes: ''
            });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <section className="py-32 md:py-48 bg-[#1F1C18] text-[#E6DCCA] relative overflow-hidden">
            {/* Decorative Lines */}
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/5" />
            <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/5" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="text-xs font-sans tracking-[0.3em] text-[#C8AA6E] uppercase block mb-8">
                            Expérience Privée
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-[0.95]">
                            Réservez Votre<br />
                            <span className="text-[#C8AA6E]/30">Session de Dégustation</span>
                        </h2>
                        <p className="text-lg font-light text-white/50 leading-relaxed mb-12 max-w-md">
                            Réservez une expérience de dégustation privée avec notre barista en chef. Explorez les origines uniques, discutez de la théorie de l'extraction et approfondissez votre appréciation du café de spécialité.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-6 mb-12">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-[#C8AA6E]">
                                    <FiMapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 block mb-1">Emplacement</span>
                                    <span className="text-sm text-white/70">1080 Kyoto St, Arts District, LA 90013</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-[#C8AA6E]">
                                    <FiPhone className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 block mb-1">Téléphone</span>
                                    <span className="text-sm text-white/70">213.555.0199</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-[#C8AA6E]">
                                    <FiMail className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 block mb-1">Email</span>
                                    <span className="text-sm text-white/70">hello@kohicoffee.com</span>
                                </div>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="p-8 border border-white/5 bg-white/[0.02]">
                            <h4 className="text-sm uppercase tracking-[0.2em] text-[#C8AA6E] mb-6">Heures de Dégustation</h4>
                            <div className="space-y-3 text-sm text-white/50">
                                <div className="flex justify-between">
                                    <span>Mardi - Vendredi</span>
                                    <span className="text-white/70">10am - 12pm, 3pm - 5pm</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Samedi - Dimanche</span>
                                    <span className="text-white/70">11am - 4pm</span>
                                </div>
                                <div className="flex justify-between text-white/30">
                                    <span>Lundi</span>
                                    <span>Fermé pour sourcing</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Name */}
                            <div className="border-b border-white/10 pb-4">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-4">Nom Complet</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Votre nom"
                                    className="w-full bg-transparent text-lg font-light text-white placeholder-white/20 focus:outline-none"
                                />
                            </div>

                            {/* Email & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="border-b border-white/10 pb-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-4">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="vous@email.com"
                                        className="w-full bg-transparent text-lg font-light text-white placeholder-white/20 focus:outline-none"
                                    />
                                </div>
                                <div className="border-b border-white/10 pb-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-4">Téléphone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="(555) 000-0000"
                                        className="w-full bg-transparent text-lg font-light text-white placeholder-white/20 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Date, Time, Guests */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="border-b border-white/10 pb-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-4 flex items-center gap-2">
                                        <FiCalendar className="w-3 h-3" /> Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-transparent text-lg font-light text-white focus:outline-none"
                                    />
                                </div>
                                <div className="border-b border-white/10 pb-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-4 flex items-center gap-2">
                                        <FiClock className="w-3 h-3" /> Heure
                                    </label>
                                    <select
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full bg-transparent text-lg font-light text-white focus:outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="10:00" className="bg-[#1A1714]">10:00 AM</option>
                                        <option value="11:00" className="bg-[#1A1714]">11:00 AM</option>
                                        <option value="14:00" className="bg-[#1A1714]">2:00 PM</option>
                                        <option value="15:00" className="bg-[#1A1714]">3:00 PM</option>
                                        <option value="16:00" className="bg-[#1A1714]">4:00 PM</option>
                                    </select>
                                </div>
                                <div className="border-b border-white/10 pb-4">
                                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-4 flex items-center gap-2">
                                        <FiUsers className="w-3 h-3" /> Invités
                                    </label>
                                    <select
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        className="w-full bg-transparent text-lg font-light text-white focus:outline-none appearance-none cursor-pointer"
                                    >
                                        {[1, 2, 3, 4, 5, 6].map(n => (
                                            <option key={n} value={n} className="bg-[#1A1714]">{n} {n === 1 ? 'Invité' : 'Invités'}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Experience Type */}
                            <div className="border-b border-white/10 pb-4">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-4">Expérience</label>
                                <select
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-lg font-light text-white focus:outline-none appearance-none cursor-pointer"
                                >
                                    <option value="tasting" className="bg-[#1A1714]">Dégustation Origine — 45$/personne</option>
                                    <option value="brewing" className="bg-[#1A1714]">Masterclass Infusion — 75$/personne</option>
                                    <option value="private" className="bg-[#1A1714]">Dégustation Privée — 120$/groupe</option>
                                </select>
                            </div>

                            {/* Notes */}
                            <div className="border-b border-white/10 pb-4">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-4">Demandes Spéciales</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Toute préférence ou exigence alimentaire..."
                                    className="w-full bg-transparent text-lg font-light text-white placeholder-white/20 focus:outline-none resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={submitted}
                                className={`w-full py-6 text-xs uppercase font-bold tracking-[0.3em] transition-all duration-500 ${submitted
                                    ? 'bg-[#C8AA6E] text-black'
                                    : 'border border-[#C8AA6E] text-[#C8AA6E] hover:bg-[#C8AA6E] hover:text-black'
                                    }`}
                            >
                                {submitted ? '✓ Réservation Demandée' : 'Demander une Réservation'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
