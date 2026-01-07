"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { FiPlus, FiEdit2, FiTrash2, FiUsers, FiLoader, FiX, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, themeColors } from "@/components/demos/fitness/admin/ThemeContext";
import { Session, Trainer } from "@/types/fitness";

export default function SessionsPage() {
    const { theme } = useTheme();
    const colors = themeColors[theme];

    const [sessions, setSessions] = useState<Session[]>([]);
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

    const fetchData = async () => {
        try {
            setLoading(true);
            const [sessRes, trainRes] = await Promise.all([
                fetch("/api/fitness/sessions"),
                fetch("/api/fitness/trainers")
            ]);

            const sessData = await sessRes.json();
            const trainData = await trainRes.json();

            if (sessData.success) setSessions(sessData.data);
            if (trainData.success) setTrainers(trainData.data);
        } catch (err) {
            console.error("Failed to fetch sessions data:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateSession = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/fitness/sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sessionData)
            });
            if (res.ok) {
                setIsAddModalOpen(false);
                resetForm();
                fetchData();
            }
        } catch (err) {
            console.error("Failed to create session:", err);
        }
    };

    const handleUpdateSession = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;

        try {
            const res = await fetch(`/api/fitness/sessions/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sessionData)
            });

            if (res.ok) {
                setIsEditModalOpen(false);
                resetForm();
                fetchData();
            }
        } catch (err) {
            console.error("Failed to update session:", err);
        }
    };

    const deleteSession = async (id: string) => {
        if (!confirm("Are you sure you want to delete this session?")) return;
        try {
            const res = await fetch(`/api/fitness/sessions/${id}`, { method: 'DELETE' });
            if (res.ok) fetchData();
        } catch (err) {
            console.error("Failed to delete session:", err);
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
        <div>
            <AdminHeader title="Sessions & Schedule" />

            <div className="p-8">
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
                        {sessions.map((session, index) => (
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
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                                <div className="space-y-2">
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
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

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
    );
}
