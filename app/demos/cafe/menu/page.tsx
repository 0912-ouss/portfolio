"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    FiArrowLeft,
    FiSearch,
    FiFilter,
    FiHeart,
    FiShoppingBag,
    FiCoffee,
    FiX,
} from "react-icons/fi";

const menuCategories = [
    { id: "all", name: "All", icon: "☕" },
    { id: "hot-coffee", name: "Hot Coffee", icon: "🔥" },
    { id: "cold-coffee", name: "Cold Coffee", icon: "🧊" },
    { id: "tea", name: "Tea", icon: "🍵" },
    { id: "bakery", name: "Bakery", icon: "🥐" },
    { id: "desserts", name: "Desserts", icon: "🍰" },
];

const menuItems = [
    // Hot Coffee
    { id: 1, name: "Espresso", price: "Rs. 99", description: "Rich, intense single shot of pure coffee essence", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800", category: "hot-coffee", popular: true },
    { id: 2, name: "Americano", price: "Rs. 129", description: "Espresso diluted with hot water for a smooth experience", image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=800", category: "hot-coffee" },
    { id: 3, name: "Cappuccino", price: "Rs. 159", description: "Perfect balance of espresso, steamed milk and foam", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800", category: "hot-coffee", popular: true },
    { id: 4, name: "Latte", price: "Rs. 169", description: "Smooth espresso with velvety steamed milk", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800", category: "hot-coffee" },
    { id: 5, name: "Mocha", price: "Rs. 189", description: "Espresso with chocolate and steamed milk", image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=800", category: "hot-coffee" },
    { id: 6, name: "Filter Coffee", price: "Rs. 69", description: "Traditional South Indian filter coffee", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800", category: "hot-coffee" },

    // Cold Coffee
    { id: 7, name: "Iced Latte", price: "Rs. 179", description: "Chilled espresso with cold milk over ice", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=800", category: "cold-coffee", popular: true },
    { id: 8, name: "Cold Brew", price: "Rs. 199", description: "Slow-steeped for 20 hours, smooth and bold", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800", category: "cold-coffee" },
    { id: 9, name: "Frappe", price: "Rs. 209", description: "Blended iced coffee with creamy texture", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800", category: "cold-coffee" },
    { id: 10, name: "Dalgona Coffee", price: "Rs. 159", description: "Whipped coffee over cold milk, Instagram famous!", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800", category: "cold-coffee" },

    // Tea
    { id: 11, name: "Masala Chai", price: "Rs. 49", description: "Aromatic spiced tea with milk", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=800", category: "tea" },
    { id: 12, name: "Green Tea", price: "Rs. 79", description: "Pure Japanese green tea leaves", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=800", category: "tea" },
    { id: 13, name: "Earl Grey", price: "Rs. 89", description: "Black tea with bergamot essence", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800", category: "tea" },

    // Bakery
    { id: 14, name: "Croissant", price: "Rs. 129", description: "Flaky, buttery French pastry", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800", category: "bakery", popular: true },
    { id: 15, name: "Chocolate Muffin", price: "Rs. 99", description: "Rich chocolate chips in every bite", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=800", category: "bakery" },
    { id: 16, name: "Blueberry Scone", price: "Rs. 119", description: "Tender scone with fresh blueberries", image: "https://images.unsplash.com/photo-1486427944544-d2c6f0bd6b67?q=80&w=800", category: "bakery" },

    // Desserts
    { id: 17, name: "Tiramisu", price: "Rs. 249", description: "Classic Italian coffee-soaked dessert", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800", category: "desserts", popular: true },
    { id: 18, name: "Cheesecake", price: "Rs. 229", description: "Creamy New York style cheesecake", image: "https://images.unsplash.com/photo-1567327613485-fbc7bf196198?q=80&w=800", category: "desserts" },
    { id: 19, name: "Chocolate Brownie", price: "Rs. 149", description: "Fudgy brownie with chocolate chips", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800", category: "desserts" },
    { id: 20, name: "Churros", price: "Rs. 169", description: "Crispy fried dough with chocolate sauce", image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=800", category: "desserts" },
];

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cart, setCart] = useState<number[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    const filteredItems = menuItems.filter((item) => {
        const matchesCategory = activeCategory === "all" || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleFavorite = (id: number) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const addToCart = (id: number) => {
        setCart((prev) => [...prev, id]);
    };

    return (
        <div className="min-h-screen bg-[#EEEBE6]">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#1A120B]/95 backdrop-blur-lg shadow-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/demos/cafe">
                            <motion.button
                                whileHover={{ scale: 1.1, x: -3 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 text-white/80 hover:text-white"
                            >
                                <FiArrowLeft className="text-2xl" />
                            </motion.button>
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#D5CEA3] to-[#8B7355] rounded-full flex items-center justify-center">
                                <FiCoffee className="text-[#1A120B]" />
                            </div>
                            <div>
                                <div className="text-xl font-bold text-white tracking-wider">MENU</div>
                                <div className="text-[10px] text-[#D5CEA3] tracking-widest uppercase">Coffee Shop</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowSearch(!showSearch)}
                            className="p-2 text-white/80 hover:text-white"
                        >
                            {showSearch ? <FiX className="text-xl" /> : <FiSearch className="text-xl" />}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative p-2 text-white/80 hover:text-white"
                        >
                            <FiShoppingBag className="text-xl" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D5CEA3] text-[#1A120B] text-xs font-bold rounded-full flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Search Bar */}
                <AnimatePresence>
                    {showSearch && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-t border-white/10"
                        >
                            <div className="max-w-7xl mx-auto px-6 py-4">
                                <div className="relative">
                                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                                    <input
                                        type="text"
                                        placeholder="Search menu..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-12 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/50 outline-none focus:border-[#D5CEA3]"
                                        autoFocus
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Category Filter */}
            <div className="sticky top-[72px] z-40 bg-[#EEEBE6] shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {menuCategories.map((category) => (
                            <motion.button
                                key={category.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${activeCategory === category.id
                                        ? "bg-[#3C2A21] text-white shadow-lg"
                                        : "bg-white text-[#3C2A21] hover:bg-[#3C2A21]/10"
                                    }`}
                            >
                                <span>{category.icon}</span>
                                <span>{category.name}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Grid */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Results Count */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-[#1A120B]">
                        {activeCategory === "all" ? "All Items" : menuCategories.find(c => c.id === activeCategory)?.name}
                        <span className="text-base font-normal text-[#3C2A21]/60 ml-2">
                            ({filteredItems.length} items)
                        </span>
                    </h2>
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Popular Badge */}
                                    {item.popular && (
                                        <div className="absolute top-3 left-3 px-3 py-1 bg-[#E74C3C] text-white text-xs font-bold rounded-full">
                                            POPULAR
                                        </div>
                                    )}

                                    {/* Favorite Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => toggleFavorite(item.id)}
                                        className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-colors ${favorites.includes(item.id)
                                                ? "bg-red-500 text-white"
                                                : "bg-white text-red-400 hover:text-red-500"
                                            }`}
                                    >
                                        <FiHeart fill={favorites.includes(item.id) ? "currentColor" : "none"} />
                                    </motion.button>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-[#1A120B] mb-1 group-hover:text-[#3C2A21] transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-[#3C2A21]/60 mb-4 line-clamp-2">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-[#3C2A21]">
                                            {item.price}
                                        </span>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => addToCart(item.id)}
                                            className="px-5 py-2 bg-[#3C2A21] text-white rounded-full text-sm font-semibold hover:bg-[#1A120B] transition-colors"
                                        >
                                            Add to Cart
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredItems.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-4">☕</div>
                        <h3 className="text-xl font-bold text-[#1A120B] mb-2">No items found</h3>
                        <p className="text-[#3C2A21]/60">Try a different search or category</p>
                    </motion.div>
                )}
            </main>

            {/* Cart Summary */}
            <AnimatePresence>
                {cart.length > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 bg-[#1A120B] text-white p-4 shadow-2xl"
                    >
                        <div className="max-w-7xl mx-auto flex items-center justify-between">
                            <div>
                                <span className="text-[#D5CEA3] font-bold">{cart.length} items</span>
                                <span className="text-white/60 ml-2">in your cart</span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-[#D5CEA3] text-[#1A120B] rounded-full font-bold"
                            >
                                View Cart
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
