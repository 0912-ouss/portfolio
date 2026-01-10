"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { AdminAuthGuard } from "@/components/demos/fitness/admin/AdminAuthGuard";
import { FiPlus, FiLoader, FiX, FiCheck, FiAlertCircle, FiInfo, FiBell } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, themeColors } from "@/components/demos/fitness/admin/ThemeContext";

export default function NotificationsPage() {
    const { theme } = useTheme();
    const colors = themeColors[theme];

    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        type: "INFO",
        targetType: "ALL",
        targetValue: ""
    });

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch("/api/fitness/notifications");
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to fetch notifications");
            }

            setNotifications(data.data || []);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError(null);
            const res = await fetch("/api/fitness/notifications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to send notification");
            }

            setIsModalOpen(false);
            setFormData({ title: "", message: "", type: "INFO", targetType: "ALL", targetValue: "" });
            fetchNotifications();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "SUCCESS": return <FiCheck className="text-green-500" />;
            case "WARNING": return <FiAlertCircle className="text-yellow-500" />;
            case "ERROR": return <FiX className="text-red-500" />;
            default: return <FiInfo className="text-blue-500" />;
        }
    };

    return (
        <AdminAuthGuard>
            <div>
                <AdminHeader title="Notifications" />
                
                {error && (
                    <div className="mx-8 mt-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className={`${colors.text} text-xl font-bold`}>Notifications & Annonces</h2>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-[#D4AF37] text-black px-4 py-2 rounded-xl font-bold text-sm hover:bg-white transition-colors"
                        >
                            <FiPlus /> Nouvelle Notification
                        </button>
                    </div>

                    {loading ? (
                        <div className="p-20 text-center">
                            <FiLoader className="w-8 h-8 text-[#D4AF37] animate-spin mx-auto mb-4" />
                            <p className={`${colors.textMuted} text-sm`}>Chargement...</p>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className={`${colors.card} border ${colors.border} rounded-xl p-20 text-center`}>
                            <FiBell className={`w-12 h-12 ${colors.textMuted} mx-auto mb-4`} />
                            <p className={`${colors.textMuted} text-sm`}>Aucune notification envoyée.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <motion.div
                                    key={notification.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`${colors.card} border ${colors.border} rounded-xl p-6`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                                            {getTypeIcon(notification.type)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className={`${colors.text} font-bold`}>{notification.title}</h3>
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                    notification.sent ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                                                }`}>
                                                    {notification.sent ? "Envoyée" : "Brouillon"}
                                                </span>
                                            </div>
                                            <p className={`${colors.textSubtle} text-sm mb-4`}>{notification.message}</p>
                                            <div className="flex items-center gap-4 text-xs">
                                                <span className={`${colors.textMuted}`}>
                                                    Destinataires: {notification._count?.recipients || 0}
                                                </span>
                                                <span className={`${colors.textMuted}`}>
                                                    {notification.sentAt 
                                                        ? `Envoyée le ${new Date(notification.sentAt).toLocaleDateString()}`
                                                        : `Créée le ${new Date(notification.createdAt).toLocaleDateString()}`
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Create Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsModalOpen(false)}
                                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className={`relative w-full max-w-md ${colors.card} border ${colors.border} rounded-2xl p-6 shadow-2xl`}
                            >
                                <h3 className={`${colors.text} text-lg font-bold mb-4`}>Nouvelle Notification</h3>
                                
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className={`${colors.textMuted} text-xs font-bold mb-2 block`}>Titre</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className={`w-full ${colors.input} rounded-lg px-3 py-2 text-sm`}
                                            placeholder="Titre de la notification"
                                        />
                                    </div>

                                    <div>
                                        <label className={`${colors.textMuted} text-xs font-bold mb-2 block`}>Message</label>
                                        <textarea
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className={`w-full ${colors.input} rounded-lg px-3 py-2 text-sm`}
                                            rows={4}
                                            placeholder="Message de la notification"
                                        />
                                    </div>

                                    <div>
                                        <label className={`${colors.textMuted} text-xs font-bold mb-2 block`}>Type</label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className={`w-full ${colors.input} rounded-lg px-3 py-2 text-sm`}
                                        >
                                            <option value="INFO">Information</option>
                                            <option value="SUCCESS">Succès</option>
                                            <option value="WARNING">Avertissement</option>
                                            <option value="ERROR">Erreur</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className={`${colors.textMuted} text-xs font-bold mb-2 block`}>Destinataires</label>
                                        <select
                                            value={formData.targetType}
                                            onChange={(e) => setFormData({ ...formData, targetType: e.target.value })}
                                            className={`w-full ${colors.input} rounded-lg px-3 py-2 text-sm`}
                                        >
                                            <option value="ALL">Tous les membres</option>
                                            <option value="ROLE">Par rôle</option>
                                        </select>
                                    </div>

                                    {formData.targetType === "ROLE" && (
                                        <div>
                                            <label className={`${colors.textMuted} text-xs font-bold mb-2 block`}>Rôle</label>
                                            <select
                                                value={formData.targetValue}
                                                onChange={(e) => setFormData({ ...formData, targetValue: e.target.value })}
                                                className={`w-full ${colors.input} rounded-lg px-3 py-2 text-sm`}
                                            >
                                                <option value="MEMBER">Membres</option>
                                                <option value="CLIENT">Clients</option>
                                            </select>
                                        </div>
                                    )}

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className={`flex-1 px-4 py-2 ${colors.input} rounded-lg text-sm font-bold`}
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-4 py-2 bg-[#D4AF37] text-black rounded-lg text-sm font-bold hover:bg-white transition-colors"
                                        >
                                            Envoyer
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </AdminAuthGuard>
    );
}
