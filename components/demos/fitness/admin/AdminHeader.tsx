"use client";

import { FiBell, FiSearch, FiSun, FiMoon, FiLogOut, FiUser } from "react-icons/fi";
import { useTheme, themeColors } from "./ThemeContext";
import { useSession, signOut } from "next-auth/react";

export function AdminHeader({ title }: { title: string }) {
    const { theme, toggleTheme } = useTheme();
    const colors = themeColors[theme];
    const { data: session } = useSession();

    return (
        <header className={`h-16 border-b ${colors.border} ${theme === 'dark' ? 'bg-[#050505]/80' : 'bg-white/80'} backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40`}>
            <div className="flex items-center gap-4">
                <h1 className={`text-xl font-bold ${colors.text}`}>{title}</h1>
                {session?.user && (
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${colors.textMuted} bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20`}>
                        {session.user.name || session.user.email}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative hidden md:block">
                    <FiSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${colors.textMuted}`} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className={`w-64 ${colors.input} border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors`}
                    />
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className={`w-10 h-10 rounded-lg ${theme === 'dark' ? 'bg-white/5 text-white/40 hover:text-[#D4AF37]' : 'bg-gray-100 text-gray-400 hover:text-[#D4AF37]'} flex items-center justify-center transition-all`}
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === "dark" ? <FiSun /> : <FiMoon />}
                </button>

                {/* Notifications */}
                <button className={`relative w-10 h-10 rounded-lg ${theme === 'dark' ? 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10' : 'bg-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-200'} flex items-center justify-center transition-all`}>
                    <FiBell />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[#D4AF37] rounded-full"></span>
                </button>

                {/* Logout */}
                <button
                    onClick={() => signOut({ callbackUrl: "/demos/fitness/login" })}
                    className={`w-10 h-10 rounded-lg ${theme === 'dark' ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-red-50 text-red-400 hover:bg-red-100'} flex items-center justify-center transition-all`}
                    title="Logout"
                >
                    <FiLogOut />
                </button>
            </div>
        </header>
    );
}
