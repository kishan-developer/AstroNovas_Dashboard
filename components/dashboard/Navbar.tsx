'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  Moon, 
  Sun, 
  Globe,
  User,
  ChevronDown,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  title?: string;
  breadcrumb?: string[];
  onMenuClick?: () => void;
  role?: string;
  sidebarCollapsed?: boolean;
}

export const Navbar = ({ 
  title = 'Dashboard', 
  breadcrumb = ['Dashboard', 'Overview'],
  onMenuClick,
  role = 'admin',
  sidebarCollapsed = false
}: NavbarProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 right-0 left-0 h-20 bg-white border-b border-gray-200 z-40 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}
    >
      <div className="h-full flex items-center justify-between px-6">
        {/* Left Section - Breadcrumb & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={24} />
          </button>
          
          {/* <div>
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              {breadcrumb.map((item, index) => (
                <React.Fragment key={item}>
                  <span className={cn(
                    'hover:text-[#7C3AED] cursor-pointer transition-colors',
                    index === breadcrumb.length - 1 && 'text-gray-900 font-medium'
                  )}>
                    {item}
                  </span>
                  {index < breadcrumb.length - 1 && (
                    <span className="text-gray-300">/</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
            <h1 className="text-2xl font-bold text-gray-900">{title}..</h1>
          </div> */}
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search 
              size={20} 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button> */}

          {/* Language Selector */}
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Globe size={20} />
            <span className="text-sm font-medium">EN</span>
          </motion.button> */}
 
          {/* Messages */}
          <div className="relative">
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMessages(!showMessages)}
              className="p-3 rounded-xl hover:bg-gray-100 transition-colors relative"
            >
              <MessageSquare size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#7C3AED] rounded-full" />
            </motion.button>
             */}
            <AnimatePresence>
              {showMessages && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-14 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50"
                >
                  <h3 className="font-semibold text-gray-900 mb-3">Messages</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center flex-shrink-0">
                          <User size={16} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 truncate">User {i}</p>
                          <p className="text-xs text-gray-500 truncate">New message from user {i}...</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-3 rounded-xl hover:bg-gray-100 transition-colors relative"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </motion.button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-14 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50"
                >
                  <h3 className="font-semibold text-gray-900 mb-3">Notifications</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="w-2 h-2 bg-[#7C3AED] rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900">Notification {i}</p>
                          <p className="text-xs text-gray-500">2 minutes ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </motion.button>
            
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-14 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50"
                >
                  <div className="p-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-900">Kishan Kumar Ray</p>
                    <p className="text-sm text-gray-500">kishan@example.com</p>
                  </div>
                  <div className="py-2">
                    {['Profile', 'Settings', 'Billing'].map((item) => (
                      <button
                        key={item}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
