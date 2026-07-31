import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, disabled, type = 'button', onClick }, ref) => {
    const baseStyles = 'font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 w-fit  flex items-center justify-center focus:ring-offset-2';
    
    const variants = {
      primary: 'bg-[#7C3AED] text-white hover:bg-[#6D28D9] shadow-md hover:shadow-lg',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm',
      outline: 'border-2 border-[#7C3AED] text-[#7C3AED] hover:bg-[#F5F3FF]',
      ghost: 'text-gray-700 hover:bg-gray-100',
      success: 'bg-[#10B981] text-white hover:bg-[#059669] shadow-md',
      danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-md',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };
    
    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed ', className)}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
