import * as Prisma from '@prisma/client'
console.log('Exports from @prisma/client:', Object.keys(Prisma))

try {
    const { PrismaClient } = Prisma as any
    if (PrismaClient) {
        console.log('PrismaClient exists')
        const prisma = new PrismaClient()
        console.log('Successfully instantiated PrismaClient')
    } else {
        console.log('PrismaClient is UNDEFINED in exports')
    }
} catch (e) {
    console.error('Error during instantiation:', e)
}
