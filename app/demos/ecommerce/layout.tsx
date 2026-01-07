"use client";

import React from 'react';
import { ReactLenis } from "@studio-freight/react-lenis";
import { EcommerceLoading } from "@/components/demos/ecommerce/EcommerceLoading";
import { EcommerceCursor } from "@/components/demos/ecommerce/EcommerceCursor";
import { EcommerceCart } from "@/components/demos/ecommerce/EcommerceCart";
import { EcommerceHeader } from "@/components/demos/ecommerce/EcommerceHeader";
import { EcommerceFooter } from "@/components/demos/ecommerce/EcommerceFooter";

export default function EcommerceLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#FAF8F5] font-sans overflow-x-hidden pt-[100px]">
            <EcommerceLoading />
            <EcommerceCursor />
            <EcommerceCart />
            <EcommerceHeader />
            <main>{children}</main>
            <EcommerceFooter />
        </div>
    );
}
