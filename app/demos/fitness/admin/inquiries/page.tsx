"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { FiMessageSquare, FiCheck, FiClock, FiLoader, FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, themeColors } from "@/components/demos/fitness/admin/ThemeContext";

export default function InquiriesPage() {
    const { theme } = useTheme();
    const colors = themeColors[theme];

    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const statusStyles = {
        "PENDING": "bg-yellow-500/20 text-yellow-400",
        "IN_PROGRESS": "bg-blue-500/20 text-blue-400",
        "RESOLVED": "bg-green-500/20 text-green-400"
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/fitness/inquiries");
            const data = await res.json();
            if (data.success) {
                setInquiries(data.data);
            }
        } catch (err) {
            console.error("Failed to fetch inquiries:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/fitness/inquiries/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            if (res.ok) fetchInquiries();
        } catch (err) {
            console.error("Failed to update inquiry:", err);
        }
    };

    const deleteInquiry = async (id: string) => {
        if (!confirm("Delete this inquiry permanentely?")) return;
        try {
            const res = await fetch(`/api/fitness/inquiries/${id}`, { method: "DELETE" });
            if (res.ok) fetchInquiries();
        } catch (err) {
            console.error("Failed to delete inquiry:", err);
        }
    };

    const stats = {
        pending: inquiries.filter(i => i.status === "PENDING").length,
        resolved: inquiries.filter(i => i.status === "RESOLVED").length,
        total: inquiries.length
    };

    return (
        <div>
            <AdminHeader title="Inquiries" />

            <div className="p-8">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className={`${colors.card} border ${colors.border} rounded-xl p-4 flex items-center gap-4`}>
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                            <FiClock className="text-yellow-400" />
                        </div>
                        <div>
                            <p className={`text-2xl font-bold ${colors.text}`}>{stats.pending}</p>
                            <p className={`${colors.textMuted} text-xs`}>En attente</p>
                        </div>
                    </div>
                    <div className={`${colors.card} border ${colors.border} rounded-xl p-4 flex items-center gap-4`}>
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <FiCheck className="text-green-400" />
                        </div>
                        <div>
                            <p className={`text-2xl font-bold ${colors.text}`}>{stats.resolved}</p>
                            <p className={`${colors.textMuted} text-xs`}>Résolues</p>
                        </div>
                    </div>
                    <div className={`${colors.card} border ${colors.border} rounded-xl p-4 flex items-center gap-4`}>
                        <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                            <FiMessageSquare className="text-[#D4AF37]" />
                        </div>
                        <div>
                            <p className={`text-2xl font-bold ${colors.text}`}>{stats.total}</p>
                            <p className={`${colors.textMuted} text-xs`}>Total</p>
                        </div>
                    </div>
                </div>

                {/* Inquiries List */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <FiLoader className="w-8 h-8 text-[#D4AF37] animate-spin" />
                        <p className={`${colors.textMuted} text-[10px] uppercase tracking-[0.2em] font-bold`}>Chargement des messages...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {inquiries.length === 0 ? (
                            <div className={`text-center py-20 ${colors.card} border ${colors.border} rounded-2xl`}>
                                <p className={`${colors.textMuted} text-sm`}>Aucun message pour le moment.</p>
                            </div>
                        ) : (
                            inquiries.map((inquiry, index) => (
                                <motion.div
                                    key={inquiry.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`${colors.card} border ${colors.border} rounded-2xl p-6 hover:border-[#D4AF37]/20 transition-colors group shadow-sm`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold">
                                                {inquiry.name.split(' ').map((n: string) => n[0]).join('')}
                                            </div>
                                            <div>
                                                <h3 className={`${colors.text} font-bold`}>{inquiry.name}</h3>
                                                <p className={`${colors.textMuted} text-sm`}>{inquiry.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${statusStyles[inquiry.status as keyof typeof statusStyles]}`}>
                                                {inquiry.status}
                                            </span>
                                            <span className={`${colors.textMuted} text-[10px] font-mono`}>
                                                {new Date(inquiry.createdAt).toLocaleDateString()}
                                            </span>
                                            <button
                                                onClick={() => deleteInquiry(inquiry.id)}
                                                className={`p-2 ${colors.textMuted} hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100`}
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="pl-16">
                                        <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.2em] font-bold mb-2">{inquiry.subject}</p>
                                        <p className={`${colors.textSubtle} text-sm leading-relaxed`}>{inquiry.message}</p>
                                    </div>

                                    {inquiry.status === "PENDING" && (
                                        <div className="flex gap-2 mt-6 pl-16">
                                            <button
                                                onClick={() => updateStatus(inquiry.id, "RESOLVED")}
                                                className="px-6 py-2 bg-green-500/20 text-green-400 text-[10px] uppercase font-black tracking-widest rounded-lg hover:bg-green-500/30 transition-all flex items-center gap-2"
                                            >
                                                <FiCheck /> Marquer comme résolu
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
