"use client";

import React, { useState, use, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { ArrowLeft, Clock, Save, Send, Sparkles, ChevronRight, MessageSquareWarning, CheckCircle2, RefreshCw } from 'lucide-react';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import { createClient } from '@/utils/supabase/client';
import './writing.css';

export default function WritingPractice({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const currentId = unwrappedParams.id;
  
  const [data, setData] = useState<any>(null);
  const [testRecordId, setTestRecordId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [taskKeys, setTaskKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState('');
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  // default time if data isn't loaded yet
  const { timeLeft, startTimer } = useCountdownTimer(data?.time || '40:00');

  const supabase = createClient();

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
        .eq('type', 'writing')
        .order('slug');
      
      if (allTests) {
        setTaskKeys(allTests.map(t => t.slug));
      }

      // Load specific test
      const { data: testData } = await supabase
        .from('tests')
        .select('*')
        .eq('type', 'writing')
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
            setText(savedResponse.answer_data as string);
          }
        }
      }
      setLoading(false);
    }
    loadData();
  }, [currentId, supabase]);

  const currentIndex = taskKeys.indexOf(currentId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === taskKeys.length - 1;
  const prevId = !isFirst && taskKeys.length > 0 ? taskKeys[currentIndex - 1] : null;
  const nextId = !isLast && taskKeys.length > 0 ? taskKeys[currentIndex + 1] : null;

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
        .update({ answer_data: text })
        .eq('id', existing.id);
    } else {
      // Insert
      await supabase
        .from('user_responses')
        .insert([{
          user_id: userId,
          test_id: testRecordId,
          module_type: 'writing',
          answer_data: text
        }]);
    }
    
    alert('Progress saved to database successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    startTimer();
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

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
          <span className="task-title">Writing {unwrappedParams.id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
        </div>
        
        <div className="header-center">
          <div className="timer-pill">
            <Clock size={16} className="timer-icon" />
            <span className="timer-text">{timeLeft}</span>
          </div>
        </div>
        
        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="word-count-pill" style={{ marginRight: '8px' }}>
            <span className={`count ${wordCount >= (data.minWords || 150) ? 'count-good' : ''}`}>{wordCount}</span> / {data.minWords || 150} words
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
                <span>AI Live Tips</span>
                <ChevronRight size={14} className="ai-chevron" />
              </button>
            </BorderGlow>
          </div>

          {prevId ? (
            <Link href={`/practice/writing/${prevId}`}>
              <Button variant="ghost" className="header-btn"><ArrowLeft size={16} style={{ marginRight: '6px' }} /> Previous</Button>
            </Link>
          ) : (
            <Button variant="ghost" className="header-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}><ArrowLeft size={16} style={{ marginRight: '6px' }} /> Previous</Button>
          )}
          
          {nextId ? (
            <Link href={`/practice/writing/${nextId}`}>
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
        {/* Prompt Area (Left) */}
        <div className="workspace-panel prompt-panel">
          <div className="panel-inner">
            <div className="prompt-header">
              <h3>{data.title}</h3>
              <span className="prompt-meta">{data.meta}</span>
            </div>
            
            <div className="prompt-content">
              {data.promptHtml ? (
                <div dangerouslySetInnerHTML={{ __html: data.promptHtml }} />
              ) : (
                data.paragraphs?.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))
              )}

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
              <span>You should write at least {data.minWords || 150} words.</span>
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
              onChange={handleChange}
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
              <p>You are currently under the minimum requirement. Elaborate on your examples.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
