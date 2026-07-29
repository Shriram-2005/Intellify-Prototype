"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, BookOpen, PenTool, Video, CheckSquare, Target, BarChart2, User, ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';
import BorderGlow from './BorderGlow';
import AnimatedList from './AnimatedList';
import './Sidebar.css';

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const pathname = usePathname();

  const [greeting, setGreeting] = useState('Welcome!');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning!');
    else if (hour < 17) setGreeting('Good Afternoon!');
    else setGreeting('Good Evening!');
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setIsPracticeOpen(false);
    }
  };

  const isActive = (path: string) => pathname === path;

  const renderLink = (href: string, icon: React.ReactNode, label: string) => {
    const active = isActive(href);
    return (
      <Link href={href} className={`intellify-sidebar-link ${active ? 'intellify-sidebar-link--active' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        <span className="sidebar-icon">{icon}</span>
        {!isCollapsed && <span className="sidebar-label">{label}</span>}
      </Link>
    );
  };

  const navItems = [
    renderLink('/dashboard', <Home size={20} />, 'Dashboard'),
    renderLink('/modules', <BookOpen size={20} />, 'Modules'),
    
    // Sub-menu for Practice
    <div key="practice-group" className={`intellify-sidebar-group ${isCollapsed ? 'collapsed' : ''}`}>
      <button 
        className="intellify-sidebar-group-btn" 
        onClick={() => !isCollapsed && setIsPracticeOpen(!isPracticeOpen)}
      >
        <div className="group-btn-left">
          <span className="sidebar-icon"><PenTool size={20} /></span>
          {!isCollapsed && <span className="sidebar-label">Practice</span>}
        </div>
        {!isCollapsed && (
          <ChevronDown size={16} className={`chevron-icon ${isPracticeOpen ? 'open' : ''}`} />
        )}
      </button>
      
      {!isCollapsed && isPracticeOpen && (
        <div className="intellify-sidebar-sublinks">
          <Link href="/practice/listening" className={`intellify-sidebar-sublink ${isActive('/practice/listening') ? 'active' : ''}`}>Listening</Link>
          <Link href="/practice/reading" className={`intellify-sidebar-sublink ${isActive('/practice/reading') ? 'active' : ''}`}>Reading</Link>
          <Link href="/practice/writing" className={`intellify-sidebar-sublink ${isActive('/practice/writing') ? 'active' : ''}`}>Writing</Link>
          <Link href="/practice/speaking" className={`intellify-sidebar-sublink ${isActive('/practice/speaking') ? 'active' : ''}`}>Speaking</Link>
        </div>
      )}
    </div>,

    renderLink('/faq', <HelpCircle size={20} />, 'FAQ'),

    renderLink('/mock-exam', <Target size={20} />, 'Mock Exams'),
    renderLink('/results/history', <BarChart2 size={20} />, 'My Results'),
    renderLink('/dashboard/progress', <BarChart2 size={20} />, 'Progress'),
    renderLink('/dashboard/profile', <User size={20} />, 'Profile')
  ];

  return (
    <aside className={`intellify-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="intellify-sidebar-header" style={{ height: '86px', minHeight: '86px' }}>
        <button className="hamburger-btn" onClick={toggleSidebar}>
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
        {!isCollapsed && (
          <span className="sidebar-greeting">{greeting}</span>
        )}
      </div>

      <nav className="intellify-sidebar-nav">
        <AnimatedList items={navItems} displayScrollbar={false} />
      </nav>
    </aside>
  );
};
