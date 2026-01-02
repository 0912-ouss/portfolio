export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    description: string;
    isNew?: boolean;
    isSale?: boolean;
    sizes: string[];
    colors: string[];
    gallery: string[];
}

export const ecommerceProducts: Product[] = [
    {
        id: 1,
        name: "Robe Midi en Soie",
        price: 890,
        originalPrice: 1200,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
        category: "Robes",
        description: "Une robe midi en soie élégante avec une silhouette fluide et un éclat subtil. Parfait pour les soirées et les événements formels.",
        isNew: true,
        isSale: false,
        sizes: ["XS", "S", "M", "L"],
        colors: ["Ivoire", "Noir Minuit", "Champagne"],
        gallery: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 2,
        name: "Manteau en Cachemire",
        price: 1450,
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop",
        category: "Manteaux",
        description: "Manteau en cachemire luxueux taillé pour un profil net et sophistiqué. Exceptionnellement chaud et intemporellement élégant.",
        isNew: false,
        isSale: false,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Camel", "Anthracite", "Marine"],
        gallery: [
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1585487000160-3298c47401a7?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 3,
        name: "Blazer Ajusté",
        price: 680,
        originalPrice: 850,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
        category: "Vestes",
        description: "Un blazer à la coupe précise qui passe sans transition du jour à la nuit. Fabriqué à partir de laine italienne de première qualité.",
        isNew: false,
        isSale: true,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Noir", "Nude", "Émeraude"],
        gallery: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 4,
        name: "Sac à Main en Cuir",
        price: 1100,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
        category: "Accessoires",
        description: "Fabriqué à la main à partir de cuir pleine fleur souple. Un classique moderne conçu pour transporter vos essentiels avec style.",
        isNew: true,
        isSale: false,
        sizes: ["Taille Unique"],
        colors: ["Cognac", "Ébène", "Sable"],
        gallery: [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 5,
        name: "Pantalon en Laine",
        price: 420,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
        category: "Bas",
        description: "Pantalon en laine élégant avec un drapé raffiné. Une base essentielle pour toute garde-robe sophistiquée.",
        isNew: false,
        isSale: false,
        sizes: ["XS", "S", "M", "L"],
        colors: ["Gris Chiné", "Noir"],
        gallery: [
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 6,
        name: "Boucles d'Oreilles Statement",
        price: 290,
        originalPrice: 380,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
        category: "Bijoux",
        description: "Boucles d'oreilles chic qui ajoutent une touche de glamour moderne à n'importe quel ensemble. Plaqué or avec une finition brillante.",
        isNew: false,
        isSale: true,
        sizes: ["Taille Unique"],
        colors: ["Or", "Argent"],
        gallery: [
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"
        ]
    }
];
