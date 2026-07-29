import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import '../auth.css';

export default function ForgotPassword() {
  return (
    <div className="auth-page">
      <Card className="auth-card">
        <div className="auth-header">
          <Link href="/" className="auth-logo">Intellify IELTS<span className="auth-dot">.</span></Link>
          <h2>Reset Password</h2>
          <p style={{ marginTop: '8px', color: 'var(--mid-gray)', fontSize: '14px' }}>
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>
        
        <form className="auth-form">
          <Input label="Email Address" type="email" placeholder="you@example.com" />
          <Button variant="primary" fullWidth className="auth-submit-btn" style={{ marginTop: '16px' }}>Send Reset Link</Button>
        </form>

        <div className="auth-footer">
          <Link href="/auth/login">← Back to Login</Link>
        </div>
      </Card>
    </div>
  );
}
