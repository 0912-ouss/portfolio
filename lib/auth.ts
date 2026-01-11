import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials")
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })

                if (!user) {
                    throw new Error("Invalid credentials")
                }

                // Check if user is active
                if (user.status !== "Active") {
                    throw new Error("Account is inactive. Please contact support.")
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if (!isPasswordValid) {
                    throw new Error("Invalid credentials")
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                    role: user.role,
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role as string
                session.user.id = token.id as string
            }
            return session
        }
    },
    pages: {
        signIn: "/demos/fitness/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: (() => {
        const secret = process.env.NEXTAUTH_SECRET;
        
        // Check if we're in a build phase (not runtime)
        const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || 
                            process.env.NEXT_PHASE === 'phase-development-build';
        
        // If no secret is set
        if (!secret) {
            // During build phase, use fallback (don't throw)
            if (isBuildPhase) {
                console.warn("⚠️  WARNING: NEXTAUTH_SECRET not set during build. Using fallback. Set NEXTAUTH_SECRET in .env.local!");
                return "development-secret-key-change-in-production";
            }
            
            // In production runtime, require the secret
            if (process.env.NODE_ENV === 'production') {
                throw new Error("NEXTAUTH_SECRET environment variable is required in production");
            }
            
            // In development runtime, use fallback but warn
            console.warn("⚠️  WARNING: NEXTAUTH_SECRET not set. Using development fallback. Set NEXTAUTH_SECRET in production!");
            return "development-secret-key-change-in-production";
        }
        
        return secret;
    })(),
}
