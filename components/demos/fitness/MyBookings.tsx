'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FiLoader, FiX, FiCalendar, FiClock, FiMapPin, FiUser, FiCheck } from 'react-icons/fi';

interface Booking {
    id: string;
    sessionId: string;
    status: string;
    createdAt: string;
    session?: {
        id: string;
        name: string;
        day: string;
        time: string;
        activity: string;
        gender: string;
        capacity: number;
        trainer?: {
            name: string;
        };
        location?: {
            name: string;
            address: string;
        };
        _count?: {
            bookings: number;
        };
    };
}

export function MyBookings() {
    const { data: session } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cancellingId, setCancellingId] = useState<string | null>(null);

    useEffect(() => {
        if (session?.user?.id) {
            fetchBookings();
        } else {
            setLoading(false);
        }
    }, [session]);

    const fetchBookings = async () => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch('/api/fitness/bookings');
            const data = await res.json();
            
            if (data.success) {
                // Filter only confirmed bookings
                const confirmedBookings = data.data.filter((b: Booking) => b.status === 'CONFIRMED');
                setBookings(confirmedBookings);
            } else {
                throw new Error(data.error || 'Failed to fetch bookings');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error('Failed to fetch bookings:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId: string) => {
        if (!confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
            return;
        }

        setCancellingId(bookingId);
        try {
            const res = await fetch(`/api/fitness/bookings/${bookingId}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if (data.success) {
                // Remove from list
                setBookings(bookings.filter(b => b.id !== bookingId));
                // Refresh bookings to get updated list
                fetchBookings();
            } else {
                throw new Error(data.error || 'Failed to cancel booking');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'annulation';
            alert(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error('Failed to cancel booking:', err);
            }
        } finally {
            setCancellingId(null);
        }
    };

    // If not logged in, show login prompt
    if (!session) {
        return (
            <section className="py-32 md:py-40 bg-[#050505] border-t border-white/5">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
                            Mes Réservations
                        </h2>
                        <p className="text-white/40 text-sm mb-8">
                            Connectez-vous pour voir vos réservations
                        </p>
                        <button
                            onClick={() => router.push('/demos/fitness/login')}
                            className="px-8 py-4 bg-[#D4AF37] text-black text-[10px] uppercase font-black tracking-[0.3em] rounded-xl hover:bg-white transition-all"
                        >
                            Se connecter
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-32 md:py-40 bg-[#050505] border-t border-white/5" id="my-bookings">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-16">
                    <span className="text-[#D4AF37] text-[10px] uppercase tracking-[1em] font-black block mb-6 md:mb-8">
                        Mes Réservations
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                        Sessions <br className="hidden md:block" /> Réservées
                    </h2>
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center py-20">
                        <FiLoader className="text-[#D4AF37] animate-spin text-3xl" />
                    </div>
                ) : bookings.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-white/[0.02] rounded-[2rem] border border-white/5 border-dashed"
                    >
                        <FiCalendar className="text-white/20 text-6xl mx-auto mb-6" />
                        <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-black mb-4">
                            Aucune réservation
                        </p>
                        <p className="text-white/20 text-sm">
                            Réservez une session pour commencer
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        <AnimatePresence mode="popLayout">
                            {bookings.map((booking, index) => (
                                <motion.div
                                    key={booking.id}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="relative p-8 md:p-12 bg-[#0A0A0A] border border-white/5 rounded-[2rem] hover:border-[#D4AF37]/50 transition-all duration-500 group overflow-hidden"
                                >
                                    {/* Hover Gradient Background */}
                                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="text-[#D4AF37] text-[9px] uppercase font-black tracking-widest px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full">
                                                {booking.session?.activity || 'Session'}
                                            </span>
                                            <button
                                                onClick={() => handleCancelBooking(booking.id)}
                                                disabled={cancellingId === booking.id}
                                                className="p-2 text-white/30 hover:text-red-400 transition-colors disabled:opacity-50"
                                                title="Annuler la réservation"
                                            >
                                                {cancellingId === booking.id ? (
                                                    <FiLoader className="animate-spin" />
                                                ) : (
                                                    <FiX />
                                                )}
                                            </button>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
                                            {booking.session?.name || 'Session'}
                                        </h3>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-3 text-white/60 text-sm">
                                                <FiCalendar className="text-[#D4AF37]" />
                                                <span>{booking.session?.day}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-white/60 text-sm">
                                                <FiClock className="text-[#D4AF37]" />
                                                <span>{booking.session?.time}</span>
                                            </div>
                                            {booking.session?.trainer && (
                                                <div className="flex items-center gap-3 text-white/60 text-sm">
                                                    <FiUser className="text-[#D4AF37]" />
                                                    <span>{booking.session.trainer.name}</span>
                                                </div>
                                            )}
                                            {booking.session?.location && (
                                                <div className="flex items-center gap-3 text-white/60 text-sm">
                                                    <FiMapPin className="text-[#D4AF37]" />
                                                    <span className="text-xs">{booking.session.location.name}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="pt-4 border-t border-white/5">
                                            <div className="flex items-center justify-between text-[10px]">
                                                <span className="text-white/40 uppercase tracking-wider">Capacité</span>
                                                <span className="text-white/60 font-bold">
                                                    {booking.session?._count?.bookings || 0}/{booking.session?.capacity || 0}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-4 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <FiCheck className="text-green-400" />
                                                <p className="text-green-400 text-[9px] uppercase tracking-wider font-black">
                                                    Confirmé
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </section>
    );
}
