export interface Car {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    tagline: string;
    specs: {
        hp: string;
        speed: string;
        accel: string;
        engine?: string;
        transmission: string;
        seats: number;
    };
    description: string;
    color: string;
    gallery: string[];
}

export const carRentalFleet: Car[] = [
    {
        id: 1,
        name: "Porsche 911 GT3",
        category: "Sport",
        price: 499,
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
        tagline: "Né sur la Piste",
        specs: {
            hp: "502",
            speed: "318 km/h",
            accel: "3.2s",
            engine: "4.0L Flat-6",
            transmission: "PDK",
            seats: 2
        },
        description: "La 911 GT3 est la quintessence de tout ce que Porsche sait de la course. C'est un instrument de précision conçu pour les conducteurs les plus exigeants.",
        color: "#FF6B35",
        gallery: [
            "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
        ]
    },
    {
        id: 2,
        name: "Mercedes-AMG GT",
        category: "Sport",
        price: 449,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop",
        tagline: "Excellence Artisanale",
        specs: {
            hp: "523",
            speed: "310 km/h",
            accel: "3.6s",
            engine: "4.0L V8 Biturbo",
            transmission: "AMG SPEEDSHIFT",
            seats: 2
        },
        description: "La Mercedes-AMG GT allie dynamique de conduite et performances de première classe à une praticité quotidienne.",
        color: "#C0C0C0",
        gallery: [
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop"
        ]
    },
    {
        id: 3,
        name: "BMW M8 Competition",
        category: "Luxe",
        price: 399,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop",
        tagline: "Performance Ultime",
        specs: {
            hp: "617",
            speed: "305 km/h",
            accel: "3.0s",
            engine: "4.4L V8",
            transmission: "M Steptronic",
            seats: 4
        },
        description: "La M8 Competition Coupé est le summum de la performance de luxe. Puissance, présence et précision dans chaque courbe.",
        color: "#1E90FF",
        gallery: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop"
        ]
    },
    {
        id: 4,
        name: "Tesla Model S Plaid",
        category: "Électrique",
        price: 349,
        image: "/images/car-rental/tesla-front.png",
        tagline: "Au-delà du Ludicrous",
        specs: {
            hp: "1020",
            speed: "322 km/h",
            accel: "1.99s",
            engine: "Tri-Moteur",
            transmission: "Vitesse unique",
            seats: 5
        },
        description: "La Model S Plaid a l'accélération la plus rapide de toutes les voitures de série. Point final. Découvrez le futur de la performance.",
        color: "#E22134",
        gallery: [
            "/images/car-rental/tesla-front.png",
            "/images/car-rental/tesla-side.png"
        ]
    },
    {
        id: 5,
        name: "Range Rover Autobiography",
        category: "SUV",
        price: 379,
        image: "/images/car-rental/range-rover.png",
        tagline: "Luxe Inégalé",
        specs: {
            hp: "523",
            speed: "250 km/h",
            accel: "4.4s",
            engine: "4.4L V8",
            transmission: "Automatique",
            seats: 5
        },
        description: "Le Range Rover Autobiography est le SUV le plus désirable jamais créé. Élégant, raffiné et capable à parts égales.",
        color: "#1A4A04",
        gallery: [
            "/images/car-rental/range-rover.png"
        ]
    }
];
