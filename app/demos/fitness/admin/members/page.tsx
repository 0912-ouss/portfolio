"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiLoader, FiX, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, themeColors } from "@/components/demos/fitness/admin/ThemeContext";

export default function MembersPage() {
    const { theme } = useTheme();
    const colors = themeColors[theme];

    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Form States
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", membershipId: "MEMBER" });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/fitness/members");
            const data = await res.json();
            if (data.success) {
                setMembers(data.data);
            }
        } catch (err) {
            console.error("Failed to fetch members:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMember = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/fitness/members", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, role: "MEMBER" })
            });
            if (res.ok) {
                setIsAddModalOpen(false);
                setFormData({ firstName: "", lastName: "", email: "", membershipId: "MEMBER" });
                fetchMembers();
            }
        } catch (err) {
            console.error("Failed to add member:", err);
        }
    };

    const openEditModal = (member: any) => {
        setFormData({
            firstName: member.firstName,
            lastName: member.lastName,
            email: member.email,
            membershipId: member.membershipId || "MEMBER"
        });
        setEditingId(member.id);
        setIsEditModalOpen(true);
    };

    const handleUpdateMember = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;

        try {
            const res = await fetch(`/api/fitness/members/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setIsEditModalOpen(false);
                setEditingId(null);
                setFormData({ firstName: "", lastName: "", email: "", membershipId: "MEMBER" });
                fetchMembers();
            }
        } catch (err) {
            console.error("Failed to update member:", err);
        }
    };

    const deleteMember = async (id: string) => {
        if (!confirm("Are you sure you want to delete this member?")) return;
        try {
            const res = await fetch(`/api/fitness/members/${id}`, { method: 'DELETE' });
            if (res.ok) fetchMembers();
        } catch (err) {
            console.error("Failed to delete member:", err);
        }
    };

    const filteredMembers = members.filter(member =>
        member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <AdminHeader title="Members Management" />

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
                                setFormData({ firstName: "", lastName: "", email: "", membershipId: "MEMBER" });
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
                                    <td colSpan={6} className="px-6 py-20 text-center">
                                        <p className={`${colors.textMuted} text-sm`}>Aucun membre trouvé.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredMembers.map((member) => (
                                    <tr key={member.id} className={`${colors.hover} transition-colors group`}>
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
                                                    onClick={() => deleteMember(member.id)}
                                                    className={`w-8 h-8 rounded-lg ${theme === 'dark' ? 'bg-white/5 hover:bg-red-500/10' : 'bg-gray-100 hover:bg-red-50'} flex items-center justify-center ${colors.textMuted} hover:text-red-500 transition-all`}
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
    );
}
