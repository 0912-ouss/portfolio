import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin, getAuthSession } from "@/lib/api-auth"

export async function GET(request: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const { searchParams } = new URL(request.url);
        const action = searchParams.get("action");
        const entity = searchParams.get("entity");
        const limit = parseInt(searchParams.get("limit") || "100");

        const logs = await prisma.activityLog.findMany({
            where: {
                ...(action && { action }),
                ...(entity && { entity })
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            },
            orderBy: { createdAt: "desc" },
            take: limit
        });

        return NextResponse.json({ success: true, data: logs });
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("Failed to fetch activity logs:", error);
        }
        return NextResponse.json(
            { success: false, error: "Failed to fetch activity logs" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const session = await getAuthSession();
    if (!session?.user?.id) {
        return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();
        const { action, entity, entityId, details, ipAddress } = body;

        const log = await prisma.activityLog.create({
            data: {
                userId: session.user.id,
                action,
                entity,
                entityId,
                details: details ? JSON.stringify(details) : null,
                ipAddress
            }
        });

        return NextResponse.json({ success: true, data: log });
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("Failed to create activity log:", error);
        }
        return NextResponse.json(
            { success: false, error: "Failed to create activity log" },
            { status: 500 }
        );
    }
}
