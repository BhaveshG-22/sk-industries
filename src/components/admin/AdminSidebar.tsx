"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Megaphone, 
  Package, 
  FolderOpen, 
  Settings, 
  FileText, 
  Mail,
  Home,
  Images
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Hero Carousel', href: '/admin/hero-carousel', icon: Images },
  { name: 'Announcements', href: '/admin/announcements', icon: Megaphone },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: FolderOpen },
  { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { name: 'Contact Forms', href: '/admin/contacts', icon: Mail },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-[#283618] text-white">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-[#606C38]">
          <div className="w-8 h-8 bg-[#BC6C25] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">GG</span>
          </div>
          <span className="font-bold text-lg">Admin Panel</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#BC6C25] text-white'
                    : 'text-gray-300 hover:bg-[#606C38] hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Back to Site */}
        <div className="p-4 border-t border-[#606C38]">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-[#606C38] hover:text-white rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Site
          </Link>
        </div>
      </div>
    </div>
  )
}