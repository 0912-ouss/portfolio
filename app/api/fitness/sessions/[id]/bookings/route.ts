import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-auth"

// GET all bookings for a specific session (Admin only)
export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const sessionId = (await context.params).id;

        // Verify session exists
        const session = await prisma.session.findUnique({
            where: { id: sessionId },
        });

        if (!session) {
            return NextResponse.json(
                { success: false, error: "Session not found" },
                { status: 404 }
            );
        }

        // Get all bookings for this session
        const bookings = await prisma.booking.findMany({
            where: { sessionId },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                        status: true,
                        membershipId: true,
                        createdAt: true,
                    }
                },
                session: {
                    select: {
                        name: true,
                        day: true,
                        time: true,
                        activity: true,
                    }
                }
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ success: true, data: bookings });
    } catch (error: any) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API SESSION BOOKINGS GET ERROR:", error);
        }
        return NextResponse.json(
            { success: false, error: "Failed to fetch session bookings", details: error?.message },
            { status: 500 }
        );
    }
}
