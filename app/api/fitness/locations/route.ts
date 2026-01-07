import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all locations
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

// POST create location
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const location = await prisma.location.create({ data: body })
        return NextResponse.json({ success: true, data: location }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to create location" }, { status: 500 })
    }
}
