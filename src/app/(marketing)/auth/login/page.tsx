"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { login } from '../actions';
import { AlertCircle } from 'lucide-react';
import '../auth.css';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="auth-page">
      <div className="auth-split-left">
        <div className="auth-split-left-content">
          <h1>Welcome <span>Back.</span></h1>
          <p>Sign in to continue your IELTS preparation journey with AI-powered feedback and structured scoring rubrics.</p>
        </div>
      </div>

      <div className="auth-split-right">
        <div className="auth-card-glow-wrapper">
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
                <h2>Sign In</h2>
              </div>

              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FEF2F2', color: '#DC2626', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', fontWeight: 500 }}>
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}
              
              <form className="auth-form" autoComplete="off" action={login}>
                <Input 
                  id="email"
                  name="email"
                  label="Email Address" 
                  type="email" 
                  placeholder="you@example.com" 
                  autoComplete="off"
                  required
                />
                <div className="password-group">
                  <Input 
                    id="password"
                    name="password"
                    label="Password" 
                    type="password" 
                    placeholder="••••••••" 
                    autoComplete="new-password"
                    required
                  />
                  <Link href="/auth/forgot-password" className="forgot-link">Forgot Password?</Link>
                </div>
                <Button type="submit" variant="primary" fullWidth className="auth-submit-btn">Login</Button>
              </form>

              <div className="auth-divider">
                <span>OR</span>
              </div>

              <Button type="button" variant="secondary" fullWidth className="google-btn" onClick={() => alert('Google Sign In coming soon!')}>
                Continue with Google
              </Button>

              <div className="auth-footer">
                Don't have an account? <Link href="/auth/signup">Sign up free</Link>
              </div>
            </div>
          </BorderGlow>
        </div>
      </div>
    </div>
  );
}
