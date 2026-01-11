/**
 * Script to create an admin user for the fitness demo
 * Run with: npx tsx create-admin-user.ts
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdminUser() {
    try {
        console.log('🔐 Creating admin user...');

        // Admin credentials
        const email = 'admin@admin.com';
        const password = 'admin';
        const firstName = 'Admin';
        const lastName = 'User';

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create or update admin user
        const admin = await prisma.user.upsert({
            where: { email },
            update: {
                password: hashedPassword,
                firstName,
                lastName,
                role: 'ADMIN',
                status: 'Active',
            },
            create: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: 'ADMIN',
                status: 'Active',
            },
        });

        console.log('✅ Admin user created successfully!');
        console.log('\n📋 Login Credentials:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`   Email:    ${email}`);
        console.log(`   Password: ${password}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n🔗 Login URL: http://localhost:3000/demos/fitness/login');
        console.log('🔗 Admin URL: http://localhost:3000/demos/fitness/admin');
        console.log('\n');

        await prisma.$disconnect();
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

createAdminUser();
