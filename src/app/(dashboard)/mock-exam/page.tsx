"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { User, FileText, Clock, Target, Zap, ArrowRight, Activity } from 'lucide-react';
import BorderGlow from '@/components/BorderGlow';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import './mock-exam.css';

export default function MockExamHub() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const historyData = [
    { name: 'Exam 1', score: 6.5 },
    { name: 'Exam 2', score: 6.5 },
    { name: 'Exam 3', score: 7.0 },
    { name: 'Exam 4', score: 7.5 },
    { name: 'Exam 5', score: 8.0 }
  ];

  return (
    <div className="mock-exam-hub">
      {/* Premium Hero Header */}
      <div className="mock-exam-hero-banner">
        <div className="mock-exam-hero-content">
          <div className="hero-greeting">
            <h2>Mock Exam Hub</h2>
            <p>Test your readiness with full-length exams or the interactive AI examiner avatar.</p>
          </div>
          
          <div className="exam-ai-recommendation">
             <div className="ai-icon-wrap">
              <Zap size={20} color="#F39C12" />
            </div>
            <div className="ai-text">
              <strong>AI Insight: Ready for Full Exam</strong>
              <p>Your recent module practice scores have stabilized above Band 7.5. It's time to take a full timed academic test.</p>
            </div>
            <Button variant="primary" className="ai-cta-btn">Take Full Exam</Button>
          </div>
        </div>
      </div>

      <div className="exam-main-grid">
        <div className="exam-cards-column">
          <h3 className="section-title">Available Exams</h3>
          
          {/* Avatar Exam */}
          <div className="exam-card-wrapper">
            <BorderGlow
              edgeSensitivity={30}
              glowColor="0 80% 50%"
              backgroundColor="var(--background)"
              borderRadius={16}
              glowRadius={40}
              glowIntensity={1}
              coneSpread={25}
              animated={true}
              colors={['#E74C3C', '#C0392B', '#ff6b5b']}
            >
              <div className="premium-exam-card avatar-exam">
                <div className="exam-badge glowing-badge">Featured AI Mode</div>
                <div className="exam-card-header">
                  <div className="exam-icon-large" style={{ backgroundColor: '#E74C3C20', color: '#E74C3C' }}>
                    <User size={36} />
                  </div>
                  <div>
                    <h3>Avatar-Led Speaking Exam</h3>
                    <div className="exam-meta">
                      <span><Clock size={14} /> 11-14 mins</span>
                      <span><Target size={14} /> 1 Credit Required</span>
                    </div>
                  </div>
                </div>
                <p>The most realistic IELTS speaking test experience. Interact in real-time with our AI examiner via video.</p>
                <div className="exam-card-actions">
                  <Link href="/mock-exam/avatar-test" style={{ width: '100%' }}>
                    <Button variant="primary" style={{ width: '100%', background: 'linear-gradient(135deg, #C0392B, #96281B)', border: 'none' }}>
                      Start Avatar Test <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                    </Button>
                  </Link>
                </div>
              </div>
            </BorderGlow>
          </div>

          {/* Full Academic Exam */}
          <div className="exam-card-wrapper">
            <Card className="premium-exam-card standard-exam">
              <div className="exam-card-header">
                <div className="exam-icon-large" style={{ backgroundColor: 'var(--off-white)', color: 'var(--pure-black)' }}>
                  <FileText size={36} />
                </div>
                <div>
                  <h3>Full Academic Exam</h3>
                  <div className="exam-meta">
                    <span><Clock size={14} /> 2 hrs 40 mins</span>
                    <span><FileText size={14} /> Sections 1-3</span>
                  </div>
                </div>
              </div>
              <p>A complete 3-hour academic mock test covering Listening, Reading, and Writing using official IELTS timing and structure.</p>
              <div className="exam-card-actions">
                <Button variant="outline" style={{ width: '100%' }}>Start Full Exam</Button>
              </div>
            </Card>
          </div>
        </div>

        <div className="exam-analytics-column">
          <h3 className="section-title">Past Performance</h3>
          <Card className="exam-analytics-card">
            <div className="analytics-header">
              <div className="analytics-icon">
                <Activity size={24} color="#3498db" />
              </div>
              <div>
                <h4>Overall Band Progression</h4>
                <p>Based on your last 5 full mock exams</p>
              </div>
            </div>
            
            <div className="exam-chart-wrapper">
              {mounted && (
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={historyData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3498db" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3498db" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--light-gray-border)" />
                    <XAxis dataKey="name" tick={{ fill: 'var(--mid-gray)', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis domain={[0, 9]} tick={{ fill: 'var(--mid-gray)', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
                    <Tooltip 
                      cursor={{ stroke: 'var(--light-gray-border)', strokeWidth: 1, strokeDasharray: '3 3' }} 
                      contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--light-gray-border)', color: 'var(--foreground)' }} 
                    />
                    <Area type="monotone" dataKey="score" stroke="#3498db" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="analytics-summary">
              <div className="summary-stat">
                <span>Avg. Band</span>
                <strong>7.1</strong>
              </div>
              <div className="summary-stat">
                <span>Highest</span>
                <strong>8.0</strong>
              </div>
              <div className="summary-stat">
                <span>Exams Taken</span>
                <strong>5</strong>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
