"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Volume2, FileText, RotateCcw, ArrowLeft, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import BorderGlow from '@/components/BorderGlow';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import './results.css';

export default function TestResults({ params }: { params: { testId: string } }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rubricData = [
    { subject: 'Task Response', A: 7.5, fullMark: 9 },
    { subject: 'Coherence', A: 6.5, fullMark: 9 },
    { subject: 'Lexical Resource', A: 7.0, fullMark: 9 },
    { subject: 'Grammar', A: 6.5, fullMark: 9 },
    { subject: 'Overall', A: 7.0, fullMark: 9 }
  ];

  return (
    <div className="test-results-page">
      <Link href="/dashboard/progress" className="back-link">
        <ArrowLeft size={16} /> Back to History
      </Link>

      <div className="results-hero">
        <div className="results-hero-info">
          <h2>Writing Task 2 Report</h2>
          <span className="test-date">Completed on Oct 24, 2025</span>
          
          <div className="actions-row">
            <Button variant="secondary" className="action-btn"><Volume2 size={16} /> Listen to Report</Button>
            <Button variant="secondary" className="action-btn"><FileText size={16} /> Download PDF</Button>
            <Link href="/practice/writing/123">
              <Button variant="primary" className="action-btn-retake"><RotateCcw size={16} /> Retake Task</Button>
            </Link>
          </div>
        </div>
        
        <div className="results-hero-score">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="0 80% 50%"
            backgroundColor="var(--background)"
            borderRadius={24}
            glowRadius={30}
            glowIntensity={1}
            coneSpread={25}
            animated={true}
            colors={['#E74C3C', '#C0392B', '#ff6b5b']}
          >
            <div className="score-pill">
              <span className="score-label">Band Score</span>
              <strong className="score-val">7.0</strong>
            </div>
          </BorderGlow>
        </div>
      </div>

      <div className="results-ai-feedback">
        <div className="ai-icon-wrap">
          <Zap size={24} color="#F39C12" />
        </div>
        <div className="ai-feedback-content">
          <h3>AI Examiner Feedback</h3>
          <p>Your essay was well-structured and addressed the prompt directly, earning you a strong Task Response score. However, a few repetitive vocabulary choices slightly lowered your Lexical Resource. Focus on incorporating more varied academic synonyms in your next attempt.</p>
        </div>
      </div>

      <div className="results-grid">
        <Card className="rubric-chart-card">
          <h3>Performance Rubric</h3>
          <div className="radar-chart-container">
            {mounted && (
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={rubricData}>
                  <PolarGrid stroke="var(--light-gray-border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--pure-black)', fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 9]} tick={{ fill: 'var(--mid-gray)' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--light-gray-border)', color: 'var(--foreground)' }}
                  />
                  <Radar name="Band Score" dataKey="A" stroke="#E74C3C" fill="#E74C3C" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card className="rubric-details-card">
          <h3>Detailed Breakdown</h3>
          <div className="breakdown-list">
            <div className="breakdown-item">
              <div className="breakdown-item-header">
                <span className="breakdown-title">Task Response</span>
                <span className="breakdown-score good">7.5</span>
              </div>
              <p>Excellent prompt adherence and strong arguments.</p>
            </div>
            
            <div className="breakdown-item">
              <div className="breakdown-item-header">
                <span className="breakdown-title">Coherence & Cohesion</span>
                <span className="breakdown-score average">6.5</span>
              </div>
              <p>Good paragraphing, but transitional phrases felt slightly mechanical.</p>
            </div>

            <div className="breakdown-item">
              <div className="breakdown-item-header">
                <span className="breakdown-title">Lexical Resource</span>
                <span className="breakdown-score good">7.0</span>
              </div>
              <p>Adequate vocabulary, but lacks less common lexical items.</p>
            </div>

            <div className="breakdown-item">
              <div className="breakdown-item-header">
                <span className="breakdown-title">Grammar Range</span>
                <span className="breakdown-score average">6.5</span>
              </div>
              <p>Mostly accurate, but missing complex sentence structures.</p>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
}
