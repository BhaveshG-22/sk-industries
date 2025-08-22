"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white sticky top-0 z-40">

      {/* Top Section */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-28">
            {/* Empty left space */}
            <div className="flex-1"></div>
            
            {/* Centered Logo */}
            <div className="flex items-center justify-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="https://honesthome.in/cdn/shop/files/THHClogo_100x@2x.png?v=1730980282"
                  alt="The Honest Home Company"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                />
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-8 flex-1 justify-end">
              <Link href="/account" className="text-gray-600 hover:text-gray-900 transition-colors">
                Account
              </Link>
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link href="/track-order" className="text-gray-600 hover:text-gray-900 transition-colors">
                Track Order
              </Link>
              <Link href="/cart" className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span>(0)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Hidden when burger menu is active */}
      <div className="bg-amber-800 hidden xl:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center space-x-12 h-12">
            <Link href="/" className="text-white hover:text-amber-200 transition-colors font-medium">
              HOME
            </Link>
            <Link href="/categories" className="text-white hover:text-amber-200 transition-colors font-medium">
              CATEGORIES
            </Link>
            <Link href="/products" className="text-white hover:text-amber-200 transition-colors font-medium">
              PRODUCTS
            </Link>
            <Link href="/blogs" className="text-white hover:text-amber-200 transition-colors font-medium">
              BLOGS
            </Link>
            <Link href="/about" className="text-white hover:text-amber-200 transition-colors font-medium">
              ABOUT US
            </Link>
            <Link href="/founders-story" className="text-white hover:text-amber-200 transition-colors font-medium">
              FOUNDER&apos;S STORY
            </Link>
            <Link href="/contact" className="text-white hover:text-amber-200 transition-colors font-medium">
              CONTACT US
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}