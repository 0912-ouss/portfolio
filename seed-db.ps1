$env:DATABASE_URL = "file:D:/portfolio v2/prisma/dev.db"
npx prisma generate
npx tsx prisma/seed.ts
