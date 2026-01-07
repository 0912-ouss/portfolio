"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FiArrowRight, FiLoader } from "react-icons/fi";

export function FitnessLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Identifiants incorrects. Veuillez réessayer.");
            } else {
                router.push("/demos/fitness/admin");
            }
        } catch (err) {
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-[#050505] flex flex-col md:flex-row relative overflow-hidden">
            {/* Left : Dramatic Image */}
            <div className="hidden md:block w-1/2 relative">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                    alt="Luxury Interior"
                    className="w-full h-full object-cover grayscale"
                />
                <div className="absolute bottom-12 left-12 z-20 max-w-md">
                    <h2 className="text-white text-4xl font-black uppercase tracking-tighter mb-4">
                        Bienvenue au <br />
                        <span className="text-[#D4AF37]">Sanctuaire</span>
                    </h2>
                    <p className="text-white/60 text-sm font-sans">
                        Accédez à votre espace personnel et gérez votre parcours d'excellence.
                    </p>
                </div>
            </div>

            {/* Right: Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-20 relative">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="w-full max-w-md space-y-12">
                    <div className="text-center md:text-left">
                        <Link
                            href="/demos/fitness"
                            className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] font-black hover:text-white transition-colors mb-8 inline-block"
                        >
                            ← Retour à Elysium
                        </Link>
                        <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-2">
                            Membre
                        </h1>
                        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
                            Connexion sécurisée
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase tracking-widest font-bold rounded-lg text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-2">
                                Identifiant
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-sans"
                                placeholder="ID Membre ou Email"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-2">
                                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                                    Mot de passe
                                </label>
                                <a
                                    href="#"
                                    className="text-[10px] uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors font-bold"
                                >
                                    Oublié ?
                                </a>
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-sans"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#D4AF37] text-black font-black uppercase tracking-[0.2em] py-5 rounded-xl hover:bg-white disabled:bg-zinc-800 disabled:text-zinc-600 transition-all duration-500 flex items-center justify-center gap-4 group"
                        >
                            {loading ? (
                                <FiLoader className="animate-spin" />
                            ) : (
                                <>
                                    <span>Accéder</span>
                                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-8 border-t border-white/5 text-center">
                        <p className="text-white/30 text-xs font-sans mb-4">Vous n'êtes pas encore membre ?</p>
                        <Link
                            href="/demos/fitness/register"
                            className="inline-block border border-white/20 px-8 py-3 rounded-full text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all"
                        >
                            Candidater
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
