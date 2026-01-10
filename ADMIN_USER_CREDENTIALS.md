# Admin User Credentials

## ✅ Admin User Created Successfully!

### Login Credentials:
```
Email:    admin@elysium.com
Password: admin123
```

### Access URLs:
- **Login Page:** http://localhost:3000/demos/fitness/login
- **Admin Dashboard:** http://localhost:3000/demos/fitness/admin

---

## 🔄 How to Create Admin User Again

### Option 1: Using the Script (Recommended)
```bash
npx tsx create-admin-user.ts
```

### Option 2: Using the Seed API Endpoint
If your dev server is running, you can call:
```
GET http://localhost:3000/api/fitness/seed
```

This will create:
- Admin user (admin@elysium.com / admin123)
- Sample member (jp.dubois@email.com / member123)
- Sample trainer
- Sample location

### Option 3: Using Prisma Seed
```bash
npx prisma db seed
```

---

## 🔐 User Roles

The system supports the following roles:
- **ADMIN** - Full access to admin dashboard
- **MEMBER** - Regular member access

---

## 📝 Notes

- The admin user is created with role `ADMIN`
- Password is hashed using bcrypt
- If the user already exists, it will be updated (upsert)
- Make sure your database is running and migrations are applied

---

**Created:** $(date)
**Status:** ✅ Ready to use
