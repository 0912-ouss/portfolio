"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { AdminAuthGuard } from "@/components/demos/fitness/admin/AdminAuthGuard";
import { FiMessageSquare, FiCheck, FiClock, FiLoader, FiTrash2, FiX, FiCopy, FiMail } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, themeColors } from "@/components/demos/fitness/admin/ThemeContext";

export default function InquiriesPage() {
    const { theme } = useTheme();
    const colors = themeColors[theme];

    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ 
        type: 'success' | 'error' | 'info'; 
        message: string; 
        credentials?: { email: string; password: string } 
    } | null>(null);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
        confirmText?: string;
        cancelText?: string;
        type?: 'approve' | 'reject' | 'delete';
    } | null>(null);

    const statusStyles = {
        "PENDING": "bg-yellow-500/20 text-yellow-400",
        "IN_PROGRESS": "bg-blue-500/20 text-blue-400",
        "RESOLVED": "bg-green-500/20 text-green-400",
        "APPROVED": "bg-green-500/20 text-green-400",
        "REJECTED": "bg-red-500/20 text-red-400"
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch("/api/fitness/inquiries");
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to fetch inquiries");
            }
            
            setInquiries(data.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to fetch inquiries:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    const showToast = (type: 'success' | 'error' | 'info', message: string, credentials?: { email: string; password: string }) => {
        setToast({ type, message, credentials });
        // Auto-dismiss after 8 seconds for credentials, 4 seconds for others
        setTimeout(() => setToast(null), credentials ? 8000 : 4000);
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text).then(() => {
            // Show a brief success indicator without replacing the main toast
            const currentToast = toast;
            setToast({ type: 'success', message: `${label} copié!` });
            setTimeout(() => {
                // Restore previous toast if it was showing credentials
                if (currentToast?.credentials) {
                    setToast(currentToast);
                } else {
                    setToast(null);
                }
            }, 1500);
        }).catch(() => {
            showToast('error', 'Erreur lors de la copie');
        });
    };

    const handleApprove = (id: string) => {
        setConfirmModal({
            isOpen: true,
            title: "Approuver la candidature",
            message: "Approuver cette candidature et créer un compte utilisateur?",
            onConfirm: () => {
                setConfirmModal(null);
                updateStatus(id, "APPROVED");
            },
            confirmText: "Approuver",
            cancelText: "Annuler",
            type: 'approve'
        });
    };

    const handleReject = (id: string) => {
        setConfirmModal({
            isOpen: true,
            title: "Refuser la candidature",
            message: "Refuser cette candidature? L'utilisateur ne pourra pas se connecter.",
            onConfirm: () => {
                setConfirmModal(null);
                updateStatus(id, "REJECTED");
            },
            confirmText: "Refuser",
            cancelText: "Annuler",
            type: 'reject'
        });
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            setError(null);
            const res = await fetch(`/api/fitness/inquiries/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to update inquiry");
            }
            
            // If user was created, show credentials in toast
            if (data.userCreated && data.credentials) {
                showToast('success', 'Candidature approuvée! Compte créé avec succès.', data.credentials);
            } else if (status === "REJECTED") {
                showToast('error', 'Candidature refusée. L\'utilisateur ne pourra pas se connecter.');
            } else if (status === "APPROVED") {
                showToast('success', 'Candidature approuvée avec succès.');
            }
            
            fetchInquiries();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            showToast('error', errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to update inquiry:", err);
            }
        }
    };

    const handleDelete = (id: string) => {
        setConfirmModal({
            isOpen: true,
            title: "Supprimer la candidature",
            message: "Supprimer définitivement cette candidature? Cette action est irréversible.",
            onConfirm: async () => {
                setConfirmModal(null);
                try {
                    setError(null);
                    const res = await fetch(`/api/fitness/inquiries/${id}`, { method: "DELETE" });
                    const data = await res.json();
                    
                    if (!res.ok || !data.success) {
                        throw new Error(data.error || "Failed to delete inquiry");
                    }
                    
                    showToast('success', 'Candidature supprimée avec succès.');
                    fetchInquiries();
                } catch (err) {
                    const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
                    setError(errorMessage);
                    showToast('error', errorMessage);
                    if (process.env.NODE_ENV !== 'production') {
                        console.error("Failed to delete inquiry:", err);
                    }
                }
            },
            confirmText: "Supprimer",
            cancelText: "Annuler",
            type: 'delete'
        });
    };

    const stats = {
        pending: inquiries.filter(i => i.status === "PENDING").length,
        resolved: inquiries.filter(i => i.status === "RESOLVED" || i.status === "APPROVED").length,
        rejected: inquiries.filter(i => i.status === "REJECTED").length,
        total: inquiries.length
    };

    return (
        <AdminAuthGuard>
            <div>
                <AdminHeader title="Inquiries" />
                {error && (
                    <div className="mx-8 mt-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
                        {error}
                    </div>
                )}

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        className={`fixed top-6 left-1/2 z-[200] max-w-md w-[90%] ${toast.type === 'success'
                                ? 'bg-green-500/95 text-white'
                                : toast.type === 'error'
                                ? 'bg-red-500/95 text-white'
                                : 'bg-blue-500/95 text-white'
                            } rounded-xl shadow-2xl backdrop-blur-md`}
                    >
                        <div className="p-4">
                            <div className="flex items-start gap-3">
                                {toast.type === 'success' ? (
                                    <FiCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                ) : toast.type === 'error' ? (
                                    <FiX className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                ) : (
                                    <FiMessageSquare className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                )}
                                <div className="flex-1">
                                    <p className="text-sm font-bold mb-2">{toast.message}</p>
                                    
                                    {/* Credentials Display */}
                                    {toast.credentials && (
                                        <div className="mt-3 pt-3 border-t border-white/20 space-y-2">
                                            <p className="text-xs font-semibold opacity-90 mb-2">Identifiants créés:</p>
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2">
                                                    <div className="flex-1">
                                                        <p className="text-[10px] uppercase tracking-wider opacity-70 mb-0.5">Email</p>
                                                        <p className="text-xs font-mono">{toast.credentials.email}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(toast.credentials!.email, 'Email')}
                                                        className="ml-2 p-1.5 hover:bg-white/20 rounded transition-colors"
                                                        title="Copier l'email"
                                                    >
                                                        <FiCopy className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2">
                                                    <div className="flex-1">
                                                        <p className="text-[10px] uppercase tracking-wider opacity-70 mb-0.5">Mot de passe</p>
                                                        <p className="text-xs font-mono">{toast.credentials.password}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(toast.credentials!.password, 'Mot de passe')}
                                                        className="ml-2 p-1.5 hover:bg-white/20 rounded transition-colors"
                                                        title="Copier le mot de passe"
                                                    >
                                                        <FiCopy className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-[10px] mt-2 opacity-80">⚠️ Veuillez communiquer ces identifiants au client.</p>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => setToast(null)}
                                    className="p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0"
                                >
                                    <FiX className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="p-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
                            <p className={`${colors.textMuted} text-xs`}>Approuvées</p>
                        </div>
                    </div>
                    <div className={`${colors.card} border ${colors.border} rounded-xl p-4 flex items-center gap-4`}>
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <FiX className="text-red-400" />
                        </div>
                        <div>
                            <p className={`text-2xl font-bold ${colors.text}`}>{stats.rejected}</p>
                            <p className={`${colors.textMuted} text-xs`}>Refusées</p>
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
                                                onClick={() => handleDelete(inquiry.id)}
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
                                                onClick={() => handleApprove(inquiry.id)}
                                                className="px-6 py-2 bg-green-500/20 text-green-400 text-[10px] uppercase font-black tracking-widest rounded-lg hover:bg-green-500/30 transition-all flex items-center gap-2"
                                            >
                                                <FiCheck /> Approuver
                                            </button>
                                            <button
                                                onClick={() => handleReject(inquiry.id)}
                                                className="px-6 py-2 bg-red-500/20 text-red-400 text-[10px] uppercase font-black tracking-widest rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2"
                                            >
                                                <FiX /> Refuser
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {confirmModal?.isOpen && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setConfirmModal(null)}
                            className="absolute inset-0 bg-black/70 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`relative w-full max-w-md ${colors.card} border ${colors.border} rounded-2xl p-6 shadow-2xl`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                {confirmModal.type === 'approve' ? (
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <FiCheck className="text-green-400 w-5 h-5" />
                                    </div>
                                ) : confirmModal.type === 'reject' ? (
                                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                        <FiX className="text-red-400 w-5 h-5" />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                        <FiTrash2 className="text-red-400 w-5 h-5" />
                                    </div>
                                )}
                                <h3 className={`${colors.text} text-lg font-bold`}>
                                    {confirmModal.title}
                                </h3>
                            </div>
                            
                            <p className={`${colors.textSubtle} text-sm mb-6`}>
                                {confirmModal.message}
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setConfirmModal(null)}
                                    className={`flex-1 px-4 py-2 ${colors.input} rounded-lg text-sm font-bold transition-colors`}
                                >
                                    {confirmModal.cancelText || "Annuler"}
                                </button>
                                <button
                                    onClick={confirmModal.onConfirm}
                                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                                        confirmModal.type === 'approve'
                                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                            : confirmModal.type === 'reject'
                                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                            : 'bg-red-500 text-white hover:bg-red-600'
                                    }`}
                                >
                                    {confirmModal.confirmText || "Confirmer"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            </div>
        </AdminAuthGuard>
    );
}
