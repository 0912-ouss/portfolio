"use client";

import { motion } from "framer-motion";

export function FeatureSection() {
    return (
        <section className="py-20 overflow-hidden">

            {/* Marquee */}
            <div className="relative flex whitespace-nowrap overflow-hidden py-10 border-t border-b border-black mb-20 rotate-1 scale-105 bg-white">
                <motion.div
                    animate={{ x: "-50%" }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                    className="flex gap-8 text-[8vw] font-black uppercase tracking-tighter leading-none"
                >
                    {Array(4).fill("Typography • Webflow • Webdesign • Graphics • ").map((text, i) => (
                        <span key={i}>{text}</span>
                    ))}
                </motion.div>
            </div>

            {/* Feature Blocks */}
            <div className="px-6 md:px-12 max-w-[1400px] mx-auto space-y-32">

                {/* Block 1 */}
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-4 block">Process 01</span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
                            Your brand identity at the core<br /> of my approach
                        </h2>
                        <p className="text-gray-600 leading-relaxed max-w-md">
                            I create logos and visual identities that embody your values.
                            My minimal and bold approach ensures your brand stands out in a crowded digital landscape.
                        </p>
                    </div>
                    <div className="relative aspect-square bg-gray-100 rounded-lg p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        {/* Placeholder graphic mockups */}
                        <div className="absolute inset-8 bg-black flex items-center justify-center">
                            <span className="text-white font-black text-6xl">VHS</span>
                        </div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white shadow-xl flex items-center justify-center p-4">
                            <span className="font-bold">Logo System</span>
                        </div>
                    </div>
                </div>

                {/* Block 2 */}
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 relative">
                        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group">
                            <img
                                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
                                alt="Webflow"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                            />
                            <h3 className="absolute bottom-8 left-8 text-white text-4xl font-black z-10">Webflow</h3>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-4 block">Process 02</span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
                            Custom websites,<br /> high performance results
                        </h2>
                        <p className="text-gray-600 leading-relaxed max-w-md">
                            I develop bespoke websites using Webflow, ensuring pixel-perfect implementation of the design.
                            Interactions, responsiveness, and SEO are baked into every project.
                        </p>
                    </div>
                </div>

            </div>

            {/* FAQ Section */}
            <div className="px-6 md:px-12 max-w-3xl mx-auto mt-40">
                <h2 className="text-4xl font-black uppercase tracking-tight mb-12 text-center">Questions?</h2>
                <div className="space-y-4">
                    {[
                        "How long does it take?",
                        "Do you offer maintenance?",
                        "Why Webflow?",
                        "Do you do e-commerce?"
                    ].map((q, i) => (
                        <div key={i} className="border-b border-black/10 py-6 flex justify-between items-center cursor-pointer group hover:bg-gray-50 px-4 transition-colors">
                            <h3 className="text-xl font-bold">{q}</h3>
                            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform">→</span>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
