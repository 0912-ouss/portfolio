# Portfolio Website v2

Một trang portfolio hiện đại được xây dựng với Next.js 14, TypeScript, TailwindCSS và Framer Motion.

## ✨ Tính năng

- 🎨 **Design hiện đại**: UI/UX đẹp mắt với phong cách Apple minimal
- 🌓 **Dark Mode**: Hỗ trợ chuyển đổi giữa dark và light mode
- 📱 **Responsive**: Thiết kế mobile-first, hoàn toàn responsive
- 🎭 **Animations**: Animations mượt mà với Framer Motion
- ⚡ **Performance**: Tối ưu hiệu suất với Next.js App Router
- 🎯 **TypeScript**: Type-safe code với TypeScript
- 🖼️ **Image Optimization**: Tối ưu hình ảnh với Next.js Image

## 🚀 Công nghệ sử dụng

- **Next.js 14** - React framework với App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **next-themes** - Dark mode support
- **react-hook-form** - Form handling và validation
- **react-icons** - Icon library

## 📦 Cài đặt

### Yêu cầu

- Node.js 18+ 
- npm, yarn, hoặc pnpm

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd portfolio-v2
```

### Bước 2: Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### Bước 3: Chạy development server

```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt để xem kết quả.

## 📁 Cấu trúc thư mục

```
portfolio-v2/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/           # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/         # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Projects.tsx
│   │   ├── Showcase.tsx
│   │   ├── Testimonials.tsx
│   │   └── Contact.tsx
│   ├── ui/               # UI components
│   │   ├── ContactForm.tsx
│   │   ├── Gallery.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SectionTitle.tsx
│   │   └── ThemeSwitcher.tsx
│   └── providers/        # Context providers
│       └── ThemeProvider.tsx
├── lib/                  # Utilities và data
│   ├── data.ts          # Dummy data
│   └── motion-variants.ts # Framer Motion variants
├── public/              # Static files
└── package.json
```

## 🎨 Tùy chỉnh

### Thay đổi nội dung

Chỉnh sửa file `lib/data.ts` để thay đổi:
- Projects (dự án)
- Services (dịch vụ)
- Testimonials (đánh giá)
- Gallery items (hình ảnh showcase)

### Thay đổi màu sắc

Chỉnh sửa file `app/globals.css` để thay đổi color scheme:

```css
:root {
  --primary: 59 130 246;      /* Blue */
  --accent: 139 92 246;       /* Purple */
  /* ... */
}
```

### Thay đổi thông tin liên hệ

Chỉnh sửa file `components/sections/Contact.tsx` để cập nhật:
- Email
- Số điện thoại
- Địa chỉ

### Thay đổi social links

Chỉnh sửa file `components/layout/Footer.tsx` để cập nhật các liên kết mạng xã hội.

## 🚀 Build cho Production

```bash
npm run build
npm start
```

## 📝 Các sections

1. **Hero** - Giới thiệu với animated text và floating elements
2. **About** - Thông tin về bạn, skills và stats
3. **Services** - Các dịch vụ bạn cung cấp
4. **Projects** - Showcase các dự án với cards và hover effects
5. **Showcase** - Gallery với lightbox viewer
6. **Testimonials** - Carousel với testimonials từ clients
7. **Contact** - Form liên hệ với validation
8. **Footer** - Links và social icons

## 🎯 Tính năng nổi bật

- ✅ Sticky navbar với smooth scroll
- ✅ Loading screen với fade animation
- ✅ Smooth scroll transitions
- ✅ Scroll-triggered animations (useInView)
- ✅ Image lightbox trong gallery
- ✅ Auto-rotating testimonials slider
- ✅ Form validation với react-hook-form
- ✅ Glassmorphism effects
- ✅ Gradient backgrounds
- ✅ Hover animations
- ✅ Mobile-responsive menu

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🛠️ Development Tips

1. **Hot Reload**: Next.js tự động reload khi bạn thay đổi code
2. **Type Checking**: TypeScript sẽ check types khi build
3. **ESLint**: Chạy `npm run lint` để check code quality
4. **Optimize Images**: Sử dụng Next.js Image component cho tất cả images

## 📄 License

MIT License - Feel free to use this for your portfolio!

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## 📧 Support

Nếu bạn có câu hỏi, vui lòng tạo một issue trong repository.

---

Made with ❤️ using Next.js and Framer Motion

