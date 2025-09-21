'use client'

import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem('admin_auth')
      setIsAuthenticated(authToken === 'authenticated')
      setIsLoading(false)
    }

    checkAuth()

    // Listen for authentication changes
    const handleStorageChange = () => checkAuth()
    window.addEventListener('storage', handleStorageChange)

    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-medium)]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && (
        <>
          {/* Mobile header */}
          <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--primary-medium)] rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">SK</span>
              </div>
              <span className="font-bold text-lg text-gray-800">Admin Panel</span>
            </div>
            <div className="w-10"></div> {/* Spacer for centering */}
          </header>

          {/* Sidebar */}
          <AdminSidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
        </>
      )}
      
      <main className={`min-h-screen transition-all duration-300 ${
        isAuthenticated 
          ? 'lg:ml-64 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8' 
          : 'p-8'
      }`}>
        {children}
      </main>
    </div>
  )
}