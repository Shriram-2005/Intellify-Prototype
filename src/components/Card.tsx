import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverable = false }) => {
  return (
    <div 
      className={`intellify-card ${hoverable ? 'intellify-card--hoverable' : ''} ${className}`.trim()}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
