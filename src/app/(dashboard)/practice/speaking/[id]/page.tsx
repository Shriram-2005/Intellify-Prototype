"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { ArrowLeft, Clock, Save, Send, Sparkles, ChevronRight, Mic, Play, Pause, Square } from 'lucide-react';
import './speaking.css';

export default function SpeakingPractice({ params }: { params: { id: string } }) {
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="practice-workspace">
      {/* Floating Header */}
      <header className="workspace-header">
        <div className="header-left">
          <Link href="/dashboard" className="exit-btn">
            <ArrowLeft size={16} /> Exit Practice
          </Link>
          <div className="divider"></div>
          <span className="task-title">Speaking Part 2</span>
        </div>
        
        <div className="header-center">
          <div className="timer-pill">
            <Clock size={16} className="timer-icon" />
            <span className="timer-text">02:00</span>
          </div>
        </div>
        
        <div className="header-right">
          <Button variant="ghost" className="header-btn"><Save size={16} style={{ marginRight: '6px' }} /> Save Audio</Button>
          <Button variant="primary" className="header-btn submit-btn">Submit <Send size={16} style={{ marginLeft: '6px' }} /></Button>
        </div>
      </header>

      <div className="workspace-main">
        {/* Prompt Area (Left) */}
        <div className="workspace-panel prompt-panel">
          <div className="panel-inner">
            <div className="prompt-header">
              <h3>Part 2: Long Turn</h3>
              <span className="prompt-meta">Cue Card • 2 Minutes</span>
            </div>
            
            <div className="prompt-content cue-card">
              <p><strong>Describe a memorable journey you have made.</strong></p>
              <br/>
              <p>You should say:</p>
              <ul>
                <li>where you went</li>
                <li>how you travelled</li>
                <li>why you went on the journey</li>
              </ul>
              <p>and explain why you remember this journey so well.</p>
            </div>
          </div>
        </div>

        {/* Audio Recording / Avatar Area (Right) */}
        <div className="workspace-panel editor-panel speaking-panel">
          <div className="panel-inner speaking-inner">
            <div className="avatar-wrapper">
              <BorderGlow
                edgeSensitivity={30}
                glowColor="0 80% 50%"
                backgroundColor="var(--background)"
                borderRadius={999}
                glowRadius={isRecording ? 60 : 30}
                glowIntensity={isRecording ? 1.5 : 1}
                coneSpread={25}
                animated={isRecording}
                colors={isRecording ? ['#E74C3C', '#C0392B', '#ff6b5b'] : ['#3498db', '#2980b9', '#74b9ff']}
              >
                <div className="examiner-avatar">
                  {isRecording ? <div className="recording-pulse"></div> : <Mic size={64} className="mic-icon" />}
                </div>
              </BorderGlow>
            </div>

            <div className="audio-controls">
              {!isRecording ? (
                <Button variant="primary" className="record-btn" onClick={() => setIsRecording(true)}>
                  <Mic size={20} style={{ marginRight: '8px' }} /> Start Speaking
                </Button>
              ) : (
                <Button variant="outline" className="stop-btn" onClick={() => setIsRecording(false)}>
                  <Square size={20} style={{ marginRight: '8px' }} color="#E74C3C" /> Stop Recording
                </Button>
              )}
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
                <span>Live Feedback</span>
                <ChevronRight size={16} className="ai-chevron" />
              </button>
            </BorderGlow>
          </div>
        </div>

        {/* AI Assistant Sidebar (Collapsible) */}
        <div className={`ai-sidebar ${aiPanelOpen ? 'open' : ''}`}>
          <div className="ai-sidebar-header">
            <Sparkles size={18} color="#F39C12" />
            <h4>Real-time Transcript</h4>
          </div>
          
          <div className="ai-tips-list">
             <div className="ai-tip">
              <h5>Fluency Check</h5>
              <p>You've had a 3-second pause. Try to use a filler phrase like "Well, let me think..." to maintain fluency.</p>
            </div>
            <p className="live-transcript">
              "I remember going to... uh... Kyoto in Japan last year. It was a really beautiful place and..."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
