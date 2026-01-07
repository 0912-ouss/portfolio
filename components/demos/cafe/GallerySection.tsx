"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const galleryImages = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
        alt: "Cafe interior",
        category: "Interior",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
        alt: "Coffee preparation",
        category: "Coffee",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
        alt: "Latte art",
        category: "Coffee",
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?q=80&w=800&auto=format&fit=crop",
        alt: "Pastries display",
        category: "Food",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=800&auto=format&fit=crop",
        alt: "Cozy seating",
        category: "Interior",
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop",
        alt: "Coffee beans",
        category: "Coffee",
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
        alt: "Espresso shot",
        category: "Coffee",
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800&auto=format&fit=crop",
        alt: "Dessert plate",
        category: "Food",
    },
];

export default function GallerySection() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [filter, setFilter] = useState("All");

    const categories = ["All", "Interior", "Coffee", "Food"];
    const filteredImages = filter === "All"
        ? galleryImages
        : galleryImages.filter((img) => img.category === filter);

    const navigateImage = (direction: "prev" | "next") => {
        if (selectedImage === null) return;
        const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
        if (direction === "prev") {
            const newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
            setSelectedImage(filteredImages[newIndex].id);
        } else {
            const newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
            setSelectedImage(filteredImages[newIndex].id);
        }
    };

    return (
        <section id="gallery" className="py-24 bg-[#EEEBE6]">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-2 bg-[#3C2A21]/10 rounded-full text-[#3C2A21] font-semibold text-sm tracking-wider mb-4">
                        OUR GALLERY
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1A120B] mb-4">
                        Moments at Our Cafe
                    </h2>
                    <p className="text-lg text-[#3C2A21]/70 max-w-2xl mx-auto">
                        Take a peek into our cozy space, artisan drinks, and delicious treats
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilter(category)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${filter === category
                                    ? "bg-[#3C2A21] text-white shadow-lg"
                                    : "bg-white text-[#3C2A21] hover:bg-[#3C2A21]/10"
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Gallery Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                    <AnimatePresence>
                        {filteredImages.map((image, index) => (
                            <motion.div
                                key={image.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                whileHover={{ scale: 1.03, zIndex: 10 }}
                                onClick={() => setSelectedImage(image.id)}
                                className={`relative cursor-pointer rounded-2xl overflow-hidden shadow-lg group ${index === 0 || index === 5 ? "md:col-span-2 md:row-span-2" : ""
                                    }`}
                                style={{
                                    height: index === 0 || index === 5 ? "400px" : "200px",
                                }}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-xs text-[#D5CEA3] font-medium uppercase tracking-wider">
                                        {image.category}
                                    </span>
                                    <p className="text-white font-semibold">{image.alt}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white transition-colors bg-white/10 rounded-full"
                        >
                            <FiX className="text-2xl" />
                        </button>

                        {/* Navigation */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateImage("prev");
                            }}
                            className="absolute left-6 p-4 text-white/80 hover:text-white transition-colors bg-white/10 rounded-full"
                        >
                            <FiChevronLeft className="text-2xl" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateImage("next");
                            }}
                            className="absolute right-6 p-4 text-white/80 hover:text-white transition-colors bg-white/10 rounded-full"
                        >
                            <FiChevronRight className="text-2xl" />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-[90vw] h-[80vh] max-w-5xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={galleryImages.find((img) => img.id === selectedImage)?.src || ""}
                                alt={galleryImages.find((img) => img.id === selectedImage)?.alt || ""}
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
