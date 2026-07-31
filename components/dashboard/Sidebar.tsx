'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  GraduationCap,
  UserCheck,
  FileText,
  CreditCard,
  BarChart3,
  Bell,
  Globe,
  Settings,
  MessageSquare,
  FileCheck,
  ClipboardCheck,
  FolderOpen,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItem } from '@/lib/navigation';

interface SidebarProps {
  role?: string;
  isOpen?: boolean;
  onClose?: () => void;
  navigation?: NavItem[];
  activeItem?: string;
  onNavigate?: (href: string) => void;
  onCollapseChange?: (collapsed: boolean) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={20} />,
  Users: <Users size={20} />,
  BookOpen: <BookOpen size={20} />,
  Calendar: <Calendar size={20} />,
  GraduationCap: <GraduationCap size={20} />,
  UserCheck: <UserCheck size={20} />,
  FileText: <FileText size={20} />,
  CreditCard: <CreditCard size={20} />,
  BarChart3: <BarChart3 size={20} />,
  Bell: <Bell size={20} />,
  Globe: <Globe size={20} />,
  Settings: <Settings size={20} />,
  MessageSquare: <MessageSquare size={20} />,
  FileCheck: <FileCheck size={20} />,
  ClipboardCheck: <ClipboardCheck size={20} />,
  FolderOpen: <FolderOpen size={20} />,
  User: <User size={20} />,
};

export const Sidebar = ({ 
  role = 'admin',
  isOpen = false,
  onClose,
  navigation = [],
  activeItem = 'Dashboard',
  onNavigate,
  onCollapseChange
}: SidebarProps) => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const handleCollapseToggle = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
  };

  const toggleExpanded = (href: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(href)) {
      newExpanded.delete(href);
    } else {
      newExpanded.add(href);
    }
    setExpandedItems(newExpanded);
  };

  const handleNavigate = (href: string) => {
    router.push(href);
    onNavigate?.(href);
  };

  const isExpanded = isCollapsed && isHovered;

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: isExpanded ? 280 : isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => isCollapsed && setIsHovered(false)}
      className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50 flex flex-col lg:translate-x-0 -translate-x-full lg:block hidden"
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
        <AnimatePresence mode="wait">
          {(!isCollapsed || isExpanded) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl text-gray-900">AstroNovas</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={handleCollapseToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <ul className="space-y-1">
          {navigation?.map((item) => (
            <li key={item.href}>
              <div>
                <motion.button
                  onClick={() => item.children ? toggleExpanded(item.href) : handleNavigate(item.href)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                    'hover:bg-gray-50',
                    activeItem === item.title
                      ? 'bg-[#F5F3FF] text-[#7C3AED] font-medium'
                      : 'text-gray-600'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex-shrink-0">
                    {item.icon ? iconMap[item.icon] || <LayoutDashboard size={20} /> : <LayoutDashboard size={20} />}
                  </span>
                  <AnimatePresence mode="wait">
                    {(!isCollapsed || isExpanded) && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 text-left flex items-center justify-between"
                      >
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="bg-[#7C3AED] text-white text-xs px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        {item.children && (
                          <ChevronDown 
                            size={16} 
                            className={cn(
                              'transition-transform duration-200',
                              expandedItems.has(item.href) ? 'rotate-180' : ''
                            )}
                          />
                        )}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {activeItem === item.title && !isCollapsed && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 w-1 h-8 bg-[#7C3AED] rounded-r-full"
                      initial={false}
                    />
                  )}
                </motion.button>
                
                {/* Submenu */}
                {item.children && expandedItems.has(item.href) && (!isCollapsed || isExpanded) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-8 mt-1 space-y-1"
                  >
                    {item.children.map((child) => (
                      <motion.button
                        key={child.href}
                        onClick={() => handleNavigate(child.href)}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm',
                          'hover:bg-gray-50',
                          activeItem === child.title
                            ? 'bg-[#F5F3FF] text-[#7C3AED] font-medium'
                            : 'text-gray-600'
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{child.title}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="mt-auto p-4 border-t border-gray-100">
        <AnimatePresence mode="wait">
          {(!isCollapsed || isExpanded) ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">Kishan</p>
                <p className="text-xs text-gray-500 capitalize">{role}</p>
              </div>
              <LogOut size={18} className="text-gray-400 hover:text-gray-600" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-full flex items-center justify-center cursor-pointer">
                <User size={20} className="text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};
