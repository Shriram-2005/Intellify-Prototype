import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Bell, LogOut } from 'lucide-react';
import Lanyard from '@/components/Lanyard';
import BorderGlow from '@/components/BorderGlow';
import ThemeToggle from '@/components/ThemeToggle';
import { createClient } from '@/utils/supabase/server';
import { signout } from '@/app/(marketing)/auth/actions';
import './dashboard.css';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const email = user?.email || 'student@intellify.com';
  const initial = email.charAt(0).toUpperCase();

  // Fetch the user's profile to get their exam track
  let targetExam = 'Academic';
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('target_exam')
      .eq('id', user.id)
      .single();
    if (profile?.target_exam) {
      targetExam = profile.target_exam;
    }
  }

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
                <span className="profile-plan-badge" style={{ background: 'var(--light-gray)', color: 'var(--mid-gray)', marginRight: '8px', fontSize: '11px' }}>
                  {targetExam}
                </span>
                <span className="profile-email" style={{ color: 'var(--pure-black)' }}>{email}</span>
                <Link href="/dashboard/profile" style={{ textDecoration: 'none' }}>
                  <div className="profile-avatar" style={{ cursor: 'pointer' }}>{initial}</div>
                </Link>
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
              <form action={signout} className="dashboard-logout-btn" style={{ padding: '0' }}>
                <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'transparent', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', padding: '10px 20px', width: '100%', borderRadius: '999px' }}>
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </form>
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
