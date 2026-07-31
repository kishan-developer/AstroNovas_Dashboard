"use client"

import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
  breadcrumb?: string[]
  activeItem?: string
}

export default function DashboardLayout({ 
  children, 
  title = 'Dashboard',
  breadcrumb = ['Dashboard', 'Overview'],
  activeItem = 'Overview'
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
        <Sidebar activeItem={activeItem} />
      </div>

      {/* Main content */}
      <div className="lg:ml-[280px] transition-all duration-300">
        {/* Navbar */}
        <Navbar 
          title={title} 
          breadcrumb={breadcrumb}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Page content */}
        <main className="pt-24 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
