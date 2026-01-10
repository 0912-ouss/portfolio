import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export async function GET(request: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get("sessionId");
        const bookingId = searchParams.get("bookingId");

        if (bookingId) {
            const attendance = await prisma.attendance.findUnique({
                where: { bookingId },
                include: {
                    booking: {
                        include: {
                            user: true,
                            session: true
                        }
                    }
                }
            });
            return NextResponse.json({ success: true, data: attendance });
        }

        if (sessionId) {
            const attendances = await prisma.attendance.findMany({
                where: {
                    booking: { sessionId }
                },
                include: {
                    booking: {
                        include: {
                            user: true,
                            session: true
                        }
                    }
                },
                orderBy: { createdAt: "desc" }
            });
            return NextResponse.json({ success: true, data: attendances });
        }

        const attendances = await prisma.attendance.findMany({
            include: {
                booking: {
                    include: {
                        user: true,
                        session: {
                            include: {
                                trainer: true,
                                location: true
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: "desc" },
            take: 100
        });
        return NextResponse.json({ success: true, data: attendances });
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API ATTENDANCE GET ERROR:", error);
        }
        return NextResponse.json({ success: false, error: "Failed to fetch attendance" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await request.json();
        const { bookingId, attended, notes } = body;

        if (!bookingId) {
            return NextResponse.json({ success: false, error: "Booking ID is required" }, { status: 400 });
        }

        const attendance = await prisma.attendance.upsert({
            where: { bookingId },
            update: {
                attended: attended !== undefined ? attended : true,
                notes: notes || null,
                checkedInAt: attended ? new Date() : null
            },
            create: {
                bookingId,
                attended: attended !== undefined ? attended : true,
                notes: notes || null,
                checkedInAt: attended ? new Date() : null
            },
            include: {
                booking: {
                    include: {
                        user: true,
                        session: true
                    }
                }
            }
        });

        return NextResponse.json({ success: true, data: attendance });
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API ATTENDANCE POST ERROR:", error);
        }
        return NextResponse.json({ success: false, error: "Failed to update attendance" }, { status: 500 });
    }
}
