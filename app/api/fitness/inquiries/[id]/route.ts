import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()
        const { status } = body

        const updatedInquiry = await prisma.inquiry.update({
            where: { id: params.id },
            data: { status }
        })

        return NextResponse.json({ success: true, data: updatedInquiry })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update inquiry" }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.inquiry.delete({
            where: { id: params.id }
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to delete inquiry" }, { status: 500 })
    }
}
