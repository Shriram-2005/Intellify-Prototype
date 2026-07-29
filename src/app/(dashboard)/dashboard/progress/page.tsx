"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { CheckCircle, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import './progress.css';

export default function ProgressTracker() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const progressData = [
    { date: 'Jan 1', score: 6.0 },
    { date: 'Jan 15', score: 6.5 },
    { date: 'Feb 1', score: 6.5 },
    { date: 'Feb 15', score: 7.0 },
    { date: 'Mar 1', score: 7.0 },
    { date: 'Mar 15', score: 7.5 },
    { date: 'Apr 1', score: 8.0 }
  ];

  return (
    <div className="progress-page">
      <div className="progress-header">
        <h2>Progress Tracker</h2>
        <p>Monitor your performance trajectory and identify critical areas for improvement.</p>
      </div>

      <div className="progress-stats-row">
        <Card className="stat-card">
          <span className="stat-label">Current Est. Band</span>
          <div className="stat-value-row">
            <strong>8.0</strong>
            <span className="stat-trend positive"><TrendingUp size={16} /> +0.5</span>
          </div>
        </Card>
        
        <Card className="stat-card">
          <span className="stat-label">Modules Completed</span>
          <div className="stat-value-row">
            <strong>42</strong>
            <span className="stat-trend positive"><TrendingUp size={16} /> +12</span>
          </div>
        </Card>

        <Card className="stat-card">
          <span className="stat-label">Avg. Accuracy</span>
          <div className="stat-value-row">
            <strong>78%</strong>
            <span className="stat-trend neutral"><Minus size={16} /> 0%</span>
          </div>
        </Card>

        <Card className="stat-card">
          <span className="stat-label">Target Band</span>
          <div className="stat-value-row">
            <strong>8.5</strong>
            <span className="stat-trend text-muted">Almost there</span>
          </div>
        </Card>
      </div>

      <Card className="progress-chart-card">
        <div className="chart-header">
          <h3>Band Score Trajectory</h3>
          <span className="chart-subtitle">Last 90 Days</span>
        </div>
        <div className="main-chart-wrapper">
          {mounted && (
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={progressData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTrajectory" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2ecc71" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--light-gray-border)" />
                <XAxis dataKey="date" tick={{ fill: 'var(--mid-gray)', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis domain={[0, 9]} tick={{ fill: 'var(--mid-gray)', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip 
                  cursor={{ stroke: 'var(--light-gray-border)', strokeWidth: 1, strokeDasharray: '3 3' }} 
                  contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--light-gray-border)', color: 'var(--foreground)' }} 
                />
                <Area type="monotone" dataKey="score" stroke="#2ecc71" strokeWidth={4} fillOpacity={1} fill="url(#colorTrajectory)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      <div className="sw-grid">
        <Card className="sw-card strengths">
          <div className="sw-header">
            <div className="sw-icon-wrap green-bg">
              <CheckCircle size={24} color="#2ecc71" />
            </div>
            <h3>Top Strengths</h3>
          </div>
          <ul className="sw-list">
            <li>
              <strong>Grammatical Range (Writing)</strong>
              <p>You consistently use complex sentence structures accurately.</p>
            </li>
            <li>
              <strong>Fluency (Speaking)</strong>
              <p>You speak at length without noticeable effort or loss of coherence.</p>
            </li>
            <li>
              <strong>Task Achievement (Task 1)</strong>
              <p>All key features are covered well in your graph summaries.</p>
            </li>
          </ul>
        </Card>

        <Card className="sw-card weaknesses">
          <div className="sw-header">
            <div className="sw-icon-wrap red-bg">
              <AlertTriangle size={24} color="#E74C3C" />
            </div>
            <h3>Critical Areas for Improvement</h3>
          </div>
          <ul className="sw-list">
            <li>
              <strong>Lexical Resource (Speaking)</strong>
              <p>Try to use more idiomatic vocabulary and less common words.</p>
            </li>
            <li>
              <strong>Coherence & Cohesion (Task 2)</strong>
              <p>Ensure your paragraphs flow logically into one another.</p>
            </li>
            <li>
              <strong>True/False/Not Given (Reading)</strong>
              <p>You often confuse 'False' with 'Not Given'. Review the rules.</p>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
