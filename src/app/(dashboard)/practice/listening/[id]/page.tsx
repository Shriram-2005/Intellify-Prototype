"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { ArrowLeft, Clock, Save, Send, Sparkles, ChevronRight, Play, Pause, Volume2, CheckCircle2 } from 'lucide-react';
import './listening.css';

const mockListeningData: Record<string, any> = {
  'section-1': {
    title: 'Everyday Social Conversation',
    meta: 'Audio Clip • 5 Minutes',
    context: 'A customer is calling a local sports center to inquire about membership options and classes.',
    visualText: '[ Booking Form ]',
    questionsTitle: 'Questions 1-3',
    questionsDesc: 'Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
    questions: [
      { num: 1, text: "Customer Name: John ____", isFill: true },
      { num: 2, text: "Preferred class: ____ Yoga", isFill: true },
      { num: 3, text: "Membership start date: 15th ____", isFill: true }
    ]
  },
  'section-2': {
    title: 'Social Monologue',
    meta: 'Audio Clip • 5 Minutes',
    context: 'A tour guide is giving a welcome talk to a group of tourists visiting a historical museum.',
    visualText: '[ Map of the Museum ]',
    questionsTitle: 'Questions 11-13',
    questionsDesc: 'Label the map below. Choose the correct letter A, B, or C.',
    questions: [
      { num: 11, text: "Gift Shop", options: ['A', 'B', 'C'] },
      { num: 12, text: "Cafeteria", options: ['A', 'B', 'C'] },
      { num: 13, text: "Exhibition Hall", options: ['A', 'B', 'C'] }
    ]
  },
  'section-3': {
    title: 'Academic Discussion',
    meta: 'Audio Clip • 4 Minutes',
    context: 'Two university students, Emma and Liam, are discussing their upcoming group project on urban architecture with their tutor, Dr. Harrison.',
    visualText: '[ Diagram of City Layout ]',
    questionsTitle: 'Questions 21-23',
    questionsDesc: 'Choose the correct letter, A, B, or C.',
    questions: [
      { num: 21, text: "What aspect of the project are the students struggling with?", options: ["A. Finding reliable sources", "B. Agreeing on a specific topic", "C. Managing their time effectively"] },
      { num: 22, text: "Dr. Harrison suggests that they focus their research on...", options: ["A. Modern eco-friendly buildings", "B. Historical preservation techniques", "C. The impact of transportation on city planning"] },
      { num: 23, text: "Emma believes the most important factor in urban planning is...", options: ["A. Green spaces", "B. Public transport", "C. Affordable housing"] }
    ]
  },
  'section-4': {
    title: 'Academic Lecture',
    meta: 'Audio Clip • 6 Minutes',
    context: 'A university professor is giving a lecture on the behavioral patterns of deep-sea marine life.',
    visualText: '[ Ocean Depth Chart ]',
    questionsTitle: 'Questions 31-33',
    questionsDesc: 'Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.',
    questions: [
      { num: 31, text: "Bioluminescence is used by many species to attract ____.", isFill: true },
      { num: 32, text: "The primary source of food at extreme depths is known as marine ____.", isFill: true },
      { num: 33, text: "Giant squids possess the largest ____ in the animal kingdom.", isFill: true }
    ]
  }
};

export default function ListeningPractice({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);

  const currentId = unwrappedParams.id;
  const data = mockListeningData[currentId] || mockListeningData['section-1'];
  
  const sectionKeys = Object.keys(mockListeningData);
  const currentIndex = sectionKeys.indexOf(currentId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sectionKeys.length - 1;
  const prevId = !isFirst ? sectionKeys[currentIndex - 1] : null;
  const nextId = !isLast ? sectionKeys[currentIndex + 1] : null;
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
          <span className="task-title">Listening {unwrappedParams.id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
        </div>
        
        <div className="header-center">
          <div className="timer-pill">
            <Clock size={16} className="timer-icon" />
            <span className="timer-text">15:00</span>
          </div>
        </div>
        
        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="word-count-pill" style={{ marginRight: '8px' }}>
            <span className="count count-good">{Object.keys(selectedAnswers).length}</span> / 5 Answered
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
            <Link href={`/practice/listening/${prevId}`}>
              <Button variant="ghost" className="header-btn"><ArrowLeft size={16} style={{ marginRight: '6px' }} /> Previous</Button>
            </Link>
          )}
          
          {nextId ? (
            <Link href={`/practice/listening/${nextId}`}>
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
        {/* Audio Player & Context Area (Left) */}
        <div className="workspace-panel prompt-panel">
          <div className="panel-inner passage-inner">
            <div className="prompt-header">
              <h3>{data.title}</h3>
              <span className="prompt-meta">{data.meta}</span>
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
              <p>{data.context}</p>
              
              <div className="visual-aid">
                <div className="diagram-placeholder">
                  <span>{data.visualText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Area (Right) */}
        <div className="workspace-panel editor-panel questions-panel">
          <div className="panel-inner questions-inner">
            
            <div className="questions-header">
              <h4>{data.questionsTitle}</h4>
              <p>{data.questionsDesc}</p>
            </div>

            <div className="questions-list">
              {data.questions.map((q: any) => (
                <div className="question-item" key={q.num}>
                  <div className="question-text">
                    <strong>{q.num}.</strong> {q.text}
                  </div>
                  {q.isFill ? (
                    <div className="mcq-options">
                      <input 
                        type="text" 
                        placeholder="Type your answer here..."
                        className="text-input-answer"
                        value={selectedAnswers[q.num] || ''}
                        onChange={(e) => handleSelect(q.num, e.target.value)}
                        style={{ padding: '12px', width: '100%', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)', color: 'var(--text-main)', marginTop: '8px' }}
                      />
                    </div>
                  ) : (
                    <div className="mcq-options">
                      {q.options.map((opt: string) => (
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
                  )}
                </div>
              ))}
            </div>

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
