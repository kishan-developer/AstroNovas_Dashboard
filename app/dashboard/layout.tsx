"use client"

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { Navbar } from '@/components/dashboard/Navbar'
import { navigationConfig } from '@/lib/navigation'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  const getTitle = () => {
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length === 1) return 'Dashboard'
    return segments[segments.length - 1]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Determine role from pathname
  const getRole = () => {
    const segments = pathname.split('/').filter(Boolean)
    if (segments[1] === 'admin') return 'admin'
    if (segments[1] === 'manager') return 'manager'
    if (segments[1] === 'mentor') return 'mentor'
    if (segments[1] === 'student') return 'student'
    return 'admin' // default
  }

  const role = getRole()

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        role={role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navigation={navigationConfig[role as keyof typeof navigationConfig]}
        onCollapseChange={setSidebarCollapsed}
      />

      {/* Main content */}
      <div 
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Header */}
        <Navbar
          role={role}
          title={getTitle()}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Page content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
