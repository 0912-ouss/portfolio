import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-auth"

// GET all inquiries (Admin only)
export async function GET() {
    const authError = await requireAdmin();
    if (authError) return authError;
    try {
        const inquiries = await prisma.inquiry.findMany({
            orderBy: { createdAt: "desc" },
        })
        return NextResponse.json({ success: true, data: inquiries })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch inquiries" }, { status: 500 })
    }
}

// POST create inquiry (Public)
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const inquiry = await prisma.inquiry.create({ data: body })
        return NextResponse.json({ success: true, data: inquiry }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to submit inquiry" }, { status: 500 })
    }
}
