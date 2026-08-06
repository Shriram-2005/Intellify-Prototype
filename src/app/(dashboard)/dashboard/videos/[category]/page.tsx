"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card } from '@/components/Card';
import { createClient } from '@/utils/supabase/client';
import { PlayCircle, Clock } from 'lucide-react';
import './videos.css';

export default function VideoCategoryPage() {
  const params = useParams();
  const category = params?.category as string || 'overview';
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadVideos() {
      setLoading(true);
      const { data } = await supabase
        .from('videos')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });
      
      if (data) setVideos(data);
      setLoading(false);
    }
    loadVideos();
  }, [category, supabase]);

  const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';

  return (
    <div className="video-category-page">
      <div className="category-header">
        <h1>{capitalize(category)} Video Lessons</h1>
        <p>Master the {category} module with expert-led video tutorials.</p>
      </div>

      {loading ? (
        <div className="loading-state">Loading videos...</div>
      ) : videos.length === 0 ? (
        <div className="empty-state">
          <p>No video lessons available in this category yet.</p>
        </div>
      ) : (
        <div className="video-grid">
          {videos.map(video => (
            <Link href={`/dashboard/videos/${category}/${video.id}`} key={video.id} className="video-card-link">
              <Card className="video-card premium-card">
                <div className="video-thumbnail-placeholder">
                  <PlayCircle size={48} className="play-icon" />
                </div>
                <div className="video-card-content">
                  <h3>{video.title}</h3>
                  <p className="video-desc">{video.description?.substring(0, 80)}{video.description?.length > 80 ? '...' : ''}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
