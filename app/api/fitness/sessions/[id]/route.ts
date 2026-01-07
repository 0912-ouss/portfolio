import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.session.delete({
            where: { id: params.id }
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to delete session" }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()
        const updatedSession = await prisma.session.update({
            where: { id: params.id },
            data: body
        })
        return NextResponse.json({ success: true, data: updatedSession })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update session" }, { status: 500 })
    }
}
