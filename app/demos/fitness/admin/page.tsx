"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { StatsCard } from "@/components/demos/fitness/admin/StatsCard";
import { MembershipGrowthChart, MembershipDistributionChart } from "@/components/demos/fitness/admin/AdminCharts";
import { FiUsers, FiActivity, FiArrowUpRight, FiCalendar, FiDollarSign, FiLoader, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import { Member } from "@/types/fitness";

export default function AdminOverview() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalMembers: 0,
        activeSessions: 0,
        newInquiries: 0,
        revenue: 0
    });

    useEffect(() => {
        fetchOverviewData();
    }, []);

    const fetchOverviewData = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/fitness/stats");
            const data = await res.json();

            if (data.success) {
                setStats({
                    totalMembers: data.data.totalMembers,
                    activeSessions: data.data.activeSessions,
                    newInquiries: data.data.newInquiries,
                    revenue: data.data.revenue
                });
                setRecentActivity(data.data.recentActivity);
            }
        } catch (err) {
            console.error("Failed to fetch overview data:", err);
        } finally {
            setLoading(false);
        }
    };

    const [recentActivity, setRecentActivity] = useState<Member[]>([]);

    return (
        <div className="space-y-8">
            <AdminHeader title="Vue d'ensemble" />

            {loading ? (
                <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
                    <FiLoader className="w-10 h-10 text-[#D4AF37] animate-spin" />
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">Initialisation du Dashboard...</p>
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
                        <div className="lg:col-span-2">
                            <MembershipGrowthChart />
                        </div>
                        <div>
                            <MembershipDistributionChart />
                        </div>
                    </div>

                    {/* Recent Activity / Quick Tasks */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6">
                            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>
                                Activité Récente
                            </h3>
                            <div className="space-y-4">
                                {recentActivity.length > 0 ? recentActivity.map((activity, i) => (
                                    <div key={activity.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group cursor-default">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37] transition-all">
                                                <FiUser />
                                            </div>
                                            <div>
                                                <p className="text-white text-xs font-bold">Nouveau Membre: {activity.firstName}</p>
                                                <p className="text-white/40 text-[10px] uppercase tracking-widest">{activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : 'N/A'}</p>
                                            </div>
                                        </div>
                                        <FiArrowUpRight className="text-white/20 group-hover:text-white transition-colors" />
                                    </div>
                                )) : (
                                    <p className="text-white/20 text-[10px] uppercase tracking-widest py-10 text-center">Aucune activité récente</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-[#050505] border border-[#D4AF37]/10 rounded-2xl p-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-3xl rounded-full" />
                            <h3 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-6">Concierge Tasks</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition-all cursor-pointer">
                                        <div className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37/50]" />
                                        <p className="text-white/80 text-xs font-sans">Révision de la maintenance salle {i}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
