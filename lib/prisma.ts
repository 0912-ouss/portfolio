import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Ensure the URL is passed correctly even if process.env is weird
const databaseUrl = process.env.DATABASE_URL || "file:./dev.db"

if (!process.env.DATABASE_URL) {
    console.warn("⚠️  DATABASE_URL is missing. Using default local fallback: file:./dev.db")
}

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        datasources: {
            db: {
                url: databaseUrl
            }
        }
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
