import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-auth"

// GET all members (Admin only)
export async function GET() {
    const authError = await requireAdmin();
    if (authError) return authError;
    try {
        const members = await prisma.user.findMany({
            where: { role: "MEMBER" },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                membershipId: true,
                status: true,
                role: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        })

        // Ensure all members have a status field (for backward compatibility)
        const membersWithStatus = members.map(member => ({
            ...member,
            status: member.status || "Active"
        }))

        return NextResponse.json({ success: true, data: membersWithStatus })
    } catch (error: any) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API MEMBERS GET ERROR:", error)
        }
        return NextResponse.json(
            { success: false, error: "Failed to fetch members", details: error?.message },
            { status: 500 }
        )
    }
}

// POST create new member (Admin only)
export async function POST(request: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;
    try {
        const body = await request.json()
        const { email, firstName, lastName, membershipId, status, role, password } = body

        // Provide a default password if not specified (Admins adding members)
        const finalPassword = password || `Elysium${Math.floor(1000 + Math.random() * 9000)}!`;

        const member = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                membershipId,
                status: status || "Active",
                password: finalPassword,
                role: role || "MEMBER",
            },
        })

        return NextResponse.json({ success: true, data: member }, { status: 201 })
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API MEMBERS POST ERROR:", error)
        }
        return NextResponse.json(
            { success: false, error: "Failed to create member" },
            { status: 500 }
        )
    }
}
