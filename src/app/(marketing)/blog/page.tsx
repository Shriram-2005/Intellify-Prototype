"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import BorderGlow from '@/components/BorderGlow';
import './blog.css';

const blogPosts = [
  // WRITING
  { id: 1, category: "Writing", title: "How to master Task 2 in under 40 minutes", excerpt: "Learn the step-by-step structure to brainstorm, outline, and write a Band 8+ essay under extreme time pressure.", author: "Dr. Emily Chen", date: "Oct 24, 2025", slug: "how-to-master-task-2" },
  { id: 2, category: "Writing", title: "Vocabulary: The Difference Between Band 6 and 8", excerpt: "It's not just about using big words. Learn how lexical resource is actually evaluated and how to improve yours naturally.", author: "Sarah Johnson", date: "Oct 02, 2025", slug: "writing-vocabulary-difference" },
  { id: 3, category: "Writing", title: "Task 1: Describing Graphs with High-End Vocabulary", excerpt: "Stop repeating 'increase' and 'decrease'. Here are 50 advanced phrases to describe data trends accurately.", author: "James Wilson", date: "Sep 18, 2025", slug: "task-1-advanced-vocabulary" },
  
  // SPEAKING
  { id: 4, category: "Speaking", title: "Top 5 Pronunciation Mistakes to Avoid", excerpt: "Is your pronunciation holding back your fluency score? Let's fix the most common errors examiners look out for.", author: "James Wilson", date: "Oct 20, 2025", slug: "top-5-pronunciation-mistakes" },
  { id: 5, category: "Speaking", title: "How to Keep Talking in Part 2", excerpt: "Running out of things to say in the 2-minute monologue? Use the PPF (Past, Present, Future) method to expand answers.", author: "Dr. Emily Chen", date: "Sep 25, 2025", slug: "speaking-part-2-ppf-method" },
  { id: 6, category: "Speaking", title: "Idioms: Should You Use Them?", excerpt: "Using idioms can boost your score to a 7+, but forcing them will hurt you. Learn the right way to use idiomatic language.", author: "Sarah Johnson", date: "Aug 30, 2025", slug: "speaking-using-idioms" },

  // TIPS & STRATEGIES
  { id: 7, category: "Tips & Strategies", title: "Understanding the AI Scoring System", excerpt: "A deep dive into how Intellify's AI evaluates your responses using the exact rubrics of a real human examiner.", author: "Sarah Johnson", date: "Oct 15, 2025", slug: "ai-scoring-system" },
  { id: 8, category: "Tips & Strategies", title: "Computer-Delivered vs Paper-Based", excerpt: "Which format is easier? We break down the pros and cons of both so you can choose the best test format for you.", author: "James Wilson", date: "Sep 12, 2025", slug: "computer-vs-paper-based" },
  { id: 9, category: "Tips & Strategies", title: "How to Build a 30-Day Study Plan", excerpt: "Don't just practice blindly. Follow this structured 30-day schedule to maximize your score improvement efficiently.", author: "Dr. Emily Chen", date: "Aug 15, 2025", slug: "30-day-study-plan" },

  // READING
  { id: 10, category: "Reading", title: "Skimming vs. Scanning: Which is Better?", excerpt: "Stop reading every single word. Discover the ultimate techniques to locate answers quickly in long academic texts.", author: "Dr. Emily Chen", date: "Oct 12, 2025", slug: "skimming-vs-scanning" },
  { id: 11, category: "Reading", title: "Conquering True/False/Not Given", excerpt: "T/F/NG is the most feared question type. Learn the exact logical steps to differentiate between False and Not Given.", author: "Sarah Johnson", date: "Sep 05, 2025", slug: "true-false-not-given" },
  { id: 12, category: "Reading", title: "Time Management in the Reading Test", excerpt: "Running out of time on Passage 3? Use the 15-20-25 rule to pace yourself perfectly through all 40 questions.", author: "James Wilson", date: "Aug 22, 2025", slug: "reading-time-management" },

  // LISTENING
  { id: 13, category: "Listening", title: "How to Handle Multiple Choice Questions", excerpt: "Multiple choice questions in Section 3 are notoriously tricky. Here's a foolproof method to avoid common traps.", author: "James Wilson", date: "Oct 08, 2025", slug: "listening-multiple-choice" },
  { id: 14, category: "Listening", title: "Map Labeling Made Easy", excerpt: "Struggling with directions in Section 2? Memorize these 20 directional phrases to never get lost on a map again.", author: "Dr. Emily Chen", date: "Sep 28, 2025", slug: "listening-map-labeling" },
  { id: 15, category: "Listening", title: "Dealing with Accents in the Listening Test", excerpt: "Australian, British, or North American? How to train your ear for the variety of accents used in the IELTS audio.", author: "Sarah Johnson", date: "Sep 01, 2025", slug: "listening-accents" },
];

