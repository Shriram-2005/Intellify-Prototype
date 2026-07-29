"use client";

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { Bell, Lock, Globe, Sparkles } from 'lucide-react';
import './profile.css';

export default function ProfilePage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>My Profile & Settings</h2>
        <p>Manage your account details, preferences, and privacy settings.</p>
      </div>

      <div className="profile-grid">
        <div className="profile-main-column">
          <Card className="profile-card premium-card">
            <div className="profile-card-top">
              <BorderGlow
                edgeSensitivity={30}
                glowColor="0 80% 50%"
                backgroundColor="var(--background)"
                borderRadius={64}
                glowRadius={20}
                glowIntensity={1}
                coneSpread={25}
                animated={true}
                colors={['#3498db', '#2980b9', '#74b9ff']}
              >
                <div className="avatar-large glowing-avatar">
                  SJ
                </div>
              </BorderGlow>
              
              <div className="profile-info-header">
                <h3>Student John</h3>
                <span className="member-status"><Sparkles size={14} /> Premium Member</span>
                <Button variant="outline" className="change-avatar-btn">Change Avatar</Button>
              </div>
            </div>
            
            <form className="profile-form">
              <div className="form-group">
                <Input label="Full Name" defaultValue="Student John" />
              </div>
              <div className="form-group">
                <Input label="Email Address" type="email" defaultValue="student.john@example.com" />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <Input label="Nationality" defaultValue="India" />
                </div>
                <div className="form-group">
                  <Input label="Target Band Score" defaultValue="8.0" />
                </div>
              </div>
              
              <div className="form-group">
                <Input label="Target Exam Date" type="date" />
              </div>
              
              <div className="form-actions">
                <Button variant="primary">Save Changes</Button>
              </div>
            </form>
          </Card>
        </div>

        <div className="profile-sidebar-column">
          <Card className="settings-card premium-card">
            <div className="settings-header">
              <Bell size={20} className="settings-icon" />
              <h3>Notifications</h3>
            </div>
            
            <div className="setting-row">
              <div className="setting-info">
                <h4>Email Alerts</h4>
                <p>Receive weekly progress reports and updates.</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={emailAlerts} 
                  onChange={(e) => setEmailAlerts(e.target.checked)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            
            <div className="setting-row">
              <div className="setting-info">
                <h4>SMS Reminders</h4>
                <p>Get text reminders for upcoming mock exams.</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={smsAlerts} 
                  onChange={(e) => setSmsAlerts(e.target.checked)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </Card>

          <Card className="settings-card premium-card">
            <div className="settings-header">
              <Globe size={20} className="settings-icon" />
              <h3>Preferences</h3>
            </div>
            
            <div className="setting-row">
              <div className="setting-info">
                <h4>AI Recommendations</h4>
                <p>Allow AI to suggest study plans based on performance.</p>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={aiSuggestions} 
                  onChange={(e) => setAiSuggestions(e.target.checked)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </Card>

          <Card className="settings-card premium-card">
            <div className="settings-header">
              <Lock size={20} className="settings-icon" />
              <h3>Security</h3>
            </div>
            <p className="security-desc">Ensure your account is secure. Update your password if you suspect unauthorized access.</p>
            <Button variant="outline" fullWidth>Change Password</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
