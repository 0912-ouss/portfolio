import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await prisma.user.delete({
            where: { id: (await context.params).id }
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to delete member" }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const body = await request.json()
        const updatedMember = await prisma.user.update({
            where: { id: (await context.params).id },
            data: body
        })
        return NextResponse.json({ success: true, data: updatedMember })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update member" }, { status: 500 })
    }
}
