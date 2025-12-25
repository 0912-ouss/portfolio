"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export interface ProjectCategory {
    id: string;
    label: string;
    icon: string;
}

export const projectCategories: ProjectCategory[] = [
    { id: "all", label: "All Projects", icon: "🌐" },
    { id: "healthcare", label: "Healthcare", icon: "🏥" },
    { id: "beauty", label: "Beauty & Wellness", icon: "💇" },
    { id: "restaurant", label: "Food & Beverage", icon: "🍽️" },
    { id: "automotive", label: "Automotive", icon: "🚗" },
    { id: "ecommerce", label: "E-commerce", icon: "🏪" },
    { id: "business", label: "Business", icon: "🏢" },
    { id: "design", label: "Design", icon: "🎨" },
];

interface ProjectFilterProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
    projectCounts?: Record<string, number>;
}

export function ProjectFilter({ activeFilter, onFilterChange, projectCounts }: ProjectFilterProps) {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {projectCategories.map((category) => {
                const isActive = activeFilter === category.id;
                const count = projectCounts?.[category.id] || 0;

                return (
                    <motion.button
                        key={category.id}
                        onClick={() => onFilterChange(category.id)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
              relative px-6 py-3 rounded-full font-semibold text-sm
              transition-all duration-300 overflow-hidden
              ${isActive
                                ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30"
                                : "bg-secondary/50 dark:bg-secondary/30 text-foreground/80 hover:bg-secondary hover:text-foreground border border-border/50"
                            }
            `}
                    >
                        {/* Background glow on active */}
                        {isActive && (
                            <motion.div
                                layoutId="activeFilter"
                                className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}

                        {/* Content */}
                        <span className="relative z-10 flex items-center gap-2">
                            <span className="text-lg">{category.icon}</span>
                            <span>{category.label}</span>
                            {count > 0 && category.id !== "all" && (
                                <span className={`
                  ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                  ${isActive ? "bg-white/20" : "bg-primary/10 text-primary"}
                `}>
                                    {count}
                                </span>
                            )}
                        </span>
                    </motion.button>
                );
            })}
        </div>
    );
}
