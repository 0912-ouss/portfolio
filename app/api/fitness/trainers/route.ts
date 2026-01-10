import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-auth"

// GET all trainers (Public - used by frontend)
export async function GET() {
    try {
        const trainers = await prisma.trainer.findMany({
            orderBy: { name: "asc" },
        })
        return NextResponse.json({ success: true, data: trainers })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch trainers" }, { status: 500 })
    }
}

// POST create trainer (Admin only)
export async function POST(request: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;
    try {
        const body = await request.json()
        const trainer = await prisma.trainer.create({ data: body })
        return NextResponse.json({ success: true, data: trainer }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to create trainer" }, { status: 500 })
    }
}
