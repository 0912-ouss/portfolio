"use client";

import { AdminHeader } from "@/components/demos/fitness/admin/AdminHeader";
import { FiSave, FiUpload } from "react-icons/fi";
import { motion } from "framer-motion";

export default function SettingsPage() {
    return (
        <div>
            <AdminHeader title="Settings" />

            <div className="p-8 max-w-4xl">
                {/* General Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-lg font-bold text-white mb-6">General Settings</h2>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/40 font-bold mb-2 block">
                                    Club Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Elysium Athletics"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/40 font-bold mb-2 block">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    defaultValue="concierge@elysium-athletics.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs uppercase tracking-wider text-white/40 font-bold mb-2 block">
                                Club Description
                            </label>
                            <textarea
                                rows={4}
                                defaultValue="L'art de la force rencontre le luxe de la précision. Une expérience réservée à l'élite mondiale."
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 resize-none"
                            />
                        </div>

                        <div>
                            <label className="text-xs uppercase tracking-wider text-white/40 font-bold mb-2 block">
                                Logo
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-[#D4AF37] rounded-xl flex items-center justify-center text-black font-black text-3xl">
                                    E
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-white/60 text-sm hover:bg-white/10 transition-colors">
                                    <FiUpload /> Upload New
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Membership Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-lg font-bold text-white mb-6">Membership Pricing</h2>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 border border-white/10 rounded-xl">
                            <h3 className="text-[#D4AF37] font-bold mb-4">Platinum</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-white/40">€</span>
                                <input
                                    type="number"
                                    defaultValue="180"
                                    className="w-24 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-2xl font-bold focus:outline-none focus:border-[#D4AF37]/50"
                                />
                                <span className="text-white/40">/month</span>
                            </div>
                        </div>
                        <div className="p-6 border border-[#D4AF37]/30 rounded-xl bg-[#D4AF37]/5">
                            <h3 className="text-[#D4AF37] font-bold mb-4">Infinity</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-white/40">€</span>
                                <input
                                    type="number"
                                    defaultValue="290"
                                    className="w-24 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-2xl font-bold focus:outline-none focus:border-[#D4AF37]/50"
                                />
                                <span className="text-white/40">/month</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Save Button */}
                <button className="flex items-center gap-2 bg-[#D4AF37] text-black px-8 py-3 rounded-lg font-bold hover:bg-white transition-colors">
                    <FiSave /> Save Changes
                </button>
            </div>
        </div>
    );
}
