import React from 'react';
import { Target, Globe, TrendingUp, Lightbulb, UserCheck, Users } from 'lucide-react';
import BorderGlow from '@/components/BorderGlow';
import './about.css';

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-container">
          <h1>Our Mission: Make IELTS Preparation Intelligent.</h1>
          <p>We are a team of educators and AI researchers dedicated to making high-quality IELTS preparation accessible, accurate, and personalized for every student around the world.</p>
        </div>
      </section>

      <section className="about-values">
        <div className="about-container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
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
              className="value-border-glow"
            >
              <div className="value-card">
                <h3><Target className="value-icon" /> Accuracy</h3>
                <p>Our AI models are strictly aligned with official IELTS rubrics to ensure you get the most reliable band score estimates.</p>
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
              className="value-border-glow"
            >
              <div className="value-card">
                <h3><Globe className="value-icon" /> Accessibility</h3>
                <p>With native language feedback and affordable pricing, we break down language and financial barriers to your success.</p>
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
              className="value-border-glow"
            >
              <div className="value-card">
                <h3><TrendingUp className="value-icon" /> Improvement</h3>
                <p>We believe in data-driven progress. We don't just tell you your score; we show you exactly how to improve it.</p>
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
              className="value-border-glow"
            >
              <div className="value-card">
                <h3><Lightbulb className="value-icon" /> Innovation</h3>
                <p>Leveraging the latest in Generative AI to provide state-of-the-art learning experiences.</p>
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
              className="value-border-glow"
            >
              <div className="value-card">
                <h3><UserCheck className="value-icon" /> Personalization</h3>
                <p>Creating tailored study plans that adapt dynamically to your unique strengths and weaknesses.</p>
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
              className="value-border-glow"
            >
              <div className="value-card">
                <h3><Users className="value-icon" /> Community</h3>
                <p>Fostering a supportive global network of test-takers who share insights and motivation.</p>
              </div>
            </BorderGlow>
          </div>
        </div>
      </section>
    </div>
  );
}
