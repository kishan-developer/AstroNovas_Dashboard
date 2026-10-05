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
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, disabled, type = 'button', title, onClick }, ref) => {
    const baseStyles = 'font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 w-fit flex items-center justify-center focus:ring-offset-2';
    
    const variants = {
      primary: 'bg-purple-700 text-white hover:bg-purple-800 shadow-sm',
      secondary: 'bg-gray-100 text-black hover:bg-gray-200 border border-gray-300',
      outline: 'border border-purple-700 text-purple-700 hover:bg-purple-50',
      ghost: 'text-black hover:bg-purple-50',
      success: 'bg-purple-800 text-white hover:bg-black shadow-sm',
      danger: 'bg-black text-white hover:bg-gray-900 shadow-sm',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-4 py-2 text-base',
    };
    
    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed ', className)}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        disabled={disabled}
        type={type}
        title={title}
        onClick={onClick}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export default Button;
