import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all members
export async function GET() {
    try {
        const members = await prisma.user.findMany({
            where: { role: "MEMBER" },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                membershipId: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json({ success: true, data: members })
    } catch (error) {
        console.error("API MEMBERS GET ERROR:", error)
        return NextResponse.json(
            { success: false, error: "Failed to fetch members" },
            { status: 500 }
        )
    }
}

// POST create new member
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, firstName, lastName, membershipId, password } = body

        // Provide a default password if not specified (Admins adding members)
        const finalPassword = password || `Elysium${Math.floor(1000 + Math.random() * 9000)}!`;

        const member = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                membershipId,
                password: finalPassword,
                role: "MEMBER",
            },
        })

        return NextResponse.json({ success: true, data: member }, { status: 201 })
    } catch (error) {
        console.error("API MEMBERS POST ERROR:", error)
        return NextResponse.json(
            { success: false, error: "Failed to create member" },
            { status: 500 }
        )
    }
}
