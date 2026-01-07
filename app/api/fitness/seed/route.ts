import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function GET() {
    try {
        console.log("🌱 API Seeding started...")

        // 1. Members
        const memberPassword = await bcrypt.hash("member123", 10)
        try {
            await prisma.user.upsert({
                where: { email: "jp.dubois@email.com" },
                update: {},
                create: {
                    email: "jp.dubois@email.com",
                    password: memberPassword,
                    firstName: "Jean-Pierre",
                    lastName: "Dubois",
                    role: "MEMBER",
                    membershipId: "Infinity",
                },
            })
        } catch (e: any) {
            return NextResponse.json({ success: false, error: "Step 1 (Members) failed", details: e.message, stack: e.stack }, { status: 500 })
        }

        // 2. Trainers
        try {
            await prisma.trainer.upsert({
                where: { id: "1" },
                update: {},
                create: {
                    id: "1",
                    name: "Marcus Steiner",
                    specialty: "Force & Conditionnement",
                    bio: "Champion national de powerlifting",
                    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
                },
            })
        } catch (e: any) {
            return NextResponse.json({ success: false, error: "Step 2 (Trainers) failed", details: e.message }, { status: 500 })
        }

        // 3. Locations
        try {
            await prisma.location.upsert({
                where: { id: "1" },
                update: {},
                create: {
                    id: "1",
                    city: "Paris",
                    name: "L'Elysée Suite",
                    address: "8 Avenue Montaigne, 75008 Paris",
                    hours: "06:00 - 23:00",
                    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1200",
                },
            })
        } catch (e: any) {
            return NextResponse.json({ success: false, error: "Step 3 (Locations) failed", details: e.message }, { status: 500 })
        }

        // 4. Admin
        try {
            const adminPassword = await bcrypt.hash("admin123", 10)
            await prisma.user.upsert({
                where: { email: "admin@elysium.com" },
                update: {},
                create: {
                    email: "admin@elysium.com",
                    password: adminPassword,
                    firstName: "Admin",
                    lastName: "Elysium",
                    role: "ADMIN",
                },
            })
        } catch (e: any) {
            return NextResponse.json({ success: false, error: "Step 4 (Admin) failed", details: e.message }, { status: 500 })
        }

        return NextResponse.json({ success: true, message: "Database seeded successfully" })
    } catch (error: any) {
        console.error("❌ Fatal Seed Error:", error)
        return NextResponse.json({ success: false, error: "Fatal error", details: error.message }, { status: 500 })
    }
}
