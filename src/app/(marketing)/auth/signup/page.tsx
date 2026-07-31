"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { signup } from '../actions';
import { AlertCircle } from 'lucide-react';
import '../auth.css';

export default function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

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

              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FEF2F2', color: '#DC2626', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', fontWeight: 500 }}>
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}
              
              <form className="auth-form" autoComplete="off" action={signup}>
                <div className="auth-form-grid">
                  <div className="auth-form-col">
                    <Input id="name" name="name" label="Full Name" type="text" placeholder="John Doe" autoComplete="off" required />
                    <Input id="email" name="email" label="Email Address" type="email" placeholder="you@example.com" autoComplete="off" required />
                  </div>
                  <div className="auth-form-col">
                    <Input id="password" name="password" label="Password" type="password" placeholder="••••••••" autoComplete="new-password" required />
                    <Input id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password" placeholder="••••••••" autoComplete="new-password" required />
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

              <Button type="button" variant="secondary" fullWidth className="google-btn" onClick={() => alert('Google Sign In coming soon!')}>
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
