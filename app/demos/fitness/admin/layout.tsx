"use client";

import { AdminSidebar } from "@/components/demos/fitness/admin/AdminSidebar";
import { ThemeProvider, useTheme, themeColors } from "@/components/demos/fitness/admin/ThemeContext";
import { SessionProvider } from "next-auth/react";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();
    const colors = themeColors[theme];

    return (
        <div className={`min-h-screen ${colors.bg} ${colors.text} font-sans transition-colors duration-300`}>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
                .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
            `}</style>

            <AdminSidebar />
            <div className="lg:ml-64">
                {children}
            </div>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider>
                <AdminLayoutInner>{children}</AdminLayoutInner>
            </ThemeProvider>
        </SessionProvider>
    );
}
