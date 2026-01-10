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
        await prisma.user.delete({
            where: { id: (await context.params).id }
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API MEMBERS DELETE ERROR:", error)
        }
        return NextResponse.json({ success: false, error: "Failed to delete member" }, { status: 500 })
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
        const updatedMember = await prisma.user.update({
            where: { id: (await context.params).id },
            data: body
        })
        return NextResponse.json({ success: true, data: updatedMember })
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("API MEMBERS PUT ERROR:", error)
        }
        return NextResponse.json({ success: false, error: "Failed to update member" }, { status: 500 })
    }
}
