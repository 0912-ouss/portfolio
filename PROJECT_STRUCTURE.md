# Cấu Trúc Dự Án Portfolio Website

## 📁 Tổng Quan Cấu Trúc

```
portfolio-v2/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles & CSS variables
│   ├── layout.tsx               # Root layout với ThemeProvider
│   └── page.tsx                 # Trang chủ - Import tất cả sections
│
├── components/
│   ├── layout/                  # Layout components
│   │   ├── Navbar.tsx          # Sticky navbar với smooth scroll
│   │   └── Footer.tsx          # Footer với social links
│   │
│   ├── sections/                # Page sections
│   │   ├── Hero.tsx            # Hero với animated text & floating elements
│   │   ├── About.tsx           # About với stats & skills
│   │   ├── Services.tsx        # Services với animated cards
│   │   ├── Projects.tsx        # Projects grid
│   │   ├── Showcase.tsx        # Gallery showcase
│   │   ├── Testimonials.tsx    # Testimonials slider
│   │   └── Contact.tsx         # Contact section với form
│   │
│   ├── ui/                      # Reusable UI components
│   │   ├── ContactForm.tsx     # Form với validation
│   │   ├── Gallery.tsx         # Gallery với lightbox
│   │   ├── LoadingScreen.tsx   # Loading screen animation
│   │   ├── ProjectCard.tsx     # Project card component
│   │   ├── SectionTitle.tsx    # Reusable section title
│   │   └── ThemeSwitcher.tsx   # Dark/light mode toggle
│   │
│   └── providers/
│       └── ThemeProvider.tsx   # Theme context provider
│
├── lib/                         # Utilities & data
│   ├── data.ts                 # Dummy data (projects, services, etc.)
│   └── motion-variants.ts      # Reusable Framer Motion variants
│
├── public/                      # Static files (tạo thư mục này nếu cần)
│
├── Configuration Files
│   ├── package.json            # Dependencies
│   ├── tsconfig.json           # TypeScript config
│   ├── tailwind.config.ts      # TailwindCSS config
│   ├── next.config.mjs         # Next.js config
│   ├── postcss.config.mjs      # PostCSS config
│   └── next-env.d.ts           # Next.js types
│
└── Documentation
    ├── README.md               # Hướng dẫn tiếng Anh
    ├── HUONG_DAN.md            # Hướng dẫn tiếng Việt
    └── PROJECT_STRUCTURE.md    # File này
```

## 🎯 Components Overview

### Layout Components
- **Navbar**: Sticky navigation với smooth scroll, mobile menu, theme switcher
- **Footer**: Social links, quick links, copyright

### Section Components
- **Hero**: Animated hero section với floating icons và gradient text
- **About**: Personal info, stats cards, skills tags
- **Services**: Grid of service cards với hover animations
- **Projects**: Project cards với images và external links
- **Showcase**: Gallery grid với lightbox viewer
- **Testimonials**: Auto-rotating testimonials carousel
- **Contact**: Contact form với validation và contact info

### UI Components
- **ContactForm**: Form với react-hook-form validation
- **Gallery**: Image gallery với animated lightbox
- **LoadingScreen**: Loading screen với fade animation
- **ProjectCard**: Reusable project card component
- **SectionTitle**: Reusable animated section title
- **ThemeSwitcher**: Dark/light mode toggle button

## 📊 Data Structure

### Projects
```typescript
{
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  category: string;
}
```

### Services
```typescript
{
  id: string;
  title: string;
  description: string;
  icon: string;
}
```

### Testimonials
```typescript
{
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}
```

### Gallery Items
```typescript
{
  id: string;
  title: string;
  image: string;
  category: string;
}
```

## 🎨 Styling

- **TailwindCSS**: Utility-first CSS framework
- **CSS Variables**: Dynamic theming (light/dark mode)
- **Glassmorphism**: Modern glass effects
- **Gradients**: Soft gradient backgrounds
- **Animations**: Framer Motion animations

## 🚀 Features Implemented

✅ Next.js 14 App Router  
✅ TypeScript  
✅ TailwindCSS  
✅ Framer Motion animations  
✅ Dark mode support  
✅ Responsive design (mobile-first)  
✅ Smooth scroll  
✅ Loading screen  
✅ Form validation  
✅ Image optimization  
✅ SEO ready  

## 📝 Next Steps

1. Thay thế dummy data bằng dữ liệu thật
2. Tích hợp form liên hệ với API/Email service
3. Thêm hình ảnh thật vào public/images/
4. Customize màu sắc theo brand
5. Deploy lên Vercel hoặc hosting khác

---

Happy coding! 🎉

