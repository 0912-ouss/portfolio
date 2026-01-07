import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.location.delete({
            where: { id: params.id }
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to delete location" }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()
        const updatedLocation = await prisma.location.update({
            where: { id: params.id },
            data: body
        })
        return NextResponse.json({ success: true, data: updatedLocation })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update location" }, { status: 500 })
    }
}
