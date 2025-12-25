'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiArrowLeft, FiPlus, FiMinus, FiShare2, FiShield, FiTruck, FiRefreshCw } from 'react-icons/fi';
import { ecommerceProducts, Product } from '@/data/ecommerce/products';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [showToast, setShowToast] = useState(false);
    const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

    useEffect(() => {
        const found = ecommerceProducts.find(p => p.id === Number(id));
        if (found) {
            setProduct(found);
            setSelectedSize(found.sizes[0]);
            setSelectedColor(found.colors[0]);
            document.title = `${found.name} | Fashion Boutique`;

            // Recently Viewed Logic
            const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
            const updated = [found.id, ...viewed.filter((vid: number) => vid !== found.id)].slice(0, 10);
            localStorage.setItem('recentlyViewed', JSON.stringify(updated));

            setRecentlyViewed(ecommerceProducts.filter(p => updated.includes(p.id) && p.id !== found.id));
        }
    }, [id]);

    const handleAddToCart = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-10 h-10 border-2 border-[#D4A574] border-t-transparent rounded-full"
            />
        </div>
    );

    return (
        <div className="bg-white min-h-screen pb-32">
            {/* Header Section with Navigation Back */}
            <div className="container mx-auto px-6 lg:px-12 py-12">
                <Link
                    href="/demos/ecommerce/shop"
                    className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black text-[#999] hover:text-[#1A1A1A] transition-colors mb-16"
                >
                    <span className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center group-hover:border-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-all">
                        <FiArrowLeft />
                    </span>
                    Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Left - Hero Gallery */}
                    <div className="lg:col-span-8 flex flex-col-reverse md:flex-row gap-6">
                        {/* Thumbnails Sidebar */}
                        <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-y-auto max-h-[700px] scrollbar-hide py-2">
                            {product.gallery.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`relative w-24 aspect-[3/4] flex-shrink-0 border-2 transition-all p-1 ${activeImage === i ? 'border-[#D4A574]' : 'border-transparent opacity-40 hover:opacity-100'
                                        }`}
                                >
                                    <Image src={img} alt={`${product.name} ${i}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Stage Image */}
                        <div className="relative flex-1 aspect-[3/4] bg-[#FAF8F5] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeImage}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={product.gallery[activeImage]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            <div className="absolute top-8 left-8 flex flex-col gap-3 z-10">
                                {product.isNew && (
                                    <span className="px-5 py-2 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.3em] font-bold">
                                        Rare Piece
                                    </span>
                                )}
                                {product.isSale && (
                                    <span className="px-5 py-2 bg-[#D4A574] text-white text-[10px] uppercase tracking-[0.3em] font-bold">
                                        Exclusive Offer
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right - Luxury Details */}
                    <div className="lg:col-span-4 lg:sticky lg:top-[120px] h-fit">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-[11px] uppercase tracking-[0.5em] text-[#D4A574] font-black">
                                    {product.category}
                                </span>
                                <div className="flex gap-6">
                                    <button className="text-[#999] hover:text-[#1A1A1A] transition-colors"><FiShare2 className="w-5 h-5" /></button>
                                    <button className="text-[#999] hover:text-[#D4A574] transition-colors"><FiHeart className="w-5 h-5" /></button>
                                </div>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-8 uppercase leading-[0.9]">
                                {product.name.split(' ')[0]}<br />
                                <span className="font-serif italic text-[#D4A574] lowercase">{product.name.split(' ').slice(1).join(' ')}</span>
                            </h1>

                            <div className="flex items-baseline gap-6 mb-12">
                                <span className="text-4xl font-light text-[#1A1A1A]">${product.price}</span>
                                {product.originalPrice && (
                                    <span className="text-xl text-[#999] line-through font-light">${product.originalPrice}</span>
                                )}
                            </div>

                            <p className="text-[#666] font-light leading-[1.8] mb-12 pb-12 border-b border-[#E5E5E5] text-lg">
                                {product.description}
                            </p>

                            {/* Options Selector */}
                            <div className="space-y-12 mb-16">
                                {/* Size */}
                                <div>
                                    <div className="flex justify-between items-end mb-6">
                                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A]">Selection Size</span>
                                        <button className="text-[10px] uppercase tracking-widest text-[#999] border-b border-[#E5E5E5] hover:text-[#D4A574] hover:border-[#D4A574] transition-all pb-1 font-bold">Size Guide</button>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {product.sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-16 h-16 flex items-center justify-center text-xs tracking-widest transition-all ${selectedSize === size
                                                    ? 'bg-[#1A1A1A] text-white rounded-full'
                                                    : 'bg-[#FAF8F5] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white rounded-full'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Variants */}
                                <div>
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1A1A] block mb-6">Atmosphere: <span className="font-serif italic text-[#D4A574] lowercase ml-2">{selectedColor}</span></span>
                                    <div className="flex gap-4">
                                        {product.colors.map(color => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-10 h-10 rounded-full border-2 transition-all p-1 ${selectedColor === color ? 'border-[#1A1A1A]' : 'border-transparent'
                                                    }`}
                                            >
                                                <div className={`w-full h-full rounded-full`} style={{
                                                    backgroundColor: color === 'Ivory' ? '#FFFFF0' :
                                                        color === 'Midnight Black' ? '#000000' :
                                                            color === 'Champagne' ? '#F7E7CE' :
                                                                color === 'Camel' ? '#C19A6B' :
                                                                    color === 'Charcoal' ? '#36454F' :
                                                                        color === 'Navy' ? '#000080' :
                                                                            color === 'Black' ? '#000' :
                                                                                color === 'Nude' ? '#E3BC9A' :
                                                                                    color.toLowerCase()
                                                }} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Purchase Area */}
                            <div className="flex gap-4 mb-16">
                                <div className="flex items-center bg-[#FAF8F5] rounded-full px-4">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-10 h-10 flex items-center justify-center hover:text-[#D4A574] transition-colors"
                                    >
                                        <FiMinus className="w-4 h-4" />
                                    </button>
                                    <span className="w-10 text-center text-sm font-bold">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-10 h-10 flex items-center justify-center hover:text-[#D4A574] transition-colors"
                                    >
                                        <FiPlus className="w-4 h-4" />
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 h-16 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-4 hover:bg-[#D4A574] transition-all hover:gap-6 rounded-full"
                                >
                                    <FiShoppingBag className="w-5 h-5" /> Add to Shopping Bag
                                </button>
                            </div>

                            {/* Ethics Badges */}
                            <div className="grid grid-cols-1 gap-6 pt-12 border-t border-[#E5E5E5]">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-[#FAF8F5] rounded-full flex items-center justify-center text-[#D4A574]">
                                        <FiTruck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest font-black">Free Global Shipping</p>
                                        <p className="text-xs text-[#999]">On all curated orders</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-[#FAF8F5] rounded-full flex items-center justify-center text-[#D4A574]">
                                        <FiShield className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest font-black">Secure Authentication</p>
                                        <p className="text-xs text-[#999]">Certified Boutique Origin</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Styled Information Sections */}
                <div className="mt-40 pt-20 border-t border-[#E5E5E5]">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                        <div>
                            <span className="text-[#D4A574] text-[10px] uppercase tracking-[0.4em] font-bold block mb-6">01 Composition</span>
                            <p className="text-[#666] font-light leading-relaxed">Made from ethically sourced Mongolian cashmere and Italian silk. Every fiber is inspected for purity and strength, ensuring a lifespan of decades, not seasons.</p>
                        </div>
                        <div>
                            <span className="text-[#D4A574] text-[10px] uppercase tracking-[0.4em] font-bold block mb-6">02 Care Guide</span>
                            <p className="text-[#666] font-light leading-relaxed">Professional dry clean only. We recommend storing in a breathable cotton garment bag to maintain the structural integrity of the tailoring.</p>
                        </div>
                        <div>
                            <span className="text-[#D4A574] text-[10px] uppercase tracking-[0.4em] font-bold block mb-6">03 Legacy Return</span>
                            <p className="text-[#666] font-light leading-relaxed">Our 30-day return policy is handled with direct concierge pickup. We ensure a seamless experience throughout your journey with us.</p>
                        </div>
                    </div>
                </div>

                {/* Recently Viewed Section */}
                {recentlyViewed.length > 0 && (
                    <div className="mt-40 pt-20 border-t border-[#E5E5E5]">
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <span className="text-[#D4A574] text-[10px] uppercase tracking-[0.4em] font-bold block mb-4">Historical</span>
                                <h2 className="text-4xl font-light tracking-tight uppercase">Recently <span className="font-serif italic text-[#D4A574]">Viewed</span></h2>
                            </div>
                            <Link href="/demos/ecommerce/shop" className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-[#1A1A1A] pb-1 hover:text-[#D4A574] hover:border-[#D4A574] transition-all">View All</Link>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {recentlyViewed.map(p => (
                                <Link key={p.id} href={`/demos/ecommerce/product/${p.id}`} className="group">
                                    <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[#FAF8F5]">
                                        <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <h3 className="text-xs uppercase tracking-widest font-bold mb-2 truncate">{p.name}</h3>
                                    <p className="text-sm font-light text-[#666]">${p.price}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Added to Cart Toast */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 20, x: '-50%' }}
                        className="fixed bottom-12 left-1/2 z-[300] bg-[#1A1A1A] text-white px-8 py-4 rounded-full flex items-center gap-4 shadow-2xl"
                    >
                        <div className="w-8 h-8 rounded-full bg-[#D4A574] flex items-center justify-center">
                            <FiShoppingBag className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Added to Bag</p>
                            <p className="text-[9px] text-[#999] uppercase tracking-widest">{product.name}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
