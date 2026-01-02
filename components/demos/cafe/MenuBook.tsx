'use client';

import React from 'react';

const menuItems = [
    { name: "Espresso", price: "4.00", desc: "Double shot, extrait 28s" },
    { name: "Cortado", price: "4.50", desc: "Espresso, parts égales de lait vapeur" },
    { name: "Flat White", price: "5.00", desc: "Espresso, micromousse de velours" },
    { name: "Pour Over", price: "6.00", desc: "Infusé main origine unique" },
    { name: "Cold Brew", price: "5.50", desc: "Infusé 24h, goutte à goutte kyoto" },
    { name: "Matcha Latte", price: "6.00", desc: "Grade cérémoniel, fouetté au bambou" }
];

export function MenuBook() {
    return (
        <section className="py-32 bg-[#1A1714] text-[#E6DCCA] relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-20">
                    <span className="text-xs font-sans tracking-[0.3em] text-[#C8AA6E] uppercase block mb-4">
                        Le Registre
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif">Extractions Choisies</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
                    {menuItems.map((item, i) => (
                        <div key={i} className="group flex justify-between items-baseline border-b border-white/5 pb-4 hover:border-[#C8AA6E]/30 transition-colors">
                            <div>
                                <h4 className="text-xl font-serif mb-1 group-hover:text-[#C8AA6E] transition-colors">{item.name}</h4>
                                <p className="text-xs font-sans text-white/40">{item.desc}</p>
                            </div>
                            <span className="font-sans text-sm text-[#C8AA6E]">{item.price}</span>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-20">
                    <button className="px-10 py-4 border border-[#C8AA6E] text-[#C8AA6E] text-xs uppercase font-bold tracking-[0.2em] hover:bg-[#C8AA6E] hover:text-black transition-colors duration-500">
                        Télécharger le Menu Complet
                    </button>
                </div>
            </div>
        </section>
    );
}
