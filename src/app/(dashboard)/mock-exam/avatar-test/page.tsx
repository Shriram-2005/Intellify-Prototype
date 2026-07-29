import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Camera, Mic } from 'lucide-react';
import './avatar-test.css';

export default function AvatarTest() {
  return (
    <div className="avatar-test-page">
      <div className="avatar-test-header">
        <Link href="/mock-exam" className="exit-btn-dark">← Leave Exam</Link>
        <span className="avatar-title">Avatar-Led Mock Test</span>
        <span className="avatar-timer">12:45</span>
      </div>

      <div className="avatar-test-main">
        {/* Examiner Video Stream */}
        <div className="examiner-view">
          <div className="video-placeholder">
            <span className="loading-spinner"></span>
            <p>Connecting to AI Examiner...</p>
          </div>
          <div className="video-label">Examiner (AI)</div>
        </div>

        {/* Student Webcam Stream */}
        <div className="student-view">
          <div className="video-placeholder student-placeholder">
            <span className="camera-icon"><Camera size={32} /></span>
          </div>
          <div className="video-label">You</div>
        </div>
      </div>

      <div className="avatar-test-controls">
        <button className="control-btn mic-btn active" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Mic size={16} /> Mute
        </button>
        <button className="control-btn end-btn">
          End Exam
        </button>
      </div>
    </div>
  );
}
