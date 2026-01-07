"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";
import { GalleryItem } from "@/lib/data";

interface GalleryProps {
  items: GalleryItem[];
}

export function Gallery({ items }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    if (direction === "next") {
      setSelectedImage((selectedImage + 1) % items.length);
    } else {
      setSelectedImage((selectedImage - 1 + items.length) % items.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setSelectedImage((prev) => prev !== null ? (prev + 1) % items.length : null);
      }
      if (e.key === "ArrowLeft") {
        setSelectedImage((prev) => prev !== null ? (prev - 1 + items.length) % items.length : null);
      }
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage, items.length]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04, type: "spring" }}
            whileHover={{ scale: 1.05, y: -8 }}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer card"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 glass rounded-full text-xs font-semibold text-white backdrop-blur-md border border-white/20">
                {item.category}
              </span>
            </div>

            {/* Expand icon */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="p-2 glass rounded-lg backdrop-blur-md border border-white/20">
                <FiMaximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h4 className="text-white font-bold text-lg mb-1 drop-shadow-lg">{item.title}</h4>
              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-accent transition-all duration-500" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox - Enhanced */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-6 right-6 p-3 glass rounded-xl backdrop-blur-md hover:bg-white/20 text-white transition-all shadow-xl hover:scale-110 z-20"
              aria-label="Close lightbox"
            >
              <FiX className="w-6 h-6" />
            </motion.button>

            {/* Navigation Buttons */}
            <motion.button
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ delay: 0.15 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 glass rounded-xl backdrop-blur-md hover:bg-white/20 text-white transition-all shadow-xl hover:scale-110 z-20"
              aria-label="Previous image"
            >
              <FiChevronLeft className="w-7 h-7" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ delay: 0.15 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 glass rounded-xl backdrop-blur-md hover:bg-white/20 text-white transition-all shadow-xl hover:scale-110 z-20"
              aria-label="Next image"
            >
              <FiChevronRight className="w-7 h-7" />
            </motion.button>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-7xl max-h-[90vh] w-full"
            >
              <Image
                src={items[selectedImage].image}
                alt={items[selectedImage].title}
                width={1400}
                height={900}
                className="object-contain w-full h-full rounded-2xl shadow-2xl"
              />

              {/* Image Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/95 via-black/80 to-transparent rounded-b-2xl"
              >
                <div className="max-w-4xl mx-auto">
                  <div className="inline-block px-4 py-2 bg-primary/20 backdrop-blur-md rounded-full text-primary text-sm font-semibold mb-3 border border-primary/30">
                    {items[selectedImage].category}
                  </div>
                  <h3 className="text-white text-3xl font-bold mb-2">
                    {items[selectedImage].title}
                  </h3>
                </div>
              </motion.div>
            </motion.div>

            {/* Image Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-2 glass rounded-full backdrop-blur-md text-white/90 text-sm font-medium"
            >
              {selectedImage + 1} / {items.length}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
