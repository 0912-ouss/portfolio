"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { services } from "@/lib/data";
import { staggerContainer, fadeInUp } from "@/lib/motion-variants";
import { FiArrowRight } from "react-icons/fi";

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="py-24 md:py-32 bg-gradient-to-b from-background via-background to-secondary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_70%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Our Services"
          subtitle="Comprehensive creative solutions for events, spaces, and visual content"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              whileHover={{ y: -12, scale: 1.03 }}
              className="group relative card overflow-hidden p-8 lg:p-10 cursor-pointer"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="text-6xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {service.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-foreground/70 leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors">
                {service.description}
              </p>
              
              {/* Learn More Link */}
              <motion.div
                className="flex items-center gap-2 text-primary font-semibold text-sm"
                initial={{ opacity: 0.7, x: 0 }}
                whileHover={{ opacity: 1, x: 5 }}
              >
                <span>Learn more</span>
                <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </motion.div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
