# Hướng Dẫn Sử Dụng Portfolio Website

## 🚀 Cách Chạy Dự Án

### 1. Cài đặt Dependencies

```bash
npm install
```

### 2. Chạy Development Server

```bash
npm run dev
```

Mở trình duyệt tại: **http://localhost:3000**

### 3. Build cho Production

```bash
npm run build
npm start
```

## 📝 Tùy Chỉnh Nội Dung

### Thay đổi Projects (Dự án)

Mở file `lib/data.ts` và chỉnh sửa mảng `projects`:

```typescript
export const projects: Project[] = [
  {
    id: "1",
    title: "Tên dự án của bạn",
    description: "Mô tả dự án",
    image: "URL hình ảnh",
    tags: ["React", "Next.js"],
    link: "https://your-project-link.com",
    category: "Web Development",
  },
  // ... thêm dự án khác
];
```

### Thay đổi Services (Dịch vụ)

Trong file `lib/data.ts`, chỉnh sửa mảng `services`:

```typescript
export const services: Service[] = [
  {
    id: "1",
    title: "Tên dịch vụ",
    description: "Mô tả dịch vụ",
    icon: "💻", // Emoji hoặc icon
  },
];
```

### Thay đổi Testimonials (Đánh giá)

Chỉnh sửa mảng `testimonials` trong `lib/data.ts`:

```typescript
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Tên khách hàng",
    role: "Vai trò",
    company: "Tên công ty",
    content: "Nội dung đánh giá",
    avatar: "URL avatar",
  },
];
```

### Thay đổi Gallery (Showcase)

Chỉnh sửa mảng `galleryItems` trong `lib/data.ts`:

```typescript
export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Tiêu đề",
    image: "URL hình ảnh",
    category: "Danh mục",
  },
];
```

### Thay đổi Thông Tin Liên Hệ

Mở file `components/sections/Contact.tsx` và chỉnh sửa mảng `contactInfo`:

```typescript
const contactInfo = [
  {
    icon: FiMail,
    label: "Email",
    value: "your-email@example.com",
    link: "mailto:your-email@example.com",
  },
  // ...
];
```

### Thay đổi Social Links

Mở file `components/layout/Footer.tsx` và chỉnh sửa mảng `socialLinks`:

```typescript
const socialLinks = [
  { icon: FiGithub, href: "https://github.com/yourusername", label: "GitHub" },
  // ...
];
```

## 🎨 Tùy Chỉnh Màu Sắc

Mở file `app/globals.css` và chỉnh sửa các biến CSS:

```css
:root {
  --primary: 59 130 246;      /* Màu chính (Blue) */
  --accent: 139 92 246;       /* Màu phụ (Purple) */
  /* ... */
}
```

## 📸 Thêm Hình Ảnh

### Cách 1: Sử dụng URL từ Internet

Sử dụng trực tiếp URL trong file `lib/data.ts`:

```typescript
image: "https://images.unsplash.com/photo-..."
```

### Cách 2: Thêm hình ảnh local

1. Tạo thư mục `public/images/`
2. Thêm hình ảnh vào thư mục đó
3. Sử dụng đường dẫn tương đối:

```typescript
image: "/images/your-image.jpg"
```

**Lưu ý**: Nếu dùng hình ảnh từ domain khác, cần thêm domain vào `next.config.mjs`:

```javascript
const nextConfig = {
  images: {
    domains: ['your-domain.com'],
  },
};
```

## 🌐 Deploy

### Deploy lên Vercel (Khuyến nghị)

1. Push code lên GitHub
2. Vào [vercel.com](https://vercel.com)
3. Import repository
4. Vercel tự động deploy

### Deploy lên các platform khác

Xem hướng dẫn trong file `README.md`

## ⚠️ Lưu Ý Quan Trọng

1. **Thay đổi metadata**: Mở `app/layout.tsx` để thay đổi title và description
2. **Kiểm tra links**: Đảm bảo tất cả links trong projects và social đều hoạt động
3. **Form liên hệ**: Hiện tại form chỉ log ra console, bạn cần tích hợp với API hoặc email service
4. **Hình ảnh**: Sử dụng hình ảnh chất lượng cao để website đẹp hơn

## 🆘 Hỗ Trợ

Nếu gặp vấn đề, hãy:
1. Kiểm tra console để xem lỗi
2. Đảm bảo đã cài đặt đầy đủ dependencies
3. Xóa thư mục `.next` và chạy lại `npm run dev`

---

Chúc bạn có một portfolio website tuyệt vời! 🎉

