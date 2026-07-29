import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import Carousel from '@/components/Carousel';
import BorderGlow from '@/components/BorderGlow';
import { Target, Zap, Award, PenLine, Mic, User, MonitorPlay, TrendingUp, Globe } from 'lucide-react';
import './landing.css';

const featureItems = [
  {
    id: 1,
    title: 'AI Scoring',
    description: 'Get instant, highly accurate band scores across all four IELTS modules.',
    icon: <Target size={48} strokeWidth={2.5} />
  },
  {
    id: 2,
    title: 'Avatar-Led Speaking',
    description: 'Practice speaking with a lifelike AI avatar that responds to your tone and fluency in real-time.',
    icon: <Mic size={48} strokeWidth={2.5} />
  },
  {
    id: 3,
    title: 'Full Mock Exams',
    description: 'Take timed, full-length IELTS exams that simulate the real test environment perfectly.',
    icon: <User size={48} strokeWidth={2.5} />
  },
  {
    id: 4,
    title: 'Video Tutorials',
    description: 'Learn from expert-crafted video lessons covering all sections of the IELTS exam.',
    icon: <MonitorPlay size={48} strokeWidth={2.5} />
  },
  {
    id: 5,
    title: 'Progress Tracking',
    description: 'Monitor your improvement over time with visual charts and actionable insights.',
    icon: <TrendingUp size={48} strokeWidth={2.5} />
  },
  {
    id: 6,
    title: 'Global Community',
    description: 'Connect with other IELTS test takers around the world and share your learning journey.',
    icon: <Globe size={48} strokeWidth={2.5} />
  }
];

