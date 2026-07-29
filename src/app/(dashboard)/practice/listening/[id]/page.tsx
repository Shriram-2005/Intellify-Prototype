"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { ArrowLeft, Clock, Save, Send, Sparkles, ChevronRight, Play, Pause, Volume2, CheckCircle2 } from 'lucide-react';
import './listening.css';

export default function ListeningPractice({ params }: { params: { id: string } }) {
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});

  const handleSelect = (qNum: number, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qNum]: answer }));
  };

  return (
    <div className="practice-workspace">
      {/* Floating Header */}
      <header className="workspace-header">
        <div className="header-left">
          <Link href="/dashboard" className="exit-btn">
            <ArrowLeft size={16} /> Exit Practice
          </Link>
          <div className="divider"></div>
          <span className="task-title">Listening Part 3</span>
        </div>
        
        <div className="header-center">
          <div className="timer-pill">
            <Clock size={16} className="timer-icon" />
            <span className="timer-text">15:00</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="word-count-pill">
            <span className="count count-good">{Object.keys(selectedAnswers).length}</span> / 5 Answered
          </div>
          <Button variant="ghost" className="header-btn"><Save size={16} style={{ marginRight: '6px' }} /> Save</Button>
          <Button variant="primary" className="header-btn submit-btn">Submit <Send size={16} style={{ marginLeft: '6px' }} /></Button>
        </div>
      </header>

      <div className="workspace-main">
        {/* Audio Player & Context Area (Left) */}
        <div className="workspace-panel prompt-panel">
          <div className="panel-inner passage-inner">
            <div className="prompt-header">
              <h3>Academic Discussion</h3>
              <span className="prompt-meta">Audio Clip • 4 Minutes</span>
            </div>
            
            <div className="audio-player-wrapper">
              <BorderGlow
                edgeSensitivity={30}
                glowColor="0 80% 50%"
                backgroundColor="var(--pure-white)"
                borderRadius={16}
                glowRadius={20}
                glowIntensity={isPlaying ? 1 : 0}
                coneSpread={25}
                animated={isPlaying}
                colors={['#3498db', '#2980b9', '#74b9ff']}
              >
                <div className="premium-audio-player">
                  <button className="play-btn" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause size={24} color="#fff" /> : <Play size={24} color="#fff" style={{ marginLeft: '4px' }} />}
                  </button>
                  <div className="audio-progress">
                    <div className="audio-track">
                      <div className="audio-fill" style={{ width: isPlaying ? '45%' : '0%' }}></div>
                    </div>
                    <div className="audio-time">
                      <span>01:42</span>
                      <span>04:15</span>
                    </div>
                  </div>
                  <Volume2 size={20} color="var(--mid-gray)" />
                </div>
              </BorderGlow>
            </div>
            
            <div className="prompt-content passage-content" style={{ marginTop: '32px' }}>
              <h4>Context:</h4>
              <p>Two university students, Emma and Liam, are discussing their upcoming group project on urban architecture with their tutor, Dr. Harrison.</p>
              
              <div className="visual-aid">
                <div className="diagram-placeholder">
                  <span>[ Diagram of City Layout ]</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Area (Right) */}
        <div className="workspace-panel editor-panel questions-panel">
          <div className="panel-inner questions-inner">
            
            <div className="questions-header">
              <h4>Questions 21-25</h4>
              <p>Choose the correct letter, <strong>A</strong>, <strong>B</strong>, or <strong>C</strong>.</p>
            </div>

            <div className="questions-list">
              {[
                { num: 21, text: "What aspect of the project are the students struggling with?", options: ["A. Finding reliable sources", "B. Agreeing on a specific topic", "C. Managing their time effectively"] },
                { num: 22, text: "Dr. Harrison suggests that they focus their research on...", options: ["A. Modern eco-friendly buildings", "B. Historical preservation techniques", "C. The impact of transportation on city planning"] }
              ].map((q) => (
                <div className="question-item" key={q.num}>
                  <div className="question-text">
                    <strong>{q.num}.</strong> {q.text}
                  </div>
                  <div className="mcq-options">
                    {q.options.map(opt => (
                      <button 
                        key={opt}
                        className={`mcq-option ${selectedAnswers[q.num] === opt ? 'selected' : ''}`}
                        onClick={() => handleSelect(q.num, opt)}
                      >
                        {selectedAnswers[q.num] === opt && <CheckCircle2 size={16} />}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
          
          {/* AI Assistant Toggle */}
          <div className="ai-toggle-wrapper">
            <BorderGlow
              edgeSensitivity={30}
              glowColor="0 80% 50%"
              backgroundColor="var(--background)"
              borderRadius={999}
              glowRadius={15}
              glowIntensity={1}
              coneSpread={25}
              animated={true}
              colors={['#F39C12', '#E67E22', '#D35400']}
            >
              <button 
                className={`ai-toggle-btn ${aiPanelOpen ? 'active' : ''}`}
                onClick={() => setAiPanelOpen(!aiPanelOpen)}
              >
                <Sparkles size={20} className="ai-sparkle" />
                <span>AI Live Tips</span>
                <ChevronRight size={16} className="ai-chevron" />
              </button>
            </BorderGlow>
          </div>
        </div>

        {/* AI Assistant Sidebar (Collapsible) */}
        <div className={`ai-sidebar ${aiPanelOpen ? 'open' : ''}`}>
          <div className="ai-sidebar-header">
            <Sparkles size={18} color="#F39C12" />
            <h4>Live Assistant</h4>
          </div>
          
          <div className="ai-tips-list">
            <div className="ai-tip">
              <h5>Distractor Warning</h5>
              <p>Listen closely! Speakers in Part 3 often change their minds. Liam just suggested 'B', but Emma disagreed.</p>
            </div>
            <div className="ai-tip">
              <h5>Keyword Alert</h5>
              <p>The tutor just mentioned "transportation". Get ready for Question 22.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
