"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
    {
        id: 1,
        quote: "L'approche holistique d'Elysium a redéfini ma perception de la performance. Ce n'est pas juste une salle, c'est un sanctuaire.",
        author: "Sarah M.",
        role: "Athlète Olympique",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        quote: "Un niveau de service inégalé. Les équipements, les coachs, l'ambiance... Tout respire l'excellence absolue.",
        author: "James L.",
        role: "PDG & Entrepreneur",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
    },
    {
        id: 3,
        quote: "La récupération au Bio-Spa après une séance intense est mon rituel indispensable. Une expérience transcendante.",
        author: "Élise D.",
        role: "Architecte d'Intérieur",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
    }
];

export function FitnessTestimonials() {
    return (
        <section className="py-32 bg-[#080808] relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24 space-y-4">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-black"
                    >
                        Témoignages
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
                    >
                        Voix d'Elysium
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-[#050505] p-12 border border-white/5 group hover:border-[#D4AF37]/30 transition-all duration-500 rounded-none relative"
                        >
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                            <div className="mb-8 relative">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#D4AF37] transition-colors duration-500">
                                    <img
                                        src={item.image}
                                        alt={item.author}
                                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 text-[#D4AF37] text-4xl font-serif opacity-20 group-hover:opacity-100 transition-opacity">"</div>
                            </div>

                            <p className="text-white/70 font-sans leading-relaxed mb-8 group-hover:text-white transition-colors duration-300">
                                {item.quote}
                            </p>

                            <div>
                                <h4 className="text-white font-bold uppercase tracking-wider text-sm">{item.author}</h4>
                                <span className="text-[#D4AF37] text-[10px] uppercase tracking-widest font-medium mt-1 block">
                                    {item.role}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
