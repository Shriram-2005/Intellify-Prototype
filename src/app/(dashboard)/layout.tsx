import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Bell, LogOut } from 'lucide-react';
import Lanyard from '@/components/Lanyard';
import BorderGlow from '@/components/BorderGlow';
import ThemeToggle from '@/components/ThemeToggle';
import './dashboard.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="intellify-dashboard-layout">
      <Sidebar />
      <div className="intellify-dashboard-main">
        {/* Glowing Pill Header Bar */}
        <header className="intellify-top-header dashboard-pill-header">
          <div className="dashboard-pill-left">
            <BorderGlow
              edgeSensitivity={30}
              glowColor="0 80% 50%"
              backgroundColor="var(--background)"
              borderRadius={999}
              glowRadius={30}
              glowIntensity={1}
              coneSpread={25}
              animated={true}
              colors={['#E74C3C', '#C0392B', '#ff6b5b']}
            >
              <div style={{ padding: '14px 28px', backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                <Link href="/" className="dashboard-logo-link" style={{ fontSize: '20px', fontWeight: '700', color: 'var(--pure-black)', textDecoration: 'none', lineHeight: 1 }}>
                  Intellify IELTS<span style={{ color: '#E74C3C' }}>.</span>
                </Link>
              </div>
            </BorderGlow>
          </div>

          <div className="dashboard-pill-right" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <BorderGlow
              edgeSensitivity={30}
              glowColor="0 80% 50%"
              backgroundColor="var(--background)"
              borderRadius={999}
              glowRadius={30}
              glowIntensity={1}
              coneSpread={25}
              animated={true}
              colors={['#E74C3C', '#C0392B', '#ff6b5b']}
            >
              <div className="dashboard-profile-pill">
                <span className="profile-email" style={{ color: 'var(--pure-black)' }}>student@intellify.com</span>
                <div className="profile-avatar">SJ</div>
                <span className="profile-plan-badge">Pro+</span>
              </div>
            </BorderGlow>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <BorderGlow
                edgeSensitivity={30}
                glowColor="0 80% 50%"
                backgroundColor="var(--background)"
                borderRadius={999}
                glowRadius={30}
                glowIntensity={1}
                coneSpread={25}
                animated={true}
                colors={['#E74C3C', '#C0392B', '#ff6b5b']}
              >
                <ThemeToggle />
              </BorderGlow>

              <BorderGlow
                edgeSensitivity={30}
                glowColor="0 80% 50%"
                backgroundColor="var(--background)"
                borderRadius={999}
                glowRadius={30}
                glowIntensity={1}
                coneSpread={25}
                animated={true}
                colors={['#E74C3C', '#C0392B', '#ff6b5b']}
              >
                <Link href="/" className="dashboard-logout-btn" style={{ textDecoration: 'none', color: 'var(--pure-black)' }}>
                  <LogOut size={18} />
                  <span>Logout</span>
                </Link>
              </BorderGlow>
            </div>
          </div>
        </header>
        <div className="intellify-dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
}
