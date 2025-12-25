"use client";

import React, { useEffect } from 'react';
import { ReactLenis } from "@studio-freight/react-lenis";

// E-commerce Components
import { EcommerceLoading } from "@/components/demos/ecommerce/EcommerceLoading";
import { EcommerceCursor } from "@/components/demos/ecommerce/EcommerceCursor";
import { EcommerceCart } from "@/components/demos/ecommerce/EcommerceCart";
import { EcommerceHero } from "@/components/demos/ecommerce/EcommerceHero";
import { EcommerceCategories } from "@/components/demos/ecommerce/EcommerceCategories";
import { EcommerceProducts } from "@/components/demos/ecommerce/EcommerceProducts";
import { EcommerceBanner } from "@/components/demos/ecommerce/EcommerceBanner";
import { EcommerceLookbook } from "@/components/demos/ecommerce/EcommerceLookbook";
import { EcommerceReviews } from "@/components/demos/ecommerce/EcommerceReviews";
import { EcommerceFeatures } from "@/components/demos/ecommerce/EcommerceFeatures";
import { EcommerceInstagram } from "@/components/demos/ecommerce/EcommerceInstagram";
import { EcommerceNewsletter } from "@/components/demos/ecommerce/EcommerceNewsletter";
import { EcommerceFooter } from "@/components/demos/ecommerce/EcommerceFooter";

export default function EcommerceDemo() {
    useEffect(() => {
        document.title = "Fashion Boutique | Luxury E-commerce";
    }, []);

    return (
        <div className="space-y-0 -mt-[100px]"> {/* Offset layout padding for hero to be full screen */}
            <EcommerceHero />
            <section id="collections">
                <EcommerceCategories />
            </section>
            <EcommerceProducts />
            <EcommerceBanner />
            <EcommerceLookbook />
            <EcommerceReviews />
            <EcommerceFeatures />
            <EcommerceInstagram />
            <EcommerceNewsletter />
        </div>
    );
}
