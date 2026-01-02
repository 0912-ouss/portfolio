"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Design", href: "/design" },
  { name: "Projets Web", href: "/projects" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 md:py-8 md:px-16 transition-colors duration-300 bg-white/90 backdrop-blur-md text-black border-b border-transparent">

      {/* Logo Area */}
      <div className="flex-shrink-0 w-auto md:w-[200px]">
        <Link href="/" className="group flex items-start gap-1">
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[10px] text-orange-500 font-bold -mb-1 ml-0.5 md:ml-1">OU</span>
            <span className="text-2xl md:text-4xl font-black tracking-tighter leading-none">
              Berhayla<span className="text-pink-500">.</span>
            </span>
          </div>
        </Link>
      </div>

      {/* Center Nav - Absolutely centered if possible, or flex-1 justify-center */}
      <div className="hidden md:flex flex-1 justify-end mr-20 gap-12">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-base font-normal tracking-tight text-gray-800 hover:text-black transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Right Actions */}
      <div className="hidden md:flex items-center gap-10 flex-shrink-0">
        <div className="flex gap-3 text-sm font-semibold tracking-wide text-gray-500">
          <span className="text-black border-b-2 border-black pb-0.5 pointer-events-none">FR</span>
          <span className="hover:text-black cursor-pointer transition-colors">EN</span>
        </div>
        <a
          href="mailto:hello@berhayla.com"
          className="bg-black text-white px-8 py-4 text-sm font-bold hover:bg-gray-800 transition-all rounded-[1px]"
        >
          hello@berhayla.com
        </a>
      </div>

      {/* Mobile Menu Placeholder */}
      <div className="md:hidden">
        <span className="text-sm font-bold uppercase">Menu</span>
      </div>
    </nav>
  );
}
