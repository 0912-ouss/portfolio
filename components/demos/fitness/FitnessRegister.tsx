"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export function FitnessRegister() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        code: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        try {
            const res = await fetch("/api/fitness/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    subject: "Candidature Membre",
                    message: `Téléphone: ${formData.phone}\nCode Parrainage: ${formData.code || "Aucun"}`
                })
            });

            if (res.ok) {
                setStatus("success");
            } else {
                throw new Error("Erreur lors de l'envoi");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    if (status === "success") {
        return (
            <section className="min-h-screen bg-[#080808] flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="bg-[#050505]/80 backdrop-blur-xl border border-[#D4AF37]/30 p-12 rounded-[2rem] text-center max-w-lg">
                    <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37] mx-auto mb-6">
                        <FiArrowRight className="text-2xl -rotate-45" />
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Candidature Reçue</h2>
                    <p className="text-white/60 font-sans mb-8">
                        Votre dossier a été transmis à notre comité. Vous recevrez une réponse sous 24h à l'adresse <strong>{formData.email}</strong>.
                    </p>
                    <Link href="/demos/fitness" className="inline-block bg-[#D4AF37] text-black font-bold uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-white transition-colors">
                        Retour à l'accueil
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#080808] flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808] z-10" />
                <img
                    src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover opacity-20 grayscale"
                />
            </div>

            <div className="relative z-10 w-full max-w-3xl bg-[#050505]/80 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-[2rem] shadow-2xl">
                <div className="text-center mb-16">
                    <Link href="/demos/fitness" className="text-white/30 hover:text-white transition-colors mb-8 block font-serif text-2xl">ELYSIUM</Link>
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                        Candidature <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F1C40F]">Exclusive</span>
                    </h1>
                    <p className="text-white/60 font-sans max-w-lg mx-auto">
                        L'accès à Elysium est limité pour garantir une expérience optimale. Votre candidature sera examinée par notre comité sous 24h.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold pl-2">Prénom</label>
                        <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full bg-white/5 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-sans placeholder:text-white/10 focus:bg-white/10 rounded-t-lg"
                            placeholder="John"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold pl-2">Nom</label>
                        <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full bg-white/5 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-sans placeholder:text-white/10 focus:bg-white/10 rounded-t-lg"
                            placeholder="Doe"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold pl-2">Email Privé</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/5 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-sans placeholder:text-white/10 focus:bg-white/10 rounded-t-lg"
                            placeholder="john.doe@exemple.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold pl-2">Téléphone</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-white/5 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-sans placeholder:text-white/10 focus:bg-white/10 rounded-t-lg"
                            placeholder="+33 6 ..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold pl-2">Code Parrainage (Optionnel)</label>
                        <input
                            type="text"
                            value={formData.code}
                            onChange={e => setFormData({ ...formData, code: e.target.value })}
                            className="w-full bg-white/5 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-sans placeholder:text-white/10 focus:bg-white/10 rounded-t-lg"
                            placeholder="ELY-..."
                        />
                    </div>

                    {status === "error" && (
                        <div className="md:col-span-2 text-red-500 text-center text-sm font-bold uppercase tracking-widest">
                            {errorMessage}
                        </div>
                    )}

                    <div className="md:col-span-2 pt-8">
                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-6 rounded-xl hover:bg-[#D4AF37] disabled:bg-zinc-800 disabled:text-zinc-500 transition-all duration-500 flex items-center justify-center gap-4 text-lg shadow-lg hover:shadow-[#D4AF37]/20 transform hover:-translate-y-1"
                        >
                            {status === "submitting" ? (
                                <span>Envoi en cours...</span>
                            ) : (
                                <>
                                    <span>Soumettre Dossier</span>
                                    <FiArrowRight />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-12 text-center">
                    <Link href="/demos/fitness/login" className="text-white/40 text-xs font-sans hover:text-white transition-colors">
                        Déjà membre ? <span className="underline decoration-[#D4AF37] decoration-1 underline-offset-4 text-white">Se connecter</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
