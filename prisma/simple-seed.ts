import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

async function main() {
    const prisma = new PrismaClient()
    const password = await bcrypt.hash('admin123', 10)

    console.log('Seeding minimal data...')

    await prisma.user.upsert({
        where: { email: 'admin@elysium.com' },
        update: {},
        create: {
            email: 'admin@elysium.com',
            password,
            firstName: 'Admin',
            lastName: 'User',
            role: 'ADMIN',
        },
    })

    console.log('✅ Admin user created: admin@elysium.com / admin123')
    await prisma.$disconnect()
}

main().catch(console.error)
