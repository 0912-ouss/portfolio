"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiCalendar, FiClock, FiMapPin, FiArrowRight } from "react-icons/fi";

const events = [
    {
        id: 1,
        title: "Latte Art Workshop",
        date: "Dec 15, 2024",
        time: "2:00 PM - 5:00 PM",
        location: "Main Hall",
        image: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop",
        description: "Learn the art of creating beautiful latte designs from our master baristas.",
        price: "Rs. 999",
        spots: 8,
    },
    {
        id: 2,
        title: "Coffee Tasting Evening",
        date: "Dec 20, 2024",
        time: "6:00 PM - 9:00 PM",
        location: "Rooftop Lounge",
        image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=800&auto=format&fit=crop",
        description: "Explore single-origin coffees from around the world with expert guidance.",
        price: "Rs. 1,499",
        spots: 12,
    },
    {
        id: 3,
        title: "Live Jazz & Coffee",
        date: "Dec 22, 2024",
        time: "7:00 PM - 10:00 PM",
        location: "Garden Area",
        image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=800&auto=format&fit=crop",
        description: "Enjoy smooth jazz performances while sipping on our signature brews.",
        price: "Free Entry",
        spots: 50,
    },
];

export default function EventsSection() {
    return (
        <section id="events" className="py-24 bg-gradient-to-b from-[#1A120B] to-[#3C2A21] relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, #D5CEA3 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-[#D5CEA3]/20 rounded-full text-[#D5CEA3] font-semibold text-sm tracking-wider mb-4">
                        UPCOMING EVENTS
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Join Our Community
                    </h2>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto">
                        Experience more than just coffee. Connect, learn, and celebrate with us.
                    </p>
                </motion.div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 group"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                                {/* Date Badge */}
                                <div className="absolute top-4 left-4 bg-[#D5CEA3] px-4 py-2 rounded-xl">
                                    <div className="text-xs font-bold text-[#1A120B] uppercase">
                                        {event.date.split(",")[0]}
                                    </div>
                                </div>

                                {/* Spots Left */}
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <span className="text-xs text-white font-medium">
                                        {event.spots} spots left
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D5CEA3] transition-colors">
                                    {event.title}
                                </h3>

                                <p className="text-white/60 text-sm mb-4 line-clamp-2">
                                    {event.description}
                                </p>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-white/70 text-sm">
                                        <FiClock className="text-[#D5CEA3]" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/70 text-sm">
                                        <FiMapPin className="text-[#D5CEA3]" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-[#D5CEA3]">
                                        {event.price}
                                    </span>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 px-5 py-2 bg-[#D5CEA3] text-[#1A120B] rounded-full font-semibold text-sm hover:bg-white transition-colors"
                                    >
                                        Register
                                        <FiArrowRight />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-12"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-8 py-4 border-2 border-[#D5CEA3] text-[#D5CEA3] rounded-full font-bold hover:bg-[#D5CEA3] hover:text-[#1A120B] transition-all"
                    >
                        <FiCalendar />
                        View All Events
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
