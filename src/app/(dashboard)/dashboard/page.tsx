"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Target, TrendingUp, Mic, PenLine, BookOpen, Activity, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import './overview.css';

// Mock Data for Charts
const progressionData = [
  { name: 'Test 1', band: 5.5 },
  { name: 'Test 2', band: 6.0 },
  { name: 'Test 3', band: 6.0 },
  { name: 'Test 4', band: 6.5 },
  { name: 'Test 5', band: 7.0 },
  { name: 'Test 6', band: 7.5 },
  { name: 'Latest', band: 8.0 },
];

const skillData = [
  { subject: 'Lexical', A: 8.5, fullMark: 9 },
  { subject: 'Grammar', A: 7.0, fullMark: 9 },
  { subject: 'Fluency', A: 8.0, fullMark: 9 },
  { subject: 'Pronun.', A: 7.5, fullMark: 9 },
  { subject: 'Task Ach.', A: 8.0, fullMark: 9 },
  { subject: 'Coherence', A: 6.5, fullMark: 9 },
];

const skillDescriptions: Record<string, string> = {
  'Lexical': 'Range and accuracy of vocabulary used.',
  'Grammar': 'Variety and grammatical correctness.',
  'Fluency': 'Smoothness and natural flow of speech.',
  'Pronun.': 'Clarity of speech and pronunciation.',
  'Task Ach.': 'How completely the prompt was answered.',
  'Coherence': 'Logical flow and use of linking words.'
};

const CustomRadarTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const subject = data.subject;
    const description = skillDescriptions[subject] || '';
    return (
      <div style={{ backgroundColor: 'var(--pure-white)', padding: '12px', border: '1px solid var(--light-gray-border)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <p style={{ fontWeight: 600, color: 'var(--pure-black)', marginBottom: '4px', fontSize: '15px', margin: 0 }}>
          {subject}: <span style={{ color: 'var(--primary-red)', fontWeight: 800 }}>{data.A}</span>
        </p>
        <p style={{ color: 'var(--mid-gray)', fontSize: '12px', margin: 0, marginTop: '4px' }}>{description}</p>
      </div>
    );
  }
  return null;
};

export default function DashboardOverview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="dashboard-overview">
      {/* 1. Hero Insight Banner */}
      <div className="hero-insight-banner">
        <div className="hero-content">
          <div className="hero-greeting">
            <h2>Welcome back, John!</h2>
            <p>You're making great progress towards your goals today.</p>
          </div>
          
          <div className="hero-actions">
            <Link href="/practice/writing">
              <Button variant="primary" className="hero-cta-btn">
                Resume Last Module
                <Target size={18} style={{ marginLeft: '8px' }} />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="hero-stats">
          <div className="stat-box">
            <div className="stat-label">Current Est. Band</div>
            <div className="stat-value highlight">8.0</div>
            <div className="stat-trend"><TrendingUp size={14} /> +0.5 from last week</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Target Band</div>
            <div className="stat-value">8.5</div>
            <div className="stat-trend neutral">Almost there!</div>
          </div>
        </div>
      </div>

      {/* 2. Advanced Analytics & AI Insight */}
      <div className="dashboard-grid-main">
        <div className="analytics-column">
          <div className="charts-row">
            <Card className="chart-card line-chart-card">
              <h3>Band Progression Over Time</h3>
              <div className="chart-container">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--light-gray-border)" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--mid-gray)', fontSize: 12 }} />
                      <YAxis domain={[4, 9]} axisLine={false} tickLine={false} tick={{ fill: 'var(--mid-gray)', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid var(--light-gray-border)', backgroundColor: 'var(--pure-white)' }}
                      />
                      <Line type="monotone" dataKey="band" stroke="#E74C3C" strokeWidth={3} dot={{ r: 4, fill: '#E74C3C', strokeWidth: 2, stroke: 'var(--pure-white)' }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>

            <Card className="chart-card radar-chart-card">
              <h3>Sub-Skill Breakdown</h3>
              <div className="chart-container">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="85%" data={skillData}>
                      <PolarGrid stroke="var(--light-gray-border)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--mid-gray)', fontSize: 13 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 9]} tick={false} axisLine={false} />
                      <Radar name="John" dataKey="A" stroke="#E74C3C" fill="#E74C3C" fillOpacity={0.4} />
                      <Tooltip content={<CustomRadarTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>
          </div>

          <Card className="ai-recommendation-card">
            <div className="ai-icon-wrap">
              <Zap size={24} color="#F39C12" />
            </div>
            <div className="ai-content">
              <h3>AI-Driven Next Best Action</h3>
              <p>Based on your recent tests, your <strong>Writing Task 2 coherence</strong> is lagging behind your other skills. We recommend practicing Advanced Essay Structuring.</p>
              <Link href="/practice/writing">
                <Button variant="secondary" className="ai-action-btn">Start Writing Module</Button>
              </Link>
            </div>
          </Card>
        </div>

        <div className="side-column">
          <Card className="activity-timeline-card">
            <h3>Recent Activity</h3>
            <div className="modern-timeline">
              <div className="timeline-item">
                <div className="timeline-icon writing"><PenLine size={16} /></div>
                <div className="timeline-content">
                  <h4>Completed Writing Task 2</h4>
                  <p>Band 6.5 Estimated</p>
                  <span className="timeline-time">2 hours ago</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon speaking"><Mic size={16} /></div>
                <div className="timeline-content">
                  <h4>Speaking Mock Test</h4>
                  <p>Band 7.0 Estimated</p>
                  <span className="timeline-time">Yesterday</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon reading"><BookOpen size={16} /></div>
                <div className="timeline-content">
                  <h4>Reading Strategies Video</h4>
                  <p>Watched 15 mins</p>
                  <span className="timeline-time">Oct 22</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon exam"><Activity size={16} /></div>
                <div className="timeline-content">
                  <h4>Full Mock Exam #3</h4>
                  <p>Overall Band 7.5</p>
                  <span className="timeline-time">Oct 18</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
