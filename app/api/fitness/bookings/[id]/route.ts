import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/api-auth"

// DELETE cancel booking (Users can cancel their own, Admins can cancel any)
export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const session = await getAuthSession();
    if (!session?.user?.id) {
        return NextResponse.json(
            { success: false, error: "Unauthorized - Authentication required" },
            { status: 401 }
        );
    }

    try {
        const bookingId = (await context.params).id;
        const isAdmin = session.user.role === "ADMIN";

        // Get booking to check ownership
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { session: true },
        });

        if (!booking) {
            return NextResponse.json(
                { success: false, error: "Booking not found" },
                { status: 404 }
            );
        }

        // Users can only cancel their own bookings (unless admin)
        if (!isAdmin && booking.userId !== session.user.id) {
            return NextResponse.json(
                { success: false, error: "Forbidden - You can only cancel your own bookings" },
                { status: 403 }
            );
        }

        // Delete the booking
        await prisma.booking.delete({
            where: { id: bookingId },
        });

        return NextResponse.json({ success: true, message: "Booking cancelled successfully" });
    } catch (error: any) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API BOOKINGS DELETE ERROR:", error);
        }
        return NextResponse.json(
            { success: false, error: "Failed to cancel booking", details: error?.message },
            { status: 500 }
        );
    }
}

// GET single booking (Users can get their own, Admins can get any)
export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const session = await getAuthSession();
    if (!session?.user?.id) {
        return NextResponse.json(
            { success: false, error: "Unauthorized - Authentication required" },
            { status: 401 }
        );
    }

    try {
        const bookingId = (await context.params).id;
        const isAdmin = session.user.role === "ADMIN";

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
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
        });

        if (!booking) {
            return NextResponse.json(
                { success: false, error: "Booking not found" },
                { status: 404 }
            );
        }

        // Users can only see their own bookings (unless admin)
        if (!isAdmin && booking.userId !== session.user.id) {
            return NextResponse.json(
                { success: false, error: "Forbidden - You can only view your own bookings" },
                { status: 403 }
            );
        }

        return NextResponse.json({ success: true, data: booking });
    } catch (error: any) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API BOOKINGS GET ERROR:", error);
        }
        return NextResponse.json(
            { success: false, error: "Failed to fetch booking", details: error?.message },
            { status: 500 }
        );
    }
}
