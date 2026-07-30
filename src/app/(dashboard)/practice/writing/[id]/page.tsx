"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { ArrowLeft, Clock, Save, Send, Sparkles, ChevronRight, MessageSquareWarning, CheckCircle2 } from 'lucide-react';
import './writing.css';

const mockWritingData: Record<string, any> = {
  'task-1': {
    title: 'Task 1 Prompt',
    meta: 'Academic • 20 Minutes',
    paragraphs: [
      'The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying full-time or part-time.',
      'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.'
    ],
    minWords: 150,
    time: '20:00',
    visualText: '[ Bar Chart: Men and Women in Further Education ]'
  },
  'task-2': {
    title: 'Task 2 Prompt',
    meta: 'Academic • 40 Minutes',
    paragraphs: [
      'Some people believe that unpaid community service should be a compulsory part of high school programmes (for example working for a charity, improving the neighbourhood or teaching sports to younger children).',
      'To what extent do you agree or disagree?',
      'Give reasons for your answer and include any relevant examples from your own knowledge or experience.'
    ],
    minWords: 250,
    time: '40:00'
  }
};

export default function WritingPractice({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);

  const currentId = unwrappedParams.id;
  const data = mockWritingData[currentId] || mockWritingData['task-2'];
  
  const taskKeys = Object.keys(mockWritingData);
  const currentIndex = taskKeys.indexOf(currentId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === taskKeys.length - 1;
  const prevId = !isFirst ? taskKeys[currentIndex - 1] : null;
  const nextId = !isLast ? taskKeys[currentIndex + 1] : null;
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
          <span className="task-title">Writing {unwrappedParams.id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
        </div>
        
        <div className="header-center">
          <div className="timer-pill">
            <Clock size={16} className="timer-icon" />
            <span className="timer-text">{data.time}</span>
          </div>
        </div>
        
        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="word-count-pill" style={{ marginRight: '8px' }}>
            <span className={`count ${wordCount >= data.minWords ? 'count-good' : ''}`}>{wordCount}</span> / {data.minWords} words
          </div>
          
          <Button variant="ghost" className="header-btn"><Save size={16} style={{ marginRight: '6px' }} /> Save</Button>
          
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
            <Link href={`/practice/writing/${prevId}`}>
              <Button variant="ghost" className="header-btn"><ArrowLeft size={16} style={{ marginRight: '6px' }} /> Previous</Button>
            </Link>
          )}
          
          {nextId ? (
            <Link href={`/practice/writing/${nextId}`}>
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
            
            <div className="prompt-content">
              {data.paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
              {data.visualText && (
                <div className="visual-aid" style={{ marginTop: '20px' }}>
                  <div className="diagram-placeholder" style={{ padding: '40px', background: 'var(--bg-subtle)', borderRadius: '12px', border: '1px dashed var(--border-subtle)', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <span>{data.visualText}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="prompt-instructions">
              <MessageSquareWarning size={16} className="info-icon" />
              <span>You should write at least {data.minWords} words.</span>
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
