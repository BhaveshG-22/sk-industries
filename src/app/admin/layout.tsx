'use client'

import { useState, useEffect } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#BC6C25]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {isAuthenticated && <AdminSidebar />}
        <main className={`flex-1 p-8 min-h-screen ${isAuthenticated ? 'ml-64' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  )
}