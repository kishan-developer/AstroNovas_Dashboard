'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TabsProps {
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
}

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabProps {
  value: string;
  label: string;
  disabled?: boolean;
}

interface TabPanelProps {
  value: string;
  children: React.ReactNode;
}

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({
  activeTab: '',
  setActiveTab: () => {},
});

export const Tabs = ({ defaultValue = '', children, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList = ({ children, className }: TabListProps) => {
  const { activeTab } = React.useContext(TabsContext);

  return (
    <div className={cn('flex border-b border-gray-200 mb-6', className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isActive: (child.props as TabProps).value === activeTab,
          });
        }
        return child;
      })}
    </div>
  );
};

export const Tab = ({ value, label, disabled, isActive }: TabProps & { isActive?: boolean }) => {
  const { setActiveTab } = React.useContext(TabsContext);

  return (
    <button
      onClick={() => !disabled && setActiveTab(value)}
      disabled={disabled}
      className={cn(
        'px-6 py-3 text-sm font-medium transition-colors relative',
        'focus:outline-none',
        isActive
          ? 'text-[#7C3AED]'
          : 'text-gray-500 hover:text-gray-700',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C3AED]"
          initial={false}
        />
      )}
    </button>
  );
};

export const TabPanel = ({ value, children }: TabPanelProps) => {
  const { activeTab } = React.useContext(TabsContext);

  if (activeTab !== value) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
