"use client"

import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { navigationConfig } from '@/lib/navigation'
import { UserRole } from '@/lib/permissions'

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  breadcrumb?: string[]
  activeItem?: string
  role?: UserRole
}

export default function DashboardLayout({ 
  children, 
  title = 'Dashboard',
  breadcrumb = ['Dashboard', 'Overview'],
  activeItem = 'Overview',
  role = 'admin'
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navItems = navigationConfig[role] || navigationConfig.admin

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop: Fixed, Mobile: Slide-in */}
      <div className={`fixed left-0 top-0 h-full z-50 transition-transform duration-300 lg:translate-x-0 lg:block ${sidebarOpen ? 'translate-x-0 block' : '-translate-x-full hidden'}`}>
        <Sidebar
          activeItem={activeItem}
          role={role}
          navigation={navItems}
          onCollapseChange={(collapsed) => setIsCollapsed(collapsed)}
        />
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${isCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[280px]'}`}>
        {/* Navbar */}
        <Navbar 
          title={title} 
          breadcrumb={breadcrumb}
          role={role}
          sidebarCollapsed={isCollapsed}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Page content */}
        <main className="pt-24 p-4 max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
