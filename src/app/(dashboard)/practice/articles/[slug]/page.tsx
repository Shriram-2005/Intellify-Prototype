'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Tag, Share2, Check, BookOpen } from 'lucide-react';
import { Button } from '@/components/Button';
import BorderGlow from '@/components/BorderGlow';
import './article.css'; // Let's assume we create a nice CSS file for it

export default function ArticleReadPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        setArticle(data);
      }
      setLoading(false);
    };

    if (slug) fetchArticle();
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="article-loading-state">
        <p>Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-not-found">
        <BookOpen size={48} color="var(--mid-gray)" style={{ margin: '0 auto 16px' }} />
        <h3>Article not found</h3>
        <p>The resource you are looking for does not exist or has been removed.</p>
        <Button variant="primary" onClick={() => router.push('/dashboard/resources')}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to Resources
        </Button>
      </div>
    );
  }

  return (
    <div className="article-read-container">
      <div className="article-top-nav">
        <Button variant="ghost" className="back-btn" onClick={() => router.push('/dashboard/resources')}>
          <ArrowLeft size={16} /> Back to Resources
        </Button>
        <Button variant="outline" className="share-btn" onClick={handleCopyLink}>
          {copied ? <Check size={16} color="var(--success-color)" /> : <Share2 size={16} />}
          {copied ? 'Link Copied!' : 'Copy Link'}
        </Button>
      </div>

      <BorderGlow
        edgeSensitivity={30}
        glowColor="0 80% 50%"
        backgroundColor="var(--pure-white)"
        borderRadius={24}
        glowRadius={20}
        glowIntensity={0.8}
        coneSpread={25}
        animated={true}
        colors={['#E74C3C', '#f39c12', '#3498db']}
      >
        <article className="article-content-wrapper">
          <header className="article-header">
            <div className="article-meta">
              <span className={`badge badge-${article.category?.toLowerCase() || 'general'}`}>
                <Tag size={12} style={{ marginRight: '4px' }} /> {article.category || 'General'}
              </span>
              <span className="article-date">
                <Calendar size={12} style={{ marginRight: '4px' }} />
                {new Date(article.created_at).toLocaleDateString()}
              </span>
            </div>
            <h1 className="article-title">{article.title}</h1>
            {article.excerpt && <p className="article-excerpt">{article.excerpt}</p>}
          </header>

          <div className="article-body">
            {/* If it's HTML, we could use dangerouslySetInnerHTML, but for safety in the MVP we'll just render it or assume it's pre-formatted. */}
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </article>
      </BorderGlow>
    </div>
  );
}
