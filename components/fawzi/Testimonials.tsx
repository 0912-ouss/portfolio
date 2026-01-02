"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const testimonials = [
    {
        id: 1,
        text: "The designs provided by Muhammad Umair were world-class and really helped our brand stand out. Highly recommended!",
        name: "Sarah Johnson",
        role: "CEO at TechFlow",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    },
    {
        id: 2,
        text: "Incredible attention to detail and a very smooth workflow. One of the best UI designers I have worked with.",
        name: "David Chen",
        role: "Founder of Apex Studio",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    },
];

export function FawziTestimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 px-4 md:px-20 bg-white dark:bg-[#1E1E1E]">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white">Testimonials</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                        Hear from the amazing clients I've had the pleasure of working with on various design projects.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative px-10">
                    <div className="flex overflow-hidden">
                        {testimonials.map((t, idx) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: activeIndex === idx ? 1 : 0, x: activeIndex === idx ? 0 : 20 }}
                                className={`w-full flex-shrink-0 bg-gray-50 dark:bg-[#2A2A2A] p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center gap-8 ${activeIndex === idx ? 'block' : 'hidden'}`}
                            >
                                <div className="w-40 h-40 flex-shrink-0 rounded-full overflow-hidden border-4 border-orange-500/20">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-4 text-center md:text-left flex-1">
                                    <p className="text-gray-600 dark:text-gray-400 italic text-lg leading-relaxed relative">
                                        <span className="text-orange-500 text-4xl absolute -left-6 -top-2">"</span>
                                        {t.text}
                                        <span className="text-orange-500 text-4xl absolute -right-4 bottom-0">"</span>
                                    </p>
                                    <div>
                                        <h4 className="text-xl font-bold dark:text-white">{t.name}</h4>
                                        <p className="text-orange-500 font-medium">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                aria-label={`Go to testimonial ${idx + 1}`}
                                className={`h-3 rounded-full transition-all ${activeIndex === idx ? 'w-10 bg-orange-500' : 'w-3 bg-gray-300 dark:bg-gray-700'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export function FawziContact() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("success");
        setEmail("");

        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <section className="py-24 px-4 md:px-20 bg-white dark:bg-[#1E1E1E]">
            <div className="container mx-auto">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white">Let's Design Together</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base px-10">
                            Ready to transform your ideas into stunning digital experiences? Drop your email below and let's get started.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                        <input
                            type="email"
                            required
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === "loading" || status === "success"}
                            className="flex-1 bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-orange-500 outline-none px-6 py-4 rounded-xl text-black dark:text-white transition-all disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-500/20 active:scale-95 disabled:bg-gray-400 min-w-[200px]"
                        >
                            {status === "idle" && "Contact Me"}
                            {status === "loading" && "Sending..."}
                            {status === "success" && "Message Sent!"}
                            {status === "error" && "Try Again"}
                        </button>
                    </form>

                    {status === "success" && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-green-500 font-medium"
                        >
                            Thank you! I'll get back to you shortly.
                        </motion.p>
                    )}
                </div>
            </div>
        </section>
    );
}