const CATEGORIES = ["All", "Listening", "Reading", "Writing", "Speaking", "Tips & Strategies"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  let filteredPosts = [];
  
  if (activeCategory === "All") {
    // Get exactly 1 post from each category first
    const seenCategories = new Set();
    const diversePosts = [];
    
    for (const post of blogPosts) {
      if (!seenCategories.has(post.category)) {
        seenCategories.add(post.category);
        diversePosts.push(post);
      }
    }
    
    // Fill the remaining slots up to 6 cards total
    for (const post of blogPosts) {
      if (diversePosts.length >= 6) break;
      if (!diversePosts.find(p => p.id === post.id)) {
        diversePosts.push(post);
      }
    }
    filteredPosts = diversePosts;
  } else {
    // Show all posts for the specific category clicked
    filteredPosts = blogPosts.filter(post => post.category === activeCategory);
  }

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="blog-hero-container">
          <h1>Intellify IELTS Blog</h1>
          <p>Expert insights, strategies, and tips to help you achieve your dream band score.</p>
          
          <div className="blog-filters">
            {CATEGORIES.map(category => (
              <span 
                key={category} 
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-content">
        <div className="blog-container">
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '100px 0', color: '#888' }}>
              <h3>No posts found for this category.</h3>
            </div>
          ) : (
            <>
              <div className="blog-grid">
                {filteredPosts.map(post => (
                  <div key={post.id} style={{ display: 'flex' }}>
                    <BorderGlow
                      edgeSensitivity={30}
                      glowColor="0 80% 50%" /* Bright Red Glow */
                      backgroundColor="var(--background)"
                      borderRadius={20}
                      glowRadius={40}
                      glowIntensity={1}
                      coneSpread={25}
                      animated={true}
                      colors={['#E74C3C', '#C0392B', '#ff6b5b']}
                      className="blog-glow-wrapper"
                    >
                      <div className="blog-card">
                        <span className="blog-category">{post.category}</span>
                        <h3 style={{ color: 'var(--pure-black)' }}>{post.title}</h3>
                        <p className="blog-excerpt" style={{ color: 'var(--mid-gray)' }}>{post.excerpt}</p>
                        <div className="blog-meta">
                          <span>{post.author}</span>
                          <span>{post.date}</span>
                        </div>
                        <Link href={`/blog/${post.slug}`} className="blog-read-more">Read More →</Link>
                      </div>
                    </BorderGlow>
                  </div>
                ))}
              </div>
              
              <div className="blog-bottom-nav">
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="0 80% 50%"
                  backgroundColor="var(--background)"
                  borderRadius={20}
                  glowRadius={30}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={true}
                  colors={['#E74C3C', '#C0392B', '#ff6b5b']}
                >
                  <div className="blog-explore-content">
                    <button 
                      onClick={() => {
                        const idx = CATEGORIES.indexOf(activeCategory);
                        if (idx > 0) setActiveCategory(CATEGORIES[idx - 1]);
                      }} 
                      disabled={CATEGORIES.indexOf(activeCategory) === 0} 
                      className="cat-nav-btn"
                    >
                      ← Previous
                    </button>
                    
                    <p className="explore-text">
                      {activeCategory === "All" 
                        ? <>Looking for something specific? <span>Explore categories to dive deeper.</span></>
                        : <>Keep exploring more guides and strategies to boost your score.</>}
                    </p>
                    
                    <button 
                      onClick={() => {
                        const idx = CATEGORIES.indexOf(activeCategory);
                        if (idx < CATEGORIES.length - 1) setActiveCategory(CATEGORIES[idx + 1]);
                      }} 
                      disabled={CATEGORIES.indexOf(activeCategory) === CATEGORIES.length - 1} 
                      className="cat-nav-btn"
                    >
                      Next Category →
                    </button>
                  </div>
                </BorderGlow>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
