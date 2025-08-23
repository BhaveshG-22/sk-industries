"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ProductSearchBar } from "@/components/ProductSearchBar";
import { scrollToContact } from "@/lib/scroll";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-[#FEFAE0] sticky top-0 z-40">

      {/* Top Section */}
      <div className="border-b border-[#DDA15E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-28">
            {/* Left side - Burger Menu (mobile) + Brand */}
            <div className="flex-1 flex items-center">
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="xl:hidden p-2 text-[var(--dark-forest)] hover:text-[var(--burnt-orange)] transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-8 h-8" strokeWidth={2} />
                ) : (
                  <Menu className="w-8 h-8" strokeWidth={2} />
                )}
              </button>
              
              <span className="text-2xl font-bold tracking-wide font-arimo text-[#283618] ml-2">
                GAVALI GROUP
              </span>
            </div>
            
            {/* Centered Logo */}
            <div className="flex items-center justify-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/gavali-group-logo.png"
                  alt="Gavali Group"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                />
              </Link>
            </div>

            {/* Right Navigation - Hidden on screens where burger menu is visible */}
            <div className="xl:flex items-center space-x-8 flex-1 justify-end hidden">
              <ProductSearchBar 
                onProductSelect={(product) => {
                  console.log('Selected product:', product);
                }}
                placeholder="Search products..."
                className="w-[300px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Hidden when burger menu is active */}
      <div className="bg-[#BC6C25] hidden xl:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center space-x-12 h-12">
            <Link href="/" className="text-[#FEFAE0] hover:text-[#DDA15E] transition-colors font-medium">
              HOME
            </Link>
            <Link href="/categories" className="text-[#FEFAE0] hover:text-[#DDA15E] transition-colors font-medium">
              CATEGORIES
            </Link>
            <Link href="/products" className="text-[#FEFAE0] hover:text-[#DDA15E] transition-colors font-medium">
              PRODUCTS
            </Link>
            <Link href="/blogs" className="text-[#FEFAE0] hover:text-[#DDA15E] transition-colors font-medium">
              BLOGS
            </Link>
            <Link href="/about" className="text-[#FEFAE0] hover:text-[#DDA15E] transition-colors font-medium">
              ABOUT US
            </Link>
            <Link href="/founders-story" className="text-[#FEFAE0] hover:text-[#DDA15E] transition-colors font-medium">
              FOUNDER&apos;S STORY
            </Link>
            <button 
              onClick={scrollToContact} 
              className="text-[#FEFAE0] hover:text-[#DDA15E] transition-colors font-medium cursor-pointer"
            >
              CONTACT US
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[var(--dark-forest)]/75 z-50 xl:hidden"
            onClick={closeMobileMenu}
          />

          {/* Fullscreen drawer; content is an inner column */}
          <div className="fixed inset-0 bg-[var(--dark-forest)] z-50 xl:hidden">
            {/* Inner column that defines the grid for BOTH the X and links */}
            <div className="px-6 pt-6 max-w-xs w-full">
              {/* Close button aligned with this column */}
              <div className="flex justify-end">
                <button
                  onClick={closeMobileMenu}
                  className="text-[var(--cream-white)] hover:text-[var(--warm-tan)]"
                  aria-label="Close menu"
                >
                  <X className="w-7 h-7" strokeWidth={2.5} />
                </button>
              </div>

              {/* Main Navigation */}
              <nav className="mt-6 space-y-4">
                <Link href="/" onClick={closeMobileMenu}
                  className="block text-[var(--cream-white)] hover:text-[var(--warm-tan)] text-lg font-medium">
                  HOME
                </Link>
                <Link href="/categories" onClick={closeMobileMenu}
                  className="block text-[var(--cream-white)] hover:text-[var(--warm-tan)] text-lg font-medium">
                  CATEGORIES
                </Link>
                <Link href="/products" onClick={closeMobileMenu}
                  className="block text-[var(--cream-white)] hover:text-[var(--warm-tan)] text-lg font-medium">
                  PRODUCTS
                </Link>
                <Link href="/blogs" onClick={closeMobileMenu}
                  className="block text-[var(--cream-white)] hover:text-[var(--warm-tan)] text-lg font-medium">
                  BLOGS
                </Link>
                <Link href="/about" onClick={closeMobileMenu}
                  className="block text-[var(--cream-white)] hover:text-[var(--warm-tan)] text-lg font-medium">
                  ABOUT US
                </Link>
                <Link href="/founders-story" onClick={closeMobileMenu}
                  className="block text-[var(--cream-white)] hover:text-[var(--warm-tan)] text-lg font-medium">
                  FOUNDER&apos;S STORY
                </Link>
                <button 
                  onClick={() => { closeMobileMenu(); scrollToContact(); }}
                  className="block text-[var(--cream-white)] hover:text-[var(--warm-tan)] text-lg font-medium w-full text-left cursor-pointer"
                >
                  CONTACT US
                </button>
              </nav>

              <hr className="border-[var(--warm-tan)] my-8" />

              <div className="space-y-4">
                <ProductSearchBar 
                  onProductSelect={(product) => {
                    console.log('Selected product:', product);
                    closeMobileMenu();
                  }}
                  placeholder="Search products..."
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}