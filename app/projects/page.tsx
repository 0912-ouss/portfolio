"use client";

import { FawziNavbar, FawziFooter } from "@/components/fawzi/Layout";
import { FawziProjectsHero } from "@/components/fawzi/ProjectsHero";
import { FawziProjects } from "@/components/fawzi/Projects";


export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#1E1E1E] text-black dark:text-white overflow-x-hidden">
            <main>
                <FawziProjectsHero />
                <FawziProjects showFullButton={false} />
            </main>
        </div>
    );
}
