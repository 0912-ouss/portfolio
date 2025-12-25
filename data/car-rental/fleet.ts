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
        category: "Sports",
        price: 499,
        image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
        tagline: "Born on the Track",
        specs: {
            hp: "502",
            speed: "198 mph",
            accel: "3.2s",
            engine: "4.0L Flat-6",
            transmission: "PDK",
            seats: 2
        },
        description: "The 911 GT3 is the distillation of everything Porsche knows about racing. It's a precision instrument built for the most demanding drivers.",
        color: "#FF6B35",
        gallery: [
            "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
        ]
    },
    {
        id: 2,
        name: "Mercedes-AMG GT",
        category: "Sports",
        price: 449,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop",
        tagline: "Handcrafted Excellence",
        specs: {
            hp: "523",
            speed: "193 mph",
            accel: "3.6s",
            engine: "4.0L V8 Biturbo",
            transmission: "AMG SPEEDSHIFT",
            seats: 2
        },
        description: "The Mercedes-AMG GT combines driving dynamics and first-class performance with everyday practicality.",
        color: "#C0C0C0",
        gallery: [
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop"
        ]
    },
    {
        id: 3,
        name: "BMW M8 Competition",
        category: "Luxury",
        price: 399,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop",
        tagline: "Ultimate Performance",
        specs: {
            hp: "617",
            speed: "189 mph",
            accel: "3.0s",
            engine: "4.4L V8",
            transmission: "M Steptronic",
            seats: 4
        },
        description: "The M8 Competition Coupe is the pinnacle of luxury performance. Power, presence, and precision in every curve.",
        color: "#1E90FF",
        gallery: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop"
        ]
    },
    {
        id: 4,
        name: "Tesla Model S Plaid",
        category: "Electric",
        price: 349,
        image: "/images/car-rental/tesla-front.png",
        tagline: "Beyond Ludicrous",
        specs: {
            hp: "1020",
            speed: "200 mph",
            accel: "1.99s",
            engine: "Tri-Motor",
            transmission: "Single-speed",
            seats: 5
        },
        description: "Model S Plaid has the quickest acceleration of any production car. Period. Experience the future of performance.",
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
        tagline: "Peerless Luxury",
        specs: {
            hp: "523",
            speed: "155 mph",
            accel: "4.4s",
            engine: "4.4L V8",
            transmission: "Automatic",
            seats: 5
        },
        description: "The Range Rover Autobiography is the most desirable SUV ever created. Elegant, refined, and capable in equal measure.",
        color: "#1A4A04",
        gallery: [
            "/images/car-rental/range-rover.png"
        ]
    }
];
