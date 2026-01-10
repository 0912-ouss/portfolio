import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, requireAuth } from "@/lib/api-auth";

export async function GET(request: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get("sessionId");
        const userId = searchParams.get("userId");

        if (sessionId) {
            const waitlist = await prisma.waitlist.findMany({
                where: { sessionId },
                include: {
                    user: true,
                    session: true
                },
                orderBy: [
                    { priority: "desc" },
                    { createdAt: "asc" }
                ]
            });
            return NextResponse.json({ success: true, data: waitlist });
        }

        if (userId) {
            const waitlist = await prisma.waitlist.findMany({
                where: { userId },
                include: {
                    session: {
                        include: {
                            trainer: true,
                            location: true
                        }
                    }
                },
                orderBy: { createdAt: "desc" }
            });
            return NextResponse.json({ success: true, data: waitlist });
        }

        const waitlist = await prisma.waitlist.findMany({
            include: {
                user: true,
                session: {
                    include: {
                        trainer: true,
                        location: true
                    }
                }
            },
            orderBy: [
                { priority: "desc" },
                { createdAt: "asc" }
            ]
        });
        return NextResponse.json({ success: true, data: waitlist });
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API WAITLIST GET ERROR:", error);
        }
        return NextResponse.json({ success: false, error: "Failed to fetch waitlist" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const authError = await requireAuth();
    if (authError) return authError;

    try {
        const body = await request.json();
        const { sessionId, userId, priority } = body;

        if (!sessionId || !userId) {
            return NextResponse.json({ success: false, error: "Session ID and User ID are required" }, { status: 400 });
        }

        // Check if already on waitlist
        const existing = await prisma.waitlist.findFirst({
            where: { sessionId, userId }
        });

        if (existing) {
            return NextResponse.json({ success: false, error: "Already on waitlist" }, { status: 400 });
        }

        // Check if already has a booking
        const existingBooking = await prisma.booking.findFirst({
            where: { sessionId, userId, status: "CONFIRMED" }
        });

        if (existingBooking) {
            return NextResponse.json({ success: false, error: "Already has a booking for this session" }, { status: 400 });
        }

        const waitlist = await prisma.waitlist.create({
            data: {
                sessionId,
                userId,
                priority: priority || 0
            },
            include: {
                user: true,
                session: true
            }
        });

        return NextResponse.json({ success: true, data: waitlist }, { status: 201 });
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API WAITLIST POST ERROR:", error);
        }
        return NextResponse.json({ success: false, error: "Failed to add to waitlist" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, error: "Waitlist ID is required" }, { status: 400 });
        }

        await prisma.waitlist.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API WAITLIST DELETE ERROR:", error);
        }
        return NextResponse.json({ success: false, error: "Failed to remove from waitlist" }, { status: 500 });
    }
}
