"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { AdminAuthGuard } from "@/components/demos/fitness/admin/AdminAuthGuard";
import { StatsCard } from "@/components/demos/fitness/admin/StatsCard";
import { FiUsers, FiActivity, FiArrowUpRight, FiCalendar, FiDollarSign, FiLoader, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import { Member } from "@/types/fitness";
import { useTheme, themeColors } from "@/components/demos/fitness/admin/ThemeContext";

// Lazy load charts for better performance
const MembershipGrowthChart = dynamic(
    () => import("@/components/demos/fitness/admin/AdminCharts").then(mod => ({ default: mod.MembershipGrowthChart })),
    { loading: () => <div className="h-64 flex items-center justify-center"><FiLoader className="animate-spin" /></div> }
);

const MembershipDistributionChart = dynamic(
    () => import("@/components/demos/fitness/admin/AdminCharts").then(mod => ({ default: mod.MembershipDistributionChart })),
    { loading: () => <div className="h-64 flex items-center justify-center"><FiLoader className="animate-spin" /></div> }
);

export default function AdminOverview() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { theme } = useTheme();
    const colors = themeColors[theme];
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState({
        totalMembers: 0,
        activeSessions: 0,
        newInquiries: 0,
        revenue: 0
    });

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
            fetchOverviewData();
        }
    }, [session]);

    const fetchOverviewData = async () => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch("/api/fitness/stats");
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to fetch overview data");
            }

            setStats({
                totalMembers: data.data.totalMembers,
                activeSessions: data.data.activeSessions,
                newInquiries: data.data.newInquiries,
                revenue: data.data.revenue
            });
            setRecentActivity(data.data.recentActivity);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            setError(errorMessage);
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to fetch overview data:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    const [recentActivity, setRecentActivity] = useState<Member[]>([]);

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
            <div className="space-y-8">
                <AdminHeader title="Vue d'ensemble" />

                {error && (
                    <div className="mx-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
                        {error}
                    </div>
                )}

            {loading ? (
                <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
                    <FiLoader className="w-10 h-10 text-[#D4AF37] animate-spin" />
                    <p className="text-white/40 dark:text-white/40 text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold">Initialisation du Dashboard...</p>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-8 space-y-8"
                >
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsCard
                            title="Membres Totaux"
                            value={stats.totalMembers.toString()}
                            icon={FiUsers}
                            change="+12%"
                            changeType="positive"
                        />
                        <StatsCard
                            title="Séances ce Jour"
                            value={stats.activeSessions.toString()}
                            icon={FiActivity}
                            change="+4"
                            changeType="positive"
                        />
                        <StatsCard
                            title="Nouvelles Inscriptions"
                            value={stats.newInquiries.toString()}
                            icon={FiCalendar}
                            change="+18%"
                            changeType="positive"
                        />
                        <StatsCard
                            title="Revenu Mensuel"
                            value={`€${(stats.revenue / 1000).toFixed(1)}k`}
                            icon={FiDollarSign}
                            change="+5.4%"
                            changeType="positive"
                        />
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2"
                        >
                            <MembershipGrowthChart />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <MembershipDistributionChart />
                        </motion.div>
                    </div>

                    {/* Recent Activity / Concierge Tasks */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Activité Récente */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className={`${colors.card} border ${colors.border} rounded-2xl p-6`}
                        >
                            <h3 className={`${colors.text} font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2`}>
                                <span className={`w-2 h-2 ${colors.accentBg} rounded-full`}></span>
                                Activité Récente
                            </h3>
                            <div className="space-y-0">
                                {recentActivity.length > 0 ? recentActivity.map((activity, i) => (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="flex items-center justify-between py-4 border-b last:border-0 group cursor-pointer"
                                        style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full ${colors.input} flex items-center justify-center ${colors.textMuted} group-hover:${colors.accentBg} group-hover:${colors.accent} transition-all`}>
                                                <FiUser className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className={`${colors.text} text-xs font-bold`}>
                                                    Nouveau Membre: {activity.firstName} {activity.lastName}
                                                </p>
                                                <p className={`${colors.textMuted} text-[10px] uppercase tracking-widest`}>
                                                    {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        <FiArrowUpRight className={`${colors.textMuted} group-hover:${colors.accent} transition-colors`} />
                                    </motion.div>
                                )) : (
                                    <p className={`${colors.textMuted} text-[10px] uppercase tracking-widest py-10 text-center`}>
                                        Aucune activité récente
                                    </p>
                                )}
                            </div>
                        </motion.div>

                        {/* Concierge Tasks */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className={`${colors.card} border ${colors.accentBorder} rounded-2xl p-6 relative overflow-hidden`}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 ${colors.accentBg} blur-3xl rounded-full opacity-50`} />
                            <h3 className={`${colors.accent} font-bold uppercase tracking-widest text-xs mb-6 relative z-10`}>
                                Concierge Tasks
                            </h3>
                            <div className="space-y-3 relative z-10">
                                {[
                                    "Révision de la maintenance salle 1",
                                    "Révision de la maintenance salle 2",
                                    "Révision de la maintenance salle 3"
                                ].map((task, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + i * 0.1 }}
                                        className={`flex items-center gap-4 ${colors.input} p-4 rounded-xl border ${colors.border} ${colors.hover} transition-all cursor-pointer group`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${colors.accentBg} flex-shrink-0`}>
                                            <div className={`w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.5)]`}></div>
                                        </div>
                                        <p className={`${colors.textSecondary} text-xs font-medium group-hover:${colors.text} transition-colors`}>
                                            {task}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
            </div>
        </AdminAuthGuard>
    );
}
