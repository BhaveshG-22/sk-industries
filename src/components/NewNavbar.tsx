'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

export default function NewNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'HOME', href: '/' },
    { name: 'CATEGORIES', href: '/categories' },
    { name: 'PRODUCTS', href: '/products' },
    { name: 'BLOGS', href: '/blogs' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'CONTACT US', href: '/contact' },
  ];

  return (
    <nav className="bg-gradient-to-r from-[var(--primary-dark)] via-[var(--primary-medium)] to-[var(--primary-light)] shadow-xl sticky top-0 z-50 border-b-2 border-[var(--accent-cream)]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="bg-gradient-to-r from-[var(--accent-cream)] to-yellow-100 px-4 py-2 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                <span className="text-xl font-bold bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-medium)] bg-clip-text text-transparent">
                  SK GROUP
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group px-3 py-2 text-[var(--accent-cream)] hover:text-white font-medium text-sm tracking-wide transition-colors duration-300"
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Running underline effect */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--accent-cream)] to-white transition-all duration-500 ease-out group-hover:w-full"></div>
                  
                  {/* Additional glow effect */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white shadow-lg shadow-white/50 transition-all duration-500 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[var(--accent-cream)] hover:text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-2 bg-gradient-to-b from-[var(--primary-medium)] to-[var(--primary-light)] border-t border-[var(--accent-cream)]/20 backdrop-blur-sm">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between text-[var(--accent-cream)] hover:text-white hover:bg-white/10 block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{item.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}