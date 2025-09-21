import Link from 'next/link';
import { Home, ArrowLeft, Package, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--accent-cream)] via-white to-[var(--accent-cream)]/50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Number with Paper Cup Design */}
        <div className="relative mb-8">
          <div className="text-[12rem] md:text-[16rem] font-bold text-[var(--primary-light)]/20 leading-none select-none">
            404
          </div>
          {/* Decorative Paper Elements */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-32 bg-gradient-to-b from-[var(--primary-light)] to-[var(--primary-medium)] rounded-t-lg rounded-b-sm shadow-lg transform rotate-12 opacity-80"></div>
            <div className="absolute -top-2 -right-8 w-20 h-20 bg-[var(--accent-cream)] rounded-full shadow-md transform -rotate-12 opacity-90"></div>
            <div className="absolute -bottom-4 -left-6 w-16 h-6 bg-[var(--primary-medium)] rounded-full shadow-sm transform rotate-45 opacity-70"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary-dark)] mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Looks like this page got recycled! Don't worry, our eco-friendly navigation will help you find what you're looking for.
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-[var(--primary-light)]/20 shadow-lg">
            <Package className="w-12 h-12 text-[var(--primary-light)] mx-auto mb-3" />
            <p className="text-sm text-gray-500">
              The page you're looking for might have been moved, deleted, or never existed.
            </p>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="space-y-8">
          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-[var(--primary-light)] hover:bg-[var(--primary-dark)] text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Go Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-[var(--primary-light)] text-[var(--primary-light)] hover:bg-[var(--primary-light)] hover:text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300"
            >
              <Link href="javascript:history.back()" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </Link>
            </Button>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link
              href="/products"
              className="group bg-white hover:bg-[var(--accent-cream)] rounded-xl p-6 border border-gray-200 hover:border-[var(--primary-light)] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              <Package className="w-8 h-8 text-[var(--primary-light)] mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-semibold text-[var(--primary-dark)] mb-1">Products</h3>
              <p className="text-sm text-gray-500">Browse our eco-friendly range</p>
            </Link>

            <Link
              href="/about"
              className="group bg-white hover:bg-[var(--accent-cream)] rounded-xl p-6 border border-gray-200 hover:border-[var(--primary-light)] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              <div className="w-8 h-8 bg-[var(--primary-light)] rounded-full mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SK</span>
              </div>
              <h3 className="font-semibold text-[var(--primary-dark)] mb-1">About Us</h3>
              <p className="text-sm text-gray-500">Learn about SK Industries</p>
            </Link>

            <Link
              href="/contact"
              className="group bg-white hover:bg-[var(--accent-cream)] rounded-xl p-6 border border-gray-200 hover:border-[var(--primary-light)] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              <Phone className="w-8 h-8 text-[var(--primary-light)] mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-semibold text-[var(--primary-dark)] mb-1">Contact</h3>
              <p className="text-sm text-gray-500">Get in touch with us</p>
            </Link>

            <Link
              href="/blogs"
              className="group bg-white hover:bg-[var(--accent-cream)] rounded-xl p-6 border border-gray-200 hover:border-[var(--primary-light)] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              <Mail className="w-8 h-8 text-[var(--primary-light)] mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-semibold text-[var(--primary-dark)] mb-1">Blogs</h3>
              <p className="text-sm text-gray-500">Read our latest updates</p>
            </Link>
          </div>

          {/* Fun Eco Message */}
          <div className="mt-12 bg-gradient-to-r from-[var(--primary-light)]/10 to-[var(--primary-medium)]/10 rounded-2xl p-6 max-w-2xl mx-auto border border-[var(--primary-light)]/20">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🌱</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--primary-dark)]">Eco-Friendly Tip</h3>
            </div>
            <p className="text-sm text-gray-600">
              While you're here, remember that every small step towards sustainability counts!
              Choose eco-friendly paper products for your next event.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}