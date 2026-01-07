"use client";

import { FitnessContact } from '@/components/demos/fitness/FitnessContact';
import { FitnessFooter } from '@/components/demos/fitness/FitnessFooter';
import { FitnessNavbar } from '@/components/demos/fitness/FitnessNavbar';

export default function FitnessContactPage() {
    return (
        <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
                
                .font-serif { font-family: 'Cinzel', serif; }
                .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
            `}</style>

            <FitnessNavbar />

            <FitnessContact />
            <FitnessFooter />
        </main>
    );
}
