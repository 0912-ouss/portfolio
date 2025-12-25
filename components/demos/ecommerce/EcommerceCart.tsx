'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus, FiMinus, FiShoppingBag, FiTrash2 } from 'react-icons/fi';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size: string;
}

const initialCartItems: CartItem[] = [
    {
        id: 1,
        name: "Silk Midi Dress",
        price: 890,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200&auto=format&fit=crop",
        size: "M"
    },
    {
        id: 2,
        name: "Cashmere Overcoat",
        price: 1450,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=200&auto=format&fit=crop",
        size: "S"
    }
];

export function EcommerceCart() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 25;
    const total = subtotal + shipping;

    return (
        <>
            {/* Cart Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-8 right-8 z-[200] w-12 h-12 bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#333] transition-colors"
            >
                <FiShoppingBag className="w-5 h-5" />
                {cartItems.length > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4A574] text-[10px] flex items-center justify-center font-bold rounded-full"
                    >
                        {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </motion.span>
                )}
            </button>

            {/* Cart Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[100] bg-black/50"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-md bg-white shadow-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-[#E5E5E5]">
                                <h3 className="text-lg font-medium">Shopping Bag ({cartItems.length})</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F5F5] transition-colors"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Items */}
                            <div className="flex-1 overflow-y-auto p-6">
                                {cartItems.length === 0 ? (
                                    <div className="text-center py-12">
                                        <FiShoppingBag className="w-12 h-12 mx-auto text-[#CCC] mb-4" />
                                        <p className="text-[#999]">Your bag is empty</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {cartItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: 100 }}
                                                className="flex gap-4"
                                            >
                                                <div className="w-20 h-24 bg-[#F5F5F5] relative overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium mb-1">{item.name}</h4>
                                                    <p className="text-sm text-[#999] mb-3">Size: {item.size}</p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center border border-[#E5E5E5]">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="w-8 h-8 flex items-center justify-center hover:bg-[#F5F5F5]"
                                                            >
                                                                <FiMinus className="w-3 h-3" />
                                                            </button>
                                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="w-8 h-8 flex items-center justify-center hover:bg-[#F5F5F5]"
                                                            >
                                                                <FiPlus className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                        <span className="font-medium">${item.price * item.quantity}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-[#999] hover:text-red-500 transition-colors"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {cartItems.length > 0 && (
                                <div className="p-6 border-t border-[#E5E5E5] bg-[#FAFAFA]">
                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#666]">Subtotal</span>
                                            <span>${subtotal}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[#666]">Shipping</span>
                                            <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                                        </div>
                                        <div className="flex justify-between font-medium text-lg pt-2 border-t border-[#E5E5E5]">
                                            <span>Total</span>
                                            <span>${total}</span>
                                        </div>
                                    </div>
                                    <button className="w-full py-4 bg-[#1A1A1A] text-white font-medium uppercase tracking-wider text-sm hover:bg-[#333] transition-colors">
                                        Checkout
                                    </button>
                                    <p className="text-center text-xs text-[#999] mt-4">
                                        Free shipping on orders over $500
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
