"use client";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { Gallery } from "@/components/ui/Gallery";
import { galleryItems } from "@/lib/data";

export function Showcase() {
  return (
    <section id="showcase" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Gallery Showcase"
          subtitle="A visual collection of events, spaces, and creative work we've produced"
        />

        <Gallery items={galleryItems} />
      </div>
    </section>
  );
}

