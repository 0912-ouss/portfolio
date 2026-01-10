import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import sharp from "sharp";
import { requireAdmin } from "@/lib/api-auth";

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
    // Require admin authentication
    const authError = await requireAdmin();
    if (authError) return authError;

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { success: false, error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
                { success: false, error: "File must be an image" },
                { status: 400 }
            );
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { success: false, error: "File size must be less than 5MB" },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const filename = `trainer-${timestamp}-${randomString}.webp`;

        // Define upload directory
        const uploadDir = path.join(process.cwd(), "public", "images", "fitness", "trainers");
        
        // Create directory if it doesn't exist
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        // Convert image to WebP using sharp
        const outputPath = path.join(uploadDir, filename);
        
        await sharp(buffer)
            .resize(800, 1200, {
                fit: "cover",
                position: "center"
            })
            .webp({ quality: 85 })
            .toFile(outputPath);

        // Return the public URL
        const publicUrl = `/images/fitness/trainers/${filename}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            filename: filename
        });
    } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("Image upload error:", error);
        }
        return NextResponse.json(
            { success: false, error: "Failed to upload image" },
            { status: 500 }
        );
    }
}
