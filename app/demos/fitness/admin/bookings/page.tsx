"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { AdminAuthGuard } from "@/components/demos/fitness/admin/AdminAuthGuard";
import { FiSearch, FiLoader, FiX, FiTrash2, FiDownload, FiCalendar, FiFilter, FiCheck, FiXCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, themeColors } from "@/components/demos/fitness/admin/ThemeContext";

export default function BookingsPage() {
    const { theme } = useTheme();
    const colors = themeColors[theme];

    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
    
    // Filters
    const [filters, setFilters] = useState({
        status: "ALL",
        dateFrom: "",
        dateTo: "",
        session: "ALL",
        member: ""
    });

    const [sessions, setSessions] = useState<any[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchBookings();
        fetchSessions();
    }, []);

    const fetchBookings = async () => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch("/api/fitness/bookings");
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to fetch bookings");
            }

            setBookings(data.data || []);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to fetch bookings:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchSessions = async () => {
        try {
            const res = await fetch("/api/fitness/sessions");
            const data = await res.json();
            if (data.success) {
                setSessions(data.data || []);
            }
        } catch (err) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to fetch sessions:", err);
            }
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = 
            booking.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.session?.name?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filters.status === "ALL" || booking.status === filters.status;
        
        const matchesDate = (!filters.dateFrom || new Date(booking.createdAt) >= new Date(filters.dateFrom)) &&
                           (!filters.dateTo || new Date(booking.createdAt) <= new Date(filters.dateTo));
        
        const matchesSession = filters.session === "ALL" || booking.sessionId === filters.session;
        
        const matchesMember = !filters.member || booking.userId === filters.member;

        return matchesSearch && matchesStatus && matchesDate && matchesSession && matchesMember;
    });

    const handleBulkCancel = async () => {
        if (selectedBookings.length === 0) return;
        if (!confirm(`Annuler ${selectedBookings.length} réservation(s)?`)) return;

        try {
            setError(null);
            const promises = selectedBookings.map(id =>
                fetch(`/api/fitness/bookings/${id}`, { method: 'DELETE' })
            );
            await Promise.all(promises);
            setSelectedBookings([]);
            fetchBookings();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
        }
    };

    const handleCancelBooking = async (id: string) => {
        if (!confirm("Annuler cette réservation?")) return;

        try {
            setError(null);
            const res = await fetch(`/api/fitness/bookings/${id}`, { method: 'DELETE' });
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to cancel booking");
            }

            fetchBookings();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
        }
    };

    const exportToCSV = () => {
        const headers = ["Date", "Membre", "Email", "Session", "Jour", "Heure", "Statut"];
        const rows = filteredBookings.map(booking => [
            new Date(booking.createdAt).toLocaleDateString(),
            `${booking.user?.firstName} ${booking.user?.lastName}`,
            booking.user?.email || "",
            booking.session?.name || "",
            booking.session?.day || "",
            booking.session?.time || "",
            booking.status || "CONFIRMED"
        ]);

        const csv = [
            headers.join(","),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
        ].join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const toggleSelectBooking = (id: string) => {
        setSelectedBookings(prev =>
            prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedBookings.length === filteredBookings.length) {
            setSelectedBookings([]);
        } else {
            setSelectedBookings(filteredBookings.map(b => b.id));
        }
    };

    const stats = {
        total: bookings.length,
        confirmed: bookings.filter(b => b.status === "CONFIRMED").length,
        cancelled: bookings.filter(b => b.status === "CANCELLED").length,
        today: bookings.filter(b => {
            const today = new Date().toDateString();
            return new Date(b.createdAt).toDateString() === today;
        }).length
    };

    return (
        <AdminAuthGuard>
            <div>
                <AdminHeader title="Bookings Management" />
                
                {error && (
                    <div className="mx-8 mt-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="p-8">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className={`${colors.card} border ${colors.border} rounded-xl p-4`}>
                            <p className={`${colors.textMuted} text-xs mb-1`}>Total Réservations</p>
                            <p className={`${colors.text} text-2xl font-bold`}>{stats.total}</p>
                        </div>
                        <div className={`${colors.card} border ${colors.border} rounded-xl p-4`}>
                            <p className={`${colors.textMuted} text-xs mb-1`}>Confirmées</p>
                            <p className={`text-green-500 text-2xl font-bold`}>{stats.confirmed}</p>
                        </div>
                        <div className={`${colors.card} border ${colors.border} rounded-xl p-4`}>
                            <p className={`${colors.textMuted} text-xs mb-1`}>Annulées</p>
                            <p className={`text-red-500 text-2xl font-bold`}>{stats.cancelled}</p>
                        </div>
                        <div className={`${colors.card} border ${colors.border} rounded-xl p-4`}>
                            <p className={`${colors.textMuted} text-xs mb-1`}>Aujourd'hui</p>
                            <p className={`text-blue-500 text-2xl font-bold`}>{stats.today}</p>
                        </div>
                    </div>

                    {/* Search and Actions */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <FiSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${colors.textMuted}`} />
                            <input
                                type="text"
                                placeholder="Rechercher par membre, email ou session..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full ${colors.input} rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#D4AF37]/50`}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-3 ${colors.buttonSecondary} rounded-xl font-bold text-sm`}
                            >
                                <FiFilter /> Filtres
                            </button>
                            <button
                                onClick={exportToCSV}
                                className={`flex items-center gap-2 px-4 py-3 bg-[#D4AF37] text-black rounded-xl font-bold text-sm hover:bg-white transition-colors`}
                            >
                                <FiDownload /> Exporter CSV
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`mb-6 ${colors.card} border ${colors.border} rounded-xl p-4`}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    <div>
                                        <label className={`${colors.textMuted} text-xs font-bold mb-2 block`}>Statut</label>
                                        <select
                                            value={filters.status}
                                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                            className={`w-full ${colors.input} rounded-lg px-3 py-2 text-sm`}
                                        >
                                            <option value="ALL">Tous</option>
                                            <option value="CONFIRMED">Confirmées</option>
                                            <option value="CANCELLED">Annulées</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={`${colors.textMuted} text-xs font-bold mb-2 block`}>Session</label>
                                        <select
                                            value={filters.session}
                                            onChange={(e) => setFilters({ ...filters, session: e.target.value })}
                                            className={`w-full ${colors.input} rounded-lg px-3 py-2 text-sm`}
                                        >
                                            <option value="ALL">Toutes</option>
                                            {sessions.map(session => (
                                                <option key={session.id} value={session.id}>{session.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={`${colors.textMuted} text-xs font-bold mb-2 block`}>Date Début</label>
                                        <input
                                            type="date"
                                            value={filters.dateFrom}
                                            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                                            className={`w-full ${colors.input} rounded-lg px-3 py-2 text-sm`}
                                        />
                                    </div>
                                    <div>
                                        <label className={`${colors.textMuted} text-xs font-bold mb-2 block`}>Date Fin</label>
                                        <input
                                            type="date"
                                            value={filters.dateTo}
                                            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                                            className={`w-full ${colors.input} rounded-lg px-3 py-2 text-sm`}
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <button
                                            onClick={() => setFilters({ status: "ALL", dateFrom: "", dateTo: "", session: "ALL", member: "" })}
                                            className={`w-full px-4 py-2 ${colors.buttonSecondary} rounded-lg text-sm font-bold`}
                                        >
                                            Réinitialiser
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bulk Actions */}
                    {selectedBookings.length > 0 && (
                        <div className={`mb-4 p-4 ${colors.card} border ${colors.border} rounded-xl flex items-center justify-between`}>
                            <p className={`${colors.text} text-sm font-bold`}>
                                {selectedBookings.length} réservation(s) sélectionnée(s)
                            </p>
                            <button
                                onClick={handleBulkCancel}
                                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-bold text-sm hover:bg-red-500/30 transition-colors"
                            >
                                Annuler Sélection
                            </button>
                        </div>
                    )}

                    {/* Bookings Table */}
                    <div className={`${colors.card} border ${colors.border} rounded-2xl overflow-hidden`}>
                        {loading ? (
                            <div className="p-20 text-center">
                                <FiLoader className="w-8 h-8 text-[#D4AF37] animate-spin mx-auto mb-4" />
                                <p className={`${colors.textMuted} text-sm`}>Chargement...</p>
                            </div>
                        ) : filteredBookings.length === 0 ? (
                            <div className="p-20 text-center">
                                <p className={`${colors.textMuted} text-sm`}>Aucune réservation trouvée.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className={theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}>
                                        <tr>
                                            <th className="px-6 py-4 text-left">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                                                    onChange={toggleSelectAll}
                                                    className="rounded"
                                                />
                                            </th>
                                            <th className={`px-6 py-4 text-left text-xs uppercase tracking-wider ${colors.textMuted} font-bold`}>Date</th>
                                            <th className={`px-6 py-4 text-left text-xs uppercase tracking-wider ${colors.textMuted} font-bold`}>Membre</th>
                                            <th className={`px-6 py-4 text-left text-xs uppercase tracking-wider ${colors.textMuted} font-bold`}>Session</th>
                                            <th className={`px-6 py-4 text-left text-xs uppercase tracking-wider ${colors.textMuted} font-bold`}>Jour/Heure</th>
                                            <th className={`px-6 py-4 text-left text-xs uppercase tracking-wider ${colors.textMuted} font-bold`}>Statut</th>
                                            <th className={`px-6 py-4 text-right text-xs uppercase tracking-wider ${colors.textMuted} font-bold`}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`divide-y ${theme === 'dark' ? 'divide-white/5' : 'divide-gray-100'}`}>
                                        {filteredBookings.map((booking) => (
                                            <tr key={booking.id} className={`${colors.hover} transition-colors group`}>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedBookings.includes(booking.id)}
                                                        onChange={() => toggleSelectBooking(booking.id)}
                                                        className="rounded"
                                                    />
                                                </td>
                                                <td className={`px-6 py-4 ${colors.textSubtle} text-sm`}>
                                                    {new Date(booking.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className={`${colors.text} font-medium`}>
                                                            {booking.user?.firstName} {booking.user?.lastName}
                                                        </p>
                                                        <p className={`${colors.textMuted} text-xs`}>{booking.user?.email}</p>
                                                    </div>
                                                </td>
                                                <td className={`px-6 py-4 ${colors.textSubtle} text-sm`}>
                                                    {booking.session?.name || "N/A"}
                                                </td>
                                                <td className={`px-6 py-4 ${colors.textSubtle} text-sm`}>
                                                    {booking.session?.day} {booking.session?.time}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                        booking.status === "CONFIRMED"
                                                            ? "bg-green-500/10 text-green-500"
                                                            : "bg-red-500/10 text-red-500"
                                                    }`}>
                                                        {booking.status === "CONFIRMED" ? "Confirmée" : "Annulée"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {booking.status === "CONFIRMED" && (
                                                        <button
                                                            onClick={() => handleCancelBooking(booking.id)}
                                                            className={`opacity-0 group-hover:opacity-100 transition-opacity p-2 ${colors.textMuted} hover:text-red-500`}
                                                            title="Annuler"
                                                        >
                                                            <FiXCircle size={16} />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminAuthGuard>
    );
}
