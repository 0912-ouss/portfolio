"use client";

import { motion, AnimatePresence, useScroll, useInView } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
    FiSearch,
    FiUser,
    FiHeart,
    FiShoppingBag,
    FiMenu,
    FiX,
    FiArrowRight,
    FiArrowLeft,
    FiStar,
    FiTruck,
    FiCreditCard,
    FiHeadphones,
    FiPlus,
    FiMinus,
    FiInstagram,
    FiMail,
    FiPhone,
    FiMapPin,
    FiFacebook,
    FiTwitter,
} from "react-icons/fi";

// Products data
const products = [
    { id: 1, name: "Trendy Brown Coat", price: 75, oldPrice: 150, rating: 4.8, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop", discount: 50, category: "Women" },
    { id: 2, name: "Classy Light Coat", price: 165, oldPrice: 220, rating: 4.9, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop", discount: 25, category: "Women" },
    { id: 3, name: "Modern Brown Dress", price: 90, oldPrice: 100, rating: 4.8, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop", discount: 10, category: "Women" },
    { id: 4, name: "Elegant Blazer", price: 120, oldPrice: 180, rating: 4.7, image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop", discount: 33, category: "Men" },
    { id: 5, name: "Stylish Summer Dress", price: 75, oldPrice: 150, rating: 4.8, image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=600&auto=format&fit=crop", discount: 50, category: "Women" },
    { id: 6, name: "Modern Party Dress", price: 80, oldPrice: 100, rating: 4.9, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop", discount: 20, category: "Women" },
];

// Categories data
const categories = [
    { name: "For Women's", items: ["Blouse", "Dress", "Jackets & Coats", "Shirt"], count: "2300+ items", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400" },
    { name: "For Men's", items: ["T-shirts and Shirts", "Pants", "Jackets & Coats", "Suit"], count: "1500+ items", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
];

// Accessories
const accessories = ["Sunglasses", "Handbags", "Jewelry", "Watches"];

// Instagram images
const instagramImages = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=300",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300",
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=300",
    "https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=300",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=300",
    "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=300",
];

// Testimonials
const testimonials = [
    { id: 1, name: "Leslie Alexander", role: "Fashion Enthusiast", rating: 5, review: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100" },
    { id: 2, name: "Sarah Johnson", role: "Style Blogger", rating: 5, review: "Amazing quality and fast shipping. The clothes fit perfectly and the customer service is outstanding!", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100" },
];

// Blog posts
const blogPosts = [
    { id: 1, title: "10 Fashion Trends for the Modern Woman", date: "March 2024", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=400" },
    { id: 2, title: "Fashion Forward: Tips, Trends, and Inspiration", date: "March 2024", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400" },
    { id: 3, title: "Fall Fashion Frenzy: The Ultimate Style Guide", date: "March 2024", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400" },
];

// FAQs
const faqs = [
    { id: 1, q: "How can I place an order?", a: "Simply browse our collection, add items to your cart, and proceed to checkout. We accept all major payment methods." },
    { id: 2, q: "What payment methods do you accept?", a: "We accept credit/debit cards, PayPal, and bank transfers. All transactions are secure and encrypted." },
    { id: 3, q: "Can I track my order after it's been placed?", a: "Yes! Once your order ships, you'll receive a tracking number via email to monitor your delivery." },
    { id: 4, q: "Do you offer customer support?", a: "Yes, our customer support team is available 24/7 via chat, email, or phone." },
    { id: 5, q: "What is your return policy?", a: "We offer a 30-day return policy on all items in original condition with tags attached." },
];

// Countdown component
function Countdown() {
    const [time, setTime] = useState({ days: 5, hours: 12, mins: 30, secs: 25 });
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(t => {
                let { days, hours, mins, secs } = t;
                if (secs > 0) secs--;
                else { secs = 59; if (mins > 0) mins--; else { mins = 59; if (hours > 0) hours--; else { hours = 23; if (days > 0) days--; } } }
                return { days, hours, mins, secs };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="flex gap-2">
            {[{ v: time.days, l: "Days" }, { v: time.hours, l: "Hours" }, { v: time.mins, l: "Mins" }, { v: time.secs, l: "Secs" }].map(t => (
                <div key={t.l} className="bg-[#3D2314] text-white px-3 py-2 rounded-lg text-center min-w-[50px]">
                    <div className="text-lg font-bold">{String(t.v).padStart(2, "0")}</div>
                    <div className="text-[10px] text-white/70">{t.l}</div>
                </div>
            ))}
        </div>
    );
}

export default function FashionDemo() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [productFilter, setProductFilter] = useState("All");
    const [openFaq, setOpenFaq] = useState<number | null>(1);
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [cartOpen, setCartOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState<typeof products[0] | null>(null);
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [cart, setCart] = useState<{ id: number; qty: number }[]>([{ id: 1, qty: 1 }, { id: 3, qty: 2 }]);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        document.title = "Clothing - Your Ultimate Fashion Destination";
        const handleScroll = () => setShowBackToTop(window.scrollY > 500);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleWishlist = (id: number) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    const addToCart = (id: number) => setCart(prev => prev.find(x => x.id === id) ? prev.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x) : [...prev, { id, qty: 1 }]);
    const removeFromCart = (id: number) => setCart(prev => prev.filter(x => x.id !== id));
    const cartTotal = cart.reduce((sum, item) => sum + (products.find(p => p.id === item.id)?.price || 0) * item.qty, 0);

    const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const staggerItem = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
    const filteredProducts = productFilter === "All" ? products : products.filter(p => p.category === productFilter);


    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Progress Bar */}
            <motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A574] to-[#3D2314] origin-left z-[100]" />

            {/* Top Bar */}
            <div className="bg-[#3D2314] text-white text-sm py-2">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <span>Support: 1 800 555 0100</span>
                    <span>🎉 GET 20% Off for New User: <span className="font-bold underline cursor-pointer">Sign up now</span></span>
                    <div className="hidden md:flex gap-4">
                        <span>FAQ</span>
                        <span>Contact</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#D4A574] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">C</span>
                        </div>
                        <span className="font-bold text-xl text-[#3D2314]">Clothing.</span>
                    </motion.div>

                    <div className="hidden lg:flex items-center gap-8">
                        {["Home", "Shop", "Men", "Women", "Kids", "Accessories", "About", "Contact"].map(link => (
                            <motion.a key={link} href="#" whileHover={{ y: -2 }} className="text-sm font-medium text-[#3D2314]/70 hover:text-[#D4A574] transition-colors">
                                {link}
                            </motion.a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSearchOpen(true)}>
                            <FiSearch className="text-xl text-[#3D2314] cursor-pointer hover:text-[#D4A574]" />
                        </motion.button>
                        <FiUser className="text-xl text-[#3D2314] cursor-pointer hover:text-[#D4A574] hidden sm:block" />
                        <motion.div whileHover={{ scale: 1.1 }} className="relative cursor-pointer">
                            <FiHeart className="text-xl text-[#3D2314] hover:text-[#D4A574]" />
                            {wishlist.length > 0 && <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#D4A574] text-white text-xs rounded-full flex items-center justify-center">{wishlist.length}</span>}
                        </motion.div>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setCartOpen(true)} className="relative">
                            <FiShoppingBag className="text-xl text-[#3D2314] cursor-pointer hover:text-[#D4A574]" />
                            {cart.length > 0 && <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#D4A574] text-white text-xs rounded-full flex items-center justify-center">{cart.length}</span>}
                        </motion.button>
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
                            {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t">
                            <div className="px-6 py-4 space-y-3">
                                {["Home", "Shop", "Men", "Women", "Kids", "Accessories"].map(link => (
                                    <a key={link} href="#" className="block py-2 text-[#3D2314] font-medium">{link}</a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-[#F5EBE0] to-[#FDF8F3] overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4A574]/20 text-[#3D2314] rounded-full text-sm font-medium mb-6">
                                <span className="text-xl">👗</span> 50% OFF Summer Super Sale
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3D2314] leading-tight mb-6">
                                Step into Style: Your Ultimate Fashion Destination
                            </h1>
                            <p className="text-[#3D2314]/60 mb-8 max-w-md">
                                Discover the latest trends and timeless classics that define your unique style.
                            </p>
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-8 py-4 bg-[#D4A574] text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-[#C49566] transition-colors">
                                Shop Now <FiArrowRight />
                            </motion.button>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden lg:block">
                            <div className="relative h-[500px] w-full">
                                <Image src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800" alt="Fashion" fill className="object-cover rounded-3xl" />
                            </div>
                            {/* Decorative elements */}
                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-4 -right-4 w-20 h-20 bg-[#D4A574] rounded-full opacity-50" />
                            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#3D2314] rounded-full opacity-30" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust Features */}
            <section className="py-12 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: FiTruck, title: "Free Shipping", desc: "Free shipping for orders above £80" },
                            { icon: FiCreditCard, title: "Flexible Payment", desc: "Pay with multiple credit cards" },
                            { icon: FiHeadphones, title: "24/7 Support", desc: "We support you round the clock" },
                        ].map((f, i) => (
                            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 p-4 bg-[#F5EBE0] rounded-xl">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                    <f.icon className="text-[#D4A574] text-xl" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-[#3D2314]">{f.title}</h4>
                                    <p className="text-sm text-[#3D2314]/60">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-[#FDF8F3]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Women & Men */}
                        {categories.map((cat, i) => (
                            <motion.div key={cat.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 shadow-sm">
                                <span className="text-sm text-[#D4A574] font-medium">{cat.count}</span>
                                <h3 className="text-2xl font-bold text-[#3D2314] mt-2 mb-4">{cat.name}</h3>
                                <ul className="space-y-2 mb-4">
                                    {cat.items.map(item => (
                                        <li key={item} className="text-[#3D2314]/60 hover:text-[#D4A574] cursor-pointer transition-colors">{item}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                        {/* Accessories */}
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 shadow-sm">
                            <span className="text-sm text-[#D4A574] font-medium">800+ items</span>
                            <h3 className="text-2xl font-bold text-[#3D2314] mt-2 mb-4">Accessories</h3>
                            <ul className="space-y-2">
                                {accessories.map(item => (
                                    <li key={item} className="text-[#3D2314]/60 hover:text-[#D4A574] cursor-pointer transition-colors">{item}</li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Top Seller Products */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                        <div>
                            <span className="text-sm text-[#D4A574] font-medium">Our Products</span>
                            <h2 className="text-3xl font-bold text-[#3D2314]">Our Top Seller Products</h2>
                        </div>
                        <div className="flex gap-2">
                            {["All", "Women", "Men", "Accessories"].map(f => (
                                <button key={f} onClick={() => setProductFilter(f)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${productFilter === f ? "bg-[#D4A574] text-white" : "bg-gray-100 text-[#3D2314] hover:bg-gray-200"}`}>
                                    {f}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {filteredProducts.map((product, i) => (
                                <motion.div key={product.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -10 }} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer">
                                    <div className="relative h-64 overflow-hidden" onClick={() => setQuickViewProduct(product)}>
                                        <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                        {product.discount > 0 && (
                                            <div className="absolute top-3 left-3 px-3 py-1 bg-[#D4A574] text-white rounded-full text-sm font-semibold">
                                                {product.discount}% off
                                            </div>
                                        )}
                                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${wishlist.includes(product.id) ? "bg-red-500 text-white" : "bg-white text-[#3D2314] opacity-0 group-hover:opacity-100"}`}>
                                            <FiHeart fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                                        </motion.button>
                                        <motion.button initial={{ opacity: 0, y: 10 }} whileHover={{ scale: 1.05 }} className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-[#3D2314] opacity-0 group-hover:opacity-100 transition-all" onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}>Quick View</motion.button>
                                    </div>
                                    <div className="p-4">
                                        <span className="text-xs text-[#D4A574]">{product.category}</span>
                                        <h3 className="font-semibold text-[#3D2314] mt-1">{product.name}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-lg font-bold text-[#3D2314]">${product.price}.00</span>
                                            {product.oldPrice && <span className="text-sm text-gray-400 line-through">${product.oldPrice}.00</span>}
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-1">
                                                <FiStar className="text-yellow-500" fill="currentColor" />
                                                <span className="text-sm font-medium">{product.rating}</span>
                                            </div>
                                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { addToCart(product.id); setCartOpen(true); }} className="w-8 h-8 bg-[#D4A574] text-white rounded-full flex items-center justify-center text-sm"><FiPlus /></motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Limited Time Offer Banner */}
            <section className="py-16 bg-[#F5EBE0]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[400px] rounded-3xl overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800" alt="Limited Offer" fill className="object-cover" />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <span className="text-sm text-[#D4A574] font-medium">Limited Time Offers</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#3D2314] mt-2 mb-4">25% Off All Fashion Favorites - Limited Time!</h2>
                            <p className="text-[#3D2314]/60 mb-6">Don't miss out on our exclusive collection at unbeatable prices.</p>
                            <Countdown />
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-8 px-8 py-4 bg-[#3D2314] text-white rounded-lg font-semibold flex items-center gap-2">
                                Shop Now <FiArrowRight />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Deals of the Day */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between mb-10">
                        <div>
                            <span className="text-sm text-[#D4A574] font-medium">Today Deals</span>
                            <h2 className="text-3xl font-bold text-[#3D2314]">Deals of the Day</h2>
                        </div>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {products.slice(4, 6).map((product, i) => (
                            <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="flex bg-white rounded-2xl overflow-hidden shadow-lg">
                                <div className="relative w-1/2 min-h-[250px]">
                                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                                    <div className="absolute top-3 left-3 px-3 py-1 bg-[#D4A574] text-white rounded-full text-sm font-semibold">{product.discount}% off</div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-center">
                                    <span className="text-xs text-[#D4A574]">{product.category}</span>
                                    <h3 className="text-xl font-bold text-[#3D2314] mt-1">{product.name}</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-2xl font-bold text-[#D4A574]">${product.price}.00</span>
                                        <span className="text-gray-400 line-through">${product.oldPrice}.00</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <FiStar className="text-yellow-500" fill="currentColor" />
                                        <span className="font-medium">{product.rating}</span>
                                    </div>
                                    <p className="text-sm text-[#3D2314]/60 mt-3">Limited stock available. Grab yours now!</p>
                                    <button className="mt-4 text-[#D4A574] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                                        Shop Now <FiArrowRight />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Collection Banners */}
            <section className="py-16 bg-[#F5EBE0]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Men's Latest Collection", discount: "Flat 20% Discount", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600", dark: true },
                            { title: "Women's Latest Fashion", discount: "Flat 25% Discount", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600", dark: false },
                        ].map((banner, i) => (
                            <motion.div key={banner.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.02 }} className={`relative h-[300px] rounded-2xl overflow-hidden cursor-pointer ${banner.dark ? "bg-[#3D2314]" : "bg-[#D4A574]"}`}>
                                <div className="absolute inset-0 p-8 flex flex-col justify-center z-10">
                                    <span className="text-sm text-white/80">{banner.discount}</span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">{banner.title}</h3>
                                    <button className="w-fit px-6 py-3 bg-white text-[#3D2314] rounded-lg font-semibold flex items-center gap-2">
                                        Shop Now <FiArrowRight />
                                    </button>
                                </div>
                                <div className="absolute right-0 bottom-0 w-1/2 h-full">
                                    <Image src={banner.image} alt={banner.title} fill className="object-cover object-top opacity-80" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instagram Feed */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
                        <span className="text-sm text-[#D4A574] font-medium">Follow Us</span>
                        <h2 className="text-3xl font-bold text-[#3D2314]">Follow Us On Instagram</h2>
                    </motion.div>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {instagramImages.map((img, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.05 }} className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group">
                                <Image src={img} alt="Instagram" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <FiInstagram className="text-white text-3xl" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-[#FDF8F3]">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between mb-10">
                        <div>
                            <span className="text-sm text-[#D4A574] font-medium">Testimonial</span>
                            <h2 className="text-3xl font-bold text-[#3D2314]">What Our Clients Say</h2>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setTestimonialIndex(i => Math.max(0, i - 1))} className="w-10 h-10 rounded-full border border-[#D4A574] flex items-center justify-center text-[#D4A574] hover:bg-[#D4A574] hover:text-white transition-colors">
                                <FiArrowLeft />
                            </button>
                            <button onClick={() => setTestimonialIndex(i => Math.min(testimonials.length - 1, i + 1))} className="w-10 h-10 rounded-full bg-[#D4A574] flex items-center justify-center text-white">
                                <FiArrowRight />
                            </button>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                                <Image src={testimonials[testimonialIndex].avatar} alt={testimonials[testimonialIndex].name} fill className="object-cover" />
                            </div>
                            <div>
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                                        <FiStar key={i} className="text-yellow-500" fill="currentColor" />
                                    ))}
                                </div>
                                <p className="text-[#3D2314]/70 mb-4 italic">&quot;{testimonials[testimonialIndex].review}&quot;</p>
                                <h4 className="font-bold text-[#3D2314]">{testimonials[testimonialIndex].name}</h4>
                                <p className="text-sm text-[#D4A574]">{testimonials[testimonialIndex].role}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
                        <span className="text-sm text-[#D4A574] font-medium">News & Blog</span>
                        <h2 className="text-3xl font-bold text-[#3D2314]">Our Latest News & Blogs</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {blogPosts.map((post, i) => (
                            <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10 }} className="group cursor-pointer">
                                <div className="relative h-52 rounded-2xl overflow-hidden mb-4">
                                    <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <span className="text-sm text-[#D4A574]">{post.date}</span>
                                <h3 className="font-bold text-[#3D2314] mt-1 group-hover:text-[#D4A574] transition-colors">{post.title}</h3>
                                <a href="#" className="text-[#D4A574] text-sm font-medium mt-2 inline-flex items-center gap-1 hover:gap-2 transition-all">
                                    Read More <FiArrowRight />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-[#FDF8F3]">
                <div className="max-w-3xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
                        <span className="text-sm text-[#D4A574] font-medium">FAQ</span>
                        <h2 className="text-3xl font-bold text-[#3D2314]">Questions? Look here.</h2>
                    </motion.div>
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <motion.div key={faq.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`rounded-xl overflow-hidden border ${openFaq === faq.id ? "bg-[#D4A574] border-[#D4A574]" : "bg-white border-gray-200"}`}>
                                <button onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)} className={`w-full flex items-center justify-between p-5 text-left font-medium ${openFaq === faq.id ? "text-white" : "text-[#3D2314]"}`}>
                                    {faq.q}
                                    <motion.div animate={{ rotate: openFaq === faq.id ? 45 : 0 }}>
                                        <FiPlus />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === faq.id && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                            <p className="px-5 pb-5 text-white/90">{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-16">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <span className="text-sm text-[#D4A574] font-medium">Our Newsletter</span>
                        <h2 className="text-3xl font-bold text-[#3D2314] mt-2 mb-4">Subscribe to Our Newsletter to Get Updates to Our Latest Collection</h2>
                        <p className="text-[#3D2314]/60 mb-8">Get 20% off on your first order just by subscribing to our newsletter</p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-lg">
                                <FiMail className="text-[#D4A574]" />
                                <input type="email" placeholder="Enter your email" className="flex-1 bg-transparent outline-none text-[#3D2314]" />
                            </div>
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-8 py-3 bg-[#3D2314] text-white rounded-lg font-semibold">
                                Subscribe
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#3D2314] text-white pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-10 h-10 bg-[#D4A574] rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">C</span>
                                </div>
                                <span className="font-bold text-xl">Clothing.</span>
                            </div>
                            <p className="text-white/60 text-sm mb-4">Your ultimate fashion destination for trendy and timeless clothing.</p>
                            <div className="flex gap-3">
                                {[FiFacebook, FiTwitter, FiInstagram].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A574] transition-colors">
                                        <Icon />
                                    </a>
                                ))}
                            </div>
                        </div>
                        {[
                            { title: "Company", links: ["About Us", "Blog", "Contact Us", "Career"] },
                            { title: "Customer Service", links: ["My Account", "Track My Order", "Return", "Help"] },
                            { title: "Our Information", links: ["Start Return & Exchange", "Privacy Policy", "Terms & Conditions", "FAQ"] },
                        ].map((section) => (
                            <div key={section.title}>
                                <h4 className="font-semibold mb-4">{section.title}</h4>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link}><a href="#" className="text-sm text-white/60 hover:text-[#D4A574] transition-colors">{link}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <div>
                            <h4 className="font-semibold mb-4">Contact Us</h4>
                            <ul className="space-y-3 text-sm text-white/60">
                                <li className="flex items-center gap-2"><FiPhone className="text-[#D4A574]" /> +1 800 555 0100</li>
                                <li className="flex items-center gap-2"><FiMail className="text-[#D4A574]" /> info@clothing.com</li>
                                <li className="flex items-start gap-2"><FiMapPin className="text-[#D4A574] mt-1" /> 1500 Fashion Blvd, Los Angeles</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/10 text-center text-sm text-white/40">
                        Copyright © 2024 Clothing Fashion Design. All Rights Reserved.
                    </div>
                </div>
            </footer>

            {/* Search Modal */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24" onClick={() => setSearchOpen(false)}>
                        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} onClick={e => e.stopPropagation()} className="bg-white rounded-2xl p-6 w-full max-w-xl mx-4 shadow-2xl">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                                <FiSearch className="text-xl text-[#D4A574]" />
                                <input type="text" placeholder="Search for products..." className="flex-1 text-lg outline-none text-[#3D2314]" autoFocus />
                                <button onClick={() => setSearchOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><FiX /></button>
                            </div>
                            <p className="text-sm text-gray-400 mb-3">Popular searches:</p>
                            <div className="flex flex-wrap gap-2">
                                {["Dresses", "Blazers", "Summer", "Coats"].map(t => <span key={t} className="px-4 py-2 bg-gray-100 rounded-full text-sm text-[#3D2314] cursor-pointer hover:bg-[#D4A574] hover:text-white transition-colors">{t}</span>)}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cart Sidebar */}
            <AnimatePresence>
                {cartOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/50" onClick={() => setCartOpen(false)} />
                        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween" }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl">
                            <div className="flex items-center justify-between p-6 border-b">
                                <h3 className="text-xl font-bold text-[#3D2314]">Shopping Cart ({cart.length})</h3>
                                <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><FiX className="text-xl" /></button>
                            </div>
                            <div className="p-6 flex-1 overflow-auto max-h-[60vh]">
                                {cart.length === 0 ? <p className="text-gray-400 text-center py-8">Your cart is empty</p> : cart.map(item => {
                                    const p = products.find(x => x.id === item.id);
                                    if (!p) return null;
                                    return (
                                        <div key={item.id} className="flex gap-4 py-4 border-b">
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image src={p.image} alt={p.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-[#3D2314]">{p.name}</h4>
                                                <p className="text-[#D4A574] font-bold">${p.price}.00</p>
                                                <p className="text-sm text-gray-400">Qty: {item.qty}</p>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500"><FiX /></button>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
                                <div className="flex justify-between mb-4"><span className="text-gray-500">Subtotal</span><span className="font-bold text-[#3D2314]">${cartTotal}.00</span></div>
                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 bg-[#D4A574] text-white rounded-xl font-semibold">Checkout</motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Quick View Modal */}
            <AnimatePresence>
                {quickViewProduct && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setQuickViewProduct(null)}>
                        <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} onClick={e => e.stopPropagation()} className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden flex flex-col md:flex-row">
                            <div className="relative h-64 md:h-auto md:w-1/2">
                                <Image src={quickViewProduct.image} alt={quickViewProduct.name} fill className="object-cover" />
                                {quickViewProduct.discount > 0 && <div className="absolute top-4 left-4 px-3 py-1 bg-[#D4A574] text-white rounded-full text-sm font-bold">{quickViewProduct.discount}% OFF</div>}
                            </div>
                            <div className="p-8 flex-1">
                                <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center"><FiX /></button>
                                <span className="text-sm text-[#D4A574] font-medium">{quickViewProduct.category}</span>
                                <h2 className="text-2xl font-bold text-[#3D2314] mt-1">{quickViewProduct.name}</h2>
                                <div className="flex items-center gap-1 mt-2"><FiStar className="text-yellow-500" fill="currentColor" /><span className="font-medium">{quickViewProduct.rating}</span></div>
                                <div className="flex items-center gap-3 mt-4">
                                    <span className="text-3xl font-bold text-[#D4A574]">${quickViewProduct.price}.00</span>
                                    {quickViewProduct.oldPrice && <span className="text-xl text-gray-400 line-through">${quickViewProduct.oldPrice}.00</span>}
                                </div>
                                <p className="text-gray-500 mt-4">Premium quality clothing with exceptional comfort and style. Perfect for any occasion.</p>
                                <div className="flex gap-3 mt-6">
                                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { addToCart(quickViewProduct.id); setQuickViewProduct(null); setCartOpen(true); }} className="flex-1 py-3 bg-[#D4A574] text-white rounded-xl font-semibold">Add to Cart</motion.button>
                                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => toggleWishlist(quickViewProduct.id)} className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${wishlist.includes(quickViewProduct.id) ? "bg-red-500 border-red-500 text-white" : "border-gray-200 text-gray-400"}`}>
                                        <FiHeart fill={wishlist.includes(quickViewProduct.id) ? "currentColor" : "none"} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Back to Top */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} whileHover={{ scale: 1.1 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#D4A574] text-white rounded-full shadow-2xl flex items-center justify-center">
                        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><FiArrowRight className="text-xl rotate-[-90deg]" /></motion.div>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
