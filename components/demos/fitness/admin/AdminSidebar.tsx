"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
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
    FiX,
    FiBarChart2,
    FiBell
} from "react-icons/fi";
import { useTheme, themeColors } from "./ThemeContext";

const navItems = [
    { name: "Overview", href: "/demos/fitness/admin", icon: FiHome },
    { name: "Members", href: "/demos/fitness/admin/members", icon: FiUsers },
    { name: "Bookings", href: "/demos/fitness/admin/bookings", icon: FiCalendar },
    { name: "Sessions", href: "/demos/fitness/admin/sessions", icon: FiActivity },
    { name: "Trainers", href: "/demos/fitness/admin/trainers", icon: FiUser },
    { name: "Locations", href: "/demos/fitness/admin/locations", icon: FiMapPin },
    { name: "Inquiries", href: "/demos/fitness/admin/inquiries", icon: FiMessageSquare },
    { name: "Notifications", href: "/demos/fitness/admin/notifications", icon: FiBell },
    { name: "Reports", href: "/demos/fitness/admin/reports", icon: FiBarChart2 },
    { name: "Settings", href: "/demos/fitness/admin/settings", icon: FiSettings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme } = useTheme();
    const colors = themeColors[theme];
    const { data: session } = useSession();

    const userInitials = session?.user?.name
        ?.split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'AD';
    
    const userName = session?.user?.name || session?.user?.email || 'Admin User';
    const userRole = session?.user?.role === 'ADMIN' ? 'Super Admin' : 'User';

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
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                                isActive
                                    ? `${colors.accentBg} ${colors.accent} border ${colors.accentBorder}`
                                    : `${colors.textMuted} ${colors.hover} hover:${colors.text}`
                            }`}
                        >
                            <item.icon className={`text-lg transition-colors ${isActive ? colors.accent : ""}`} />
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User / Logout */}
            <div className={`p-4 border-t ${colors.border}`}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-lg ${colors.cardHover}`}>
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold text-xs shadow-sm">
                        {userInitials}
                    </div>
                    <div className="flex-1">
                        <p className={`${colors.text} text-xs font-medium`}>{userName}</p>
                        <p className={`${colors.textMuted} text-[10px]`}>{userRole}</p>
                    </div>
                    <button 
                        onClick={() => signOut({ callbackUrl: "/demos/fitness/login" })}
                        className={`${colors.textMuted} hover:${colors.error} transition-colors p-1 rounded`}
                        title="Déconnexion"
                    >
                        <FiLogOut className="w-4 h-4" />
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
            <aside className={`hidden lg:flex w-64 ${colors.bgSecondary} border-r ${colors.border} min-h-screen flex-col fixed left-0 top-0 shadow-lg`}>
                {sidebarContent}
            </aside>

            {/* Sidebar - Mobile */}
            <aside className={`lg:hidden fixed left-0 top-0 w-64 ${colors.bgSecondary} border-r ${colors.border} min-h-screen flex flex-col z-40 transform transition-transform duration-300 shadow-2xl ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {sidebarContent}
            </aside>
        </>
    );
}
