"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, BookOpen, PenTool, Video, CheckSquare, Target, BarChart2, TrendingUp, User, ChevronDown, ChevronRight, HelpCircle, FileText, BookMarked } from 'lucide-react';
import BorderGlow from './BorderGlow';
import AnimatedList from './AnimatedList';
import './Sidebar.css';

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPracticeOpen, setIsPracticeOpen] = useState(false);
  const [openPracticeModule, setOpenPracticeModule] = useState<string | null>(null);
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
          
          {/* Listening */}
          <div className="sidebar-module-group">
            <button 
              className={`sidebar-module-btn ${pathname.includes('/practice/listening') || openPracticeModule === 'listening' ? 'active' : ''}`}
              onClick={() => setOpenPracticeModule(openPracticeModule === 'listening' ? null : 'listening')}
            >
              Listening
              <ChevronDown size={14} className={`chevron-icon ${openPracticeModule === 'listening' ? 'open' : ''}`} />
            </button>
            {openPracticeModule === 'listening' && (
              <div className="intellify-sidebar-nested-links">
                <Link href="/practice/listening/part-1" className={`intellify-sidebar-nested-link ${isActive('/practice/listening/part-1') ? 'active' : ''}`}>Part 1</Link>
                <Link href="/practice/listening/part-2" className={`intellify-sidebar-nested-link ${isActive('/practice/listening/part-2') ? 'active' : ''}`}>Part 2</Link>
                <Link href="/practice/listening/part-3" className={`intellify-sidebar-nested-link ${isActive('/practice/listening/part-3') ? 'active' : ''}`}>Part 3</Link>
                <Link href="/practice/listening/part-4" className={`intellify-sidebar-nested-link ${isActive('/practice/listening/part-4') ? 'active' : ''}`}>Part 4</Link>
              </div>
            )}
          </div>

          {/* Reading */}
          <div className="sidebar-module-group">
            <button 
              className={`sidebar-module-btn ${pathname.includes('/practice/reading') || openPracticeModule === 'reading' ? 'active' : ''}`}
              onClick={() => setOpenPracticeModule(openPracticeModule === 'reading' ? null : 'reading')}
            >
              Reading
              <ChevronDown size={14} className={`chevron-icon ${openPracticeModule === 'reading' ? 'open' : ''}`} />
            </button>
            {openPracticeModule === 'reading' && (
              <div className="intellify-sidebar-nested-links">
                <Link href="/practice/reading/passage-1" className={`intellify-sidebar-nested-link ${isActive('/practice/reading/passage-1') ? 'active' : ''}`}>Passage 1</Link>
                <Link href="/practice/reading/passage-2" className={`intellify-sidebar-nested-link ${isActive('/practice/reading/passage-2') ? 'active' : ''}`}>Passage 2</Link>
                <Link href="/practice/reading/passage-3" className={`intellify-sidebar-nested-link ${isActive('/practice/reading/passage-3') ? 'active' : ''}`}>Passage 3</Link>
              </div>
            )}
          </div>

          {/* Writing */}
          <div className="sidebar-module-group">
            <button 
              className={`sidebar-module-btn ${pathname.includes('/practice/writing') || openPracticeModule === 'writing' ? 'active' : ''}`}
              onClick={() => setOpenPracticeModule(openPracticeModule === 'writing' ? null : 'writing')}
            >
              Writing
              <ChevronDown size={14} className={`chevron-icon ${openPracticeModule === 'writing' ? 'open' : ''}`} />
            </button>
            {openPracticeModule === 'writing' && (
              <div className="intellify-sidebar-nested-links">
                <Link href="/practice/writing/task-1" className={`intellify-sidebar-nested-link ${isActive('/practice/writing/task-1') ? 'active' : ''}`}>Task 1</Link>
                <Link href="/practice/writing/task-2" className={`intellify-sidebar-nested-link ${isActive('/practice/writing/task-2') ? 'active' : ''}`}>Task 2</Link>
              </div>
            )}
          </div>

          {/* Speaking */}
          <div className="sidebar-module-group">
            <button 
              className={`sidebar-module-btn ${pathname.includes('/practice/speaking') || openPracticeModule === 'speaking' ? 'active' : ''}`}
              onClick={() => setOpenPracticeModule(openPracticeModule === 'speaking' ? null : 'speaking')}
            >
              Speaking
              <ChevronDown size={14} className={`chevron-icon ${openPracticeModule === 'speaking' ? 'open' : ''}`} />
            </button>
            {openPracticeModule === 'speaking' && (
              <div className="intellify-sidebar-nested-links">
                <Link href="/practice/speaking/part-1" className={`intellify-sidebar-nested-link ${isActive('/practice/speaking/part-1') ? 'active' : ''}`}>Part 1</Link>
                <Link href="/practice/speaking/part-2" className={`intellify-sidebar-nested-link ${isActive('/practice/speaking/part-2') ? 'active' : ''}`}>Part 2</Link>
                <Link href="/practice/speaking/part-3" className={`intellify-sidebar-nested-link ${isActive('/practice/speaking/part-3') ? 'active' : ''}`}>Part 3</Link>
              </div>
            )}
          </div>

        </div>
      )}
    </div>,

    renderLink('/dashboard/resources', <BookMarked size={20} />, 'Resources & Tips'),
    renderLink('/faq', <HelpCircle size={20} />, 'FAQ'),

    renderLink('/mock-exam', <Target size={20} />, 'Mock Exams'),
    renderLink('/results/history', <BarChart2 size={20} />, 'My Results'),
    renderLink('/dashboard/progress', <TrendingUp size={20} />, 'Progress'),
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
