import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseClass = 'intellify-btn';
  const variantClass = `intellify-btn--${variant}`;
  const widthClass = fullWidth ? 'intellify-btn--full-width' : '';
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${widthClass} ${className}`.trim()} 
      {...props}
    >
      {children}
    </button>
  );
};
