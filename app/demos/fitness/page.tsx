'use client';

import React, { useEffect } from 'react';
import { FitnessHero } from '@/components/demos/fitness/FitnessHero';
import { FitnessStats } from '@/components/demos/fitness/FitnessStats';
import { FitnessPhilosophy } from '@/components/demos/fitness/FitnessPhilosophy';
import { FitnessEquipment } from '@/components/demos/fitness/FitnessEquipment';
import { FitnessSchedule } from '@/components/demos/fitness/FitnessSchedule';
import { FitnessTrainers } from '@/components/demos/fitness/FitnessTrainers';
import { FitnessLocations } from '@/components/demos/fitness/FitnessLocations';
import { FitnessRecovery } from '@/components/demos/fitness/FitnessRecovery';
import { FitnessMembership } from '@/components/demos/fitness/FitnessMembership';
import { FitnessFooter } from '@/components/demos/fitness/FitnessFooter';
import { MyBookings } from '@/components/demos/fitness/MyBookings';

import { FitnessTestimonials } from '@/components/demos/fitness/FitnessTestimonials';
import { FitnessFAQ } from '@/components/demos/fitness/FitnessFAQ';
import { FitnessApp } from '@/components/demos/fitness/FitnessApp';

import { FitnessNavbar } from '@/components/demos/fitness/FitnessNavbar';

// Quick Wins

import { FitnessLoading } from '@/components/demos/fitness/FitnessLoading';
import { FitnessPartners } from '@/components/demos/fitness/FitnessPartners';

export default function FitnessDemo() {
    useEffect(() => {
        document.title = "Elysium Athletics | Luxury Performance Fitness";
    }, []);

    return (
        <>
            <FitnessLoading />
            <main className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37]/30 selection:text-[#D4AF37] font-sans overflow-x-hidden">
                <style jsx global>{`
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
                    
                    .font-serif { font-family: 'Cinzel', serif; }
                    .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
                `}</style>

                <FitnessNavbar />
                <FitnessHero />
                <FitnessPartners />
                <FitnessStats />
                <FitnessPhilosophy />
                <FitnessSchedule />
                <MyBookings />
                <FitnessTestimonials />
                <FitnessEquipment />
                <FitnessTrainers />
                <FitnessLocations />
                <FitnessRecovery />
                <FitnessApp />
                <FitnessFAQ />
                <FitnessMembership />
                <FitnessFooter />
            </main>
        </>
    );
}

