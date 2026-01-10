import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-auth"
import bcrypt from "bcryptjs"

export async function POST(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const memberId = (await context.params).id;

        // Find the member
        const member = await prisma.user.findUnique({
            where: { id: memberId },
            select: { id: true, email: true, firstName: true, lastName: true }
        });

        if (!member) {
            return NextResponse.json(
                { success: false, error: "Member not found" },
                { status: 404 }
            );
        }

        // Generate a new password
        const newPassword = `Elysium${Math.floor(1000 + Math.random() * 9000)}!`;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the member's password
        await prisma.user.update({
            where: { id: memberId },
            data: { password: hashedPassword }
        });

        return NextResponse.json({
            success: true,
            credentials: {
                email: member.email,
                password: newPassword
            }
        });
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("Failed to reset password:", error);
        }
        return NextResponse.json(
            { success: false, error: "Failed to reset password" },
            { status: 500 }
        );
    }
}
