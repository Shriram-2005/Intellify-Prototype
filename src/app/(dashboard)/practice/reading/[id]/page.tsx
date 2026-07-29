"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { ArrowLeft, Clock, Save, Send, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import './reading.css';

export default function ReadingPractice({ params }: { params: { id: string } }) {
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
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
          <span className="task-title">Reading Passage 1</span>
        </div>
        
        <div className="header-center">
          <div className="timer-pill">
            <Clock size={16} className="timer-icon" />
            <span className="timer-text">20:00</span>
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
        {/* Reading Passage Area (Left) */}
        <div className="workspace-panel prompt-panel">
          <div className="panel-inner passage-inner">
            <div className="prompt-header">
              <h3>The Secret Life of Trees</h3>
              <span className="prompt-meta">Academic Reading • Passage 1</span>
            </div>
            
            <div className="prompt-content passage-content">
              <p>For centuries, trees have been regarded merely as the silent, solitary giants of the natural world. However, recent ecological research has revolutionized our understanding of arboreal communities, revealing a complex, interconnected web of communication and resource sharing that challenges our fundamental perception of forest ecosystems.</p>
              <p>At the heart of this hidden network is the mycorrhizal network, often playfully referred to by scientists as the "Wood Wide Web." This intricate system consists of underground fungal threads known as mycelium, which colonize the roots of trees and other plants. Through this symbiotic relationship, trees are able to exchange vital nutrients, water, and even chemical warning signals.</p>
              <p>Dr. Suzanne Simard, a pioneer in forest ecology, demonstrated that older, more established trees—often termed "Mother Trees"—use this fungal network to supply younger, shaded saplings with excess carbon, effectively keeping them alive in light-deprived understories. Furthermore, when a tree is under attack by pests, it can transmit distress signals through the mycelium, prompting neighboring trees to preemptively ramp up their defensive enzymes.</p>
            </div>
          </div>
        </div>

        {/* Questions Area (Right) */}
        <div className="workspace-panel editor-panel questions-panel">
          <div className="panel-inner questions-inner">
            
            <div className="questions-header">
              <h4>Questions 1-5</h4>
              <p>Do the following statements agree with the information given in Reading Passage 1?</p>
            </div>

            <div className="questions-list">
              {[
                { num: 1, text: "Trees are now known to communicate and share resources with one another." },
                { num: 2, text: "The 'Wood Wide Web' is a system consisting entirely of tree roots touching each other." },
                { num: 3, text: "Mother Trees prioritize their own survival over supplying saplings with carbon." }
              ].map((q) => (
                <div className="question-item" key={q.num}>
                  <div className="question-text">
                    <strong>{q.num}.</strong> {q.text}
                  </div>
                  <div className="mcq-options">
                    {['True', 'False', 'Not Given'].map(opt => (
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
                <span>AI Highlighter</span>
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
              <h5>Scanning Tip</h5>
              <p>For Question 2, scan paragraph 2 for the keywords "Wood Wide Web" and check what it actually consists of.</p>
            </div>
            <div className="ai-tip">
              <h5>True vs Not Given</h5>
              <p>Remember: 'False' means the passage contradicts the statement. 'Not Given' means the information simply isn't there.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
