"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { FiPlus, FiEdit2, FiTrash2, FiStar, FiCalendar, FiLoader, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme, themeColors } from "@/components/demos/fitness/admin/ThemeContext";
import { Trainer } from "@/types/fitness";

export default function TrainersPage() {
    const { theme } = useTheme();
    const colors = themeColors[theme];

    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        name: "",
        specialty: "",
        bio: "",
        image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop",
        status: "Active"
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchTrainers();
    }, []);

    const fetchTrainers = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/fitness/trainers");
            const data = await res.json();
            if (data.success) {
                setTrainers(data.data);
            }
        } catch (err) {
            console.error("Failed to fetch trainers:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTrainer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/fitness/trainers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setIsAddModalOpen(false);
                resetForm();
                fetchTrainers();
            }
        } catch (err) {
            console.error("Failed to add trainer:", err);
        }
    };

    const handleUpdateTrainer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;

        try {
            const res = await fetch(`/api/fitness/trainers/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setIsEditModalOpen(false);
                resetForm();
                fetchTrainers();
            }
        } catch (err) {
            console.error("Failed to update trainer:", err);
        }
    };

    const deleteTrainer = async (id: string) => {
        if (!confirm("Are you sure you want to remove this trainer?")) return;
        try {
            const res = await fetch(`/api/fitness/trainers/${id}`, { method: 'DELETE' });
            if (res.ok) fetchTrainers();
        } catch (err) {
            console.error("Failed to delete trainer:", err);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            specialty: "",
            bio: "",
            image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop",
            status: "Active"
        });
        setEditingId(null);
    };

    const openEditModal = (trainer: any) => {
        setFormData({
            name: trainer.name,
            specialty: trainer.specialty,
            bio: trainer.bio || "",
            image: trainer.image || "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop",
            status: trainer.status
        });
        setEditingId(trainer.id);
        setIsEditModalOpen(true);
    };

    return (
        <div>
            <AdminHeader title="Trainers" />

            <div className="p-8">
                {/* Actions Bar */}
                <div className="flex items-center justify-between mb-8">
                    <p className={`${colors.textMuted} text-sm`}>{trainers.length} trainers registered</p>
                    <button
                        onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                        className="flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors"
                    >
                        <FiPlus /> Add Trainer
                    </button>
                </div>

                {/* Trainers Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <FiLoader className="w-8 h-8 text-[#D4AF37] animate-spin" />
                        <p className={`${colors.textMuted} text-[10px] uppercase tracking-[0.2em] font-bold`}>Chargement de l'équipe...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trainers.map((trainer, index) => (
                            <motion.div
                                key={trainer.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className={`${colors.card} border ${colors.border} rounded-2xl overflow-hidden hover:border-[#D4AF37]/20 transition-colors group shadow-sm`}
                            >
                                {/* Image */}
                                <div className={`relative h-48 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
                                    {trainer.image ? (
                                        <Image
                                            src={trainer.image}
                                            alt={trainer.name}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    ) : (
                                        <div aria-hidden="true" className="w-full h-full flex items-center justify-center text-white/20 text-6xl font-black">
                                            {trainer.name.charAt(0)}
                                        </div>
                                    )}
                                    <div aria-hidden="true" className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(trainer)}
                                            className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                        >
                                            <FiEdit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => deleteTrainer(trainer.id)}
                                            className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-red-500 transition-all"
                                        >
                                            <FiTrash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className={`${colors.text} font-bold text-lg`}>{trainer.name}</h3>
                                            <p className="text-[#D4AF37] text-xs uppercase tracking-wider">{trainer.specialty}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${trainer.status === "Active"
                                            ? "bg-green-500/10 text-green-500"
                                            : "bg-gray-500/10 text-gray-500"
                                            }`}>
                                            {trainer.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6 text-sm">
                                        <div className={`flex items-center gap-2 ${colors.textSubtle}`}>
                                            <FiCalendar className="text-[#D4AF37]" />
                                            <span>Sessions actives</span>
                                        </div>
                                        <div className={`flex items-center gap-2 ${colors.textSubtle}`}>
                                            <FiStar className="text-[#D4AF37]" />
                                            <span>Elite</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
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
                                    {isAddModalOpen ? "Nouveau Coach" : "Modifier Coach"}
                                </h3>
                                <button
                                    onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                                    className={`${colors.textMuted} hover:${colors.text} transition-colors`}
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            <form onSubmit={isAddModalOpen ? handleAddTrainer : handleUpdateTrainer} className="space-y-6">
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Nom Complet</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                        placeholder="Marc Aurele"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Spécialité</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.specialty}
                                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                        placeholder="Force & Conditionnement"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Bio</label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50 h-24`}
                                        placeholder="Expert en..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#D4AF37] text-black text-[10px] uppercase font-black tracking-[0.3em] rounded-xl hover:bg-white transition-all mt-4"
                                >
                                    {isAddModalOpen ? "Recruter le Coach" : "Enregistrer"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
