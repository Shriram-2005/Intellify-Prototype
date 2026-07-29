import React from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import BorderGlow from '@/components/BorderGlow';
import './contact.css';

export default function Contact() {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-container">
          <h1>Get in Touch</h1>
          <p>Have questions about our AI IELTS preparation platform? We're here to help.</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-container">
          
          <div className="contact-info-glow">
            <BorderGlow
              edgeSensitivity={30}
              glowColor="0 80% 50%"
              backgroundColor="var(--background)"
              borderRadius={24}
              glowRadius={40}
              glowIntensity={1}
              coneSpread={25}
              animated={true}
              colors={['#E74C3C', '#C0392B', '#ff6b5b']}
            >
              <div className="contact-details-card">
                <h3>Contact Information</h3>
                <div className="detail-item">
                  <strong>Email</strong> 
                  <a href="mailto:support@intellify-ielts.com">support@intellify-ielts.com</a>
                </div>
                <div className="detail-item">
                  <strong>Phone</strong> 
                  <span>+1 (800) 123-4567</span>
                </div>
                <div className="detail-item">
                  <strong>Follow Us</strong> 
                  <span>Twitter, LinkedIn, YouTube</span>
                </div>
                
                <div className="contact-address" style={{ marginTop: 'auto', paddingTop: '40px' }}>
                  <strong>Headquarters</strong>
                  <p style={{ color: '#ccc', fontSize: '15px', marginTop: '8px', lineHeight: '1.5' }}>
                    123 Innovation Drive<br/>
                    Tech District<br/>
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>
            </BorderGlow>
          </div>

          <div className="contact-form-glow">
            <BorderGlow
              edgeSensitivity={30}
              glowColor="0 80% 50%"
              backgroundColor="var(--background)"
              borderRadius={24}
              glowRadius={40}
              glowIntensity={1}
              coneSpread={25}
              animated={true}
              colors={['#E74C3C', '#C0392B', '#ff6b5b']}
            >
              <div className="contact-form-card">
                <h3>Send a Message</h3>
                <form className="contact-form">
                  <Input label="Full Name" placeholder="John Doe" />
                  <Input label="Email Address" type="email" placeholder="john@example.com" />
                  
                  <div className="intellify-input-wrapper">
                    <label className="intellify-input-label">Subject</label>
                    <select className="intellify-select">
                      <option>General Inquiry</option>
                      <option>Support & Billing</option>
                      <option>Partnership</option>
                    </select>
                  </div>

                  <div className="intellify-input-wrapper">
                    <label className="intellify-input-label">Message</label>
                    <textarea className="intellify-textarea" rows={5} placeholder="How can we help you?"></textarea>
                  </div>

                  <Button variant="primary" fullWidth style={{ marginTop: '16px', background: 'linear-gradient(135deg, #C0392B, #96281B)', border: 'none' }}>
                    Send Message
                  </Button>
                </form>
              </div>
            </BorderGlow>
          </div>
          
        </div>
      </section>
    </div>
  );
}
