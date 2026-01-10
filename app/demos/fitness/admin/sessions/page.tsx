"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { AdminAuthGuard } from "@/components/demos/fitness/admin/AdminAuthGuard";
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiLoader, FiX, FiCheck, FiEye, FiPause, FiPlay, FiDownload, FiFilter, FiSearch, FiClock, FiUserCheck, FiUserX, FiArrowUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, themeColors } from "@/components/demos/fitness/admin/ThemeContext";
import { Session, Trainer } from "@/types/fitness";

export default function SessionsPage() {
    const { theme } = useTheme();
    const colors = themeColors[theme];

    const [sessions, setSessions] = useState<Session[]>([]);
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        activity: "ALL",
        day: "ALL",
        gender: "ALL",
        bookingEnabled: "ALL"
    });

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
    const [sessionBookings, setSessionBookings] = useState<any[]>([]);
    const [sessionWaitlist, setSessionWaitlist] = useState<any[]>([]);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [attendanceData, setAttendanceData] = useState<Record<string, { attended: boolean; notes?: string }>>({});

    // Form Data
    const [sessionData, setSessionData] = useState({
        name: "",
        activity: "Force",
        gender: "Mixte",
        day: "Lundi",
        time: "09:00",
        capacity: 15,
        trainerId: ""
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const filteredSessions = sessions.filter(session => {
        const matchesSearch = session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             session.activity.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesActivity = filters.activity === "ALL" || session.activity === filters.activity;
        const matchesDay = filters.day === "ALL" || session.day === filters.day;
        const matchesGender = filters.gender === "ALL" || session.gender === filters.gender;
        const matchesBooking = filters.bookingEnabled === "ALL" || 
                              (filters.bookingEnabled === "true" && session.bookingEnabled !== false) ||
                              (filters.bookingEnabled === "false" && session.bookingEnabled === false);
        return matchesSearch && matchesActivity && matchesDay && matchesGender && matchesBooking;
    });

    const fetchData = async () => {
        try {
            setError(null);
            setLoading(true);
            const [sessRes, trainRes] = await Promise.all([
                fetch("/api/fitness/sessions"),
                fetch("/api/fitness/trainers")
            ]);

            const sessData = await sessRes.json();
            const trainData = await trainRes.json();

            if (!sessRes.ok || !sessData.success) {
                throw new Error(sessData.error || "Failed to fetch sessions");
            }
            if (!trainRes.ok || !trainData.success) {
                throw new Error(trainData.error || "Failed to fetch trainers");
            }

            setSessions(sessData.data);
            setTrainers(trainData.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to fetch sessions data:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSession = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError(null);
            const res = await fetch("/api/fitness/sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sessionData)
            });
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to create session");
            }
            
            setIsAddModalOpen(false);
            resetForm();
            fetchData();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to create session:", err);
            }
        }
    };

    const handleUpdateSession = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;

        try {
            setError(null);
            const res = await fetch(`/api/fitness/sessions/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sessionData)
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to update session");
            }

            setIsEditModalOpen(false);
            resetForm();
            fetchData();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to update session:", err);
            }
        }
    };

    const deleteSession = async (id: string) => {
        if (!confirm("Are you sure you want to delete this session?")) return;
        try {
            setError(null);
            const res = await fetch(`/api/fitness/sessions/${id}`, { method: 'DELETE' });
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to delete session");
            }
            
            fetchData();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to delete session:", err);
            }
        }
    };

    const toggleBookingStatus = async (sessionId: string, currentStatus: boolean) => {
        try {
            setError(null);
            const res = await fetch(`/api/fitness/sessions/${sessionId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookingEnabled: !currentStatus })
            });
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to toggle booking status");
            }
            
            fetchData();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to toggle booking status:", err);
            }
        }
    };

    const openBookingsModal = async (sessionId: string) => {
        setSelectedSessionId(sessionId);
        setIsBookingsModalOpen(true);
        setLoadingBookings(true);
        
        try {
            const [bookingsRes, waitlistRes, attendanceRes] = await Promise.all([
                fetch(`/api/fitness/sessions/${sessionId}/bookings`),
                fetch(`/api/fitness/waitlist?sessionId=${sessionId}`),
                fetch(`/api/fitness/attendance?sessionId=${sessionId}`)
            ]);
            
            const bookingsData = await bookingsRes.json();
            const waitlistData = await waitlistRes.json();
            const attendanceData = await attendanceRes.json();
            
            if (bookingsData.success) {
                setSessionBookings(bookingsData.data);
            }
            if (waitlistData.success) {
                setSessionWaitlist(waitlistData.data);
            }
            if (attendanceData.success) {
                const attendanceMap: Record<string, { attended: boolean; notes?: string }> = {};
                attendanceData.data.forEach((att: any) => {
                    attendanceMap[att.bookingId] = {
                        attended: att.attended,
                        notes: att.notes || undefined
                    };
                });
                setAttendanceData(attendanceMap);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to fetch session data:", err);
            }
        } finally {
            setLoadingBookings(false);
        }
    };

    const markAttendance = async (bookingId: string, attended: boolean, notes?: string) => {
        try {
            setError(null);
            const res = await fetch("/api/fitness/attendance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId, attended, notes })
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to update attendance");
            }

            setAttendanceData(prev => ({
                ...prev,
                [bookingId]: { attended, notes }
            }));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to mark attendance:", err);
            }
        }
    };

    const promoteFromWaitlist = async (waitlistId: string) => {
        try {
            setError(null);
            const res = await fetch("/api/fitness/waitlist/promote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ waitlistId })
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to promote from waitlist");
            }

            // Refresh bookings and waitlist
            if (selectedSessionId) {
                openBookingsModal(selectedSessionId);
            }
            fetchData(); // Refresh sessions
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to promote from waitlist:", err);
            }
        }
    };

    const removeFromWaitlist = async (waitlistId: string) => {
        try {
            setError(null);
            const res = await fetch(`/api/fitness/waitlist?id=${waitlistId}`, { method: 'DELETE' });
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to remove from waitlist");
            }

            setSessionWaitlist(prev => prev.filter(w => w.id !== waitlistId));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to remove from waitlist:", err);
            }
        }
    };

    const cancelMemberBooking = async (bookingId: string) => {
        if (!confirm("Annuler la réservation de ce membre ?")) return;
        
        try {
            setError(null);
            const res = await fetch(`/api/fitness/bookings/${bookingId}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to cancel booking");
            }
            
            // Refresh bookings list and sessions
            if (selectedSessionId) {
                openBookingsModal(selectedSessionId);
            }
            fetchData(); // Refresh sessions to update capacity and booking counts
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to cancel booking:", err);
            }
        }
    };

    const resetForm = () => {
        setSessionData({
            name: "",
            activity: "Force",
            gender: "Mixte",
            day: "Lundi",
            time: "09:00",
            capacity: 15,
            trainerId: ""
        });
        setEditingId(null);
    };

    const openEditModal = (session: Session) => {
        setSessionData({
            name: session.name,
            activity: session.activity,
            gender: session.gender,
            day: session.day,
            time: session.time,
            capacity: session.capacity,
            trainerId: session.trainerId || ""
        });
        setEditingId(session.id);
        setIsEditModalOpen(true);
    };

    return (
        <AdminAuthGuard>
            <div>
                <AdminHeader title="Sessions & Schedule" />

                <div className="p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
                            {error}
                        </div>
                    )}
                {/* Actions Bar */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <select className={`${colors.input} rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#D4AF37]/50`}>
                            <option>All Days</option>
                            <option>Lundi</option>
                            <option>Mardi</option>
                            <option>Mercredi</option>
                            <option>Jeudi</option>
                            <option>Vendredi</option>
                        </select>
                    </div>
                    <button
                        onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                        className="flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors"
                    >
                        <FiPlus /> Create Session
                    </button>
                </div>

                {/* Sessions Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <FiLoader className="w-8 h-8 text-[#D4AF37] animate-spin" />
                        <p className={`${colors.textMuted} text-[10px] uppercase tracking-[0.2em] font-bold`}>Chargement du planning...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSessions.length === 0 ? (
                            <div className="col-span-full text-center py-20">
                                <p className={`${colors.textMuted} text-sm`}>Aucune session trouvée.</p>
                            </div>
                        ) : (
                            filteredSessions.map((session, index) => (
                            <motion.div
                                key={session.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className={`${colors.card} border ${colors.border} rounded-2xl p-6 hover:border-[#D4AF37]/20 transition-colors group shadow-sm`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <span className="text-[#D4AF37] text-[10px] uppercase tracking-wider font-bold">
                                            {session.activity}
                                        </span>
                                        <h3 className={`${colors.text} font-bold text-lg mt-1`}>{session.name}</h3>
                                    </div>
                                    <div aria-hidden="true" className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(session)}
                                            className={`w-8 h-8 rounded-lg ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'} flex items-center justify-center ${colors.textMuted} hover:${colors.text} transition-all`}
                                        >
                                            <FiEdit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => deleteSession(session.id)}
                                            className={`w-8 h-8 rounded-lg ${theme === 'dark' ? 'bg-white/5 hover:bg-red-500/10' : 'bg-gray-100 hover:bg-red-50'} flex items-center justify-center ${colors.textMuted} hover:text-red-500 transition-all`}
                                        >
                                            <FiTrash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className={colors.textMuted}>Trainer</span>
                                        <span className={colors.text}>{session.trainer?.name || "No Trainer"}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className={colors.textMuted}>Day</span>
                                        <span className={colors.text}>{session.day}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className={colors.textMuted}>Time</span>
                                        <span className={colors.text}>{session.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className={colors.textMuted}>Gender</span>
                                        <span className={colors.text}>{session.gender}</span>
                                    </div>
                                </div>

                                {/* Capacity Bar */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className={`${colors.textMuted} flex items-center gap-1`}>
                                            <FiUsers /> Capacity
                                        </span>
                                        <span className={`font-bold ${session._count?.bookings === session.capacity ? 'text-[#D4AF37]' : colors.text}`}>
                                            {session._count?.bookings || 0}/{session.capacity}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all ${session._count?.bookings === session.capacity ? 'bg-[#D4AF37]' : 'bg-gray-400 dark:bg-white/30'}`}
                                            style={{ width: `${((session._count?.bookings || 0) / session.capacity) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Booking Status */}
                                <div className="mb-4">
                                    <div className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-black text-center ${
                                        session.bookingEnabled !== false 
                                            ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                                            : 'bg-red-500/20 border border-red-500/30 text-red-400'
                                    }`}>
                                        {session.bookingEnabled !== false ? '✓ Réservations actives' : '✗ Réservations désactivées'}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleBookingStatus(session.id, session.bookingEnabled !== false)}
                                        className={`flex-1 px-3 py-2 rounded-lg text-[10px] uppercase tracking-wider font-black transition-all ${
                                            session.bookingEnabled !== false
                                                ? 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30'
                                                : 'bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30'
                                        } flex items-center justify-center gap-2`}
                                        title={session.bookingEnabled !== false ? "Désactiver les réservations" : "Activer les réservations"}
                                    >
                                        {session.bookingEnabled !== false ? (
                                            <>
                                                <FiPause size={14} />
                                                Arrêter
                                            </>
                                        ) : (
                                            <>
                                                <FiPlay size={14} />
                                                Activer
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => openBookingsModal(session.id)}
                                        className="flex-1 px-3 py-2 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] uppercase tracking-wider font-black hover:bg-[#D4AF37]/30 transition-all flex items-center justify-center gap-2"
                                        title="Voir les membres réservés"
                                    >
                                        <FiEye size={14} />
                                        Membres
                                    </button>
                                </div>
                            </motion.div>
                        ))
                        )}
                    </div>
                )}
            </div>

            {/* Bookings Modal */}
            <AnimatePresence>
                {isBookingsModalOpen && selectedSessionId && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setIsBookingsModalOpen(false);
                                setSelectedSessionId(null);
                                setSessionBookings([]);
                            }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto ${colors.card} border ${colors.border} rounded-3xl p-8 shadow-2xl`}
                        >
                            <div className="flex justify-between items-center mb-8 sticky top-0 bg-inherit pb-4 border-b border-white/5">
                                <div>
                                    <h3 className={`${colors.text} text-xl font-bold`}>
                                        Membres Réservés & Liste d'Attente
                                    </h3>
                                    <p className={`${colors.textMuted} text-xs mt-1`}>
                                        {sessionBookings.length} réservations • {sessionWaitlist.length} en attente
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsBookingsModalOpen(false);
                                        setSelectedSessionId(null);
                                        setSessionBookings([]);
                                        setSessionWaitlist([]);
                                        setAttendanceData({});
                                    }}
                                    className={`${colors.textMuted} hover:${colors.text} transition-colors`}
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            {loadingBookings ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <FiLoader className="w-8 h-8 text-[#D4AF37] animate-spin" />
                                    <p className={`${colors.textMuted} text-[10px] uppercase tracking-[0.2em] font-bold`}>Chargement...</p>
                                </div>
                            ) : sessionBookings.length === 0 && sessionWaitlist.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className={`${colors.textMuted} text-sm`}>Aucune réservation ou liste d'attente pour cette session.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Bookings Section */}
                                    {sessionBookings.length > 0 && (
                                        <div>
                                            <h4 className={`${colors.text} font-bold text-sm mb-4 flex items-center gap-2`}>
                                                <FiUsers /> Réservations ({sessionBookings.length})
                                            </h4>
                                            <div className="space-y-3">
                                                {sessionBookings.map((booking) => {
                                                    const attendance = attendanceData[booking.id];
                                                    const isAttended = attendance?.attended === true;
                                                    return (
                                                        <motion.div
                                                            key={booking.id}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className={`${colors.card} border ${isAttended ? 'border-green-500/30' : colors.border} rounded-xl p-4 hover:border-[#D4AF37]/30 transition-colors`}
                                                        >
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div className="flex items-start gap-4 flex-1">
                                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
                                                                        isAttended ? 'bg-green-500/20 text-green-400' : 'bg-[#D4AF37]/20 text-[#D4AF37]'
                                                                    }`}>
                                                                        {booking.user.firstName[0]}{booking.user.lastName[0]}
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <p className={`${colors.text} font-bold`}>
                                                                                {booking.user.firstName} {booking.user.lastName}
                                                                            </p>
                                                                            {isAttended && (
                                                                                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-[9px] font-bold uppercase flex items-center gap-1">
                                                                                    <FiUserCheck size={10} /> Présent
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <p className={`${colors.textMuted} text-xs`}>{booking.user.email}</p>
                                                                        {booking.user.phone && (
                                                                            <p className={`${colors.textMuted} text-xs`}>{booking.user.phone}</p>
                                                                        )}
                                                                        <div className="flex items-center gap-2 mt-2">
                                                                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                                                                booking.user.status === 'Active' 
                                                                                    ? 'bg-green-500/20 text-green-400' 
                                                                                    : 'bg-red-500/20 text-red-400'
                                                                            }`}>
                                                                                {booking.user.status || 'Active'}
                                                                            </span>
                                                                            {booking.user.membershipId && (
                                                                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                                                                    booking.user.membershipId === 'INFINITY' || booking.user.membershipId === 'Infinity'
                                                                                        ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                                                                                        : theme === 'dark' ? 'bg-white/10 text-white/60' : 'bg-gray-100 text-gray-600'
                                                                                }`}>
                                                                                    {booking.user.membershipId}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        {attendance?.notes && (
                                                                            <p className={`${colors.textMuted} text-xs mt-2 italic`}>Note: {attendance.notes}</p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col items-end gap-2">
                                                                    <div className="text-right">
                                                                        <p className={`${colors.textMuted} text-[9px] uppercase tracking-wider`}>Réservé le</p>
                                                                        <p className={`${colors.text} text-xs font-mono`}>
                                                                            {new Date(booking.createdAt).toLocaleDateString()}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <button
                                                                            onClick={() => markAttendance(booking.id, !isAttended)}
                                                                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                                                                isAttended
                                                                                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                                                                    : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                                                                            }`}
                                                                            title={isAttended ? "Marquer comme absent" : "Marquer comme présent"}
                                                                        >
                                                                            {isAttended ? <FiUserCheck size={14} /> : <FiUserX size={14} />}
                                                                        </button>
                                                                        <button
                                                                            onClick={() => cancelMemberBooking(booking.id)}
                                                                            className={`w-8 h-8 rounded-lg ${theme === 'dark' ? 'bg-white/5 hover:bg-red-500/10' : 'bg-gray-100 hover:bg-red-50'} flex items-center justify-center ${colors.textMuted} hover:text-red-500 transition-all`}
                                                                            title="Annuler la réservation"
                                                                        >
                                                                            <FiX size={14} />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Waitlist Section */}
                                    {sessionWaitlist.length > 0 && (
                                        <div>
                                            <h4 className={`${colors.text} font-bold text-sm mb-4 flex items-center gap-2`}>
                                                <FiClock /> Liste d'Attente ({sessionWaitlist.length})
                                            </h4>
                                            <div className="space-y-3">
                                                {sessionWaitlist.map((waitlist, index) => (
                                                    <motion.div
                                                        key={waitlist.id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className={`${colors.card} border ${colors.border} rounded-xl p-4 hover:border-[#D4AF37]/30 transition-colors`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4 flex-1">
                                                                <div className="flex flex-col items-center">
                                                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                                                                        #{index + 1}
                                                                    </div>
                                                                    {waitlist.priority > 0 && (
                                                                        <span className="text-[8px] text-[#D4AF37] mt-1">Priorité</span>
                                                                    )}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className={`${colors.text} font-bold`}>
                                                                        {waitlist.user.firstName} {waitlist.user.lastName}
                                                                    </p>
                                                                    <p className={`${colors.textMuted} text-xs`}>{waitlist.user.email}</p>
                                                                    <p className={`${colors.textMuted} text-[10px] mt-1`}>
                                                                        Ajouté le {new Date(waitlist.createdAt).toLocaleDateString()}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    onClick={() => promoteFromWaitlist(waitlist.id)}
                                                                    className="px-3 py-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg text-xs font-bold hover:bg-[#D4AF37]/30 transition-all flex items-center gap-2"
                                                                    title="Promouvoir vers réservation"
                                                                >
                                                                    <FiArrowUp size={12} /> Promouvoir
                                                                </button>
                                                                <button
                                                                    onClick={() => removeFromWaitlist(waitlist.id)}
                                                                    className={`w-8 h-8 rounded-lg ${theme === 'dark' ? 'bg-white/5 hover:bg-red-500/10' : 'bg-gray-100 hover:bg-red-50'} flex items-center justify-center ${colors.textMuted} hover:text-red-500 transition-all`}
                                                                    title="Retirer de la liste"
                                                                >
                                                                    <FiX size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal Components */}
            <AnimatePresence>
                {(isAddModalOpen || isEditModalOpen) && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={`relative w-full max-w-md ${colors.card} border ${colors.border} rounded-3xl p-8 shadow-2xl`}
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className={`${colors.text} text-xl font-bold`}>
                                    {isAddModalOpen ? "Nouvelle Session" : "Modifier Session"}
                                </h3>
                                <button
                                    onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                                    className={`${colors.textMuted} hover:${colors.text} transition-colors`}
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            <form onSubmit={isAddModalOpen ? handleCreateSession : handleUpdateSession} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Nom</label>
                                        <input
                                            type="text" required
                                            value={sessionData.name}
                                            onChange={(e) => setSessionData({ ...sessionData, name: e.target.value })}
                                            className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                            placeholder="Yoga Matinal"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Activité</label>
                                        <select
                                            value={sessionData.activity}
                                            onChange={(e) => setSessionData({ ...sessionData, activity: e.target.value })}
                                            className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                        >
                                            <option>Force</option>
                                            <option>Yoga</option>
                                            <option>Cardio</option>
                                            <option>Pilates</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Jour</label>
                                        <select
                                            value={sessionData.day}
                                            onChange={(e) => setSessionData({ ...sessionData, day: e.target.value })}
                                            className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                        >
                                            <option>Lundi</option>
                                            <option>Mardi</option>
                                            <option>Mercredi</option>
                                            <option>Jeudi</option>
                                            <option>Vendredi</option>
                                            <option>Samedi</option>
                                            <option>Dimanche</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Heure</label>
                                        <input
                                            type="time" required
                                            value={sessionData.time}
                                            onChange={(e) => setSessionData({ ...sessionData, time: e.target.value })}
                                            className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Coach</label>
                                    <select
                                        required
                                        value={sessionData.trainerId}
                                        onChange={(e) => setSessionData({ ...sessionData, trainerId: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                    >
                                        <option value="">Sélectionner un coach</option>
                                        {trainers.map(t => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#D4AF37] text-black text-[10px] uppercase font-black tracking-[0.3em] rounded-xl hover:bg-white transition-all mt-4"
                                >
                                    {isAddModalOpen ? "Planifier la Session" : "Enregistrer Modifications"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
                </AnimatePresence>
            </div>
        </AdminAuthGuard>
    );
}
