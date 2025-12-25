export interface MenuItem {
    id: string;
    name: string;
    price: string;
    description: string;
    image: string;
    category: string;
    isVegetarian?: boolean;
    isGlutenFree?: boolean;
    isSpicy?: boolean;
    isChefPick?: boolean;
    isPopular?: boolean;
}

export interface MenuCategory {
    id: string;
    name: string;
    icon: string;
}

export interface Chef {
    name: string;
    title: string;
    image: string;
    bio: string;
    experience: number;
    quote: string;
}

export interface Special {
    id: string;
    name: string;
    originalPrice: string;
    discountPrice: string;
    description: string;
    image: string;
    validUntil: string;
}

export const categories: MenuCategory[] = [
    { id: 'starters', name: 'Starters', icon: '🥗' },
    { id: 'pizzas', name: 'Pizzas', icon: '🍕' },
    { id: 'pastas', name: 'Pastas', icon: '🍝' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'drinks', name: 'Drinks', icon: '🥤' },
    { id: 'wines', name: 'Wines & Cocktails', icon: '🍷' },
];

export const menuItems: MenuItem[] = [
    // Starters
    {
        id: 'starter-1',
        name: 'Garlic Knots',
        price: '6',
        description: 'Oven-baked dough knots tossed in garlic butter and fresh herbs. Served with marinara dipping sauce.',
        image: 'https://images.unsplash.com/photo-1573140247632-f84660f67627?q=80&w=600&auto=format&fit=crop',
        category: 'starters',
        isVegetarian: true,
    },
    {
        id: 'starter-2',
        name: 'Caprese Salad',
        price: '10',
        description: 'Fresh buffalo mozzarella, vine-ripened tomatoes, and basil with aged balsamic glaze.',
        image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=600&auto=format&fit=crop',
        category: 'starters',
        isVegetarian: true,
        isGlutenFree: true,
        isChefPick: true,
    },
    {
        id: 'starter-3',
        name: 'Meatballs',
        price: '9',
        description: 'House-made beef and pork meatballs in our signature marinara sauce with shaved parmesan.',
        image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=600&auto=format&fit=crop',
        category: 'starters',
        isPopular: true,
    },
    {
        id: 'starter-4',
        name: 'Bruschetta',
        price: '8',
        description: 'Grilled ciabatta topped with fresh tomatoes, garlic, basil, and extra virgin olive oil.',
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=600&auto=format&fit=crop',
        category: 'starters',
        isVegetarian: true,
    },
    {
        id: 'starter-5',
        name: 'Calamari Fritti',
        price: '12',
        description: 'Crispy fried calamari rings with lemon aioli and spicy marinara sauce.',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop',
        category: 'starters',
        isPopular: true,
    },

    // Pizzas
    {
        id: 'pizza-1',
        name: 'The Blanco',
        price: '18',
        description: 'White garlic sauce, mozzarella, ricotta, garlic, oregano, and fresh parsley.',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop',
        category: 'pizzas',
        isVegetarian: true,
    },
    {
        id: 'pizza-2',
        name: 'Tuscany',
        price: '20',
        description: 'Pesto base, grilled chicken, sun-dried tomatoes, artichokes, and goat cheese.',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop',
        category: 'pizzas',
        isChefPick: true,
    },
    {
        id: 'pizza-3',
        name: 'The Jerk',
        price: '19',
        description: 'Jerk-spiced chicken, bell peppers, red onions, pineapple, and spicy Caribbean sauce.',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop',
        category: 'pizzas',
        isSpicy: true,
        isPopular: true,
    },
    {
        id: 'pizza-4',
        name: 'Old Smokey',
        price: '21',
        description: 'BBQ sauce, smoked brisket, caramelized onions, cheddar blend, and pickled jalapeños.',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600&auto=format&fit=crop',
        category: 'pizzas',
        isSpicy: true,
    },
    {
        id: 'pizza-5',
        name: 'Margherita',
        price: '16',
        description: 'San Marzano tomato sauce, fresh mozzarella, basil, and extra virgin olive oil.',
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=600&auto=format&fit=crop',
        category: 'pizzas',
        isVegetarian: true,
        isChefPick: true,
    },
    {
        id: 'pizza-6',
        name: 'Pepperoni Classic',
        price: '17',
        description: 'Double pepperoni, mozzarella, and our signature tomato sauce with Italian herbs.',
        image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600&auto=format&fit=crop',
        category: 'pizzas',
        isPopular: true,
    },

    // Pastas
    {
        id: 'pasta-1',
        name: 'Spaghetti Bolognese',
        price: '14',
        description: 'Classic Italian meat sauce slow-cooked with tomatoes and herbs over al dente spaghetti.',
        image: 'https://images.unsplash.com/photo-1626844131082-256783844137?q=80&w=600&auto=format&fit=crop',
        category: 'pastas',
        isPopular: true,
    },
    {
        id: 'pasta-2',
        name: 'Fettuccine Alfredo',
        price: '13',
        description: 'Creamy parmesan sauce with butter and garlic over fresh fettuccine pasta.',
        image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=600&auto=format&fit=crop',
        category: 'pastas',
        isVegetarian: true,
    },
    {
        id: 'pasta-3',
        name: 'Penne Arrabbiata',
        price: '12',
        description: 'Spicy tomato sauce with garlic, red chili, and fresh parsley over penne.',
        image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?q=80&w=600&auto=format&fit=crop',
        category: 'pastas',
        isVegetarian: true,
        isSpicy: true,
    },
    {
        id: 'pasta-4',
        name: 'Carbonara',
        price: '15',
        description: 'Crispy pancetta, egg yolk, pecorino romano, and black pepper over spaghetti.',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=600&auto=format&fit=crop',
        category: 'pastas',
        isChefPick: true,
    },
    {
        id: 'pasta-5',
        name: 'Seafood Linguine',
        price: '22',
        description: 'Shrimp, mussels, and calamari in a garlic white wine sauce over linguine.',
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=600&auto=format&fit=crop',
        category: 'pastas',
    },

    // Desserts
    {
        id: 'dessert-1',
        name: 'Tiramisu',
        price: '8',
        description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream.',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=600&auto=format&fit=crop',
        category: 'desserts',
        isVegetarian: true,
        isChefPick: true,
    },
    {
        id: 'dessert-2',
        name: 'Cannoli',
        price: '6',
        description: 'Crispy Sicilian pastry shells filled with sweet ricotta and chocolate chips.',
        image: 'https://images.unsplash.com/photo-1631206753348-db44968fd440?q=80&w=600&auto=format&fit=crop',
        category: 'desserts',
        isVegetarian: true,
        isPopular: true,
    },
    {
        id: 'dessert-3',
        name: 'Gelato Trio',
        price: '7',
        description: 'Three scoops of authentic Italian gelato. Choose from vanilla, chocolate, pistachio, or stracciatella.',
        image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=600&auto=format&fit=crop',
        category: 'desserts',
        isVegetarian: true,
        isGlutenFree: true,
    },
    {
        id: 'dessert-4',
        name: 'Panna Cotta',
        price: '7',
        description: 'Creamy Italian vanilla pudding with fresh berry compote and mint.',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop',
        category: 'desserts',
        isVegetarian: true,
        isGlutenFree: true,
    },
    {
        id: 'dessert-5',
        name: 'Chocolate Lava Cake',
        price: '9',
        description: 'Warm chocolate cake with a molten center, served with vanilla gelato.',
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=600&auto=format&fit=crop',
        category: 'desserts',
        isVegetarian: true,
        isPopular: true,
    },

    // Drinks
    {
        id: 'drink-1',
        name: 'Craft Soda',
        price: '3',
        description: 'House-made sodas: Root Beer, Cola, or Orange Cream. Made with real cane sugar.',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop',
        category: 'drinks',
        isVegetarian: true,
        isGlutenFree: true,
    },
    {
        id: 'drink-2',
        name: 'Italian Lemonade',
        price: '4',
        description: 'Fresh-squeezed lemons, sparkling water, fresh mint, and a hint of honey.',
        image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=600&auto=format&fit=crop',
        category: 'drinks',
        isVegetarian: true,
        isGlutenFree: true,
    },
    {
        id: 'drink-3',
        name: 'Espresso',
        price: '3',
        description: 'Double shot of rich Italian espresso. Also available as cappuccino or latte.',
        image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=600&auto=format&fit=crop',
        category: 'drinks',
        isVegetarian: true,
        isGlutenFree: true,
    },
    {
        id: 'drink-4',
        name: 'Local Craft Beer',
        price: '7',
        description: 'Rotating selection of local craft beers. Ask your server for today\'s options.',
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=600&auto=format&fit=crop',
        category: 'drinks',
        isVegetarian: true,
        isGlutenFree: true,
    },

    // Wines & Cocktails
    {
        id: 'wine-1',
        name: 'Chianti Classico',
        price: '12',
        description: 'A classic Tuscan red wine with notes of cherry, plum, and spice. Glass or bottle available.',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop',
        category: 'wines',
        isVegetarian: true,
        isGlutenFree: true,
    },
    {
        id: 'wine-2',
        name: 'Pinot Grigio',
        price: '10',
        description: 'Crisp Italian white wine with citrus and floral notes. Perfect with seafood.',
        image: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?q=80&w=600&auto=format&fit=crop',
        category: 'wines',
        isVegetarian: true,
        isGlutenFree: true,
    },
    {
        id: 'wine-3',
        name: 'Aperol Spritz',
        price: '11',
        description: 'The iconic Italian aperitivo. Aperol, prosecco, and a splash of soda with orange.',
        image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?q=80&w=600&auto=format&fit=crop',
        category: 'wines',
        isVegetarian: true,
        isGlutenFree: true,
        isPopular: true,
    },
    {
        id: 'wine-4',
        name: 'Negroni',
        price: '13',
        description: 'Classic Italian cocktail. Gin, Campari, and sweet vermouth stirred over ice.',
        image: 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?q=80&w=600&auto=format&fit=crop',
        category: 'wines',
        isVegetarian: true,
        isGlutenFree: true,
        isChefPick: true,
    },
    {
        id: 'wine-5',
        name: 'Limoncello',
        price: '8',
        description: 'Traditional Italian lemon liqueur. Served chilled as a digestif.',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop',
        category: 'wines',
        isVegetarian: true,
        isGlutenFree: true,
    },
];

export const todaySpecial: Special = {
    id: 'special-1',
    name: 'Truffle Mushroom Pizza',
    originalPrice: '26',
    discountPrice: '19',
    description: 'White truffle cream, wild mushrooms, fontina cheese, fresh thyme, and truffle oil.',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=800&auto=format&fit=crop',
    validUntil: 'Today Only',
};

export const chef: Chef = {
    name: 'Marco Bellini',
    title: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop',
    bio: 'With over 20 years of experience in authentic Italian cuisine, Chef Marco brings the flavors of Tuscany to every dish. Trained in Florence and mentored by Michelin-starred chefs, he believes in using only the freshest ingredients.',
    experience: 20,
    quote: '"Cooking is not just about recipes, it\'s about sharing love through food."',
};

export const allergens = [
    'Gluten',
    'Dairy',
    'Eggs',
    'Nuts',
    'Shellfish',
    'Soy',
];
