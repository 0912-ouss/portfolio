import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-auth"

// GET all locations (Public - used by frontend)
export async function GET() {
    try {
        const locations = await prisma.location.findMany({
            orderBy: { name: "asc" },
        })
        return NextResponse.json({ success: true, data: locations })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch locations" }, { status: 500 })
    }
}

// POST create location (Admin only)
export async function POST(request: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;
    try {
        const body = await request.json()
        const location = await prisma.location.create({ data: body })
        return NextResponse.json({ success: true, data: location }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to create location" }, { status: 500 })
    }
}
