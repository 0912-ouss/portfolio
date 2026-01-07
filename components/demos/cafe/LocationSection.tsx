"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
    FiMapPin,
    FiPhone,
    FiMail,
    FiClock,
    FiSend,
    FiCheck,
} from "react-icons/fi";

export default function LocationSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const businessHours = [
        { day: "Monday - Friday", hours: "7:00 AM - 9:00 PM" },
        { day: "Saturday", hours: "8:00 AM - 10:00 PM" },
        { day: "Sunday", hours: "8:00 AM - 10:00 PM" },
    ];

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.message.trim()) newErrors.message = "Message is required";
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setSubmitted(true);
            setFormData({ name: "", email: "", phone: "", message: "" });
            setTimeout(() => setSubmitted(false), 5000);
        }
    };

    return (
        <section id="contact" className="py-24 bg-[#EEEBE6]">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-[#3C2A21]/10 rounded-full text-[#3C2A21] font-semibold text-sm tracking-wider mb-4">
                        VISIT US
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1A120B] mb-4">
                        Find Our Location
                    </h2>
                    <p className="text-lg text-[#3C2A21]/70 max-w-2xl mx-auto">
                        Come experience our warm atmosphere and exceptional coffee
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Map & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        {/* Map Placeholder */}
                        <div className="relative h-[300px] rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-[#3C2A21] to-[#1A120B]">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-white/80">
                                    <FiMapPin className="w-16 h-16 mx-auto mb-4 text-[#D5CEA3]" />
                                    <p className="text-lg font-medium">Interactive Map</p>
                                    <p className="text-sm opacity-60">123 Coffee Street, Downtown</p>
                                </div>
                            </div>
                            {/* Decorative grid pattern */}
                            <div
                                className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                                    backgroundSize: "40px 40px",
                                }}
                            />
                        </div>

                        {/* Contact Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-white p-6 rounded-2xl shadow-lg"
                            >
                                <div className="w-12 h-12 bg-[#D5CEA3]/20 rounded-xl flex items-center justify-center mb-4">
                                    <FiMapPin className="text-2xl text-[#3C2A21]" />
                                </div>
                                <h4 className="font-bold text-[#1A120B] mb-2">Address</h4>
                                <p className="text-[#3C2A21]/70 text-sm">
                                    123 Coffee Street<br />
                                    Downtown, City 10001
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-white p-6 rounded-2xl shadow-lg"
                            >
                                <div className="w-12 h-12 bg-[#D5CEA3]/20 rounded-xl flex items-center justify-center mb-4">
                                    <FiPhone className="text-2xl text-[#3C2A21]" />
                                </div>
                                <h4 className="font-bold text-[#1A120B] mb-2">Phone</h4>
                                <p className="text-[#3C2A21]/70 text-sm">
                                    +1 (555) 123-4567<br />
                                    +1 (555) 987-6543
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-white p-6 rounded-2xl shadow-lg"
                            >
                                <div className="w-12 h-12 bg-[#D5CEA3]/20 rounded-xl flex items-center justify-center mb-4">
                                    <FiMail className="text-2xl text-[#3C2A21]" />
                                </div>
                                <h4 className="font-bold text-[#1A120B] mb-2">Email</h4>
                                <p className="text-[#3C2A21]/70 text-sm">
                                    hello@coffeeshop.com<br />
                                    events@coffeeshop.com
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-white p-6 rounded-2xl shadow-lg"
                            >
                                <div className="w-12 h-12 bg-[#D5CEA3]/20 rounded-xl flex items-center justify-center mb-4">
                                    <FiClock className="text-2xl text-[#3C2A21]" />
                                </div>
                                <h4 className="font-bold text-[#1A120B] mb-2">Hours</h4>
                                <div className="text-[#3C2A21]/70 text-sm space-y-1">
                                    {businessHours.map((item) => (
                                        <div key={item.day} className="flex justify-between">
                                            <span>{item.day}</span>
                                            <span className="font-medium">{item.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 md:p-12 rounded-3xl shadow-xl"
                    >
                        <h3 className="text-2xl font-bold text-[#1A120B] mb-6">
                            Send us a Message
                        </h3>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center h-[400px] text-center"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                    <FiCheck className="text-4xl text-green-600" />
                                </div>
                                <h4 className="text-2xl font-bold text-[#1A120B] mb-2">
                                    Message Sent!
                                </h4>
                                <p className="text-[#3C2A21]/70">
                                    Thank you for reaching out. We&apos;ll get back to you soon.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#3C2A21] mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className={`w-full px-5 py-4 bg-[#EEEBE6] rounded-xl outline-none focus:ring-2 focus:ring-[#D5CEA3] transition-all ${errors.name ? "ring-2 ring-red-400" : ""
                                            }`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-[#3C2A21] mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            className={`w-full px-5 py-4 bg-[#EEEBE6] rounded-xl outline-none focus:ring-2 focus:ring-[#D5CEA3] transition-all ${errors.email ? "ring-2 ring-red-400" : ""
                                                }`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#3C2A21] mb-2">
                                            Phone (Optional)
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                            className="w-full px-5 py-4 bg-[#EEEBE6] rounded-xl outline-none focus:ring-2 focus:ring-[#D5CEA3] transition-all"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#3C2A21] mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({ ...formData, message: e.target.value })
                                        }
                                        rows={5}
                                        className={`w-full px-5 py-4 bg-[#EEEBE6] rounded-xl outline-none focus:ring-2 focus:ring-[#D5CEA3] transition-all resize-none ${errors.message ? "ring-2 ring-red-400" : ""
                                            }`}
                                        placeholder="How can we help you?"
                                    />
                                    {errors.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                    )}
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3C2A21] to-[#1A120B] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-[#3C2A21]/30 transition-all"
                                >
                                    <FiSend />
                                    Send Message
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
