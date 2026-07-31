"use client";

import React, { useState, use, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { ArrowLeft, Clock, Save, Send, Sparkles, ChevronRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import { createClient } from '@/utils/supabase/client';
import './reading.css';

export default function ReadingPractice({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const currentId = unwrappedParams.id;
  
  const [data, setData] = useState<any>(null);
  const [testRecordId, setTestRecordId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [passageKeys, setPassageKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const { timeLeft, startTimer } = useCountdownTimer('20:00');

  const supabase = createClient();

  // Load from Supabase
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const { data: userAuth } = await supabase.auth.getUser();
      if (userAuth?.user) {
        setUserId(userAuth.user.id);
      }

      // Load all slugs for pagination
      const { data: allTests } = await supabase
        .from('tests')
        .select('slug')
        .eq('type', 'reading')
        .order('slug');
      
      if (allTests) {
        setPassageKeys(allTests.map(t => t.slug));
      }

      // Load specific test
      const { data: testData } = await supabase
        .from('tests')
        .select('*')
        .eq('type', 'reading')
        .eq('slug', currentId)
        .single();

      if (testData) {
        setData({
          title: testData.title,
          meta: testData.meta,
          ...testData.content
        });
        setTestRecordId(testData.id);

        // Load saved answers for this user
        if (userAuth?.user) {
          const { data: savedResponse } = await supabase
            .from('user_responses')
            .select('answer_data')
            .eq('test_id', testData.id)
            .eq('user_id', userAuth.user.id)
            .single();

          if (savedResponse && savedResponse.answer_data) {
            setSelectedAnswers(savedResponse.answer_data);
          }
        }
      }
      setLoading(false);
    }
    loadData();
  }, [currentId, supabase]);

  const currentIndex = passageKeys.indexOf(currentId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === passageKeys.length - 1;
  const prevId = !isFirst && passageKeys.length > 0 ? passageKeys[currentIndex - 1] : null;
  const nextId = !isLast && passageKeys.length > 0 ? passageKeys[currentIndex + 1] : null;

  const handleSave = async () => {
    if (!userId || !testRecordId) {
      alert("Please log in to save your progress.");
      return;
    }

    // Check if response already exists
    const { data: existing } = await supabase
      .from('user_responses')
      .select('id')
      .eq('test_id', testRecordId)
      .eq('user_id', userId)
      .single();

    if (existing) {
      // Update
      await supabase
        .from('user_responses')
        .update({ answer_data: selectedAnswers })
        .eq('id', existing.id);
    } else {
      // Insert
      await supabase
        .from('user_responses')
        .insert([{
          user_id: userId,
          test_id: testRecordId,
          module_type: 'reading',
          answer_data: selectedAnswers
        }]);
    }
    
    alert('Progress saved to database successfully!');
  };

  const handleSelect = (qNum: number, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qNum]: answer }));
    startTimer();
  };

  if (loading) {
    return (
      <div className="practice-workspace" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'var(--mid-gray)' }}>
          <RefreshCw size={32} className="spin" />
          <p>Loading test from database...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="practice-workspace" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p>Test not found.</p>
      </div>
    );
  }

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
            <span className="timer-text">{timeLeft}</span>
          </div>
        </div>
        
        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="word-count-pill" style={{ marginRight: '8px' }}>
            <span className="count count-good">{Object.keys(selectedAnswers).length}</span> / {data.questions?.length || 0} Answered
          </div>
          
          <Button variant="ghost" className="header-btn" onClick={handleSave}><Save size={16} style={{ marginRight: '6px' }} /> Save</Button>
          
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

          {prevId ? (
            <Link href={`/practice/reading/${prevId}`}>
              <Button variant="ghost" className="header-btn"><ArrowLeft size={16} style={{ marginRight: '6px' }} /> Previous</Button>
            </Link>
          ) : (
            <Button variant="ghost" className="header-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}><ArrowLeft size={16} style={{ marginRight: '6px' }} /> Previous</Button>
          )}
          
          {nextId ? (
            <Link href={`/practice/reading/${nextId}`}>
              <Button variant="primary" className="header-btn" style={{ background: 'var(--primary-red)' }}>Next <ChevronRight size={16} style={{ marginLeft: '6px' }} /></Button>
            </Link>
          ) : (
            <Button variant="primary" className="header-btn" disabled style={{ background: 'var(--primary-red)', opacity: 0.5, cursor: 'not-allowed' }}>Next <ChevronRight size={16} style={{ marginLeft: '6px' }} /></Button>
          )}

          {!nextId ? (
            <Link href={`/dashboard`}>
              <Button variant="primary" className="header-btn submit-btn" style={{ background: 'var(--success-color)' }}>Submit Test <CheckCircle2 size={16} style={{ marginLeft: '6px' }} /></Button>
            </Link>
          ) : (
            <Button variant="primary" className="header-btn submit-btn" disabled style={{ background: 'var(--success-color)', opacity: 0.5, cursor: 'not-allowed' }}>Submit Test <CheckCircle2 size={16} style={{ marginLeft: '6px' }} /></Button>
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
              {data.paragraphs?.map((p: string, i: number) => (
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
              {data.questions?.map((q: any) => (
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
