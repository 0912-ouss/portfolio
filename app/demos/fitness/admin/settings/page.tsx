"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { FiSave, FiUpload, FiCheck, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsData {
    clubName: string;
    contactEmail: string;
    description: string;
    platinumPrice: number;
    infinityPrice: number;
}

const defaultSettings: SettingsData = {
    clubName: "Elysium Athletics",
    contactEmail: "concierge@elysium-athletics.com",
    description: "L'art de la force rencontre le luxe de la précision. Une expérience réservée à l'élite mondiale.",
    platinumPrice: 180,
    infinityPrice: 290
};

export default function SettingsPage() {
    const [settings, setSettings] = useState<SettingsData>(defaultSettings);
    const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Load settings from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('fitness-admin-settings');
        if (saved) {
            try {
                setSettings(JSON.parse(saved));
            } catch {
                console.error('Failed to parse saved settings');
            }
        }
    }, []);

    // Show toast with auto-dismiss
    const showToast = (type: 'success' | 'error', message: string) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));
            localStorage.setItem('fitness-admin-settings', JSON.stringify(settings));
            showToast('success', 'Paramètres enregistrés avec succès!');
        } catch {
            showToast('error', 'Erreur lors de la sauvegarde');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <AdminHeader title="Settings" />

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        className={`fixed top-6 left-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-xl shadow-2xl ${toast.type === 'success'
                                ? 'bg-green-500/90 text-white'
                                : 'bg-red-500/90 text-white'
                            }`}
                    >
                        {toast.type === 'success' ? <FiCheck /> : <FiX />}
                        <span className="text-sm font-bold">{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="p-8 max-w-4xl">
                {/* General Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-lg font-bold text-white mb-6">General Settings</h2>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/40 font-bold mb-2 block">
                                    Club Name
                                </label>
                                <input
                                    type="text"
                                    value={settings.clubName}
                                    onChange={(e) => setSettings({ ...settings, clubName: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/40 font-bold mb-2 block">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    value={settings.contactEmail}
                                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs uppercase tracking-wider text-white/40 font-bold mb-2 block">
                                Club Description
                            </label>
                            <textarea
                                rows={4}
                                value={settings.description}
                                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 resize-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-xs uppercase tracking-wider text-white/40 font-bold mb-2 block">
                                Logo
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-[#D4AF37] rounded-xl flex items-center justify-center text-black font-black text-3xl">
                                    E
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-white/60 text-sm hover:bg-white/10 transition-colors">
                                    <FiUpload /> Upload New
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Membership Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-lg font-bold text-white mb-6">Membership Pricing</h2>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 border border-white/10 rounded-xl">
                            <h3 className="text-[#D4AF37] font-bold mb-4">Platinum</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-white/40">€</span>
                                <input
                                    type="number"
                                    value={settings.platinumPrice}
                                    onChange={(e) => setSettings({ ...settings, platinumPrice: parseInt(e.target.value) || 0 })}
                                    className="w-24 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-2xl font-bold focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                                />
                                <span className="text-white/40">/month</span>
                            </div>
                        </div>
                        <div className="p-6 border border-[#D4AF37]/30 rounded-xl bg-[#D4AF37]/5">
                            <h3 className="text-[#D4AF37] font-bold mb-4">Infinity</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-white/40">€</span>
                                <input
                                    type="number"
                                    value={settings.infinityPrice}
                                    onChange={(e) => setSettings({ ...settings, infinityPrice: parseInt(e.target.value) || 0 })}
                                    className="w-24 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-2xl font-bold focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                                />
                                <span className="text-white/40">/month</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Save Button */}
                <motion.button
                    onClick={handleSave}
                    disabled={isSaving}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 bg-[#D4AF37] text-black px-8 py-3 rounded-lg font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSaving ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                            />
                            Saving...
                        </>
                    ) : (
                        <>
                            <FiSave /> Save Changes
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
}

