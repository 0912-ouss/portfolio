"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { testimonials } from "@/lib/data";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-secondary/20 via-background to-background">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_70%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Client Testimonials"
          subtitle="What people say about working with us"
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Quote Icon Background */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-20 w-32 h-32 text-primary/5 dark:text-primary/10">
            <div className="text-9xl font-serif">"</div>
          </div>

          {/* Testimonial Cards */}
          <div className="relative min-h-[500px] md:min-h-[450px]">
            <AnimatePresence mode="wait">
              {testimonials.map(
                (testimonial, index) =>
                  index === currentIndex && (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, x: 100, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -100, scale: 0.95 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className="absolute inset-0"
                    >
                      <div className="relative card p-8 md:p-12 lg:p-16 h-full flex flex-col justify-center overflow-hidden">
                        {/* Gradient overlay */}
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Quote Icon */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className="absolute top-6 left-6 md:top-8 md:left-8 text-primary/20 dark:text-primary/30"
                        >
                          <div className="text-6xl md:text-8xl font-serif">"</div>
                        </motion.div>

                        {/* Stars */}
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex gap-1 mb-8 justify-center"
                        >
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                            >
                              <FiStar className="w-6 h-6 md:w-7 md:h-7 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Quote */}
                        <motion.blockquote
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="text-xl md:text-2xl lg:text-3xl text-foreground/90 text-center mb-10 leading-relaxed font-light relative z-10 max-w-3xl mx-auto"
                        >
                          <span className="text-4xl md:text-5xl text-primary/30 absolute -top-4 -left-4 md:-left-8">"</span>
                          {testimonial.content}
                          <span className="text-4xl md:text-5xl text-primary/30 relative top-2">"</span>
                        </motion.blockquote>

                        {/* Author */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="flex items-center justify-center gap-5 relative z-10"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl ring-4 ring-primary/10"
                          >
                            <Image
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
                          </motion.div>
                          <div className="text-left">
                            <div className="font-bold text-lg md:text-xl text-foreground mb-1">
                              {testimonial.name}
                            </div>
                            <div className="text-sm md:text-base text-foreground/60 font-medium">
                              {testimonial.role} at <span className="text-primary">{testimonial.company}</span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons - Enhanced */}
          <motion.button
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-16 p-4 bg-secondary/80 dark:bg-secondary/60 backdrop-blur-md hover:bg-primary hover:text-white rounded-full text-foreground transition-all duration-300 shadow-lg hover:shadow-xl border border-border/50 z-20"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-16 p-4 bg-secondary/80 dark:bg-secondary/60 backdrop-blur-md hover:bg-primary hover:text-white rounded-full text-foreground transition-all duration-300 shadow-lg hover:shadow-xl border border-border/50 z-20"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Dots Indicator - Enhanced */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`relative transition-all duration-300 ${
                  index === currentIndex
                    ? "w-10 h-3"
                    : "w-3 h-3"
                } rounded-full`}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <motion.div
                  layout
                  className={`absolute inset-0 rounded-full ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-primary to-accent"
                      : "bg-foreground/30 hover:bg-foreground/50"
                  } transition-colors`}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
