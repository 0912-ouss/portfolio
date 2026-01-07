import { PrismaClient } from '@prisma/client'

const dbUrl = "file:D:/portfolio v2/prisma/dev.db"
const prisma = new PrismaClient({
    datasourceUrl: dbUrl
} as any)

async function test() {
    try {
        console.log('Testing Prisma connection...')
        console.log('Target URL:', dbUrl)
        const count = await prisma.user.count()
        console.log('Connection successful! User count:', count)
    } catch (e) {
        console.error('Connection failed!')
        console.error(e)
    } finally {
        await prisma.$disconnect()
    }
}

test()
