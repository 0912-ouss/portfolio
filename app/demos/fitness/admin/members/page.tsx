"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { AdminAuthGuard } from "@/components/demos/fitness/admin/AdminAuthGuard";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiLoader, FiX, FiCheck, FiKey, FiCopy, FiDownload, FiFilter } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, themeColors } from "@/components/demos/fitness/admin/ThemeContext";

export default function MembersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { theme } = useTheme();
    const colors = themeColors[theme];

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [members, setMembers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        status: "ALL",
        role: "ALL",
        membershipId: "ALL",
        dateFrom: "",
        dateTo: ""
    });

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Form States
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", membershipId: "MEMBER", status: "Active", role: "MEMBER" });
    const [editingId, setEditingId] = useState<string | null>(null);

    // Toast Notification
    const [toast, setToast] = useState<{ 
        type: 'success' | 'error' | 'info'; 
        message: string; 
        credentials?: { email: string; password: string } 
    } | null>(null);

    // Confirmation Modal
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
        confirmText?: string;
        cancelText?: string;
        type?: 'reset' | 'delete';
    } | null>(null);

    // Authentication guard
    useEffect(() => {
        if (status === "loading") return;
        
        if (status === "unauthenticated") {
            router.push("/demos/fitness/login");
            return;
        }
        
        if (session?.user?.role !== "ADMIN") {
            router.push("/demos/fitness");
            return;
        }
    }, [session, status, router]);

    useEffect(() => {
        if (session?.user?.role === "ADMIN") {
            fetchMembers();
        }
    }, [session]);

    const fetchMembers = async () => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch("/api/fitness/members");
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to fetch members");
            }
            
            setMembers(data.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to fetch members:", err);
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

    const handleResetPassword = (member: any) => {
        setConfirmModal({
            isOpen: true,
            title: "Réinitialiser le mot de passe",
            message: `Réinitialiser le mot de passe pour ${member.firstName} ${member.lastName} (${member.email})? Un nouveau mot de passe sera généré.`,
            onConfirm: async () => {
                setConfirmModal(null);
                try {
                    setError(null);
                    const res = await fetch(`/api/fitness/members/${member.id}/reset-password`, {
                        method: "POST"
                    });
                    const data = await res.json();

                    if (!res.ok || !data.success) {
                        throw new Error(data.error || "Failed to reset password");
                    }

                    showToast('success', 'Mot de passe réinitialisé avec succès!', data.credentials);
                } catch (err) {
                    const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
                    setError(errorMessage);
                    showToast('error', errorMessage);
                    if (process.env.NODE_ENV !== 'production') {
                        console.error("Failed to reset password:", err);
                    }
                }
            },
            confirmText: "Réinitialiser",
            cancelText: "Annuler",
            type: 'reset'
        });
    };

    const handleDelete = (id: string) => {
        setConfirmModal({
            isOpen: true,
            title: "Supprimer le membre",
            message: "Supprimer définitivement ce membre? Cette action est irréversible.",
            onConfirm: async () => {
                setConfirmModal(null);
                await deleteMember(id);
            },
            confirmText: "Supprimer",
            cancelText: "Annuler",
            type: 'delete'
        });
    };

    const handleAddMember = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError(null);
            const res = await fetch("/api/fitness/members", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, role: "MEMBER" })
            });
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to add member");
            }
            
            setIsAddModalOpen(false);
            setFormData({ firstName: "", lastName: "", email: "", membershipId: "MEMBER", status: "Active", role: "MEMBER" });
            showToast('success', 'Membre ajouté avec succès.');
            fetchMembers();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            showToast('error', errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to add member:", err);
            }
        }
    };

    const openEditModal = (member: any) => {
        setFormData({
            firstName: member.firstName,
            lastName: member.lastName,
            email: member.email,
            membershipId: member.membershipId || "MEMBER",
            status: member.status || "Active",
            role: member.role || "MEMBER"
        });
        setEditingId(member.id);
        setIsEditModalOpen(true);
    };

    const handleUpdateMember = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;

        try {
            setError(null);
            const res = await fetch(`/api/fitness/members/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to update member");
            }

            setIsEditModalOpen(false);
            setEditingId(null);
            setFormData({ firstName: "", lastName: "", email: "", membershipId: "MEMBER", status: "Active", role: "MEMBER" });
            showToast('success', 'Membre modifié avec succès.');
            fetchMembers();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to update member:", err);
            }
        }
    };

    const deleteMember = async (id: string) => {
        try {
            setError(null);
            const res = await fetch(`/api/fitness/members/${id}`, { method: 'DELETE' });
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to delete member");
            }
            
            showToast('success', 'Membre supprimé avec succès.');
            fetchMembers();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            showToast('error', errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to delete member:", err);
            }
        }
    };

    const filteredMembers = members.filter(member => {
        const matchesSearch = 
            member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = filters.status === "ALL" || member.status === filters.status;
        const matchesRole = filters.role === "ALL" || member.role === filters.role;
        const matchesMembership = filters.membershipId === "ALL" || member.membershipId === filters.membershipId;
        
        const matchesDate = (!filters.dateFrom || new Date(member.createdAt) >= new Date(filters.dateFrom)) &&
                           (!filters.dateTo || new Date(member.createdAt) <= new Date(filters.dateTo));
        
        return matchesSearch && matchesStatus && matchesRole && matchesMembership && matchesDate;
    });

    const toggleSelectMember = (id: string) => {
        setSelectedMembers(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedMembers.length === filteredMembers.length) {
            setSelectedMembers([]);
        } else {
            setSelectedMembers(filteredMembers.map(m => m.id));
        }
    };

    const handleBulkDelete = async () => {
        if (selectedMembers.length === 0) return;
        setConfirmModal({
            isOpen: true,
            title: "Supprimer les membres",
            message: `Supprimer définitivement ${selectedMembers.length} membre(s)? Cette action est irréversible.`,
            onConfirm: async () => {
                setConfirmModal(null);
                try {
                    setError(null);
                    const promises = selectedMembers.map(id =>
                        fetch(`/api/fitness/members/${id}`, { method: 'DELETE' })
                    );
                    await Promise.all(promises);
                    setSelectedMembers([]);
                    showToast('success', `${selectedMembers.length} membre(s) supprimé(s) avec succès.`);
                    fetchMembers();
                } catch (err) {
                    const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
                    setError(errorMessage);
                    showToast('error', errorMessage);
                }
            },
            confirmText: "Supprimer",
            cancelText: "Annuler",
            type: 'delete'
        });
    };

    const handleBulkStatusUpdate = async (newStatus: string) => {
        if (selectedMembers.length === 0) return;
        try {
            setError(null);
            const promises = selectedMembers.map(id =>
                fetch(`/api/fitness/members/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: newStatus })
                })
            );
            await Promise.all(promises);
            setSelectedMembers([]);
            showToast('success', `${selectedMembers.length} membre(s) mis à jour avec succès.`);
            fetchMembers();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            showToast('error', errorMessage);
        }
    };

    const exportToCSV = () => {
        const headers = ["Prénom", "Nom", "Email", "Téléphone", "Rôle", "Statut", "Abonnement", "Date d'inscription"];
        const rows = filteredMembers.map(member => [
            member.firstName || "",
            member.lastName || "",
            member.email || "",
            member.phone || "",
            member.role || "MEMBER",
            member.status || "Active",
            member.membershipId || "MEMBER",
            new Date(member.createdAt).toLocaleDateString('fr-FR')
        ]);

        const csv = [
            headers.join(","),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
        ].join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `members-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // Show loading while checking auth
    if (status === "loading" || !session || session.user?.role !== "ADMIN") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
                    <p className="text-white/40 text-sm">Vérification de l'autorisation...</p>
                </div>
            </div>
        );
    }

    return (
        <AdminAuthGuard>
            <div>
                <AdminHeader title="Members Management" />

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
                                    <FiKey className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                )}
                                <div className="flex-1">
                                    <p className="text-sm font-bold mb-2">{toast.message}</p>
                                    
                                    {/* Credentials Display */}
                                    {toast.credentials && (
                                        <div className="mt-3 pt-3 border-t border-white/20 space-y-2">
                                            <p className="text-xs font-semibold opacity-90 mb-2">Nouveaux identifiants:</p>
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
                                                        <p className="text-[10px] uppercase tracking-wider opacity-70 mb-0.5">Nouveau mot de passe</p>
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
                                            <p className="text-[10px] mt-2 opacity-80">⚠️ Veuillez communiquer ces identifiants au membre.</p>
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
                                {confirmModal.type === 'reset' ? (
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <FiKey className="text-blue-400 w-5 h-5" />
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
                                        confirmModal.type === 'reset'
                                            ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
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

                <div className="p-8">
                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <div className="relative w-full md:w-96">
                        <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${colors.textMuted}`} />
                        <input
                            type="text"
                            placeholder="Search members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full ${colors.input} rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#D4AF37]/50`}
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button
                            onClick={() => {
                                setFormData({ firstName: "", lastName: "", email: "", membershipId: "MEMBER", status: "Active", role: "MEMBER" });
                                setIsAddModalOpen(true);
                            }}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-white transition-colors"
                        >
                            <FiPlus /> Add Member
                        </button>
                    </div>
                </div>

                {/* Members Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${colors.card} border ${colors.border} rounded-2xl overflow-hidden shadow-sm`}
                >
                    <table className="w-full">
                                    <thead className={theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}>
                                        <tr>
                                            <th className="px-6 py-4 text-left">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                                                    onChange={toggleSelectAll}
                                                    className="rounded"
                                                />
                                            </th>
                                            <th className={`text-left px-6 py-4 text-xs uppercase tracking-wider ${colors.textMuted} font-bold`}>Member</th>
                                            <th className={`text-left px-6 py-4 text-xs uppercase tracking-wider ${colors.textMuted} font-bold`}>Email</th>
                                            <th className={`text-left px-6 py-4 text-xs uppercase tracking-wider ${colors.textMuted} font-bold`}>Membership</th>
                                            <th className={`text-left px-6 py-4 text-xs uppercase tracking-wider ${colors.textMuted} font-bold`}>Status</th>
                                            <th className={`text-left px-6 py-4 text-xs uppercase tracking-wider ${colors.textMuted} font-bold`}>Join Date</th>
                                            <th className={`text-right px-6 py-4 text-xs uppercase tracking-wider ${colors.textMuted} font-bold`}>Actions</th>
                                        </tr>
                                    </thead>
                        <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-gray-100'}`}>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <FiLoader className="w-8 h-8 text-[#D4AF37] animate-spin" />
                                            <p className={`${colors.textMuted} text-[10px] uppercase tracking-[0.2em] font-bold`}>Chargement des membres...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredMembers.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-20 text-center">
                                        <p className={`${colors.textMuted} text-sm`}>Aucun membre trouvé.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredMembers.map((member) => (
                                    <tr key={member.id} className={`${colors.hover} transition-colors group`}>
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedMembers.includes(member.id)}
                                                onChange={() => toggleSelectMember(member.id)}
                                                className="rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-sm">
                                                    {member.firstName[0]}{member.lastName[0]}
                                                </div>
                                                <span className={`${colors.text} font-medium`}>
                                                    {member.firstName} {member.lastName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 ${colors.textSubtle} text-sm`}>{member.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${member.membershipId === "Infinity"
                                                ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                                                : theme === 'dark' ? "bg-white/10 text-white/60" : "bg-gray-100 text-gray-600"
                                                }`}>
                                                {member.membershipId || "MEMBER"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${member.status === "Active" || !member.status
                                                ? "bg-green-500/10 text-green-500"
                                                : "bg-red-500/10 text-red-500"
                                                }`}>
                                                {member.status || "Active"}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 ${colors.textSubtle} text-xs font-mono`}>
                                            {new Date(member.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div aria-hidden="true" className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openEditModal(member)}
                                                    className={`w-8 h-8 rounded-lg ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'} flex items-center justify-center ${colors.textMuted} hover:${colors.text} transition-all`}
                                                >
                                                    <FiEdit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleResetPassword(member)}
                                                    className={`w-8 h-8 rounded-lg ${theme === 'dark' ? 'bg-white/5 hover:bg-blue-500/10' : 'bg-gray-100 hover:bg-blue-50'} flex items-center justify-center ${colors.textMuted} hover:text-blue-500 transition-all`}
                                                    title="Réinitialiser le mot de passe"
                                                >
                                                    <FiKey size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(member.id)}
                                                    className={`w-8 h-8 rounded-lg ${theme === 'dark' ? 'bg-white/5 hover:bg-red-500/10' : 'bg-gray-100 hover:bg-red-50'} flex items-center justify-center ${colors.textMuted} hover:text-red-500 transition-all`}
                                                    title="Supprimer le membre"
                                                >
                                                    <FiTrash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </motion.div>
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
                                    {isAddModalOpen ? "Nouveau Membre" : "Modifier Membre"}
                                </h3>
                                <button
                                    onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                                    className={`${colors.textMuted} hover:${colors.text} transition-colors`}
                                >
                                    <FiX size={20} />
                                </button>
                            </div>

                            <form onSubmit={isAddModalOpen ? handleAddMember : handleUpdateMember} className="space-y-6">
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Prénom</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors`}
                                        placeholder="Jean"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Nom</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors`}
                                        placeholder="Dupont"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors`}
                                        placeholder="jean.dupont@elysium.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Abonnement</label>
                                    <select
                                        value={formData.membershipId}
                                        onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors`}
                                    >
                                        <option value="MEMBER">MEMBER (Standard)</option>
                                        <option value="PLATINUM">PLATINUM (Premium)</option>
                                        <option value="INFINITY">INFINITY (Elite)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Rôle</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors`}
                                    >
                                        <option value="MEMBER">MEMBER (Membre)</option>
                                        <option value="CLIENT">CLIENT (Client)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-[10px] uppercase tracking-widest ${colors.textMuted} font-bold`}>Statut</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className={`w-full ${colors.input} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors`}
                                    >
                                        <option value="Active">Active (Peut se connecter)</option>
                                        <option value="Inactive">Inactive (Bloqué)</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#D4AF37] text-black text-[10px] uppercase font-black tracking-[0.3em] rounded-xl hover:bg-white transition-all mt-4"
                                >
                                    {isAddModalOpen ? "Créer le Compte" : "Enregistrer"}
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
