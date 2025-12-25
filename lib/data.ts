export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  category: string;
  client?: string;
  year?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
}

// Developer/Designer Portfolio Projects
export const projects: Project[] = [
  // Healthcare Projects
  {
    id: "1",
    title: "Dr. Smith Dental Clinic",
    description: "Modern dental practice website with online appointment booking, patient portal, and service showcase",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop",
    tags: ["Next.js", "Tailwind", "Booking System", "CMS"],
    link: "/demos/dentist",
    category: "healthcare",
    client: "Dr. Sarah Smith",
    year: "2024",
  },
  {
    id: "2",
    title: "MediCare General Practice",
    description: "Complete medical practice platform with appointment scheduling, medical records, and patient communication",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    link: "/demos/medicare",
    category: "healthcare",
    client: "MediCare Clinic",
    year: "2023",
  },

  // Beauty & Wellness
  {
    id: "3",
    title: "Mill Berry Hair Salon",
    description: "Premium hair salon website with online booking, service menu, stylist profiles, transformations gallery, and testimonials",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
    tags: ["Next.js", "Framer Motion", "Booking System", "Gallery"],
    link: "/demos/hair-salon",
    category: "beauty",
    client: "Mill Berry Salon",
    year: "2024",
  },
  {
    id: "4",
    title: "Wellness Spa Center",
    description: "Luxurious spa website featuring treatment menus, therapist bios, and integrated booking system",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop",
    tags: ["React", "Firebase", "Tailwind", "Animations"],
    link: "/demos/spa",
    category: "beauty",
    client: "Zen Wellness",
    year: "2023",
  },

  // Food & Beverage
  {
    id: "5",
    title: "La Cuisine Restaurant",
    description: "Elegant restaurant website with interactive menu, table reservations, and online ordering system",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    tags: ["Next.js", "Sanity CMS", "Stripe", "Google Maps"],
    link: "/demos/restaurant",
    category: "restaurant",
    client: "La Cuisine Fine Dining",
    year: "2024",
  },
  {
    id: "6",
    title: "Café Moderne",
    description: "Modern café website with digital menu, loyalty program, and mobile ordering capabilities",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
    tags: ["React", "Firebase", "PWA", "QR Codes"],
    link: "/demos/cafe",
    category: "restaurant",
    client: "Café Moderne",
    year: "2023",
  },

  {
    id: "8",
    title: "DriveEasy Car Rental",
    description: "User-friendly car rental website with instant booking, vehicle comparison, and insurance options",
    image: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Payment Gateway"],
    link: "/demos/car-rental",
    category: "automotive",
    client: "DriveEasy Inc",
    year: "2023",
  },

  // E-commerce
  {
    id: "9",
    title: "Fashion Boutique Store",
    description: "Complete e-commerce solution with product catalog, shopping cart, checkout, and inventory management",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    tags: ["Next.js", "Shopify", "Stripe", "Analytics"],
    link: "/demos/ecommerce",
    category: "ecommerce",
    client: "Fashion Boutique",
    year: "2024",
  },

  // Real Estate
  {
    id: "10",
    title: "Morocco Heritage Estates",
    description: "Luxury real estate platform specializing in high-end Moroccan properties, from historic Riads to modern beach villas",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&h=600&fit=crop",
    tags: ["Next.js", "Framer Motion", "Luxury Design", "Map Integration"],
    link: "/demos/real-estate",
    category: "real-estate",
    client: "Atlas Luxury Living",
    year: "2024",
  },
];

// Developer/Designer Services
export const services: Service[] = [
  {
    id: "1",
    title: "Web Development",
    description: "Full-stack website development for businesses. Responsive, modern, and SEO-optimized websites tailored to your needs.",
    icon: "🌐",
  },
  {
    id: "2",
    title: "Graphic Design",
    description: "Logo design, brand identity, and visual branding. Creating memorable designs that represent your business.",
    icon: "🎨",
  },
  {
    id: "3",
    title: "Infographic Creation",
    description: "Professional data visualization and infographic design for presentations, reports, and marketing materials.",
    icon: "📊",
  },
  {
    id: "4",
    title: "UI/UX Design",
    description: "User interface and experience design for web and mobile applications. Intuitive designs that users love.",
    icon: "🖼️",
  },
  {
    id: "5",
    title: "Brand Identity",
    description: "Complete branding packages including logos, color schemes, typography, and brand guidelines.",
    icon: "💼",
  },
  {
    id: "6",
    title: "Website Maintenance",
    description: "Ongoing support, updates, performance optimization, security, and backups for your website.",
    icon: "⚡",
  },
];

// Client Testimonials
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    role: "Medical Director",
    company: "MediCare Clinic",
    content: "The website perfectly represents our practice and has streamlined our appointment booking process. Patient satisfaction has increased significantly!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    id: "2",
    name: "Jean-Pierre Dubois",
    role: "Owner",
    company: "Salon Elegance",
    content: "My clients love the online booking system! The website is beautiful and has helped attract new customers. Professional work from start to finish.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    id: "3",
    name: "Marco Rossi",
    role: "Restaurant Owner",
    company: "La Cuisine",
    content: "Our online orders increased by 40% after launching the new website. The design is elegant and the ordering system works flawlessly. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
  },
];

// Portfolio Gallery
export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Medical Website",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    category: "Websites",
  },
  {
    id: "2",
    title: "Restaurant Design",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    category: "Websites",
  },
  {
    id: "3",
    title: "Tech Company Logo",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    category: "Logos",
  },
  {
    id: "4",
    title: "E-commerce Platform",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    category: "Websites",
  },
  {
    id: "5",
    title: "Business Infographic",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Infographics",
  },
  {
    id: "6",
    title: "Mobile App UI",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    category: "UI Designs",
  },
  {
    id: "7",
    title: "Salon Website",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop",
    category: "Websites",
  },
  {
    id: "8",
    title: "Brand Identity Package",
    image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=600&h=400&fit=crop",
    category: "Logos",
  },
];
