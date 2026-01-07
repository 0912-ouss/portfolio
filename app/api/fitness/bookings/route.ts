import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// POST create booking
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { userId, sessionId } = body

        // Check session capacity
        const session = await prisma.session.findUnique({
            where: { id: sessionId },
            include: { _count: { select: { bookings: true } } },
        })

        if (!session) {
            return NextResponse.json(
                { error: "Session not found" },
                { status: 404 }
            )
        }

        if (session._count.bookings >= session.capacity) {
            return NextResponse.json(
                { error: "Session is full" },
                { status: 400 }
            )
        }

        // Check for existing booking
        const existingBooking = await prisma.booking.findFirst({
            where: { userId, sessionId, status: "CONFIRMED" },
        })

        if (existingBooking) {
            return NextResponse.json(
                { error: "Already booked for this session" },
                { status: 400 }
            )
        }

        const booking = await prisma.booking.create({
            data: { userId, sessionId },
            include: { session: true },
        })

        return NextResponse.json(booking, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create booking" },
            { status: 500 }
        )
    }
}

// GET all bookings (for admin)
export async function GET() {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                user: { select: { firstName: true, lastName: true, email: true } },
                session: true,
            },
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(bookings)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch bookings" },
            { status: 500 }
        )
    }
}
