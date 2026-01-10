import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./auth";

/**
 * Middleware to check if user is authenticated
 * Returns session if authenticated, or null if not
 */
export async function getAuthSession() {
    return await getServerSession(authOptions);
}

/**
 * Check if user is authenticated and has admin role
 * Returns NextResponse with error if not authorized, or null if authorized
 */
export async function requireAuth() {
    const session = await getAuthSession();
    
    if (!session) {
        return NextResponse.json(
            { success: false, error: "Unauthorized - Authentication required" },
            { status: 401 }
        );
    }
    
    return null; // Authorized
}

/**
 * Check if user is authenticated and has admin role
 * Returns NextResponse with error if not authorized, or null if authorized
 */
export async function requireAdmin() {
    const session = await getAuthSession();
    
    if (!session) {
        return NextResponse.json(
            { success: false, error: "Unauthorized - Authentication required" },
            { status: 401 }
        );
    }
    
    if (session.user?.role !== "ADMIN") {
        return NextResponse.json(
            { success: false, error: "Forbidden - Admin access required" },
            { status: 403 }
        );
    }
    
    return null; // Authorized
}
