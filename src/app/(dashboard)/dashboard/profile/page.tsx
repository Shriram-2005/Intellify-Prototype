"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { Bell, Lock, Globe, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import './profile.css';

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  
  // Profile Fields
  const [fullName, setFullName] = useState('');
  const [nationality, setNationality] = useState('');
  const [targetBandScore, setTargetBandScore] = useState('');
  const [targetExamDate, setTargetExamDate] = useState('');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  
  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setEmail(user.email);
        setUserId(user.id);
        
        // Load profile from DB
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profile) {
          setFullName(profile.full_name || '');
          setNationality(profile.nationality || '');
          setTargetBandScore(profile.target_band_score ? String(profile.target_band_score) : '');
          setTargetExamDate(profile.target_exam_date || '');
          setEmailAlerts(profile.email_alerts ?? true);
          setSmsAlerts(profile.sms_alerts ?? false);
          setAiSuggestions(profile.ai_suggestions ?? true);
        }
      }
      setLoading(false);
    }
    loadUser();
  }, [supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    
    setSaving(true);
    setSaveStatus('');
    
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        nationality: nationality,
        target_band_score: targetBandScore ? parseFloat(targetBandScore) : null,
        target_exam_date: targetExamDate || null,
        email_alerts: emailAlerts,
        sms_alerts: smsAlerts,
        ai_suggestions: aiSuggestions
      })
      .eq('id', userId);
      
    setSaving(false);
    if (!error) {
      setSaveStatus('Profile updated successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } else {
      setSaveStatus('Error saving profile.');
    }
  };

  // Fallbacks for display
  const nameFromEmail = email ? email.split('@')[0] : 'User';
  const displayEmail = email || 'Loading...';
  const displayInitial = (fullName ? fullName : nameFromEmail).charAt(0).toUpperCase() || 'U';
  const displayName = fullName || nameFromEmail;

  if (loading) {
    return (
      <div className="profile-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <RefreshCw size={32} className="spin" color="var(--mid-gray)" />
      </div>
    );
  }

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
                  {displayInitial}
                </div>
              </BorderGlow>
              
              <div className="profile-info-header">
                <h3>{displayName}</h3>
                <span className="member-status"><Sparkles size={14} /> Premium Member</span>
                <Button variant="outline" className="change-avatar-btn">Change Avatar</Button>
              </div>
            </div>
            
            <form className="profile-form" onSubmit={handleSave}>
              <div className="form-group">
                <Input 
                  label="Full Name" 
                  value={fullName} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)} 
                  placeholder={nameFromEmail}
                />
              </div>
              <div className="form-group">
                <Input label="Email Address" type="email" value={displayEmail} disabled />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <Input 
                    label="Nationality" 
                    value={nationality} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNationality(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <Input 
                    label="Target Band Score" 
                    value={targetBandScore} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTargetBandScore(e.target.value)} 
                    placeholder="e.g. 8.0"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <Input 
                  label="Target Exam Date" 
                  type="date" 
                  value={targetExamDate} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTargetExamDate(e.target.value)} 
                />
              </div>
              
              {saveStatus && (
                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: saveStatus.includes('Error') ? 'var(--primary-red)' : 'var(--success-color)', fontSize: '14px', fontWeight: 600 }}>
                  <CheckCircle2 size={16} /> {saveStatus}
                </div>
              )}

              <div className="form-actions">
                <Button variant="primary" type="submit" disabled={saving}>
                  {saving ? (
                    <><RefreshCw size={16} className="spin" style={{ marginRight: '8px' }} /> Saving...</>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
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
