
import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  type = 'button'
}) => {
  const variants = {
    primary: 'bg-[#D4FF00] text-black hover:bg-[#E5FF4D] shadow-[0_0_20px_rgba(212,255,0,0.2)]',
    secondary: 'bg-white text-black hover:bg-gray-200',
    outline: 'bg-transparent border border-white/10 text-white hover:border-[#D4FF00] hover:text-[#D4FF00]',
    ghost: 'bg-transparent text-gray-500 hover:text-white hover:bg-white/5'
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 uppercase tracking-widest text-[10px] ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;
