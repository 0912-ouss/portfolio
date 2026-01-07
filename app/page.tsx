"use client";

import { FawziHero } from "@/components/fawzi/Hero";
import { FawziAbout } from "@/components/fawzi/About";
import { FawziServices } from "@/components/fawzi/Services";
import { FawziProjects } from "@/components/fawzi/Projects";
import { FawziGallery } from "@/components/fawzi/Gallery";
import { FawziTestimonials, FawziContact } from "@/components/fawzi/Testimonials";

import { CustomCursor } from "@/components/ui/CustomCursor";


export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#1E1E1E] text-black dark:text-white transition-colors duration-300 overflow-x-hidden pt-20">
      <div id="home">
        <FawziHero />
      </div>

      <div id="about-me">
        <FawziAbout />
      </div>

      <div id="services">
        <FawziServices />
      </div>

      <div id="projects">
        <FawziProjects limit={3} />
      </div>

      <div id="gallery">
        <FawziGallery limit={6} />
      </div>

      <div id="testimonials">
        <FawziTestimonials />
      </div>

      <div id="contact">
        <FawziContact />
      </div>


    </main>
  );
}
