"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import { createClient } from '@/utils/supabase/client';
import { ExternalLink, Headphones, BookOpen, Edit3, Mic, Target, RefreshCw } from 'lucide-react';
import './resources.css';

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const supabase = createClient();

  useEffect(() => {
    async function loadResources() {
      setLoading(true);
      const { data } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (data) setResources(data);
      setLoading(false);
    }
    loadResources();
  }, [supabase]);

  const categories = ['All', 'Listening', 'Reading', 'Writing', 'Speaking', 'General', 'Practice'];
  
  const filteredResources = activeCategory === 'All' 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  const getIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'listening': return <Headphones size={24} color="#f39c12" />;
      case 'reading': return <BookOpen size={24} color="#3498db" />;
      case 'writing': return <Edit3 size={24} color="#e74c3c" />;
      case 'speaking': return <Mic size={24} color="#9b59b6" />;
      case 'practice': return <Target size={24} color="#2ecc71" />;
      default: return <BookOpen size={24} color="#34495e" />;
    }
  };

  return (
    <div className="resources-page">
      <div className="resources-header">
        <div>
          <h2>Official Resources & Tips</h2>
          <p>Access official IDP IELTS preparation materials to boost your band score.</p>
        </div>
      </div>

      <div className="category-filters">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-state">
          <RefreshCw className="spin" size={32} color="var(--mid-gray)" />
          <p>Loading official resources...</p>
        </div>
      ) : (
        <div className="resources-grid">
          {filteredResources.length === 0 ? (
            <div className="empty-state">
              <p>No resources found for this category.</p>
            </div>
          ) : (
            filteredResources.map(resource => (
              <BorderGlow
                key={resource.id}
                edgeSensitivity={30}
                glowColor="0 80% 50%"
                backgroundColor="var(--background)"
                borderRadius={16}
                glowRadius={15}
                glowIntensity={1}
                coneSpread={25}
                animated={true}
                colors={['#E74C3C', '#f39c12', '#3498db']}
              >
                <div className="resource-card">
                  <div className="resource-icon-wrapper">
                    {getIcon(resource.category)}
                  </div>
                  <div className="resource-content">
                    <span className={`badge badge-${resource.category.toLowerCase()}`}>{resource.category}</span>
                    <h3>{resource.title}</h3>
                    <p>{resource.excerpt || 'Official IELTS preparation material provided by IDP.'}</p>
                    <div className="resource-action">
                      {resource.external_url ? (
                        <a href={resource.external_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                          <Button variant="outline" className="read-btn" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            View Resource <ExternalLink size={16} />
                          </Button>
                        </a>
                      ) : (
                        <a href={`/practice/articles/${resource.slug}`} style={{ textDecoration: 'none' }}>
                          <Button variant="outline" className="read-btn" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            Read Article <BookOpen size={16} />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </BorderGlow>
            ))
          )}
        </div>
      )}
    </div>
  );
}
