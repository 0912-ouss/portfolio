"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        
        if (status === "unauthenticated") {
            router.push("/demos/fitness/login");
            return;
        }
        
        if (session?.user?.role !== "ADMIN") {
            router.push("/demos/fitness");
            return;
        }
    }, [session, status, router]);

    // Show loading while checking auth
    if (status === "loading" || !session || session.user?.role !== "ADMIN") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
                    <p className="text-white/40 text-sm">Vérification de l'autorisation...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
