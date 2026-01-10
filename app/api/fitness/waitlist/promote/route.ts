import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function POST(request: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await request.json();
        const { waitlistId, sessionId } = body;

        if (!waitlistId && !sessionId) {
            return NextResponse.json({ success: false, error: "Waitlist ID or Session ID is required" }, { status: 400 });
        }

        if (waitlistId) {
            // Promote specific waitlist entry
            const waitlist = await prisma.waitlist.findUnique({
                where: { id: waitlistId },
                include: {
                    session: true,
                    user: true
                }
            });

            if (!waitlist) {
                return NextResponse.json({ success: false, error: "Waitlist entry not found" }, { status: 404 });
            }

            // Check if session has available capacity
            const bookingsCount = await prisma.booking.count({
                where: {
                    sessionId: waitlist.sessionId,
                    status: "CONFIRMED"
                }
            });

            if (bookingsCount >= waitlist.session.capacity) {
                return NextResponse.json({ success: false, error: "Session is full" }, { status: 400 });
            }

            // Create booking
            const booking = await prisma.booking.create({
                data: {
                    userId: waitlist.userId,
                    sessionId: waitlist.sessionId,
                    status: "CONFIRMED"
                },
                include: {
                    user: true,
                    session: true
                }
            });

            // Remove from waitlist
            await prisma.waitlist.delete({
                where: { id: waitlistId }
            });

            return NextResponse.json({ success: true, data: booking });
        } else {
            // Auto-promote next person from waitlist for a session
            const session = await prisma.session.findUnique({
                where: { id: sessionId }
            });

            if (!session) {
                return NextResponse.json({ success: false, error: "Session not found" }, { status: 404 });
            }

            const bookingsCount = await prisma.booking.count({
                where: {
                    sessionId,
                    status: "CONFIRMED"
                }
            });

            if (bookingsCount >= session.capacity) {
                return NextResponse.json({ success: false, error: "Session is full" }, { status: 400 });
            }

            // Get next person on waitlist
            const nextWaitlist = await prisma.waitlist.findFirst({
                where: { sessionId },
                include: {
                    user: true
                },
                orderBy: [
                    { priority: "desc" },
                    { createdAt: "asc" }
                ]
            });

            if (!nextWaitlist) {
                return NextResponse.json({ success: false, error: "No one on waitlist" }, { status: 404 });
            }

            // Create booking
            const booking = await prisma.booking.create({
                data: {
                    userId: nextWaitlist.userId,
                    sessionId,
                    status: "CONFIRMED"
                },
                include: {
                    user: true,
                    session: true
                }
            });

            // Remove from waitlist and mark as notified
            await prisma.waitlist.update({
                where: { id: nextWaitlist.id },
                data: { notified: true }
            });

            await prisma.waitlist.delete({
                where: { id: nextWaitlist.id }
            });

            return NextResponse.json({ success: true, data: booking });
        }
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API WAITLIST PROMOTE ERROR:", error);
        }
        return NextResponse.json({ success: false, error: "Failed to promote from waitlist" }, { status: 500 });
    }
}
