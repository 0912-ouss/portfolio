"use client";

import { FitnessRegister } from '@/components/demos/fitness/FitnessRegister';

export default function FitnessRegisterPage() {
    return (
        <main>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
                
                .font-serif { font-family: 'Cinzel', serif; }
                .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
            `}</style>
            <FitnessRegister />
        </main>
    );
}
