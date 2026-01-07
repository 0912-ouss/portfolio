"use client";

import { usePathname } from "next/navigation";
import { FawziNavbar, FawziFooter } from "@/components/fawzi/Layout";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";

export function PortfolioUI({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Pages that should NOT have the main portfolio navbar/footer
    const isDemoOrAdmin = pathname.startsWith("/demos") || pathname.startsWith("/admin");

    if (isDemoOrAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <ScrollProgress />
            <CustomCursor />
            <BackgroundEffects />
            <FawziNavbar />
            {children}
            <FawziFooter />
        </>
    );
}
