"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { Check } from 'lucide-react';
import './pricing.css';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currency, setCurrency] = useState('INR'); // 'INR' or 'USD'

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div className="pricing-container">
          <h1>Simple, Transparent Pricing.</h1>
          <p>Choose the plan that fits your IELTS preparation journey.</p>
        </div>
      </section>

      <section className="pricing-content">
        <div className="pricing-container">
          <div className="pricing-toggles-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div className="pricing-toggle-wrapper">
              <div className="pricing-toggle">
                <span className={!isAnnual ? "active" : ""} onClick={() => setIsAnnual(false)}>Monthly</span>
                <span className={isAnnual ? "active" : ""} onClick={() => setIsAnnual(true)}>Annual</span>
              </div>
              <div className="save-badge-premium">Save 20%</div>
            </div>
            
            <div className="pricing-toggle-wrapper">
              <div className="pricing-toggle">
                <span className={currency === 'INR' ? "active" : ""} onClick={() => setCurrency('INR')}>INR (₹)</span>
                <span className={currency === 'USD' ? "active" : ""} onClick={() => setCurrency('USD')}>USD ($)</span>
              </div>
            </div>
          </div>

          <div className="pricing-cards">
            {/* STANDARD CARD */}
            <BorderGlow
              edgeSensitivity={50}
              glowColor="0 100 50"
              backgroundColor="var(--background)"
              borderRadius={24}
              glowRadius={40}
              glowIntensity={2}
              coneSpread={25}
              animated={true}
              colors={['#ff0000', '#C0392B', '#E74C3C']}
              className="pro-glow-wrapper"
            >
              <div className="pricing-card pro-card">
                <div className="pro-header">
                  <h2>Standard</h2>
                </div>
                <div className="price-container">
                  <div className="price-main">
                    <span className="amount">
                      {currency === 'INR' ? '₹' : '$'}
                      {currency === 'INR' 
                        ? (isAnnual ? '15,350' : '1,599') 
                        : (isAnnual ? '180' : '19')}
                    </span>
                    <small className="period">{isAnnual ? '/yr' : '/mo'}</small>
                  </div>
                  <div className="price-sub">
                    {currency === 'INR'
                      ? (isAnnual ? 'Equivalent to ₹1,279/mo' : 'Billed ₹19,188/yr')
                      : (isAnnual ? 'Equivalent to $15/mo' : 'Billed $228/yr')}
                  </div>
                </div>
                <ul className="pricing-features">
                  <li><Check size={18} className="check-icon" /> Unlimited Video Tutorials</li>
                  <li><Check size={18} className="check-icon" /> Unlimited AI Writing Evaluations</li>
                  <li><Check size={18} className="check-icon" /> 2 Avatar-Led Mock Tests per month</li>
                  <li><Check size={18} className="check-icon" /> Progress Tracking Dashboard</li>
                  <li><Check size={18} className="check-icon" /> Native Language Feedback (Text)</li>
                </ul>
                <div className="card-footer">
                  <Link href="/auth/signup?plan=standard">
                    <Button className="pro-btn-premium" fullWidth>Get Started</Button>
                  </Link>
                </div>
              </div>
            </BorderGlow>

            {/* PRO CARD (MOST POPULAR) */}
            <BorderGlow
              edgeSensitivity={50}
              glowColor="30 100 60" /* vibrant orange/gold glow for Most Popular */
              backgroundColor="var(--background)"
              borderRadius={24}
              glowRadius={50}
              glowIntensity={2.5} /* higher intensity */
              coneSpread={30}
              animated={true}
              colors={['#ff7b00', '#ff0000', '#C0392B']}
              className="pro-glow-wrapper popular-wrapper"
            >
              <div className="pricing-card pro-card">
                <div className="pro-header">
                  <h2>Pro</h2>
                  <span className="pro-badge-premium">Most Popular</span>
                </div>
                <div className="price-container">
                  <div className="price-main">
                    <span className="amount">
                      {currency === 'INR' ? '₹' : '$'}
                      {currency === 'INR' 
                        ? (isAnnual ? '23,990' : '2,499') 
                        : (isAnnual ? '278' : '29')}
                    </span>
                    <small className="period">{isAnnual ? '/yr' : '/mo'}</small>
                  </div>
                  <div className="price-sub">
                    {currency === 'INR'
                      ? (isAnnual ? 'Equivalent to ₹1,999/mo' : 'Billed ₹29,988/yr')
                      : (isAnnual ? 'Equivalent to $23/mo' : 'Billed $348/yr')}
                  </div>
                </div>
                <ul className="pricing-features">
                  <li><Check size={18} className="check-icon popular-check" /> Everything in Standard</li>
                  <li><Check size={18} className="check-icon popular-check" /> 5 Avatar-Led Mock Tests per month</li>
                  <li><Check size={18} className="check-icon popular-check" /> Priority AI Processing</li>
                  <li><Check size={18} className="check-icon popular-check" /> Audio Pronunciation Fixes</li>
                </ul>
                <div className="card-footer">
                  <Link href="/auth/signup?plan=pro">
                    <Button className="pro-btn-premium" fullWidth>Upgrade to Pro</Button>
                  </Link>
                </div>
              </div>
            </BorderGlow>

            {/* PRO+ CARD */}
            <BorderGlow
              edgeSensitivity={50}
              glowColor="0 100 50"
              backgroundColor="var(--background)"
              borderRadius={24}
              glowRadius={40}
              glowIntensity={2}
              coneSpread={25}
              animated={true}
              colors={['#ff0000', '#C0392B', '#E74C3C']}
              className="pro-glow-wrapper"
            >
              <div className="pricing-card pro-card">
                <div className="pro-header">
                  <h2>Pro+</h2>
                </div>
                <div className="price-container">
                  <div className="price-main">
                    <span className="amount">${isAnnual ? '372' : '39'}</span>
                    <small className="period">{isAnnual ? '/yr' : '/mo'}</small>
                  </div>
                  <div className="price-sub">
                    {isAnnual ? 'Equivalent to $31/mo' : 'Billed $468/yr'}
                  </div>
                </div>
                <ul className="pricing-features">
                  <li><Check size={18} className="check-icon" /> Everything in Pro</li>
                  <li><Check size={18} className="check-icon" /> 10 Avatar-Led Mock Tests per month</li>
                  <li><Check size={18} className="check-icon" /> Native Language Audio Feedback</li>
                  <li><Check size={18} className="check-icon" /> 1-on-1 AI Exam Strategy Session</li>
                </ul>
                <div className="card-footer">
                  <Link href="/auth/signup?plan=pro_plus">
                    <Button className="pro-btn-premium" fullWidth>Upgrade to Pro+</Button>
                  </Link>
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>
      </section>
    </div>
  );
}
