"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiSend, FiCheckCircle, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Form data:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit(onSubmit)}
      className="relative card p-8 lg:p-10 space-y-6"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />

      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <FiUser className="w-4 h-4 text-primary" />
          Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 dark:bg-secondary/30 border-2 border-border focus:border-primary focus:bg-background transition-all outline-none text-foreground placeholder:text-foreground/40"
            placeholder="John Doe"
          />
        </div>
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 flex items-center gap-1"
          >
            {errors.name.message}
          </motion.p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <FiMail className="w-4 h-4 text-primary" />
          Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 dark:bg-secondary/30 border-2 border-border focus:border-primary focus:bg-background transition-all outline-none text-foreground placeholder:text-foreground/40"
            placeholder="john@example.com"
          />
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 flex items-center gap-1"
          >
            {errors.email.message}
          </motion.p>
        )}
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label htmlFor="subject" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <FiMessageSquare className="w-4 h-4 text-primary" />
          Subject <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="subject"
            type="text"
            {...register("subject", { required: "Subject is required" })}
            className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 dark:bg-secondary/30 border-2 border-border focus:border-primary focus:bg-background transition-all outline-none text-foreground placeholder:text-foreground/40"
            placeholder="Project inquiry"
          />
        </div>
        {errors.subject && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 flex items-center gap-1"
          >
            {errors.subject.message}
          </motion.p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <FiMessageSquare className="w-4 h-4 text-primary" />
          Message <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            id="message"
            rows={6}
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
            })}
            className="w-full px-4 py-3.5 rounded-xl bg-secondary/50 dark:bg-secondary/30 border-2 border-border focus:border-primary focus:bg-background transition-all outline-none resize-none text-foreground placeholder:text-foreground/40"
            placeholder="Tell us about your project..."
          />
        </div>
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 flex items-center gap-1"
          >
            {errors.message.message}
          </motion.p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="group relative w-full px-8 py-4 bg-gradient-to-r from-primary via-purple-500 to-accent text-white rounded-xl font-semibold text-lg shadow-[0_10px_40px_rgba(168,85,247,0.3)] hover:shadow-[0_15px_50px_rgba(168,85,247,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              Sending...
            </>
          ) : isSubmitted ? (
            <>
              <FiCheckCircle className="w-5 h-5" />
              Message Sent!
            </>
          ) : (
            <>
              <FiSend className="w-5 h-5" />
              Send Message
            </>
          )}
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </motion.button>

      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/20 rounded-xl text-green-500 dark:text-green-400 text-center font-medium"
        >
          ✓ Thank you! We'll get back to you soon.
        </motion.div>
      )}
    </motion.form>
  );
}
