"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { useTheme, themeColors } from "./ThemeContext";

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
    icon: IconType;
}

export function StatsCard({ title, value, change, changeType = "neutral", icon: Icon }: StatsCardProps) {
    const { theme } = useTheme();
    const colors = themeColors[theme];
    
    const changeColors = {
        positive: theme === 'dark' ? "text-emerald-400" : "text-emerald-600",
        negative: theme === 'dark' ? "text-red-400" : "text-red-600",
        neutral: colors.textMuted
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.hover} transition-all duration-200 hover:border-[#D4AF37]/30 hover:shadow-lg`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${colors.accentBg} flex items-center justify-center`}>
                    <Icon className={`${colors.accent} text-xl`} />
                </div>
                {change && (
                    <span className={`text-xs font-semibold ${changeColors[changeType]}`}>
                        {change}
                    </span>
                )}
            </div>
            <p className={`${colors.textMuted} text-xs uppercase tracking-widest mb-1 font-bold`}>{title}</p>
            <p className={`${colors.text} text-3xl font-black`}>{value}</p>
        </motion.div>
    );
}
