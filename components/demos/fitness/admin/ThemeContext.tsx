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

// Theme-aware color classes
export const themeColors = {
    dark: {
        bg: "bg-[#050505]",
        card: "bg-[#0A0A0A]",
        border: "border-white/5",
        text: "text-white",
        textMuted: "text-white/40",
        textSubtle: "text-white/60",
        input: "bg-white/5 border-white/10 text-white",
        hover: "hover:bg-white/5"
    },
    light: {
        bg: "bg-gray-50",
        card: "bg-white",
        border: "border-gray-200",
        text: "text-gray-900",
        textMuted: "text-gray-400",
        textSubtle: "text-gray-600",
        input: "bg-gray-100 border-gray-200 text-gray-900",
        hover: "hover:bg-gray-100"
    }
};
