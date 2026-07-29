import React from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import './videos.css';

export default function VideoPlayer({ params }: { params: { id: string } }) {
  return (
    <div className="video-tutorial-page">
      <div className="video-main">
        {/* Video Player Area */}
        <div className="video-player-container">
          <div className="video-placeholder">
            <span className="play-icon">▶️</span>
          </div>
          <div className="video-controls">
            <span>0:00 / 15:30</span>
            <div className="video-settings">
              <span>1x</span>
              <span>CC</span>
              <span>⚙️</span>
            </div>
          </div>
        </div>

        <div className="video-info">
          <h2>Mastering the IELTS Reading True/False/Not Given</h2>
          <p>Learn the exact strategy to identify the difference between False and Not Given.</p>
        </div>

        {/* Notes Panel */}
        <Card className="notes-panel">
          <h3>My Notes</h3>
          <textarea className="notes-textarea" placeholder="Jot down important tips here..."></textarea>
          <Button variant="secondary">Save Notes</Button>
        </Card>
      </div>

      <div className="video-sidebar">
        <h3>Reading Module</h3>
        <ul className="playlist">
          <li className="playlist-item active">
            <span className="check-icon">✓</span>
            <div className="playlist-info">
              <h4>Mastering True/False/Not Given</h4>
              <span>15:30</span>
            </div>
          </li>
          <li className="playlist-item">
            <div className="playlist-info">
              <h4>Skimming and Scanning Strategies</h4>
              <span>12:45</span>
            </div>
          </li>
          <li className="playlist-item">
            <div className="playlist-info">
              <h4>Matching Headings Effectively</h4>
              <span>18:20</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
