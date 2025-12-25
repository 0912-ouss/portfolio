"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

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

    // Hide on mobile/touch devices
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
        return null;
    }

    return (
        <>
            {/* Main cursor */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    className="w-full h-full rounded-full bg-white"
                    animate={{
                        scale: isClicking ? 0.5 : isHovering ? 0.5 : 1,
                    }}
                    transition={{ duration: 0.15 }}
                />
            </motion.div>

            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9998] hidden md:block"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    className="w-full h-full rounded-full border-2 border-primary/50"
                    animate={{
                        scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                        borderColor: isHovering ? "rgb(168, 85, 247)" : "rgba(168, 85, 247, 0.5)",
                    }}
                    transition={{ duration: 0.2 }}
                />
            </motion.div>

            {/* Hover text indicator */}
            {isHovering && (
                <motion.div
                    className="fixed top-0 left-0 pointer-events-none z-[9997] hidden md:block"
                    style={{
                        x: cursorXSpring,
                        y: cursorYSpring,
                        translateX: "10px",
                        translateY: "10px",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                >
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        Click
                    </span>
                </motion.div>
            )}

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
