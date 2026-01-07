"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    FiHome,
    FiUsers,
    FiCalendar,
    FiUser,
    FiMapPin,
    FiMessageSquare,
    FiSettings,
    FiLogOut,
    FiActivity,
    FiMenu,
    FiX
} from "react-icons/fi";
import { useTheme, themeColors } from "./ThemeContext";

const navItems = [
    { name: "Overview", href: "/demos/fitness/admin", icon: FiHome },
    { name: "Members", href: "/demos/fitness/admin/members", icon: FiUsers },
    { name: "Sessions", href: "/demos/fitness/admin/sessions", icon: FiCalendar },
    { name: "Trainers", href: "/demos/fitness/admin/trainers", icon: FiUser },
    { name: "Locations", href: "/demos/fitness/admin/locations", icon: FiMapPin },
    { name: "Inquiries", href: "/demos/fitness/admin/inquiries", icon: FiMessageSquare },
    { name: "Settings", href: "/demos/fitness/admin/settings", icon: FiSettings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme } = useTheme();
    const colors = themeColors[theme];

    const sidebarContent = (
        <>
            {/* Logo */}
            <div className={`p-6 border-b ${colors.border}`}>
                <Link href="/demos/fitness" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                        <FiActivity className="text-black text-xl" />
                    </div>
                    <div>
                        <h1 className={`${colors.text} font-black uppercase tracking-tight text-sm`}>Elysium</h1>
                        <p className={`${colors.textMuted} text-[8px] uppercase tracking-widest`}>Admin Portal</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${isActive
                                    ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                                    : `${colors.textMuted} ${colors.hover} hover:${colors.text}`
                                }`}
                        >
                            <item.icon className={`text-lg ${isActive ? "text-[#D4AF37]" : ""}`} />
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User / Logout */}
            <div className={`p-4 border-t ${colors.border}`}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}>
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold text-xs">
                        AD
                    </div>
                    <div className="flex-1">
                        <p className={`${colors.text} text-xs font-medium`}>Admin User</p>
                        <p className={`${colors.textMuted} text-[10px]`}>Super Admin</p>
                    </div>
                    <button className={`${colors.textMuted} hover:text-red-400 transition-colors`}>
                        <FiLogOut />
                    </button>
                </div>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden fixed top-4 left-4 z-50 w-10 h-10 ${theme === 'dark' ? 'bg-[#0A0A0A] text-white' : 'bg-white text-gray-900'} rounded-lg flex items-center justify-center shadow-lg border ${colors.border}`}
            >
                {mobileOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar - Desktop */}
            <aside className={`hidden lg:flex w-64 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'} border-r ${colors.border} min-h-screen flex-col fixed left-0 top-0`}>
                {sidebarContent}
            </aside>

            {/* Sidebar - Mobile */}
            <aside className={`lg:hidden fixed left-0 top-0 w-64 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'} border-r ${colors.border} min-h-screen flex flex-col z-40 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {sidebarContent}
            </aside>
        </>
    );
}
