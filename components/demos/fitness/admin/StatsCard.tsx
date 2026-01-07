"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
    icon: IconType;
}

export function StatsCard({ title, value, change, changeType = "neutral", icon: Icon }: StatsCardProps) {
    const changeColors = {
        positive: "text-green-400",
        negative: "text-red-400",
        neutral: "text-white/40"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-[#D4AF37]/20 transition-colors"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                    <Icon className="text-[#D4AF37] text-xl" />
                </div>
                {change && (
                    <span className={`text-xs font-medium ${changeColors[changeType]}`}>
                        {change}
                    </span>
                )}
            </div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{title}</p>
            <p className="text-3xl font-black text-white">{value}</p>
        </motion.div>
    );
}
