"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { ArrowLeft, Clock, Save, Send, Sparkles, ChevronRight, Mic, Play, Pause, Square, CheckCircle2 } from 'lucide-react';
import './speaking.css';

const mockSpeakingData: Record<string, any> = {
  'part-1': {
    title: 'Part 1: Introduction & Interview',
    meta: 'Q&A • 4-5 Minutes',
    promptHtml: (
      <>
        <p><strong>The examiner will ask you general questions about yourself and a range of familiar topics, such as home, family, work, studies, and interests.</strong></p>
        <br/>
        <p>Example questions:</p>
        <ul>
          <li>Let's talk about your hometown. Where is your hometown?</li>
          <li>What do you like most about it?</li>
          <li>Is there anything you dislike about it?</li>
          <li>How has your hometown changed in recent years?</li>
        </ul>
      </>
    ),
    time: '05:00'
  },
  'part-2': {
    title: 'Part 2: Long Turn',
    meta: 'Cue Card • 3-4 Minutes',
    promptHtml: (
      <>
        <p><strong>Describe a memorable journey you have made.</strong></p>
        <br/>
        <p>You should say:</p>
        <ul>
          <li>where you went</li>
          <li>how you travelled</li>
          <li>why you went on the journey</li>
        </ul>
        <p>and explain why you remember this journey so well.</p>
        <br/>
        <p><em>(You will have to talk about the topic for 1 to 2 minutes. You have 1 minute to think about what you are going to say. You can make some notes to help you if you wish.)</em></p>
      </>
    ),
    time: '04:00'
  },
  'part-3': {
    title: 'Part 3: Discussion',
    meta: 'Analytical • 4-5 Minutes',
    promptHtml: (
      <>
        <p><strong>The examiner will ask further questions connected to the topic in Part 2. This gives you the opportunity to discuss more abstract issues and ideas.</strong></p>
        <br/>
        <p>Let's consider first of all how people's travel habits have changed...</p>
        <ul>
          <li>How do people travel in your country now compared to 50 years ago?</li>
          <li>What are the environmental consequences of these changes in travel?</li>
          <li>Do you think people will travel more or less in the future? Why?</li>
        </ul>
      </>
    ),
    time: '05:00'
  }
};

export default function SpeakingPractice({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);

  const currentId = unwrappedParams.id;
  const data = mockSpeakingData[currentId] || mockSpeakingData['part-2'];
  
  const partKeys = Object.keys(mockSpeakingData);
  const currentIndex = partKeys.indexOf(currentId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === partKeys.length - 1;
  const prevId = !isFirst ? partKeys[currentIndex - 1] : null;
  const nextId = !isLast ? partKeys[currentIndex + 1] : null;
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
          <span className="task-title">Speaking {unwrappedParams.id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
        </div>
        
        <div className="header-center">
          <div className="timer-pill">
            <Clock size={16} className="timer-icon" />
            <span className="timer-text">{data.time}</span>
          </div>
        </div>
        
        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button variant="ghost" className="header-btn"><Save size={16} style={{ marginRight: '6px' }} /> Save Audio</Button>
          
          <div className="ai-toggle-header">
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
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                <Sparkles size={16} className="ai-sparkle" />
                <span>AI Live Tips</span>
                <ChevronRight size={14} className="ai-chevron" />
              </button>
            </BorderGlow>
          </div>

          {prevId && (
            <Link href={`/practice/speaking/${prevId}`}>
              <Button variant="ghost" className="header-btn"><ArrowLeft size={16} style={{ marginRight: '6px' }} /> Previous</Button>
            </Link>
          )}
          
          {nextId ? (
            <Link href={`/practice/speaking/${nextId}`}>
              <Button variant="primary" className="header-btn" style={{ background: 'var(--primary-red)' }}>Next <ChevronRight size={16} style={{ marginLeft: '6px' }} /></Button>
            </Link>
          ) : (
            <Link href={`/dashboard`}>
              <Button variant="primary" className="header-btn submit-btn" style={{ background: 'var(--success-color)' }}>Submit Test <CheckCircle2 size={16} style={{ marginLeft: '6px' }} /></Button>
            </Link>
          )}
        </div>
      </header>

      <div className="workspace-main">
        {/* Prompt Area (Left) */}
        <div className="workspace-panel prompt-panel">
          <div className="panel-inner">
            <div className="prompt-header">
              <h3>{data.title}</h3>
              <span className="prompt-meta">{data.meta}</span>
            </div>
            
            <div className="prompt-content cue-card">
              {data.promptHtml}
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
