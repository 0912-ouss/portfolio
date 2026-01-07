import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import bcrypt from 'bcryptjs'

async function main() {
    console.log('🌱 Seeding database with dynamic import...')
    console.log('DATABASE_URL:', process.env.DATABASE_URL)

    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()

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

        // Create trainers
        const trainers = await Promise.all([
            prisma.trainer.upsert({
                where: { id: '1' },
                update: {},
                create: {
                    id: '1',
                    name: 'Marcus Steiner',
                    specialty: 'Force & Conditionnement',
                    bio: 'Champion national de powerlifting',
                    image: '/images/fitness/trainer1.jpg',
                },
            }),
            prisma.trainer.upsert({
                where: { id: '2' },
                update: {},
                create: {
                    id: '2',
                    name: 'Elise Fontaine',
                    specialty: 'Yoga & Méditation',
                    bio: 'Maître yogi certifiée',
                    image: '/images/fitness/trainer2.jpg',
                },
            }),
            prisma.trainer.upsert({
                where: { id: '3' },
                update: {},
                create: {
                    id: '3',
                    name: 'Kenji Yamamoto',
                    specialty: 'Arts Martiaux & Mobilité',
                    bio: 'Ceinture noire 5ème dan',
                    image: '/images/fitness/trainer3.jpg',
                },
            }),
        ])
        console.log('✅ Created', trainers.length, 'trainers')

        // Create locations
        const locations = await Promise.all([
            prisma.location.upsert({
                where: { id: '1' },
                update: {},
                create: {
                    id: '1',
                    city: 'Paris',
                    name: "L'Elysée Suite",
                    address: '8 Avenue Montaigne, 75008 Paris',
                    hours: '06:00 - 23:00',
                    image: '/images/fitness/location1.png',
                },
            }),
            prisma.location.upsert({
                where: { id: '2' },
                update: {},
                create: {
                    id: '2',
                    city: 'London',
                    name: 'Mayfair Sanctuary',
                    address: '24 Bruton St, London W1J 6QQ',
                    hours: '05:00 - 22:00',
                    image: '/images/fitness/location2.png',
                },
            }),
        ])
        console.log('✅ Created', locations.length, 'locations')

        // Create sessions
        const sessions = await Promise.all([
            prisma.session.create({
                data: {
                    name: 'Power Lifting Avancé',
                    activity: 'Force',
                    day: 'Lundi',
                    time: '07:00 - 08:30',
                    capacity: 12,
                    trainerId: '1',
                    locationId: '1',
                },
            }),
            prisma.session.create({
                data: {
                    name: 'Yoga Flow Matinal',
                    activity: 'Yoga',
                    day: 'Mardi',
                    time: '06:30 - 07:30',
                    capacity: 20,
                    trainerId: '2',
                    locationId: '1',
                },
            }),
            prisma.session.create({
                data: {
                    name: 'HIIT Cardio Blast',
                    activity: 'Cardio',
                    day: 'Mercredi',
                    time: '18:00 - 19:00',
                    capacity: 15,
                    trainerId: '1',
                    locationId: '1',
                },
            }),
        ])
        console.log('✅ Created', sessions.length, 'sessions')

        // Create sample members
        const memberPassword = await bcrypt.hash('member123', 10)
        const members = await Promise.all([
            prisma.user.upsert({
                where: { email: 'jp.dubois@email.com' },
                update: {},
                create: {
                    email: 'jp.dubois@email.com',
                    password: memberPassword,
                    firstName: 'Jean-Pierre',
                    lastName: 'Dubois',
                    role: 'MEMBER',
                    membershipId: 'Infinity',
                },
            }),
            prisma.user.upsert({
                where: { email: 'm.laurent@email.com' },
                update: {},
                create: {
                    email: 'm.laurent@email.com',
                    password: memberPassword,
                    firstName: 'Marie',
                    lastName: 'Laurent',
                    role: 'MEMBER',
                    membershipId: 'Platinum',
                },
            }),
        ])
        console.log('✅ Created', members.length, 'members')

        console.log('🎉 Seeding complete!')
    } catch (e) {
        console.error('❌ Error during seeding:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
    .catch(async (e) => {
        console.error('❌ SEED ERROR:', e)
        process.exit(1)
    })
