"use client";

import { FawziNavbar, FawziFooter } from "@/components/fawzi/Layout";
import { FawziProjectsHero } from "@/components/fawzi/ProjectsHero";
import { FawziProjects } from "@/components/fawzi/Projects";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#1E1E1E] text-black dark:text-white overflow-x-hidden">
            <LoadingScreen />
            <ScrollProgress />
            <CustomCursor />
            <FawziNavbar />

            <FawziProjectsHero />
            <FawziProjects showFullButton={false} />

            <FawziFooter />
        </main>
    );
}
