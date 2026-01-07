import "dotenv/config"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

async function main() {
    console.log('🌱 Seeding database with hardcoded URL test...')

    // Test with hardcoded URL
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: 'file:./dev.db'
            }
        }
    })

    try {
        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10)
        const admin = await prisma.user.upsert({
            where: { email: 'admin@elysium.com' },
            update: {},
            create: {
                email: 'admin@elysium.com',
                password: hashedPassword,
                firstName: 'Admin',
                lastName: 'User',
                role: 'ADMIN',
            },
        })
        console.log('✅ Created admin user:', admin.email)

        // ... truncated rest for the test ...
    } finally {
        await prisma.$disconnect()
    }
}

main()
    .catch(async (e) => {
        console.error('❌ SEED ERROR:', e)
        process.exit(1)
    })
