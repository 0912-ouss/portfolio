"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowRight, FiCalendar, FiClock } from "react-icons/fi";
import { SectionTitle } from "@/components/ui/SectionTitle";

const blogPosts = [
    {
        id: 1,
        title: "10 Web Design Trends for 2024",
        excerpt: "Discover the latest design trends that will dominate the digital landscape this year.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        date: "Dec 10, 2024",
        readTime: "5 min read",
        category: "Design",
    },
    {
        id: 2,
        title: "Building Scalable React Applications",
        excerpt: "Best practices for creating maintainable and performant React apps.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
        date: "Dec 5, 2024",
        readTime: "8 min read",
        category: "Development",
    },
    {
        id: 3,
        title: "The Art of Brand Identity Design",
        excerpt: "How to create memorable brand identities that resonate with your audience.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
        date: "Nov 28, 2024",
        readTime: "6 min read",
        category: "Branding",
    },
];

export function Blog() {
    return (
        <section id="blog" className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-secondary/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_70%)]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    title="Latest Articles"
                    subtitle="Insights and tutorials from our creative journey"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, i) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer"
                        >
                            <div className="card overflow-hidden">
                                {/* Image */}
                                <div className="relative h-52 overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-sm text-foreground/50 mb-3">
                                        <span className="flex items-center gap-1">
                                            <FiCalendar className="w-4 h-4" />
                                            {post.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FiClock className="w-4 h-4" />
                                            {post.readTime}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>

                                    <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>

                                    <motion.div
                                        className="flex items-center gap-2 text-primary font-semibold text-sm"
                                        whileHover={{ x: 5 }}
                                    >
                                        Read More <FiArrowRight className="w-4 h-4" />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
