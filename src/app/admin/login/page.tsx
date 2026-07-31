'use client';

import React, { useState, Suspense } from 'react';
import { Button } from '@/components/Button';
import { Lock, LogIn, AlertCircle } from 'lucide-react';
import { adminLogin } from '@/app/(marketing)/auth/actions';
import { useSearchParams } from 'next/navigation';
import './admin-login.css'; // We'll create this or reuse existing

function AdminLoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="brand-dot"></div>
          <h2>Intellify CMS Admin</h2>
          <p>Restricted Access</p>
        </div>

        {error && (
          <div className="admin-login-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form className="admin-login-form" autoComplete="off" action={adminLogin}>
          <div className="input-group">
            <input id="email" name="email" type="email" placeholder="Admin Email" required autoComplete="off" />
          </div>
          
          <div className="input-group">
            <Lock size={18} className="input-icon" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--mid-gray)' }} />
            <input id="password" name="password" type="password" placeholder="Admin Password" required autoComplete="new-password" style={{ paddingLeft: '40px' }} />
          </div>

          <Button type="submit" variant="primary" className="submit-btn" style={{ background: 'var(--pure-black)', width: '100%', marginTop: '16px' }}>
            <LogIn size={16} /> Secure Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminLoginContent />
    </Suspense>
  );
}
