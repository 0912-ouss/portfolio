"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { AdminAuthGuard } from "@/components/demos/fitness/admin/AdminAuthGuard";
import { FiLoader, FiDownload, FiTrendingUp, FiUsers, FiCalendar, FiDollarSign } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme, themeColors } from "@/components/demos/fitness/admin/ThemeContext";

export default function ReportsPage() {
    const { theme } = useTheme();
    const colors = themeColors[theme];

    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState<any>(null);
    const [dateRange, setDateRange] = useState({
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchReports();
    }, [dateRange]);

    const fetchReports = async () => {
        try {
            setLoading(true);
            // Fetch data for reports
            const [membersRes, bookingsRes, sessionsRes] = await Promise.all([
                fetch("/api/fitness/members"),
                fetch("/api/fitness/bookings"),
                fetch("/api/fitness/sessions")
            ]);

            const membersData = await membersRes.json();
            const bookingsData = await bookingsRes.json();
            const sessionsData = await sessionsRes.json();

            const members = membersData.data || [];
            const bookings = bookingsData.data || [];
            const sessions = sessionsData.data || [];

            // Filter by date range
            const filteredBookings = bookings.filter((b: any) => {
                const date = new Date(b.createdAt);
                return date >= new Date(dateRange.from) && date <= new Date(dateRange.to);
            });

            // Calculate metrics
            const revenue = members.length * 450 + 15000; // Mock calculation
            const activeMembers = members.filter((m: any) => m.status === "Active").length;
            const totalBookings = filteredBookings.length;
            const confirmedBookings = filteredBookings.filter((b: any) => b.status === "CONFIRMED").length;
            const cancelledBookings = filteredBookings.filter((b: any) => b.status === "CANCELLED").length;

            // Member growth
            const memberGrowth = members.reduce((acc: any, member: any) => {
                const month = new Date(member.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                acc[month] = (acc[month] || 0) + 1;
                return acc;
            }, {});

            // Session popularity
            const sessionPopularity = sessions.map((session: any) => {
                const sessionBookings = filteredBookings.filter((b: any) => b.sessionId === session.id);
                return {
                    name: session.name,
                    bookings: sessionBookings.length,
                    capacity: session.capacity,
                    utilization: (sessionBookings.length / session.capacity) * 100
                };
            }).sort((a: any, b: any) => b.bookings - a.bookings);

            // Membership distribution
            const membershipDist = members.reduce((acc: any, member: any) => {
                const type = member.membershipId || "MEMBER";
                acc[type] = (acc[type] || 0) + 1;
                return acc;
            }, {});

            setReports({
                revenue,
                activeMembers,
                totalBookings,
                confirmedBookings,
                cancelledBookings,
                memberGrowth,
                sessionPopularity,
                membershipDist
            });
        } catch (err) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to fetch reports:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    const exportToPDF = () => {
        // Simple PDF export using window.print
        window.print();
    };

    const exportToCSV = (data: any[], filename: string) => {
        if (!data || data.length === 0) return;
        
        const headers = Object.keys(data[0]);
        const rows = data.map(row => headers.map(header => `"${row[header] || ''}"`).join(","));
        const csv = [headers.join(","), ...rows].join("\n");
        
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <AdminAuthGuard>
                <div>
                    <AdminHeader title="Reports & Analytics" />
                    <div className="p-20 text-center">
                        <FiLoader className="w-8 h-8 text-[#D4AF37] animate-spin mx-auto mb-4" />
                        <p className={`${colors.textMuted} text-sm`}>Chargement des rapports...</p>
                    </div>
                </div>
            </AdminAuthGuard>
        );
    }

    return (
        <AdminAuthGuard>
            <div>
                <AdminHeader title="Reports & Analytics" />
                
                <div className="p-8">
                    {/* Date Range Selector */}
                    <div className={`mb-8 ${colors.card} border ${colors.border} rounded-xl p-4`}>
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1 grid grid-cols-2 gap-4">
                                <div>
                                    <label className={`${colors.textMuted} text-xs font-bold mb-2 block`}>Date Début</label>
                                    <input
                                        type="date"
                                        value={dateRange.from}
                                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                                        className={`w-full ${colors.input} rounded-lg px-3 py-2 text-sm`}
                                    />
                                </div>
                                <div>
                                    <label className={`${colors.textMuted} text-xs font-bold mb-2 block`}>Date Fin</label>
                                    <input
                                        type="date"
                                        value={dateRange.to}
                                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                                        className={`w-full ${colors.input} rounded-lg px-3 py-2 text-sm`}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => exportToCSV(
                                        reports.sessionPopularity.map((s: any) => ({
                                            Session: s.name,
                                            Réservations: s.bookings,
                                            Capacité: s.capacity,
                                            'Taux Utilisation': `${s.utilization.toFixed(1)}%`
                                        })),
                                        `session-report-${dateRange.from}-${dateRange.to}.csv`
                                    )}
                                    className={`flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black rounded-xl font-bold text-sm hover:bg-white transition-colors`}
                                >
                                    <FiDownload /> Exporter CSV
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`${colors.card} border ${colors.border} rounded-xl p-6`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                                    <FiDollarSign className="text-green-500 text-xl" />
                                </div>
                                <FiTrendingUp className="text-green-500" />
                            </div>
                            <p className={`${colors.textMuted} text-xs mb-1`}>Revenu Mensuel</p>
                            <p className={`${colors.text} text-2xl font-bold`}>
                                {reports?.revenue.toLocaleString()} €
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={`${colors.card} border ${colors.border} rounded-xl p-6`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <FiUsers className="text-blue-500 text-xl" />
                                </div>
                            </div>
                            <p className={`${colors.textMuted} text-xs mb-1`}>Membres Actifs</p>
                            <p className={`${colors.text} text-2xl font-bold`}>{reports?.activeMembers}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`${colors.card} border ${colors.border} rounded-xl p-6`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                                    <FiCalendar className="text-[#D4AF37] text-xl" />
                                </div>
                            </div>
                            <p className={`${colors.textMuted} text-xs mb-1`}>Réservations</p>
                            <p className={`${colors.text} text-2xl font-bold`}>{reports?.totalBookings}</p>
                            <p className={`${colors.textMuted} text-xs mt-1`}>
                                {reports?.confirmedBookings} confirmées
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className={`${colors.card} border ${colors.border} rounded-xl p-6`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                                    <FiCalendar className="text-red-500 text-xl" />
                                </div>
                            </div>
                            <p className={`${colors.textMuted} text-xs mb-1`}>Annulations</p>
                            <p className={`${colors.text} text-2xl font-bold`}>{reports?.cancelledBookings}</p>
                            <p className={`${colors.textMuted} text-xs mt-1`}>
                                {reports?.totalBookings > 0 
                                    ? ((reports.cancelledBookings / reports.totalBookings) * 100).toFixed(1)
                                    : 0}% du total
                            </p>
                        </motion.div>
                    </div>

                    {/* Session Popularity */}
                    <div className={`mb-8 ${colors.card} border ${colors.border} rounded-xl p-6`}>
                        <h3 className={`${colors.text} text-lg font-bold mb-4`}>Popularité des Sessions</h3>
                        <div className="space-y-4">
                            {reports?.sessionPopularity.slice(0, 10).map((session: any, index: number) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className={`${colors.text} font-medium`}>{session.name}</p>
                                            <p className={`${colors.textMuted} text-sm`}>
                                                {session.bookings} / {session.capacity}
                                            </p>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2">
                                            <div
                                                className="bg-[#D4AF37] h-2 rounded-full transition-all"
                                                style={{ width: `${Math.min(session.utilization, 100)}%` }}
                                            />
                                        </div>
                                        <p className={`${colors.textMuted} text-xs mt-1`}>
                                            {session.utilization.toFixed(1)}% d'utilisation
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Membership Distribution */}
                    <div className={`mb-8 ${colors.card} border ${colors.border} rounded-xl p-6`}>
                        <h3 className={`${colors.text} text-lg font-bold mb-4`}>Distribution des Abonnements</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(reports?.membershipDist || {}).map(([type, count]: [string, any]) => (
                                <div key={type} className="text-center">
                                    <p className={`${colors.text} text-2xl font-bold`}>{count}</p>
                                    <p className={`${colors.textMuted} text-xs`}>{type}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthGuard>
    );
}
