"use client";

import React from 'react';
import { ReactLenis } from "lenis/react";
import { CarRentalLoading } from "@/components/demos/car-rental/CarRentalLoading";
import { CarRentalCursor } from "@/components/demos/car-rental/CarRentalCursor";
import { CarRentalScrollProgress } from "@/components/demos/car-rental/CarRentalScrollProgress";
import { CarRentalHeader } from "@/components/demos/car-rental/CarRentalHeader";
import { CarRentalFooter } from "@/components/demos/car-rental/CarRentalFooter";

export default function CarRentalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[#0A0A0A] font-sans text-white overflow-x-hidden">
            <CarRentalLoading />
            <CarRentalCursor />
            <CarRentalScrollProgress />
            <CarRentalHeader />
            <main>{children}</main>
            <CarRentalFooter />
        </div>
    );
}
