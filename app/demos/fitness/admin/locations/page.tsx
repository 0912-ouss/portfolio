"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { FiPlus, FiEdit2, FiMapPin, FiClock, FiLoader, FiTrash2, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme, themeColors } from "@/components/demos/fitness/admin/ThemeContext";

export default function LocationsPage() {
    const { theme } = useTheme();
    const colors = themeColors[theme];

    const [locations, setLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        city: "",
        address: "",
        hours: "06:00 - 23:00",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000",
        status: "Active"
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/fitness/locations");
            const data = await res.json();
            if (data.success) {
                setLocations(data.data);
            }
        } catch (err) {
            console.error("Failed to fetch locations:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddLocation = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/fitness/locations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setIsAddModalOpen(false);
                resetForm();
                fetchLocations();
            }
        } catch (err) {
            console.error("Failed to add location:", err);
        }
    };

    const handleUpdateLocation = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;

        try {
            const res = await fetch(`/api/fitness/locations/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setIsEditModalOpen(false);
                resetForm();
                fetchLocations();
            }
        } catch (err) {
            console.error("Failed to update location:", err);
        }
    };

    const deleteLocation = async (id: string) => {
        if (!confirm("Are you sure you want to remove this location?")) return;
        try {
            const res = await fetch(`/api/fitness/locations/${id}`, { method: 'DELETE' });
            if (res.ok) fetchLocations();
        } catch (err) {
            console.error("Failed to delete location:", err);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            city: "",
            address: "",
            hours: "06:00 - 23:00",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000",
            status: "Active"
        });
        setEditingId(null);
    };

    const openEditModal = (location: any) => {
        setFormData({
            name: location.name,
            city: location.city,
            address: location.address,
            hours: location.hours,
            image: location.image || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000",
            status: location.status
        });
        setEditingId(location.id);
        setIsEditModalOpen(true);
    };

    return (
        <div>
            <AdminHeader title="Locations" />

            <div className="p-8">
                {/* Actions Bar */}
                <div className="flex items-center justify-between mb-8">
                    <p className={`${colors.textMuted} text-sm`}>{locations.length} locations active</p>
                    <button
                        onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                        className="flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-2 rounded-lg font-bold text-sm hover:bg-white transition-colors"
                    >
                        <FiPlus /> Add Location
                    </button>
                </div>

                {/* Locations Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <FiLoader className="w-8 h-8 text-[#D4AF37] animate-spin" />
                        <p className={`${colors.textMuted} text-[10px] uppercase tracking-[0.2em] font-bold`}>Chargement des clubs...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {locations.map((location, index) => (
                            <motion.div
                                key={location.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`${colors.card} border ${colors.border} rounded-2xl overflow-hidden hover:border-[#D4AF37]/20 transition-colors group shadow-sm`}
                            >
                                {/* Image */}
                                <div className="relative h-40">
                                    <Image
                                        src={location.image}
                                        alt={location.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-[#0A0A0A]' : 'from-white'} to-transparent`} />
                                    <div aria-hidden="true" className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(location)}
                                            className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                        >
                                            <FiEdit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => deleteLocation(location.id)}
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
                                            <span className="text-[#D4AF37] text-[10px] uppercase tracking-wider font-bold">{location.city}</span>
                                            <h3 className={`${colors.text} font-bold text-lg`}>{location.name}</h3>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${location.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"}`}>
                                            {location.status}
                                        </span>
                                    </div>

                                    <div className={`space-y-2 text-sm ${colors.textSubtle}`}>
                                        <div className="flex items-start gap-2">
                                            <FiMapPin className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                                            <span>{location.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FiClock className="text-[#D4AF37]" />
                                            <span>{location.hours}</span>
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
                                    {isAddModalOpen ? "Nouveau Club" : "Modifier Club"}
                                </h3>
                                <button
                                    onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                                    className={`${colors.textMuted} hover:${colors.text} transition-colors`}
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            <form onSubmit={isAddModalOpen ? handleAddLocation : handleUpdateLocation} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Ville</label>
                                        <input
                                            type="text" required
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                            placeholder="Casablanca"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Nom du Club</label>
                                        <input
                                            type="text" required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                            placeholder="The Oasis"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Adresse</label>
                                    <input
                                        type="text" required
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50`}
                                        placeholder="123 Rue de la Sport..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#D4AF37] text-black text-[10px] uppercase font-black tracking-[0.3em] rounded-xl hover:bg-white transition-all mt-4"
                                >
                                    {isAddModalOpen ? "Ouvrir le Club" : "Enregistrer"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
