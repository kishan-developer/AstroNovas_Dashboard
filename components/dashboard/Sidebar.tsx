'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
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
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Auto-expand menus that contain the active pathname
    const newExpanded = new Set<string>();
    navigation.forEach(item => {
      if (item.children?.some(child => pathname === child.href || pathname.startsWith(child.href))) {
        newExpanded.add(item.href);
      }
    });
    setExpandedItems(prev => new Set([...Array.from(prev), ...Array.from(newExpanded)]));
  }, [pathname, navigation]);

  const handleCollapseToggle = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
  };

  // Dynamically resolve student ID from current route (e.g. /student/STU-1001/dashboard -> STU-1001)
  const studentMatch = pathname.match(/^\/student\/([^\/]+)/);
  const activeStudentId = studentMatch ? studentMatch[1] : '1';

  const getResolvedHref = (href: string) => {
    if (href.startsWith('/student/1/')) {
      return href.replace('/student/1/', `/student/${activeStudentId}/`);
    }
    return href;
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

  const isExpanded = isCollapsed && isHovered;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50 flex flex-col lg:translate-x-0 -translate-x-full lg:block hidden transition-all duration-300',
        isExpanded ? 'w-[280px]' : isCollapsed ? 'w-[80px]' : 'w-[280px]'
      )}
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => isCollapsed && setIsHovered(false)}
    >
      {/* Logo Section */}
      <div className={cn(
        "h-20 flex items-center border-b border-gray-100",
        (!isCollapsed || isExpanded) ? "justify-between px-5" : "justify-center px-2"
      )}>
        {(!isCollapsed || isExpanded) && (
          <div className="flex items-center gap-0 min-w-0">
            <img src="/main_logo.png" alt="AstroNovas logo" className="w-22 p-0 m-0 h-19 shrink-0" />
            <div className="flex flex-col leading-tight min-w-0">
              
              <span className="text-[15px] font-bold text-gray-900 truncate">AstrroNovas</span>
              <span className="text-[10px] font-medium text-gray-500 truncate">School of Mmystiics</span>
            </div>
          </div>
        )}

        <button
          onClick={handleCollapseToggle}
          className="p-2 rounded-md hover:bg-purple-50 transition-colors text-black"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <ul className="space-y-1">
          {navigation?.map((item) => {
            const resolvedItemHref = getResolvedHref(item.href); 
            const isItemActive = activeItem === item.title || pathname === resolvedItemHref || (resolvedItemHref !== '/admin' && pathname.startsWith(resolvedItemHref));

            return (
              <li key={item.href}>
                <div>
                  {item.children ? (
                    <button
                      onClick={() => toggleExpanded(item.href)}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 text-left',
                        'hover:bg-purple-50',
                        isItemActive
                          ? 'bg-purple-50 text-purple-700 font-semibold'
                          : 'text-gray-700'
                      )}
                    >
                      <span className="flex-shrink-0">
                        {item.icon ? iconMap[item.icon] || <LayoutDashboard size={20} /> : <LayoutDashboard size={20} />}
                      </span>
                      {(!isCollapsed || isExpanded) && (
                        <span className="flex-1 flex items-center justify-between font-semibold text-sm">
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-md">
                              {item.badge}
                            </span>
                          )}
                          <ChevronDown
                            size={16}
                            className={cn(
                              'transition-transform duration-200',
                              expandedItems.has(item.href) ? 'rotate-180' : ''
                            )}
                          />
                        </span>
                      )}
                    </button>
                  ) : (
                    <Link
                      href={resolvedItemHref}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 relative',
                        'hover:bg-purple-50',
                        isItemActive
                          ? 'bg-purple-50 text-purple-700 font-semibold'
                          : 'text-gray-700'
                      )}
                    >
                      <span className="flex-shrink-0">
                        {item.icon ? iconMap[item.icon] || <LayoutDashboard size={20} /> : <LayoutDashboard size={20} />}
                      </span>
                      {(!isCollapsed || isExpanded) && (
                        <span className="flex-1 flex items-center justify-between font-semibold text-sm">
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-md">
                              {item.badge}
                            </span>
                          )}
                        </span>
                      )}
                      {isItemActive && !isCollapsed && (
                        <div className="absolute left-0 w-1 h-8 bg-purple-700 rounded-r-md" />
                      )}
                    </Link>
                  )}

                  {/* Submenu */}
                  {item.children && expandedItems.has(item.href) && (!isCollapsed || isExpanded) && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => {
                        const resolvedChildHref = getResolvedHref(child.href);
                        const isChildActive = activeItem === child.title || pathname === resolvedChildHref;
                        return (
                          <Link
                            key={child.href}
                            href={resolvedChildHref}
                            className={cn(
                              'w-full flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 text-sm font-semibold block',
                              'hover:bg-purple-50',
                              isChildActive
                                ? 'bg-purple-50 text-purple-700 font-semibold'
                                : 'text-gray-700'
                            )}
                          >
                            <span>{child.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
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
    </aside>
  );
};
