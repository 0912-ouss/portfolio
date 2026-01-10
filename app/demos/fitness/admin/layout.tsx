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
                
                /* Smooth scrollbar styling */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: ${theme === 'dark' ? '#0A0A0F' : '#f3f4f6'};
                }
                ::-webkit-scrollbar-thumb {
                    background: ${theme === 'dark' ? '#2A2A35' : '#d1d5db'};
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: ${theme === 'dark' ? '#3A3A45' : '#9ca3af'};
                }
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
