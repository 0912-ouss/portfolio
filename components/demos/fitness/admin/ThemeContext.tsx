"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        // Check localStorage for saved preference
        const savedTheme = localStorage.getItem("admin-theme") as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("admin-theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

// Enhanced theme-aware color classes with better palette
export const themeColors = {
    dark: {
        // Backgrounds
        bg: "bg-[#0A0A0F]",
        bgSecondary: "bg-[#0F0F15]",
        card: "bg-[#14141A]",
        cardHover: "bg-[#1A1A22]",
        
        // Borders
        border: "border-white/[0.08]",
        borderHover: "border-white/[0.12]",
        borderStrong: "border-white/[0.15]",
        
        // Text
        text: "text-white",
        textSecondary: "text-white/90",
        textMuted: "text-white/50",
        textSubtle: "text-white/70",
        textDisabled: "text-white/30",
        
        // Inputs
        input: "bg-white/[0.06] border-white/[0.1] text-white placeholder-white/40",
        inputFocus: "bg-white/[0.08] border-[#D4AF37]/50",
        inputHover: "bg-white/[0.08]",
        
        // Interactive
        hover: "hover:bg-white/[0.08]",
        hoverStrong: "hover:bg-white/[0.12]",
        active: "bg-white/[0.12]",
        
        // Accent (Gold)
        accent: "text-[#D4AF37]",
        accentBg: "bg-[#D4AF37]/10",
        accentBorder: "border-[#D4AF37]/20",
        accentHover: "hover:bg-[#D4AF37]/15",
        
        // Status Colors
        success: "text-emerald-400",
        successBg: "bg-emerald-500/10",
        successBorder: "border-emerald-500/20",
        warning: "text-amber-400",
        warningBg: "bg-amber-500/10",
        warningBorder: "border-amber-500/20",
        error: "text-red-400",
        errorBg: "bg-red-500/10",
        errorBorder: "border-red-500/20",
        info: "text-blue-400",
        infoBg: "bg-blue-500/10",
        infoBorder: "border-blue-500/20",
        
        // Button variants
        buttonPrimary: "bg-[#D4AF37] text-black hover:bg-[#E5C158]",
        buttonSecondary: "bg-white/[0.08] text-white hover:bg-white/[0.12]",
        buttonDanger: "bg-red-500/10 text-red-400 hover:bg-red-500/20",
        buttonSuccess: "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
        
        // Overlay
        overlay: "bg-black/70",
        backdrop: "backdrop-blur-md"
    },
    light: {
        // Backgrounds
        bg: "bg-gray-50",
        bgSecondary: "bg-white",
        card: "bg-white",
        cardHover: "bg-gray-50",
        
        // Borders
        border: "border-gray-200",
        borderHover: "border-gray-300",
        borderStrong: "border-gray-400",
        
        // Text
        text: "text-gray-900",
        textSecondary: "text-gray-800",
        textMuted: "text-gray-500",
        textSubtle: "text-gray-700",
        textDisabled: "text-gray-400",
        
        // Inputs
        input: "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400",
        inputFocus: "bg-white border-[#D4AF37]",
        inputHover: "bg-white",
        
        // Interactive
        hover: "hover:bg-gray-50",
        hoverStrong: "hover:bg-gray-100",
        active: "bg-gray-100",
        
        // Accent (Gold)
        accent: "text-[#B8941F]",
        accentBg: "bg-[#D4AF37]/10",
        accentBorder: "border-[#D4AF37]/30",
        accentHover: "hover:bg-[#D4AF37]/15",
        
        // Status Colors
        success: "text-emerald-600",
        successBg: "bg-emerald-50",
        successBorder: "border-emerald-200",
        warning: "text-amber-600",
        warningBg: "bg-amber-50",
        warningBorder: "border-amber-200",
        error: "text-red-600",
        errorBg: "bg-red-50",
        errorBorder: "border-red-200",
        info: "text-blue-600",
        infoBg: "bg-blue-50",
        infoBorder: "border-blue-200",
        
        // Button variants
        buttonPrimary: "bg-[#D4AF37] text-black hover:bg-[#C19B1E]",
        buttonSecondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        buttonDanger: "bg-red-50 text-red-600 hover:bg-red-100",
        buttonSuccess: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
        
        // Overlay
        overlay: "bg-black/40",
        backdrop: "backdrop-blur-sm"
    }
};
