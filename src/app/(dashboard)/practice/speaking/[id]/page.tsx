"use client";

import React, { useState, use, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { ArrowLeft, Clock, Save, Send, Sparkles, ChevronRight, Mic, Play, Pause, Square, CheckCircle2, RefreshCw } from 'lucide-react';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import { createClient as createDeepgramClient, LiveTranscriptionEvents } from '@deepgram/sdk';
import { createClient } from '@/utils/supabase/client';
import './speaking.css';

export default function SpeakingPractice({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const currentId = unwrappedParams.id;
  
  const [data, setData] = useState<any>(null);
  const [testRecordId, setTestRecordId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [partKeys, setPartKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('aura-perseus-en'); // Switched male voice
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [isLoadingTTS, setIsLoadingTTS] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [connection, setConnection] = useState<any>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const microphoneRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const { timeLeft, startTimer } = useCountdownTimer(data?.time || '05:00');
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
        .eq('type', 'speaking')
        .order('slug');
      
      if (allTests) {
        setPartKeys(allTests.map(t => t.slug));
      }

      // Load specific test
      const { data: testData } = await supabase
        .from('tests')
        .select('*')
        .eq('type', 'speaking')
        .eq('slug', currentId)
        .single();

      if (testData) {
        setData({
          title: testData.title,
          meta: testData.meta,
          ...testData.content
        });
        setTestRecordId(testData.id);

        // We aren't preloading transcripts currently, because we just record.
        // But if we want to save audio to Supabase Storage later, we could load it here.
      }
      setLoading(false);
    }
    loadData();
  }, [currentId, supabase]);

  const currentIndex = partKeys.indexOf(currentId);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === partKeys.length - 1;
  const prevId = !isFirst && partKeys.length > 0 ? partKeys[currentIndex - 1] : null;
  const nextId = !isLast && partKeys.length > 0 ? partKeys[currentIndex + 1] : null;

  const playPrompt = async () => {
    if (isPlayingTTS || isLoadingTTS) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      setIsPlayingTTS(false);
      setIsLoadingTTS(false);
      return;
    }
    
    // strip HTML for text
    const text = data?.promptHtml ? data.promptHtml.replace(/<[^>]+>/g, ' ') : "Please read the prompt.";
    
    setIsLoadingTTS(true);
    abortControllerRef.current = new AbortController();
    
    try {
      const response = await fetch('/api/deepgram/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, model: selectedVoice }),
        signal: abortControllerRef.current.signal
      });
      
      setIsLoadingTTS(false);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        
        setIsPlayingTTS(true);
        audio.onended = () => setIsPlayingTTS(false);
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Audio playback interrupted:", error);
            setIsPlayingTTS(false);
          });
        }
        audioRef.current = audio;
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('TTS request aborted by user.');
      } else {
        console.error(err);
      }
      setIsLoadingTTS(false);
      setIsPlayingTTS(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSTT();
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      startSTT();
    } else {
      stopSTT();
    }
  }, [isRecording]);

  const startSTT = async () => {
    setTranscript('');
    try {
      const tokenRes = await fetch('/api/deepgram/token');
      const { key } = await tokenRes.json();
      if (!key) throw new Error('No token');
      
      const deepgram = createDeepgramClient(key);
      const conn = deepgram.listen.live({ model: 'nova-2', language: 'en', smart_format: true });
      
      conn.on(LiveTranscriptionEvents.Open, () => console.log('Deepgram STT connection opened.'));
      conn.on(LiveTranscriptionEvents.Close, () => console.log('Deepgram STT connection closed.'));
      conn.on(LiveTranscriptionEvents.Error, (err: any) => console.error('Deepgram STT error:', err));
      
      conn.on(LiveTranscriptionEvents.Transcript, (data: any) => {
        const sentence = data.channel.alternatives[0].transcript;
        if (sentence && data.is_final) {
          setTranscript(prev => prev + (prev ? ' ' : '') + sentence);
        }
      });

      setConnection(conn);

      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        startTimer();
      } catch (err) {
        console.error('Microphone access denied:', err);
        alert("Microphone access was denied. Please allow microphone access in your browser settings to use the Speaking practice feature.");
        setIsRecording(false);
        return;
      }
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          if (conn.getReadyState() === 1) {
            conn.send(event.data);
          }
        }
      };
      
      mediaRecorder.start(250);
      microphoneRef.current = mediaRecorder;

    } catch (err) {
      console.error('STT Error:', err);
      setIsRecording(false);
    }
  };

  const stopSTT = () => {
    if (microphoneRef.current) {
      microphoneRef.current.stop();
      microphoneRef.current.stream.getTracks().forEach(t => t.stop());
      microphoneRef.current = null;
    }
    if (connection) {
      connection.requestClose();
      setConnection(null);
    }
  };

  const handleSaveAudio = async () => {
    if (audioChunksRef.current.length === 0) {
      alert("No audio recorded yet! Start speaking to record audio.");
      return;
    }

    if (!userId || !testRecordId) {
      alert("Please log in to save your progress.");
      return;
    }

    const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    
    // For now we just download it, but later we can upload to Supabase Storage
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `speaking-${currentId}-recording.webm`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    
    // Check if response already exists and save transcript
    const { data: existing } = await supabase
      .from('user_responses')
      .select('id')
      .eq('test_id', testRecordId)
      .eq('user_id', userId)
      .single();

    if (existing) {
      await supabase
        .from('user_responses')
        .update({ answer_data: { transcript } })
        .eq('id', existing.id);
    } else {
      await supabase
        .from('user_responses')
        .insert([{
          user_id: userId,
          test_id: testRecordId,
          module_type: 'speaking',
          answer_data: { transcript }
        }]);
    }
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
          <span className="task-title">Speaking {unwrappedParams.id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
        </div>
        
        <div className="header-center">
          <div className="timer-pill">
            <Clock size={16} className="timer-icon" />
            <span className="timer-text">{timeLeft}</span>
          </div>
        </div>
        
        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button variant="ghost" className="header-btn" onClick={handleSaveAudio}><Save size={16} style={{ marginRight: '6px' }} /> Save Audio</Button>
          
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
            <Link href={`/practice/speaking/${prevId}`}>
              <Button variant="ghost" className="header-btn"><ArrowLeft size={16} style={{ marginRight: '6px' }} /> Previous</Button>
            </Link>
          ) : (
            <Button variant="ghost" className="header-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}><ArrowLeft size={16} style={{ marginRight: '6px' }} /> Previous</Button>
          )}
          
          {nextId ? (
            <Link href={`/practice/speaking/${nextId}`}>
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
            <div className="prompt-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3>{data.title}</h3>
                <span className="prompt-meta">{data.meta}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', background: 'var(--border-subtle)', padding: '4px', borderRadius: '8px', gap: '4px' }}>
                  <button 
                    onClick={() => setSelectedVoice('aura-perseus-en')}
                    style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', border: 'none', background: selectedVoice === 'aura-perseus-en' ? 'var(--pure-white)' : 'transparent', color: selectedVoice === 'aura-perseus-en' ? 'var(--pure-black)' : 'var(--gray-text)', fontWeight: selectedVoice === 'aura-perseus-en' ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s', boxShadow: selectedVoice === 'aura-perseus-en' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}
                  >
                    Examiner 1 (Male)
                  </button>
                  <button 
                    onClick={() => setSelectedVoice('aura-2-thalia-en')}
                    style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', border: 'none', background: selectedVoice === 'aura-2-thalia-en' ? 'var(--pure-white)' : 'transparent', color: selectedVoice === 'aura-2-thalia-en' ? 'var(--pure-black)' : 'var(--gray-text)', fontWeight: selectedVoice === 'aura-2-thalia-en' ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s', boxShadow: selectedVoice === 'aura-2-thalia-en' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}
                  >
                    Examiner 2 (Female)
                  </button>
                </div>
                <Button variant="outline" onClick={playPrompt} style={{ padding: '6px 12px', fontSize: '13px', minWidth: '180px', display: 'flex', justifyContent: 'center' }}>
                  {isLoadingTTS ? (
                    <><Clock size={14} style={{ marginRight: '6px' }} className="animate-pulse" /> Loading Audio...</>
                  ) : isPlayingTTS ? (
                    <><Square size={14} style={{ marginRight: '6px' }} color="#E74C3C" /> Stop Examiner</>
                  ) : (
                    <><Play size={14} style={{ marginRight: '6px' }} /> Listen to Examiner</>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="prompt-content cue-card">
              {data.promptHtml ? (
                <div dangerouslySetInnerHTML={{ __html: data.promptHtml }} />
              ) : (
                <p>No content available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Audio Recording / Avatar Area (Right) */}
        <div className="workspace-panel editor-panel speaking-panel">
          <div className="panel-inner speaking-inner">
            <div className="avatar-wrapper">
              <div className={`examiner-avatar ${isRecording ? 'recording' : ''}`}>
                {isRecording && <div className="recording-pulse"></div>}
                {isRecording && <div className="recording-pulse delay-1"></div>}
                {isRecording && <div className="recording-pulse delay-2"></div>}
                <Mic size={64} className="mic-icon" style={{ position: 'relative', zIndex: 10, color: isRecording ? '#E74C3C' : 'var(--mid-gray)', transition: 'color 0.3s' }} />
              </div>
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
            <p className="live-transcript">
              {transcript || (isRecording ? "Listening..." : "Your speech transcript will appear here.")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
