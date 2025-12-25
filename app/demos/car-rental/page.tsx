"use client";

import React, { useEffect } from 'react';
import { CarRentalHero } from "@/components/demos/car-rental/CarRentalHero";
import { CarRentalFeatured } from "@/components/demos/car-rental/CarRentalFeatured";
import { CarRentalFeatures } from "@/components/demos/car-rental/CarRentalFeatures";
import { CarRentalFleet } from "@/components/demos/car-rental/CarRentalFleet";
import { CarRentalProcess } from "@/components/demos/car-rental/CarRentalProcess";
import { CarRentalLocations } from "@/components/demos/car-rental/CarRentalLocations";
import { CarRentalTestimonials } from "@/components/demos/car-rental/CarRentalTestimonials";
import { CarRentalFAQ } from "@/components/demos/car-rental/CarRentalFAQ";

export default function CarRentalDemo() {
    useEffect(() => {
        document.title = "AutoRent | Premium Car Rental";
    }, []);

    return (
        <div className="space-y-0">
            <CarRentalHero />
            <section id="featured">
                <CarRentalFeatured />
            </section>
            <CarRentalFeatures />
            <section id="fleet">
                <CarRentalFleet />
            </section>
            <CarRentalProcess />
            <section id="locations">
                <CarRentalLocations />
            </section>
            <CarRentalTestimonials />
            <section id="faq">
                <CarRentalFAQ />
            </section>
        </div>
    );
}
