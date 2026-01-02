export const locations = [
    {
        id: "marrakech",
        name: "Marrakech",
        description: "L'âme du patrimoine marocain et de la vie de luxe.",
        image: "/demos/real-estate/marrakech_v2.png",
        tag: "Capitale Culturelle"
    },
    {
        id: "tangier",
        name: "Tanger",
        description: "Là où la Méditerranée rencontre la brise atlantique.",
        image: "/demos/real-estate/tangier_v2.png",
        tag: "Porte de l'Europe"
    },
    {
        id: "taghazout",
        name: "Taghazout",
        description: "Retraites côtières modernes et horizons infinis.",
        image: "/demos/real-estate/taghazout_v2.png",
        tag: "Sanctuaire Océanique"
    },
    {
        id: "casablanca",
        name: "Casablanca",
        description: "Élégance moderne et sophistication côtière.",
        image: "/demos/real-estate/apartment.png",
        tag: "Cœur Économique"
    }
];

export const properties = [
    {
        id: 1,
        title: "Le Sanctuaire de l'Atlas",
        locationId: "marrakech",
        price: "€3,450,000",
        image: "/demos/real-estate/villa.png",
        specs: { beds: 6, baths: 7, size: "850 m²" },
        category: "Villa",
        description: "Une villa époustouflante nichée au pied des montagnes de l'Atlas. Dispose d'une piscine à débordement privée, de zellige authentique et de vastes oliveraies."
    },
    {
        id: 2,
        title: "Majesté Vue Océan",
        locationId: "casablanca",
        price: "€1,850,000",
        image: "/demos/real-estate/apartment.png",
        specs: { beds: 3, baths: 4, size: "320 m²" },
        category: "Appartement",
        description: "Penthouse moderne surplombant l'Atlantique. Baies vitrées du sol au plafond et design intérieur minimaliste avec de subtiles touches marocaines."
    },
    {
        id: 3,
        title: "Riad El Fenn",
        locationId: "marrakech",
        price: "€2,100,000",
        image: "/demos/real-estate/hero.png",
        specs: { beds: 8, baths: 10, size: "1200 m²" },
        category: "Riad",
        description: "Superbe Riad historique au cœur de la Médina. Entièrement restauré avec piscine centrale, jardin luxuriant et plusieurs terrasses sur le toit."
    },
    {
        id: 4,
        title: "Brise Méditerranéenne",
        locationId: "tangier",
        price: "€1,250,000",
        image: "https://images.unsplash.com/photo-1544971587-b842c27f8e14?q=80&w=1000",
        specs: { beds: 4, baths: 3, size: "450 m²" },
        category: "Villa",
        description: "Villa contemporaine avec vue panoramique sur le détroit de Gibraltar. Lignes épurées et espaces lumineux."
    }
];
