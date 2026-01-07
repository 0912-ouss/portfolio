'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FiLoader, FiCheck, FiX } from 'react-icons/fi';

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const GENDERS = ["Tous", "Mixte", "Femmes", "Hommes"];
const ACTIVITIES = ["Tous", "Gym", "Zumba", "Pilates", "Boxing", "Yoga"];

interface Session {
    id: string;
    name: string;
    day: string;
    time: string;
    activity: string;
    gender: 'Hommes' | 'Femmes' | 'Mixte';
    trainerId: string;
}

export function FitnessSchedule() {
    const { data: session } = useSession();
    const router = useRouter();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedGender, setSelectedGender] = useState("Tous");
    const [selectedActivity, setSelectedActivity] = useState("Tous");
    const [selectedDay, setSelectedDay] = useState("Lundi");

    const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [bookingMessage, setBookingMessage] = useState('');

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const res = await fetch('/api/fitness/sessions');
                const data = await res.json();
                if (data.success) {
                    setSessions(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch sessions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    const filteredSessions = sessions.filter(session => {
        const genderMatch = selectedGender === "Tous" || session.gender === selectedGender;
        const activityMatch = selectedActivity === "Tous" || session.activity === selectedActivity;
        const dayMatch = session.day === selectedDay;
        return genderMatch && activityMatch && dayMatch;
    });

    const handleBooking = async (sessionId: string) => {
        if (!session) {
            router.push('/demos/fitness/login?callbackUrl=/demos/fitness#schedule');
            return;
        }

        setBookingStatus('loading');
        try {
            const res = await fetch('/api/fitness/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId })
            });

            const data = await res.json();

            if (res.ok) {
                setBookingStatus('success');
                setBookingMessage('Session réservée avec succès !');
                setTimeout(() => setBookingStatus('idle'), 3000);
            } else {
                setBookingStatus('error');
                setBookingMessage(data.error || 'Erreur lors de la réservation');
                setTimeout(() => setBookingStatus('idle'), 3000);
            }
        } catch (error) {
            setBookingStatus('error');
            setBookingMessage('Erreur de connexion');
            setTimeout(() => setBookingStatus('idle'), 3000);
        }
    };

    return (
        <section className="py-32 md:py-40 bg-[#050505] border-t border-white/5" id="schedule">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 mb-16 md:mb-24">
                    <div className="max-w-2xl">
                        <span className="text-[#D4AF37] text-[10px] uppercase tracking-[1em] font-black block mb-6 md:mb-8">Calendrier</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                            Sessions <br className="hidden md:block" /> D'Élite
                        </h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 w-full xl:w-auto">
                        <div className="space-y-4 flex-1 md:flex-initial">
                            <span className="text-white/30 text-[9px] uppercase font-black tracking-widest block pl-2">Filtrer par Genre</span>
                            <div className="flex flex-wrap gap-2 bg-white/5 p-2 rounded-2xl md:rounded-full border border-white/10">
                                {GENDERS.map(gender => (
                                    <button
                                        key={gender}
                                        onClick={() => setSelectedGender(gender)}
                                        className={`px-4 md:px-6 py-2 rounded-full text-[10px] uppercase font-black tracking-widest transition-all duration-300 ${selectedGender === gender ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                    >
                                        {gender}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 flex-1 md:flex-initial">
                            <span className="text-white/30 text-[9px] uppercase font-black tracking-widest block pl-2">Filtrer par Discipline</span>
                            <div className="flex flex-wrap gap-2 bg-white/5 p-2 rounded-2xl md:rounded-full border border-white/10">
                                {ACTIVITIES.map(activity => (
                                    <button
                                        key={activity}
                                        onClick={() => setSelectedActivity(activity)}
                                        className={`px-4 md:px-6 py-2 rounded-full text-[10px] uppercase font-black tracking-widest transition-all duration-300 ${selectedActivity === activity ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                    >
                                        {activity}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Days Navigation */}
                <div className="relative mb-16 md:mb-20">
                    <div className="flex overflow-x-auto gap-2 md:gap-8 pb-4 scrollbar-hide border-b border-white/5 mask-image-linear-to-r">
                        {DAYS.map(day => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`px-4 md:px-8 py-4 text-[11px] md:text-[12px] uppercase font-black tracking-[0.2em] whitespace-nowrap transition-all border-b-2 relative top-[1px] ${selectedDay === day ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-transparent text-white/30 hover:text-white'}`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Feedback Toast */}
                <AnimatePresence>
                    {bookingStatus !== 'idle' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className={`fixed bottom-8 right-8 z-50 px-6 py-4 rounded-xl flex items-center gap-4 shadow-2xl border ${bookingStatus === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                    bookingStatus === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                        'bg-[#0A0A0A] border-white/10 text-white'
                                }`}
                        >
                            {bookingStatus === 'loading' && <FiLoader className="animate-spin" />}
                            {bookingStatus === 'success' && <FiCheck />}
                            {bookingStatus === 'error' && <FiX />}
                            <span className="text-xs font-bold uppercase tracking-wider">{bookingMessage || 'Traitement...'}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Sessions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px]">
                    {loading ? (
                        <div className="col-span-full flex justify-center py-20">
                            <FiLoader className="text-[#D4AF37] animate-spin text-3xl" />
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filteredSessions.length > 0 ? (
                                filteredSessions.map((session, index) => (
                                    <motion.div
                                        key={session.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className="relative p-8 md:p-12 bg-[#0A0A0A] border border-white/5 rounded-[2rem] hover:border-[#D4AF37]/50 transition-all duration-500 group overflow-hidden"
                                    >
                                        {/* Hover Gradient Background */}
                                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-8">
                                                <span className="text-[#D4AF37] text-[9px] uppercase font-black tracking-widest px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full group-hover:bg-[#D4AF37] group-hover:text-black transition-colors duration-300">
                                                    {session.activity}
                                                </span>
                                                <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest leading-none flex items-center gap-2">
                                                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${session.gender === 'Femmes' ? 'bg-pink-500' :
                                                            session.gender === 'Hommes' ? 'bg-blue-500' :
                                                                'bg-white/20'
                                                        } group-hover:bg-[#D4AF37]`}></span>
                                                    {session.gender}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-[#D4AF37] transition-colors duration-300 break-words">
                                                {session.name}
                                            </h3>

                                            <div className="flex items-center gap-3 mb-10">
                                                <div className="w-8 h-[1px] bg-white/10 group-hover:bg-[#D4AF37]/50 transition-colors"></div>
                                                <p className="text-white/50 text-[11px] uppercase tracking-[0.2em] font-medium font-sans">
                                                    {session.time}
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => handleBooking(session.id)}
                                                className="w-full py-4 border border-white/10 bg-white/5 text-[10px] uppercase font-black tracking-[0.3em] text-white rounded-xl hover:bg-[#D4AF37] hover:text-black hover:border-transparent transition-all duration-300 translate-y-0 group-hover:-translate-y-1 shadow-lg shadow-black/50"
                                            >
                                                Réserver
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="col-span-full py-20 text-center bg-white/[0.02] rounded-[2rem] border border-white/5 border-dashed"
                                >
                                    <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-black">
                                        Aucune session prévue ce jour
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </section>
    );
}
