"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { useTheme, themeColors } from "./ThemeContext";

// Membership Growth Data
const membershipData = [
    { month: "Jan", members: 720 },
    { month: "Feb", members: 745 },
    { month: "Mar", members: 780 },
    { month: "Apr", members: 795 },
    { month: "May", members: 810 },
    { month: "Jun", members: 847 },
];

// Membership Distribution
const distributionData = [
    { name: "Infinity", value: 320, color: "#D4AF37" },
    { name: "Platinum", value: 527, color: "#6B7280" },
];

// Weekly Attendance
const attendanceData = [
    { day: "Lun", attendance: 85 },
    { day: "Mar", attendance: 92 },
    { day: "Mer", attendance: 78 },
    { day: "Jeu", attendance: 88 },
    { day: "Ven", attendance: 95 },
    { day: "Sam", attendance: 70 },
    { day: "Dim", attendance: 45 },
];

export function MembershipGrowthChart() {
    const { theme } = useTheme();

    return (
        <div className={`${themeColors[theme].card} border ${themeColors[theme].border} rounded-2xl p-6`}>
            <h3 className={`text-sm font-bold ${themeColors[theme].text} mb-4`}>Membership Growth</h3>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={membershipData}>
                        <defs>
                            <linearGradient id="memberGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: theme === 'dark' ? '#6B7280' : '#9CA3AF', fontSize: 10 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: theme === 'dark' ? '#6B7280' : '#9CA3AF', fontSize: 10 }}
                            domain={[700, 900]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: theme === 'dark' ? '#0A0A0A' : '#fff',
                                border: '1px solid #D4AF37',
                                borderRadius: '8px',
                                color: theme === 'dark' ? '#fff' : '#111'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="members"
                            stroke="#D4AF37"
                            strokeWidth={2}
                            fill="url(#memberGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export function MembershipDistributionChart() {
    const { theme } = useTheme();

    return (
        <div className={`${themeColors[theme].card} border ${themeColors[theme].border} rounded-2xl p-6`}>
            <h3 className={`text-sm font-bold ${themeColors[theme].text} mb-4`}>Membership Tiers</h3>
            <div className="h-48 flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={distributionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {distributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: theme === 'dark' ? '#0A0A0A' : '#fff',
                                border: '1px solid #D4AF37',
                                borderRadius: '8px',
                                color: theme === 'dark' ? '#fff' : '#111'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
                {distributionData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className={`text-xs ${themeColors[theme].textMuted}`}>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function WeeklyAttendanceChart() {
    const { theme } = useTheme();

    return (
        <div className={`${themeColors[theme].card} border ${themeColors[theme].border} rounded-2xl p-6`}>
            <h3 className={`text-sm font-bold ${themeColors[theme].text} mb-4`}>Weekly Attendance %</h3>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendanceData}>
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: theme === 'dark' ? '#6B7280' : '#9CA3AF', fontSize: 10 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: theme === 'dark' ? '#6B7280' : '#9CA3AF', fontSize: 10 }}
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: theme === 'dark' ? '#0A0A0A' : '#fff',
                                border: '1px solid #D4AF37',
                                borderRadius: '8px',
                                color: theme === 'dark' ? '#fff' : '#111'
                            }}
                        />
                        <Bar
                            dataKey="attendance"
                            fill="#D4AF37"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
