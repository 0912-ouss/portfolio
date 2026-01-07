import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all sessions
export async function GET() {
    try {
        const sessions = await prisma.session.findMany({
            include: {
                trainer: true,
                location: true,
                _count: { select: { bookings: true } },
            },
            orderBy: { day: "asc" },
        })

        return NextResponse.json({ success: true, data: sessions })
    } catch (error) {
        console.error("API SESSIONS GET ERROR:", error)
        return NextResponse.json(
            { success: false, error: "Failed to fetch sessions" },
            { status: 500 }
        )
    }
}

// POST create new session
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, activity, gender, day, time, capacity, trainerId, locationId } = body

        const session = await prisma.session.create({
            data: {
                name,
                activity,
                gender,
                day,
                time,
                capacity,
                trainerId,
                locationId,
            },
            include: { trainer: true, location: true },
        })

        return NextResponse.json({ success: true, data: session }, { status: 201 })
    } catch (error) {
        console.error("API SESSIONS POST ERROR:", error)
        return NextResponse.json(
            { success: false, error: "Failed to create session" },
            { status: 500 }
        )
    }
}
