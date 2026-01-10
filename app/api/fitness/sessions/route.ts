import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-auth"

// GET all sessions (Public - used by frontend)
export async function GET() {
    try {
        const sessions = await prisma.session.findMany({
            include: {
                trainer: true,
                location: true,
            },
            orderBy: { day: "asc" },
        })

        // Get confirmed bookings count for each session
        const sessionsWithCounts = await Promise.all(
            sessions.map(async (session) => {
                const confirmedBookingsCount = await prisma.booking.count({
                    where: {
                        sessionId: session.id,
                        status: "CONFIRMED"
                    }
                });

                return {
                    ...session,
                    _count: {
                        bookings: confirmedBookingsCount
                    },
                    bookingEnabled: session.bookingEnabled !== false
                };
            })
        );

        return NextResponse.json({ success: true, data: sessionsWithCounts })
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API SESSIONS GET ERROR:", error)
        }
        return NextResponse.json(
            { success: false, error: "Failed to fetch sessions" },
            { status: 500 }
        )
    }
}

// POST create new session (Admin only)
export async function POST(request: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;
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
                bookingEnabled: true, // Default to enabled
            },
            include: { 
                trainer: true, 
                location: true,
            },
        });

        // Count only CONFIRMED bookings (will be 0 for new session)
        const confirmedBookingsCount = await prisma.booking.count({
            where: {
                sessionId: session.id,
                status: "CONFIRMED"
            }
        });

        return NextResponse.json({ 
            success: true, 
            data: {
                ...session,
                _count: {
                    bookings: confirmedBookingsCount
                }
            }
        }, { status: 201 })
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API SESSIONS POST ERROR:", error)
        }
        return NextResponse.json(
            { success: false, error: "Failed to create session" },
            { status: 500 }
        )
    }
}
