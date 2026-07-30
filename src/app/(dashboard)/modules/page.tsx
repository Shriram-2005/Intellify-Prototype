"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Headphones, BookOpen, PenLine, Mic, Zap, ArrowRight, PlayCircle } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import './modules.css';

export default function ModulesOverview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = [
    {
      id: 'listening',
      name: 'Listening',
      desc: 'Practice identifying key information from audio clips and lectures.',
      score: 7.5,
      progress: 60,
      color: '#3498db',
      icon: <Headphones size={28} color="#3498db" />,
      subStats: [
        { label: 'Section 1', val: '90%' },
        { label: 'Section 2', val: '80%' },
        { label: 'Section 3', val: '60%' },
        { label: 'Section 4', val: '50%' }
      ],
      chartData: [
        { name: 'Sec 1', score: 90, fill: '#3498db' },
        { name: 'Sec 2', score: 80, fill: '#3498db' },
        { name: 'Sec 3', score: 60, fill: '#3498db' },
        { name: 'Sec 4', score: 50, fill: '#3498db' }
      ]
    },
    {
      id: 'reading',
      name: 'Reading',
      desc: 'Enhance your skimming, scanning, and detailed reading skills.',
      score: 8.0,
      progress: 85,
      color: '#2ecc71',
      icon: <BookOpen size={28} color="#2ecc71" />,
      subStats: [
        { label: 'Passage 1', val: '90%' },
        { label: 'Passage 2', val: '75%' },
        { label: 'Passage 3', val: '85%' }
      ],
      chartData: [
        { name: 'Passage 1', score: 90, fill: '#2ecc71' },
        { name: 'Passage 2', score: 75, fill: '#2ecc71' },
        { name: 'Passage 3', score: 85, fill: '#2ecc71' }
      ]
    },
    {
      id: 'writing',
      name: 'Writing',
      desc: 'Master Task 1 graphs and Task 2 essays with AI-driven evaluation.',
      score: 6.5,
      progress: 40,
      color: '#E74C3C',
      icon: <PenLine size={28} color="#E74C3C" />,
      subStats: [
        { label: 'Task 1 (Graphs)', val: '7.0' },
        { label: 'Task 2 (Essays)', val: '6.0' }
      ],
      chartData: [
        { name: 'Task 1', score: 7.0, fill: '#E74C3C' },
        { name: 'Task 2', score: 6.0, fill: '#E74C3C' }
      ]
    },
    {
      id: 'speaking',
      name: 'Speaking',
      desc: 'Improve fluency and pronunciation with real-time feedback.',
      score: 7.0,
      progress: 50,
      color: '#9b59b6',
      icon: <Mic size={28} color="#9b59b6" />,
      subStats: [
        { label: 'Part 1', val: '7.5' },
        { label: 'Part 2', val: '6.5' },
        { label: 'Part 3', val: '7.0' }
      ],
      chartData: [
        { name: 'Part 1', score: 7.5, fill: '#9b59b6' },
        { name: 'Part 2', score: 6.5, fill: '#9b59b6' },
        { name: 'Part 3', score: 7.0, fill: '#9b59b6' }
      ]
    }
  ];

  return (
    <div className="modules-overview">
      
      {/* Premium Hero Header */}
      <div className="modules-hero-banner">
        <div className="modules-hero-content">
          <div className="hero-greeting">
            <h2>Your Training Modules</h2>
            <p>Select a module to practice, review stats, or watch expert tutorials.</p>
          </div>
          
          <div className="modules-ai-recommendation">
             <div className="ai-icon-wrap">
              <Zap size={20} color="#F39C12" />
            </div>
            <div className="ai-text">
              <strong>Focus Area: Writing</strong>
              <p>Your Task 1 graphs are strong, but Task 2 coherence needs work. We recommend starting here today.</p>
            </div>
            <Link href="/practice/writing">
              <Button variant="primary" className="ai-cta-btn">Start Writing</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Module Rows */}
      <div className="premium-modules-list">
        {modules.map((mod) => (
          <div className="module-list-row" key={mod.id}>
            <Card className="premium-module-card row-card-left">
              
              {/* Glowing top border accent */}
              <div className="module-card-accent" style={{ backgroundColor: mod.color }}></div>

              <div className="module-card-top">
                <div className="module-title-wrap">
                  <div className="module-icon-box" style={{ backgroundColor: `${mod.color}15` }}>
                    {mod.icon}
                  </div>
                  <h3>{mod.name}</h3>
                </div>
                
                <div className="module-progress-ring">
                  {mounted && (
                    <ResponsiveContainer width={64} height={64}>
                      <PieChart>
                        <Pie
                          data={[
                            { value: mod.progress, color: mod.color },
                            { value: 100 - mod.progress, color: 'var(--light-gray-border)' }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={22}
                          outerRadius={28}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                          stroke="none"
                        >
                          {
                            [0,1].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 0 ? mod.color : 'var(--light-gray-border)'} />
                            ))
                          }
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  <div className="ring-text">
                    <span>{mod.progress}%</span>
                  </div>
                </div>
              </div>

              <p className="module-desc">{mod.desc}</p>

              <div className="module-substats">
                <div className="substat-col" style={{ width: '35%' }}>
                  <span className="substat-label">Est. Band</span>
                  <span className="substat-val" style={{ color: mod.color }}>{mod.score.toFixed(1)}</span>
                </div>
                <div className="substat-divider"></div>
                <div className="substat-col" style={{ flex: 1, paddingLeft: '8px', gap: '16px' }}>
                  {mod.subStats.map((stat, i) => (
                    <div key={i} className="mini-stat-row">
                      <span>{stat.label}</span>
                      <strong>{stat.val}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="module-actions">
                <Link href={`/practice/${mod.id}`} style={{ flex: 1 }}>
                  <Button variant="primary" style={{ width: '100%', backgroundColor: mod.color, borderColor: mod.color }}>
                    Practice {mod.name} <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href={`/learn/${mod.id}`} style={{ flex: 1 }}>
                  <Button variant="outline" style={{ width: '100%' }}>
                    <PlayCircle size={16} style={{ marginRight: '6px' }} /> Watch Lessons
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="premium-module-chart-card row-card-right">
              <h4 className="chart-title">Performance Breakdown</h4>
              <div className="chart-wrapper">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mod.chartData} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--light-gray-border)" />
                      <XAxis dataKey="name" tick={{ fill: 'var(--mid-gray)', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                      <YAxis tick={{ fill: 'var(--mid-gray)', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
                      <Tooltip 
                        cursor={{ fill: 'var(--off-white)' }} 
                        contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--light-gray-border)', color: 'var(--foreground)' }} 
                      />
                      <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
