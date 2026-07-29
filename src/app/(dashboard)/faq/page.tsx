"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import BorderGlow from '@/components/BorderGlow';

const faqs = [
  { q: "What is an IELTS Band Score?", a: "The IELTS band score is a scale from 1 to 9 indicating your English language proficiency. A 9 is an expert user, while a 1 is a non-user." },
  { q: "How does the AI scoring work?", a: "Our platform uses advanced NLP models to evaluate your vocabulary, grammar, and fluency against official IELTS criteria to generate a highly accurate predicted band." },
  { q: "Can I practice Speaking modules with the AI?", a: "Yes! You can record your voice directly on the platform, and our AI will transcribe and analyze your pronunciation, fluency, and vocabulary." },
  { q: "Is the predicted score 100% accurate?", a: "While our AI models are trained on thousands of official tests and are highly accurate, they serve as estimates to guide your preparation, not official results." },
  { q: "What is the difference between Academic and General?", a: "Academic is for higher education or professional registration, while General Training is for secondary education, work experience, or migration." },
  { q: "How often is new practice material added?", a: "We update our practice library weekly with new mock exams, reading passages, and speaking prompts to keep the content fresh." },
  { q: "Can I review my past mistakes?", a: "Yes, you can visit the 'My Results' section in the sidebar to review detailed breakdowns of your past performance and specific areas for improvement." },
  { q: "Does the AI check Writing Task 1 and 2?", a: "Absolutely. Our AI evaluates both Task 1 (graphs/letters) and Task 2 (essays) for Task Achievement, Coherence, Lexical Resource, and Grammatical Range." }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--pure-black)', marginBottom: '12px' }}>
          Frequently Asked Questions
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--mid-gray)' }}>
          Find answers to technical questions about the Intellify IELTS platform.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index}>
              <BorderGlow
                edgeSensitivity={20}
                glowColor="0 80% 50%"
                backgroundColor="var(--pure-white)"
                borderRadius={12}
                glowRadius={15}
                glowIntensity={0.8}
                coneSpread={20}
                animated={true}
                colors={['#E74C3C', '#ff6b5b']}
              >
                <div 
                  onClick={() => toggleFaq(index)}
                  style={{
                    padding: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isOpen ? '16px' : '0'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--pure-black)', margin: 0 }}>
                      {faq.q}
                    </h3>
                    <ChevronDown 
                      size={20} 
                      style={{ 
                        color: 'var(--primary-red)', 
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }} 
                    />
                  </div>
                  
                  <div 
                    style={{ 
                      maxHeight: isOpen ? '200px' : '0', 
                      overflow: 'hidden', 
                      transition: 'max-height 0.4s ease, opacity 0.4s ease',
                      opacity: isOpen ? 1 : 0
                    }}
                  >
                    <p style={{ color: 'var(--dark-gray)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              </BorderGlow>
            </div>
          );
        })}
      </div>
    </div>
  );
}
