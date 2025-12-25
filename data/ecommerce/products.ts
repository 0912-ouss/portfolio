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
        name: "Silk Midi Dress",
        price: 890,
        originalPrice: 1200,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
        category: "Dresses",
        description: "An elegant silk midi dress featuring a fluid silhouette and a subtle sheen. Perfect for evening soirées and formal events.",
        isNew: true,
        isSale: false,
        sizes: ["XS", "S", "M", "L"],
        colors: ["Ivory", "Midnight Black", "Champagne"],
        gallery: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 2,
        name: "Cashmere Overcoat",
        price: 1450,
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop",
        category: "Outerwear",
        description: "Luxurious cashmere overcoat tailored for a sharp, sophisticated profile. Exceptionally warm and timelessly stylish.",
        isNew: false,
        isSale: false,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Camel", "Charcoal", "Navy"],
        gallery: [
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1585487000160-3298c47401a7?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 3,
        name: "Tailored Blazer",
        price: 680,
        originalPrice: 850,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
        category: "Jackets",
        description: "A precision-cut blazer that transitions seamlessly from day to night. Made from premium Italian wool.",
        isNew: false,
        isSale: true,
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Black", "Nude", "Emerald"],
        gallery: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 4,
        name: "Leather Handbag",
        price: 1100,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
        category: "Accessories",
        description: "Handcrafted from supple full-grain leather. A modern classic designed to carry your essentials in style.",
        isNew: true,
        isSale: false,
        sizes: ["One Size"],
        colors: ["Cognac", "Ebony", "Sand"],
        gallery: [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 5,
        name: "Wool Trousers",
        price: 420,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
        category: "Bottoms",
        description: "Sleek wool trousers with a refined drape. An essential foundation for any sophisticated wardrobe.",
        isNew: false,
        isSale: false,
        sizes: ["XS", "S", "M", "L"],
        colors: ["Grey Marl", "Black"],
        gallery: [
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"
        ]
    },
    {
        id: 6,
        name: "Statement Earrings",
        price: 290,
        originalPrice: 380,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
        category: "Jewelry",
        description: "Chic statement earrings that add a touch of modern glamour to any ensemble. Gold-plated with high-shine finish.",
        isNew: false,
        isSale: true,
        sizes: ["One Size"],
        colors: ["Gold", "Silver"],
        gallery: [
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"
        ]
    }
];
