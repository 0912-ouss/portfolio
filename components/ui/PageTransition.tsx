"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isInitialMount, setIsInitialMount] = useState(true);

    useEffect(() => {
        // Skip animation on initial mount to prevent hydration issues
        if (isInitialMount) {
            setIsInitialMount(false);
        }
    }, [isInitialMount]);

    // Simplified transition that doesn't block navigation
    return (
        <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
                key={pathname}
                initial={isInitialMount ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
