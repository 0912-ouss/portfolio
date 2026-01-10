import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-auth"

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const authError = await requireAdmin();
    if (authError) return authError;
    
    try {
        await prisma.session.delete({
            where: { id: (await context.params).id }
        })
        return NextResponse.json({ success: true })
    } catch (error: any) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API SESSIONS DELETE ERROR:", error);
        }
        return NextResponse.json({ success: false, error: "Failed to delete session", details: error?.message }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const authError = await requireAdmin();
    if (authError) return authError;
    
    try {
        const body = await request.json()
        const sessionId = (await context.params).id;
        const updatedSession = await prisma.session.update({
            where: { id: sessionId },
            data: body,
            include: {
                trainer: true,
                location: true,
            }
        });

        // Count only CONFIRMED bookings
        const confirmedBookingsCount = await prisma.booking.count({
            where: {
                sessionId,
                status: "CONFIRMED"
            }
        });

        return NextResponse.json({ 
            success: true, 
            data: {
                ...updatedSession,
                _count: {
                    bookings: confirmedBookingsCount
                }
            }
        })
    } catch (error: any) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API SESSIONS PUT ERROR:", error);
        }
        return NextResponse.json({ success: false, error: "Failed to update session", details: error?.message }, { status: 500 })
    }
}

// PATCH endpoint to toggle booking status
export async function PATCH(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const authError = await requireAdmin();
    if (authError) return authError;
    
    try {
        const sessionId = (await context.params).id;
        const body = await request.json();
        const { bookingEnabled } = body;

        const session = await prisma.session.findUnique({
            where: { id: sessionId },
        });

        if (!session) {
            return NextResponse.json(
                { success: false, error: "Session not found" },
                { status: 404 }
            );
        }

        const updatedSession = await prisma.session.update({
            where: { id: sessionId },
            data: { bookingEnabled: bookingEnabled !== undefined ? bookingEnabled : !session.bookingEnabled },
            include: {
                trainer: true,
                location: true,
            }
        });

        // Count only CONFIRMED bookings
        const confirmedBookingsCount = await prisma.booking.count({
            where: {
                sessionId,
                status: "CONFIRMED"
            }
        });

        return NextResponse.json({ 
            success: true, 
            data: {
                ...updatedSession,
                _count: {
                    bookings: confirmedBookingsCount
                }
            },
            message: `Booking ${updatedSession.bookingEnabled ? 'enabled' : 'disabled'}` 
        });
    } catch (error: any) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API SESSIONS PATCH ERROR:", error);
        }
        return NextResponse.json({ 
            success: false, 
            error: "Failed to toggle booking status", 
            details: error?.message 
        }, { status: 500 });
    }
}

