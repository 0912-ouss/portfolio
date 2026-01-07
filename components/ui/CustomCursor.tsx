"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export function CustomCursor() {
    const [isMounted, setIsMounted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button") || target.classList.contains("cursor-pointer")) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseover", handleMouseEnter);
        document.addEventListener("mouseout", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseover", handleMouseEnter);
            document.removeEventListener("mouseout", handleMouseLeave);
        };
    }, [cursorX, cursorY]);

    if (!isMounted) return null;

    // Hide on mobile/touch devices
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
        return null;
    }

    return (
        <>{/* Main Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[10001] hidden md:block"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <div className="w-full h-full rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />
            </motion.div>

            {/* Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[10000] hidden md:block"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    className="w-full h-full rounded-full border border-orange-500/30 bg-orange-500/5"
                    animate={{
                        scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
                        rotate: isHovering ? 90 : 0
                    }}
                    transition={{ type: "spring", damping: 20 }}
                />
            </motion.div>

            {/* Hover Indicator */}
            <AnimatePresence>
                {isHovering && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="fixed top-0 left-0 pointer-events-none z-[10002] hidden md:block"
                        style={{
                            x: cursorXSpring,
                            y: cursorYSpring,
                            translateX: "24px",
                            translateY: "-24px",
                        }}
                    >
                        <div className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                            Explore
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global style to hide default cursor */}
            <style jsx global>{`
        @media (hover: hover) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
        </>
    );
}
