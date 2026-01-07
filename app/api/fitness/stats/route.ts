import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const [totalMembers, activeSessions, newInquiries] = await Promise.all([
            prisma.user.count({ where: { role: "MEMBER" } }),
            prisma.session.count(),
            prisma.inquiry.count({ where: { status: "PENDING" } })
        ])

        // Revenue mock based on member count for demo purposes
        const revenue = totalMembers * 450 + 15000

        const recentActivity = await prisma.user.findMany({
            where: { role: "MEMBER" },
            orderBy: { createdAt: "desc" },
            take: 5,
            select: { id: true, firstName: true, lastName: true, createdAt: true }
        })

        return NextResponse.json({
            success: true,
            data: {
                totalMembers,
                activeSessions,
                newInquiries,
                revenue,
                recentActivity
            }
        })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 })
    }
}
