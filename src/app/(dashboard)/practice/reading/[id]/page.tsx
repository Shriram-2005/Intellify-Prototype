"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { ArrowLeft, Clock, Save, Send, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import './reading.css';

const mockReadingData: Record<string, any> = {
  'passage-1': {
    title: 'The Secret Life of Trees',
    meta: 'Academic Reading • Passage 1',
    paragraphs: [
      'For centuries, trees have been regarded merely as the silent, solitary giants of the natural world. However, recent ecological research has revolutionized our understanding of arboreal communities, revealing a complex, interconnected web of communication and resource sharing that challenges our fundamental perception of forest ecosystems.',
      'At the heart of this hidden network is the mycorrhizal network, often playfully referred to by scientists as the "Wood Wide Web." This intricate system consists of underground fungal threads known as mycelium, which colonize the roots of trees and other plants. Through this symbiotic relationship, trees are able to exchange vital nutrients, water, and even chemical warning signals.',
      'Dr. Suzanne Simard, a pioneer in forest ecology, demonstrated that older, more established trees—often termed "Mother Trees"—use this fungal network to supply younger, shaded saplings with excess carbon, effectively keeping them alive in light-deprived understories. Furthermore, when a tree is under attack by pests, it can transmit distress signals through the mycelium, prompting neighboring trees to preemptively ramp up their defensive enzymes.'
    ],
    questionsTitle: 'Questions 1-3',
    questionsDesc: 'Do the following statements agree with the information given in Reading Passage 1?',
    questions: [
      { num: 1, text: "Trees are now known to communicate and share resources with one another." },
      { num: 2, text: "The 'Wood Wide Web' is a system consisting entirely of tree roots touching each other." },
      { num: 3, text: "Mother Trees prioritize their own survival over supplying saplings with carbon." }
    ]
  },
  'passage-2': {
    title: 'The History of the Printing Press',
    meta: 'Academic Reading • Passage 2',
    paragraphs: [
      'The invention of the printing press by Johannes Gutenberg in the 15th century is widely regarded as one of the most significant events in human history. Prior to its invention, books were meticulously copied by hand, making them rare and prohibitively expensive. The printing press democratized knowledge by allowing for the mass production of books.',
      'Gutenberg’s key innovation was the use of movable metal type. Unlike woodblock printing, which required a new block to be carved for every page, movable type allowed individual letters to be rearranged and reused. This drastically reduced the time and cost required to produce printed materials.',
      'The impact of the printing press was profound. It fueled the Renaissance, accelerated the scientific revolution, and played a crucial role in the Protestant Reformation by allowing religious texts to be widely distributed in vernacular languages.'
    ],
    questionsTitle: 'Questions 4-6',
    questionsDesc: 'Choose the correct letter, A, B, C or D.',
    questions: [
      { num: 4, text: "Before the printing press, books were...", isMCQ: true, options: ['Cheap and accessible', 'Written in English', 'Copied by hand', 'Printed using woodblocks'] },
      { num: 5, text: "Gutenberg's key innovation was...", isMCQ: true, options: ['Woodblock printing', 'Movable metal type', 'The alphabet', 'The Renaissance'] },
      { num: 6, text: "The printing press helped fuel...", isMCQ: true, options: ['The industrial revolution', 'The Protestant Reformation', 'The middle ages', 'Agriculture'] }
    ]
  },
  'passage-3': {
    title: 'Artificial Intelligence in Medicine',
    meta: 'Academic Reading • Passage 3',
    paragraphs: [
      'Artificial intelligence (AI) is rapidly transforming the field of medicine, offering unprecedented opportunities for improving patient care, accelerating medical research, and optimizing healthcare operations. One of the most promising applications of AI is in medical imaging, where machine learning algorithms can analyze X-rays, MRIs, and CT scans with a level of accuracy that often rivals or exceeds that of human radiologists.',
      'AI is also playing a critical role in drug discovery. Traditionally, bringing a new drug to market can take over a decade and cost billions of dollars. AI can significantly expedite this process by analyzing vast datasets of chemical compounds and predicting their efficacy and potential side effects, thereby identifying promising drug candidates much faster than traditional methods.',
      'Despite these advancements, the integration of AI in healthcare is not without challenges. Issues such as data privacy, algorithmic bias, and the need for rigorous clinical validation must be addressed. Moreover, the role of the physician remains indispensable, as AI is best utilized as an augmentative tool rather than a replacement for human judgment and empathy.'
    ],
    questionsTitle: 'Questions 7-9',
    questionsDesc: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
    questions: [
      { num: 7, text: "AI algorithms can analyze medical images with high ____.", isFill: true },
      { num: 8, text: "In drug discovery, AI can identify promising ____ much faster.", isFill: true },
      { num: 9, text: "AI should be used as an augmentative tool rather than a replacement for human ____.", isFill: true }
    ]
  }
};

export default function ReadingPractice({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  
  const currentId = unwrappedParams.id;
  const data = mockReadingData[currentId] || mockReadingData['passage-1'];
  
  const passageKeys = Object.keys(mockReadingData);
  const currentIndex = passageKeys.indexOf(currentId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === passageKeys.length - 1;
  const prevId = !isFirst ? passageKeys[currentIndex - 1] : null;
  const nextId = !isLast ? passageKeys[currentIndex + 1] : null;
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
          <span className="task-title">Reading {unwrappedParams.id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
        </div>
        
        <div className="header-center">
          <div className="timer-pill">
            <Clock size={16} className="timer-icon" />
            <span className="timer-text">20:00</span>
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
                <span>AI Highlighter</span>
                <ChevronRight size={14} className="ai-chevron" />
              </button>
            </BorderGlow>
          </div>

          {prevId && (
            <Link href={`/practice/reading/${prevId}`}>
              <Button variant="ghost" className="header-btn"><ArrowLeft size={16} style={{ marginRight: '6px' }} /> Previous</Button>
            </Link>
          )}
          
          {nextId ? (
            <Link href={`/practice/reading/${nextId}`}>
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
        {/* Reading Passage Area (Left) */}
        <div className="workspace-panel prompt-panel">
          <div className="panel-inner passage-inner">
            <div className="prompt-header">
              <h3>{data.title}</h3>
              <span className="prompt-meta">{data.meta}</span>
            </div>
            
            <div className="prompt-content passage-content">
              {data.paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
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
                      {(q.options || ['True', 'False', 'Not Given']).map((opt: string) => (
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
