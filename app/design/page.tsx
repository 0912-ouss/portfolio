"use client";

import { FawziNavbar, FawziFooter } from "@/components/fawzi/Layout";
import { FawziDesignHero } from "@/components/fawzi/DesignHero";
import { FawziGallery } from "@/components/fawzi/Gallery";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function DesignPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#1E1E1E] text-black dark:text-white overflow-x-hidden">
            <LoadingScreen />
            <ScrollProgress />
            <CustomCursor />
            <FawziNavbar />

            <FawziDesignHero />

            <FawziGallery />

            <FawziFooter />
        </main>
    );
}
