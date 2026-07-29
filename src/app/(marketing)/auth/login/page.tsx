"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import '../auth.css';

export default function Login() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect to dashboard
    router.push('/dashboard');
  };

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
              
              <form className="auth-form" onSubmit={handleLogin}>
                <Input 
                  label="Email Address" 
                  type="email" 
                  placeholder="you@example.com" 
                  defaultValue="mockuser@intellify.com"
                  required
                />
                <div className="password-group">
                  <Input 
                    label="Password" 
                    type="password" 
                    placeholder="••••••••" 
                    defaultValue="mockpassword123"
                    required
                  />
                  <Link href="/auth/forgot-password" className="forgot-link">Forgot Password?</Link>
                </div>
                <Button type="submit" variant="primary" fullWidth className="auth-submit-btn">Login</Button>
              </form>

              <div className="auth-divider">
                <span>OR</span>
              </div>

              <Button type="button" variant="secondary" fullWidth className="google-btn" onClick={() => router.push('/dashboard')}>
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
