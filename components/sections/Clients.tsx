"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";

const clients = [
    { name: "MediCare", logo: "🏥" },
    { name: "TechCorp", logo: "💻" },
    { name: "FoodHub", logo: "🍽️" },
    { name: "AutoRent", logo: "🚗" },
    { name: "StyleCo", logo: "👗" },
    { name: "DesignPro", logo: "🎨" },
];

export function Clients() {
    return (
        <section className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Trusted By</p>
                    <h3 className="text-2xl font-bold text-foreground">Companies I've Worked With</h3>
                </motion.div>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {clients.map((client, i) => (
                        <motion.div
                            key={client.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-background/50 transition-colors cursor-pointer group"
                        >
                            <span className="text-4xl group-hover:scale-110 transition-transform">{client.logo}</span>
                            <span className="text-sm font-medium text-foreground/60 group-hover:text-foreground transition-colors">{client.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
