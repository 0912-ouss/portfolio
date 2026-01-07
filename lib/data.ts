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
  description?: string;
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

  /* Hiding project per user request
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
  */

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
  // Fitness & Wellness
  {
    id: "11",
    title: "Elysium Athletics",
    description: "Ultra-luxury fitness sanctuary featuring biometric tracking, elite coaching, and architectural excellence",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&h=600&fit=crop",
    tags: ["Next.js", "GSAP", "Dark Aesthetic", "Luxury"],
    link: "/demos/fitness",
    category: "fitness",
    client: "Elysium Group",
    year: "2024",
  },
];

// Developer/Designer Services
export const services: Service[] = [
  {
    id: "1",
    title: "Développement Web",
    description: "Développement de sites web full-stack pour entreprises. Sites responsives, modernes et optimisés SEO, adaptés à vos besoins.",
    icon: "🌐",
  },
  {
    id: "2",
    title: "Design Graphique",
    description: "Création de logos, identité de marque et branding visuel. Des designs mémorables qui représentent votre entreprise.",
    icon: "🎨",
  },
  {
    id: "3",
    title: "Création d'Infographies",
    description: "Visualisation de données professionnelle et création d'infographies pour présentations, rapports et supports marketing.",
    icon: "📊",
  },
  {
    id: "4",
    title: "Design UI/UX",
    description: "Design d'interface et d'expérience utilisateur pour applications web et mobiles. Des designs intuitifs que les utilisateurs adorent.",
    icon: "🖼️",
  },
  {
    id: "5",
    title: "Identité de Marque",
    description: "Packages de branding complets incluant logos, palettes de couleurs, typographie et charte graphique.",
    icon: "💼",
  },
  {
    id: "6",
    title: "Maintenance de Site Web",
    description: "Support continu, mises à jour, optimisation des performances, sécurité et sauvegardes pour votre site web.",
    icon: "⚡",
  },
];

// Client Testimonials
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    role: "Directrice Médicale",
    company: "MediCare Clinic",
    content: "Le site web représente parfaitement notre cabinet et a rationalisé notre processus de prise de rendez-vous. La satisfaction des patients a considérablement augmenté !",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    id: "2",
    name: "Jean-Pierre Dubois",
    role: "Propriétaire",
    company: "Salon Elegance",
    content: "Mes clients adorent le système de réservation en ligne ! Le site est magnifique et a aidé à attirer de nouveaux clients. Travail professionnel du début à la fin.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    id: "3",
    name: "Marco Rossi",
    role: "Restaurateur",
    company: "La Cuisine",
    content: "Nos commandes en ligne ont augmenté de 40% après le lancement du nouveau site. Le design est élégant et le système de commande fonctionne parfaitement. Hautement recommandé !",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
  },
];

// Portfolio Gallery
export const galleryItems: GalleryItem[] = [
  { id: "DG1", title: "Social Media Campaign", image: "/images/design/ad-campaign.jpg", category: "Advertising" },
  { id: "DG2", title: "Beverage Branding", image: "/images/design/beverage-can.jpg", category: "Product" },
  { id: "DG3", title: "Bleu de Chanel", image: "/images/design/bleu-de-chanel.jpg", category: "Luxury" },
  { id: "DG4", title: "Burger Colosseum", image: "/images/design/burger-colosseum.jpg", category: "Creative" },
  { id: "DG5", title: "Dental Braces Ad", image: "/images/design/dental-braces.jpg", category: "Healthcare" },
  { id: "DG6", title: "Dental Character", image: "/images/design/dental-character.jpg", category: "Illustration" },
  { id: "DG7", title: "Dental Helicopter", image: "/images/design/dental-helicopter.jpg", category: "Creative" },
  { id: "DG8", title: "Dental Surf", image: "/images/design/dental-surf.jpg", category: "Creative" },
  { id: "DG9", title: "Earbuds Ad", image: "/images/design/earbuds-ad.jpg", category: "Tech" },
  { id: "DG10", title: "Internet Service Ad", image: "/images/design/internet-ad.jpg", category: "Advertising" },
  { id: "DG11", title: "Air Jordan Retro", image: "/images/design/jordan-shoes.jpg", category: "Fashion" },
  { id: "DG12", title: "Kebab Menu Design", image: "/images/design/kebab-menu.jpg", category: "Food" },
  { id: "DG13", title: "Lux Body Wash", image: "/images/design/lux-body-wash.jpg", category: "Beauty" },
  { id: "DG14", title: "Gourmet Menu", image: "/images/design/menu-design-1.jpg", category: "Hospitality" },
  { id: "DG15", title: "Milka Poster", image: "/images/design/milka-poster.jpg", category: "Marketing" },
  { id: "DG16", title: "Milka Product", image: "/images/design/milka-product.jpg", category: "Product" },
  { id: "DG17", title: "Mint Cookie Drink", image: "/images/design/mint-cookie-drink.jpg", category: "Beverage" },
  { id: "DG18", title: "Restaurant Menu", image: "/images/design/restaurant-menu.jpg", category: "Graphic Design" },
  { id: "DG19", title: "Rolex Watch", image: "/images/design/rolex-watch.jpg", category: "Luxury" },
  { id: "DG20", title: "Sandwich Menu", image: "/images/design/sandwich-menu.jpg", category: "Food" },
  { id: "DG21", title: "Travis Scott Jordan", image: "/images/design/travis-scott-jordan.jpg", category: "Fashion" },
  { id: "DG22", title: "Marketing Campaign", image: "/images/design/yebehiir-marketing.jpg", category: "Advertising" },
];
