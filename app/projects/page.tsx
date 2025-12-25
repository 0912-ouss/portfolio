"use client";

import { HeroFull } from "@/components/sections/HeroFull";
import { ProjectScroll } from "@/components/sections/ProjectScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";

export default function ProjectsPage() {
    return (
        <main className="h-screen overflow-hidden">
            <CustomCursor />
            <Navbar />
            <div className="h-screen w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth theme-transition">
                <div className="snap-start">
                    <HeroFull />
                </div>
                <ProjectScroll />
            </div>
        </main>
    );
}
