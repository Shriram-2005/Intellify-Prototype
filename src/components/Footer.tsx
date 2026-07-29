import React from 'react';
import Link from 'next/link';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="intellify-footer">
      <div className="intellify-footer-container">
        <div className="intellify-footer-grid">
          {/* Column 1 */}
          <div className="intellify-footer-col">
            <Link href="/" className="intellify-footer-logo">
              Intellify IELTS<span className="intellify-navbar-logo-dot">.</span>
            </Link>
            <p className="intellify-footer-desc">
              #1 AI-Powered IELTS Preparation platform to achieve your target band score.
            </p>
          </div>
          
          {/* Column 2 */}
          <div className="intellify-footer-col">
            <h4 className="intellify-footer-title">Platform</h4>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/modules">Modules</Link>
            <Link href="/practice">Practice</Link>
            <Link href="/learn/videos">Video Tutorials</Link>
            <Link href="/mock-exam">Mock Exams</Link>
          </div>

          {/* Column 3 */}
          <div className="intellify-footer-col">
            <h4 className="intellify-footer-title">Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* Column 4 */}
          <div className="intellify-footer-col">
            <h4 className="intellify-footer-title">Legal</h4>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>
        
        <div className="intellify-footer-bottom">
          <p>© 2026 Intellify IELTS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
