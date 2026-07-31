'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { BookOpen, Calendar, ChevronRight } from 'lucide-react';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <div style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--pure-black)', marginBottom: '12px' }}>
          Articles & Resources
        </h1>
        <p style={{ color: 'var(--mid-gray)', fontSize: '16px' }}>
          Explore our latest official tips, strategies, and resources to help you ace your IELTS test.
        </p>
      </header>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
          <p style={{ color: 'var(--mid-gray)' }}>Loading articles...</p>
        </div>
      ) : articles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', background: 'var(--pure-white)', borderRadius: '16px', border: '1px dashed var(--light-gray-border)' }}>
          <BookOpen size={48} color="var(--mid-gray)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--pure-black)' }}>No Articles Yet</h3>
          <p style={{ color: 'var(--mid-gray)', marginTop: '8px' }}>Check back later for new resources.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {articles.map((article) => (
            <Link href={`/practice/articles/${article.slug}`} key={article.id} style={{ textDecoration: 'none' }}>
              <div 
                style={{ 
                  background: 'var(--pure-white)', 
                  border: '1px solid var(--light-gray-border)', 
                  borderRadius: '16px', 
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ 
                    background: 'var(--bg-blue)', 
                    color: '#3498db', 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}>
                    {article.category || 'General'}
                  </span>
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--pure-black)', marginBottom: '12px', lineHeight: 1.4 }}>
                  {article.title}
                </h2>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--mid-gray)', fontSize: '13px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} /> {new Date(article.created_at).toLocaleDateString()}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', color: 'var(--primary-red)', fontWeight: 600 }}>
                    Read <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
