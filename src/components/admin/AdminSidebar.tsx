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
  Images,
  X
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

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function AdminSidebar({ isOpen = true, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  const handleLinkClick = () => {
    // Close mobile menu when link is clicked
    if (onClose) {
      onClose()
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#283618] text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header with close button for mobile */}
          <div className="flex items-center justify-between gap-2 px-6 py-4 border-b border-[#606C38]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#BC6C25] rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">GG</span>
              </div>
              <span className="font-bold text-lg">Admin Panel</span>
            </div>
            {/* Close button - only visible on mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-lg hover:bg-[#606C38] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
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
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 hover:bg-[#606C38] hover:text-white rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              Back to Site
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}