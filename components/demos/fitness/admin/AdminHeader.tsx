"use client";

import { FiBell, FiSearch, FiSun, FiMoon, FiLogOut, FiUser } from "react-icons/fi";
import { useTheme, themeColors } from "./ThemeContext";
import { useSession, signOut } from "next-auth/react";

export function AdminHeader({ title }: { title: string }) {
    const { theme, toggleTheme } = useTheme();
    const colors = themeColors[theme];
    const { data: session } = useSession();

    return (
        <header className={`h-16 border-b ${colors.border} ${theme === 'dark' ? colors.bgSecondary : colors.bgSecondary} ${colors.backdrop} flex items-center justify-between px-8 sticky top-0 z-40`}>
            <div className="flex items-center gap-4">
                <h1 className={`text-xl font-bold ${colors.text}`}>{title}</h1>
                {session?.user && (
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${colors.textMuted} ${colors.accentBg} px-3 py-1 rounded-full border ${colors.accentBorder}`}>
                        {session.user.name || session.user.email}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative hidden md:block">
                    <FiSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${colors.textMuted}`} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className={`w-64 ${colors.input} border ${colors.border} rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none ${colors.inputFocus} transition-all`}
                    />
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className={`w-10 h-10 rounded-lg ${colors.buttonSecondary} flex items-center justify-center transition-all hover:scale-105`}
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === "dark" ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
                </button>

                {/* Notifications */}
                <button className={`relative w-10 h-10 rounded-lg ${colors.buttonSecondary} flex items-center justify-center transition-all hover:scale-105`}>
                    <FiBell className="w-4 h-4" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[#D4AF37] rounded-full ring-2 ring-white dark:ring-[#14141A]"></span>
                </button>

                {/* Logout */}
                <button
                    onClick={() => signOut({ callbackUrl: "/demos/fitness/login" })}
                    className={`w-10 h-10 rounded-lg ${colors.buttonDanger} flex items-center justify-center transition-all hover:scale-105`}
                    title="Logout"
                >
                    <FiLogOut className="w-4 h-4" />
                </button>
            </div>
        </header>
    );
}
