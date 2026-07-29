"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { ArrowLeft, Clock, Save, Send, Sparkles, ChevronRight, MessageSquareWarning } from 'lucide-react';
import './writing.css';

export default function WritingPractice({ params }: { params: { id: string } }) {
  const [text, setText] = useState('');
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="practice-workspace">
      {/* Floating Header */}
      <header className="workspace-header">
        <div className="header-left">
          <Link href="/dashboard" className="exit-btn">
            <ArrowLeft size={16} /> Exit Practice
          </Link>
          <div className="divider"></div>
          <span className="task-title">Writing Task 2</span>
        </div>
        
        <div className="header-center">
          <div className="timer-pill">
            <Clock size={16} className="timer-icon" />
            <span className="timer-text">40:00</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="word-count-pill">
            <span className={`count ${wordCount >= 250 ? 'count-good' : ''}`}>{wordCount}</span> / 250 words
          </div>
          <Button variant="ghost" className="header-btn"><Save size={16} style={{ marginRight: '6px' }} /> Save</Button>
          <Button variant="primary" className="header-btn submit-btn">Submit <Send size={16} style={{ marginLeft: '6px' }} /></Button>
        </div>
      </header>

      <div className="workspace-main">
        {/* Prompt Area (Left) */}
        <div className="workspace-panel prompt-panel">
          <div className="panel-inner">
            <div className="prompt-header">
              <h3>Task 2 Prompt</h3>
              <span className="prompt-meta">Academic • 40 Minutes</span>
            </div>
            
            <div className="prompt-content">
              <p>Some people believe that unpaid community service should be a compulsory part of high school programmes (for example working for a charity, improving the neighbourhood or teaching sports to younger children).</p>
              <p>To what extent do you agree or disagree?</p>
              <p>Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
            </div>
            
            <div className="prompt-instructions">
              <MessageSquareWarning size={16} className="info-icon" />
              <span>You should write at least 250 words.</span>
            </div>
          </div>
        </div>

        {/* Editor Area (Right) */}
        <div className="workspace-panel editor-panel">
          <div className="panel-inner">
            <textarea 
              className="premium-textarea"
              placeholder="Begin typing your essay here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
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
              <h5>Structure Check</h5>
              <p>Don't forget to include a clear thesis statement in your introduction.</p>
            </div>
            <div className="ai-tip">
              <h5>Vocabulary Suggestion</h5>
              <p>Instead of "good," consider using "beneficial" or "advantageous."</p>
            </div>
            <div className="ai-tip">
              <h5>Word Count Warning</h5>
              <p>You are currently under the 250-word minimum requirement. Elaborate on your examples.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
