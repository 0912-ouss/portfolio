"use client";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/ui/ContactForm";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const contactInfo = [
  {
    icon: FiMail,
    label: "Email",
    value: "contact@example.com",
    link: "mailto:contact@example.com",
    description: "Send us an email anytime",
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/25",
    bg: "bg-violet-500",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567",
    description: "Call us for inquiries",
    gradient: "from-pink-500 to-rose-500",
    glow: "shadow-pink-500/25",
    bg: "bg-pink-500",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "San Francisco, CA",
    link: "#",
    description: "Visit our studio",
    gradient: "from-orange-500 to-red-500",
    glow: "shadow-orange-500/25",
    bg: "bg-orange-500",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.08),transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's discuss your next creative project and bring your vision to life"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info - Enhanced with 3D icons */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.link}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.08, type: "spring" }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group relative block p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
                />

                {/* Animated background glow */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 ${info.bg} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                <div className="relative flex items-center gap-5">
                  {/* 3D Icon Container */}
                  <motion.div
                    whileHover={{ rotateY: 180, scale: 1.1 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="relative"
                    style={{ perspective: "500px" }}
                  >
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${info.gradient} shadow-xl ${info.glow} flex items-center justify-center transform transition-transform duration-300 group-hover:shadow-2xl`}>
                      {/* Icon */}
                      <info.icon className="w-7 h-7 text-white" />

                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "200%" }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>

                      {/* Floating ring */}
                      <motion.div
                        className={`absolute -inset-1 rounded-2xl border-2 border-white/20`}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    </div>

                    {/* Shadow/reflection */}
                    <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 ${info.bg} rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity`} />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="text-xs font-bold text-foreground/40 mb-1 uppercase tracking-widest">
                      {info.label}
                    </div>
                    <div className="text-lg font-bold text-foreground mb-0.5 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-primary group-hover:to-accent transition-all duration-300">
                      {info.value}
                    </div>
                    <div className="text-sm text-foreground/50">
                      {info.description}
                    </div>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-lg`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
