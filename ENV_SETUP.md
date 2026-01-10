# Environment Variables Setup

## ✅ NEXTAUTH_SECRET Configuration

### Issue
The warning `⚠️  WARNING: NEXTAUTH_SECRET not set` appears because the environment variable is missing.

### Solution
Create a `.env.local` file in the project root with the following content:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=LwpqjU8Yvp2HPmGtsvfxbRNsS4lgR/dfzok71YuCTC8=

# NextAuth URL (optional - Next.js will auto-detect in development)
# NEXTAUTH_URL=http://localhost:3000
```

### Generate Your Own Secret

**Option 1: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option 2: Using OpenSSL**
```bash
openssl rand -base64 32
```

**Option 3: Using PowerShell**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### File Location
- **Development:** `.env.local` (gitignored, local only)
- **Production:** Set in your hosting platform's environment variables

### Important Notes
- ✅ `.env.local` is automatically gitignored (safe for secrets)
- ✅ Next.js automatically loads `.env.local` files
- ✅ Restart your dev server after creating/updating `.env.local`
- ⚠️ Never commit `.env.local` to version control
- ⚠️ Use a different secret for production

### After Setup
1. Create `.env.local` file with `NEXTAUTH_SECRET`
2. Restart your dev server: `npm run dev`
3. The warning should disappear ✅

---

**Status:** Ready to use
**Secret Generated:** LwpqjU8Yvp2HPmGtsvfxbRNsS4lgR/dfzok71YuCTC8=
