"use client";

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button className={`theme-toggle-btn ${theme}`} onClick={toggleTheme} aria-label="Toggle theme">
      <div className="theme-toggle-icon-wrapper">
        <Sun className="theme-icon sun-icon" size={18} />
        <Moon className="theme-icon moon-icon" size={18} />
      </div>
    </button>
  );
}
