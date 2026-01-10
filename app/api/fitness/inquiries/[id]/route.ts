import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-auth"
import bcrypt from "bcryptjs"

export async function PUT(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    // Require admin authentication
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const body = await request.json()
        const { status } = body
        const inquiryId = (await context.params).id

        // Get the inquiry first
        const inquiry = await prisma.inquiry.findUnique({
            where: { id: inquiryId }
        })

        if (!inquiry) {
            return NextResponse.json({ success: false, error: "Inquiry not found" }, { status: 404 })
        }

        let generatedPassword = null

        // If status is being changed to RESOLVED/APPROVED, create user account
        if ((status === "RESOLVED" || status === "APPROVED") && inquiry.status === "PENDING") {
            // Check if user already exists
            const existingUser = await prisma.user.findUnique({
                where: { email: inquiry.email }
            })

            if (!existingUser) {
                // Parse name to get firstName and lastName
                const nameParts = inquiry.name.trim().split(' ')
                const firstName = nameParts[0] || inquiry.name
                const lastName = nameParts.slice(1).join(' ') || ""

                // Extract phone from message (format: "Téléphone: +212708029849")
                let phone = null
                const phoneMatch = inquiry.message.match(/Téléphone:\s*([+\d\s-]+)/i)
                if (phoneMatch) {
                    phone = phoneMatch[1].trim()
                }

                // Determine role based on subject
                let role = "CLIENT"
                if (inquiry.subject.toLowerCase().includes("membre") || inquiry.subject.toLowerCase().includes("member")) {
                    role = "MEMBER"
                }

                // Generate a random password
                generatedPassword = `Elysium${Math.floor(1000 + Math.random() * 9000)}!`
                const hashedPassword = await bcrypt.hash(generatedPassword, 10)

                // Create user account
                await prisma.user.create({
                    data: {
                        email: inquiry.email,
                        firstName,
                        lastName,
                        phone: phone || undefined,
                        password: hashedPassword,
                        role,
                        status: "Active", // Approved users are active by default
                    }
                })
            } else {
                // User already exists, just activate them if inactive
                if (existingUser.status !== "Active") {
                    await prisma.user.update({
                        where: { id: existingUser.id },
                        data: { status: "Active" }
                    })
                }
            }
        }

        // Update inquiry status
        const updatedInquiry = await prisma.inquiry.update({
            where: { id: inquiryId },
            data: { status }
        })

        return NextResponse.json({ 
            success: true, 
            data: updatedInquiry,
            ...(generatedPassword && { 
                userCreated: true,
                credentials: {
                    email: inquiry.email,
                    password: generatedPassword
                }
            })
        })
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("Failed to update inquiry:", error)
        }
        return NextResponse.json({ success: false, error: "Failed to update inquiry" }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await prisma.inquiry.delete({
            where: { id: (await context.params).id }
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to delete inquiry" }, { status: 500 })
    }
}
