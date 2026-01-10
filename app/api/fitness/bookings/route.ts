import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAuth, requireAdmin, getAuthSession } from "@/lib/api-auth"

// POST create booking (Authenticated users only)
export async function POST(request: Request) {
    const session = await getAuthSession();
    if (!session?.user?.id) {
        return NextResponse.json(
            { success: false, error: "Unauthorized - Authentication required" },
            { status: 401 }
        );
    }

    try {
        const body = await request.json()
        const { sessionId } = body
        
        // Get userId from authenticated session (security fix)
        const userId = session.user.id;

        if (!sessionId) {
            return NextResponse.json(
                { success: false, error: "Session ID is required" },
                { status: 400 }
            )
        }

        // Check session capacity
        const sessionData = await prisma.session.findUnique({
            where: { id: sessionId },
            include: { 
                trainer: true,
                location: true,
            },
        })

        if (!sessionData) {
            return NextResponse.json(
                { success: false, error: "Session not found" },
                { status: 404 }
            )
        }

        // Check if booking is enabled for this session
        if (sessionData.bookingEnabled === false) {
            return NextResponse.json(
                { success: false, error: "Booking is disabled for this session" },
                { status: 400 }
            )
        }

        // Count only CONFIRMED bookings
        const confirmedBookingsCount = await prisma.booking.count({
            where: {
                sessionId,
                status: "CONFIRMED"
            }
        });

        if (confirmedBookingsCount >= sessionData.capacity) {
            return NextResponse.json(
                { success: false, error: "Session is full" },
                { status: 400 }
            )
        }

        // Check for existing booking
        const existingBooking = await prisma.booking.findFirst({
            where: { 
                userId, 
                sessionId, 
                status: "CONFIRMED" 
            },
        })

        if (existingBooking) {
            return NextResponse.json(
                { success: false, error: "Already booked for this session" },
                { status: 400 }
            )
        }

        const booking = await prisma.booking.create({
            data: { userId, sessionId },
            include: { 
                session: {
                    include: {
                        trainer: true,
                        location: true,
                    }
                }
            },
        })

        return NextResponse.json({ success: true, data: booking }, { status: 201 })
    } catch (error: any) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API BOOKINGS POST ERROR:", error)
        }
        return NextResponse.json(
            { success: false, error: "Failed to create booking", details: error?.message },
            { status: 500 }
        )
    }
}

// GET bookings - Admin gets all, Users get their own
export async function GET(request: Request) {
    const session = await getAuthSession();
    if (!session?.user?.id) {
        return NextResponse.json(
            { success: false, error: "Unauthorized - Authentication required" },
            { status: 401 }
        );
    }

    try {
        const isAdmin = session.user.role === "ADMIN";
        
        // Admin gets all bookings, users get only their own
        const bookings = await prisma.booking.findMany({
            where: isAdmin ? {} : { userId: session.user.id },
            include: {
                user: { 
                    select: { 
                        firstName: true, 
                        lastName: true, 
                        email: true 
                    } 
                },
                session: {
                    include: {
                        trainer: true,
                        location: true,
                    }
                },
            },
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json({ success: true, data: bookings })
    } catch (error: any) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API BOOKINGS GET ERROR:", error)
        }
        return NextResponse.json(
            { success: false, error: "Failed to fetch bookings", details: error?.message },
            { status: 500 }
        )
    }
}
