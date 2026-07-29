"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import '../auth.css';

export default function Signup() {
  const router = useRouter();

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate signup and redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-split-left">
        <div className="auth-split-left-content">
          <h1>Join <span>Intellify.</span></h1>
          <p>Create your free account today and start achieving your target band score with professional AI evaluation.</p>
        </div>
      </div>

      <div className="auth-split-right">
        <div className="auth-card-glow-wrapper signup-wrapper">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="0 80% 50%"
            backgroundColor="var(--background)"
            borderRadius={24}
            glowRadius={40}
            glowIntensity={1}
            coneSpread={25}
            animated={true}
            colors={['#E74C3C', '#C0392B', '#ff6b5b']}
          >
            <div className="auth-card">
              <div className="auth-header">
                <h2>Create Account</h2>
              </div>
              
              <form className="auth-form" onSubmit={handleSignup}>
                <div className="auth-form-grid">
                  <div className="auth-form-col">
                    <Input label="Full Name" type="text" placeholder="John Doe" required />
                    <Input label="Email Address" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="auth-form-col">
                    <Input label="Password" type="password" placeholder="••••••••" required />
                    <Input label="Confirm Password" type="password" placeholder="••••••••" required />
                  </div>
                </div>
                
                <div className="terms-checkbox" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '13px', color: '#aaa' }}>
                  <input type="checkbox" id="terms" required style={{ accentColor: '#E74C3C', width: '16px', height: '16px' }} />
                  <label htmlFor="terms">I agree to the Terms of Service and Privacy Policy</label>
                </div>

                <Button type="submit" variant="primary" fullWidth className="auth-submit-btn">Create Account</Button>
              </form>

              <div className="auth-divider">
                <span>OR</span>
              </div>

              <Button type="button" variant="secondary" fullWidth className="google-btn" onClick={() => router.push('/dashboard')}>
                Continue with Google
              </Button>

              <div className="auth-footer">
                Already have an account? <Link href="/auth/login">Sign in</Link>
              </div>
            </div>
          </BorderGlow>
        </div>
      </div>
    </div>
  );
}
