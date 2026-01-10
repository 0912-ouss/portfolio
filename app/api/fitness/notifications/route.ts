import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-auth"

export async function GET() {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const notifications = await prisma.notification.findMany({
            include: {
                recipients: {
                    select: {
                        id: true,
                        userId: true,
                        read: true,
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: "desc" }
        });

        // Add recipient count to each notification
        const notificationsWithCount = notifications.map(notification => ({
            ...notification,
            recipientCount: notification.recipients.length
        }));

        return NextResponse.json({ success: true, data: notificationsWithCount });
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API NOTIFICATIONS GET ERROR:", error);
        }
        return NextResponse.json(
            { success: false, error: "Failed to fetch notifications" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await request.json();
        const { title, message, type, targetType, targetValue } = body;

        // Create notification
        const notification = await prisma.notification.create({
            data: {
                title,
                message,
                type: type || "INFO",
                targetType: targetType || "ALL",
                targetValue
            }
        });

        // Determine recipients
        let userIds: string[] = [];
        
        if (targetType === "ALL") {
            const users = await prisma.user.findMany({
                where: { role: { in: ["MEMBER", "CLIENT"] } },
                select: { id: true }
            });
            userIds = users.map(u => u.id);
        } else if (targetType === "ROLE") {
            const users = await prisma.user.findMany({
                where: { role: targetValue },
                select: { id: true }
            });
            userIds = users.map(u => u.id);
        } else if (targetType === "SPECIFIC" && targetValue) {
            userIds = targetValue.split(",").map((id: string) => id.trim());
        }

        // Create recipients
        if (userIds.length > 0) {
            await prisma.notificationRecipient.createMany({
                data: userIds.map(userId => ({
                    notificationId: notification.id,
                    userId
                }))
            });
        }

        // Mark as sent
        await prisma.notification.update({
            where: { id: notification.id },
            data: {
                sent: true,
                sentAt: new Date()
            }
        });

        return NextResponse.json({ success: true, data: notification });
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("Failed to create notification:", error);
        }
        return NextResponse.json(
            { success: false, error: "Failed to create notification" },
            { status: 500 }
        );
    }
}