const mockEssays = [
  {
    id: 1,
    title: 'IELTS Writing Task 2',
    description: (
      <div className="mock-essay">
        <p style={{ marginBottom: '16px' }}>
          The rapid advancements in AI have sparked considerable debate. 
          While some argue it could lead to job displacement, <span className="highlight-red highlight-group">
            it is a undeniably fact that
            <span className="mock-chat-bubble mock-chat-bubble-2">Grammar: "an undeniable fact"</span>
          </span> new technologies also create novel employment opportunities.
        </p>
        <p>
          Furthermore, <span className="highlight-green highlight-group">
            the seamless integration of automated systems
            <span className="mock-chat-bubble mock-chat-bubble-1">Excellent lexical resource! (+0.5 Band)</span>
          </span> can greatly enhance productivity and efficiency across industries.
        </p>
      </div>
    ),
    icon: <PenLine size={18} color="var(--pure-black)" />
  },
  {
    id: 2,
    title: 'IELTS Speaking Part 3',
    description: (
      <div className="mock-essay">
        <p style={{ marginBottom: '16px', fontStyle: 'italic' }}>
          Examiner: Do you think technology will completely replace teachers?
        </p>
        <p>
          Candidate: Well, <span className="highlight-green highlight-group">
            I highly doubt it
            <span className="mock-chat-bubble mock-chat-bubble-1">Natural phrasing! (+0.5 Band)</span>
          </span>. While technology provides amazing tools for learning, it lacks the <span className="highlight-red highlight-group">
            empathy and emotional intelligent
            <span className="mock-chat-bubble mock-chat-bubble-2">Vocabulary: "emotional intelligence"</span>
          </span> that a human teacher brings to the classroom.
        </p>
      </div>
    ),
    icon: <Mic size={18} color="var(--pure-black)" />
  },
  {
    id: 3,
    title: 'IELTS Writing Task 1',
    description: (
      <div className="mock-essay">
        <p style={{ marginBottom: '16px' }}>
          The provided line graph illustrates the <span className="highlight-green highlight-group">
            fluctuations in energy consumption
            <span className="mock-chat-bubble mock-chat-bubble-1">Good vocabulary!</span>
          </span> over a 10-year period.
        </p>
        <p>
          Overall, it is evident that <span className="highlight-red highlight-group">
            there was a significantly rise
            <span className="mock-chat-bubble mock-chat-bubble-2">Grammar: "significant rise"</span>
          </span> in renewable energy usage, whereas fossil fuel consumption experienced a gradual decline.
        </p>
      </div>
    ),
    icon: <Target size={18} color="var(--pure-black)" />
  },
  {
    id: 4,
    title: 'IELTS Reading',
    description: (
      <div className="mock-essay">
        <p style={{ marginBottom: '16px' }}>
          <strong>Q:</strong> According to the passage, what is the primary cause of deforestation?
        </p>
        <p>
          <span className="highlight-green highlight-group">
            Your Answer: Agricultural expansion
            <span className="mock-chat-bubble mock-chat-bubble-1">Correct! Found in paragraph 2.</span>
          </span>
        </p>
        <p style={{ marginTop: '24px', color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>
          AI Tip: The text explicitly states that "the clearing of land for cattle ranching and crop cultivation remains the leading driver."
        </p>
      </div>
    ),
    icon: <Award size={18} color="var(--pure-black)" />
  },
  {
    id: 5,
    title: 'IELTS Listening',
    description: (
      <div className="mock-essay">
        <p style={{ marginBottom: '16px' }}>
          <strong>Transcript:</strong> "The train to London Paddington will depart from platform... uh, sorry, platform 4."
        </p>
        <p>
          Your Answer: <span className="highlight-red highlight-group">
            Platform 3
            <span className="mock-chat-bubble mock-chat-bubble-2">Incorrect. Listen for corrections.</span>
          </span>
        </p>
        <p style={{ marginTop: '24px', color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>
          AI Tip: Speakers in the IELTS Listening test often correct themselves. Always wait for the final confirmation!
        </p>
      </div>
    ),
    icon: <Zap size={18} color="var(--pure-black)" />
  }
];

export default function Home() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-tagline">#1 AI-Powered IELTS Preparation</span>
            <h1>Achieve Your Target Band Score with AI.</h1>
            <p className="hero-subtext">
              Get evaluated by AI using the exact IELTS rubrics. Practice writing, speaking, and listening with structured, professional feedback.
            </p>
            <div className="hero-actions">
              <Link href="/auth/signup">
                <Button variant="primary">Start Practicing Free</Button>
              </Link>
              <a href="#features">
                <Button variant="secondary">See How It Works</Button>
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div style={{ height: '450px', position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Carousel 
                items={mockEssays} 
                baseWidth={400} 
                autoplay={true} 
                autoplayDelay={5000} 
                pauseOnHover={true} 
                loop={true} 
                round={false} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar">
        <p>Trusted by 10,000+ IELTS aspirants worldwide</p>
        <div className="trust-logos">
          <div className="trust-logo">University of Oxford</div>
          <div className="trust-logo">Cambridge</div>
          <div className="trust-logo">IDP Education</div>
          <div className="trust-logo">British Council</div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="features-section">
        <h2>Everything you need to crack IELTS.</h2>
        <div className="features-grid-box" style={{ 
          width: '100%', 
          maxWidth: '1100px', 
          margin: '20px auto 80px',
          border: '12px solid var(--pure-black)', 
          borderRadius: '32px',
          overflow: 'hidden',
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px', // Creates the internal borders between cards
          backgroundColor: 'var(--light-gray-border)', // Light gray color for the internal borders
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }}>
          {featureItems.map((item) => (
            <div key={item.id} className="feature-grid-card" style={{
              backgroundColor: 'var(--background)',
              padding: '60px 40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'transform 0.2s ease, background-color 0.3s ease'
            }}>
              <div style={{ marginBottom: '24px', color: '#C0392B' }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px', color: 'var(--pure-black)' }}>{item.title}</h3>
              <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--mid-gray)' }}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <h2>From Practice to Band Score in 3 Steps.</h2>
        <div className="steps-container">
          <BorderGlow
            edgeSensitivity={50}
            glowColor="0 100 50"
            backgroundColor="var(--background)"
            borderRadius={16}
            glowRadius={40}
            glowIntensity={2}
            coneSpread={25}
            animated={true}
            colors={['#ff0000', '#C0392B', '#E74C3C']}
            className="step-border-glow"
          >
            <div className="step-box">
              <div className="step-number">01</div>
              <h3>Practice</h3>
              <p>Submit a writing task or record a speaking response.</p>
            </div>
          </BorderGlow>
          
          <BorderGlow
            edgeSensitivity={50}
            glowColor="0 100 50"
            backgroundColor="var(--background)"
            borderRadius={16}
            glowRadius={40}
            glowIntensity={2}
            coneSpread={25}
            animated={true}
            colors={['#ff0000', '#C0392B', '#E74C3C']}
            className="step-border-glow"
          >
            <div className="step-box">
              <div className="step-number">02</div>
              <h3>AI Evaluates</h3>
              <p>Claude AI scores your submission against official IELTS criteria.</p>
            </div>
          </BorderGlow>

          <BorderGlow
            edgeSensitivity={50}
            glowColor="0 100 50"
            backgroundColor="var(--background)"
            borderRadius={16}
            glowRadius={40}
            glowIntensity={2}
            coneSpread={25}
            animated={true}
            colors={['#ff0000', '#C0392B', '#E74C3C']}
            className="step-border-glow"
          >
            <div className="step-box">
              <div className="step-number">03</div>
              <h3>Improve</h3>
              <p>Review structured feedback, track your score, and repeat.</p>
            </div>
          </BorderGlow>
        </div>
        <div className="how-it-works-cta">
          <Link href="/auth/signup">
            <Button variant="primary">Get Started Free</Button>
          </Link>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="pricing-preview-section">
        <h2>Simple, Transparent Pricing.</h2>
        <div className="pricing-preview-cards">
          <Card className="pricing-preview-card">
            <h3>Standard</h3>
            <ul>
              <li>Unlimited Video Tutorials</li>
              <li>Unlimited AI Writing Evaluations</li>
              <li>2 Avatar Mock Tests/mo</li>
            </ul>
          </Card>
          <Card className="pricing-preview-card pro-card">
            <h3>Pro+ <span className="pro-badge">Most Popular</span></h3>
            <ul>
              <li>Everything in Standard</li>
              <li>10 Avatar Mock Tests/mo</li>
              <li>1-on-1 AI Strategy Session</li>
            </ul>
          </Card>
        </div>
        <div className="pricing-preview-cta">
          <Link href="/pricing">
            <Button variant="secondary">View Full Pricing</Button>
          </Link>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="final-cta-section">
        <h2>Start Your Journey to Band 8.0 Today.</h2>
        <p>Join thousands of students already preparing with AI.</p>
        <Link href="/auth/signup">
          <Button className="final-cta-btn">Create Free Account</Button>
        </Link>
      </section>
    </div>
  );
}
