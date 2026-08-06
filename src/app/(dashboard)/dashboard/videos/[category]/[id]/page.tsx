"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card } from '@/components/Card';
import { createClient } from '@/utils/supabase/client';
import { ArrowLeft, Clock } from 'lucide-react';
import MuxPlayer from '@mux/mux-player-react';
import '../videos.css';

export default function VideoWatchPage() {
  const params = useParams();
  const id = params?.id as string;
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadVideo() {
      setLoading(true);
      const { data } = await supabase
        .from('videos')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) setVideo(data);
      setLoading(false);
    }
    if (id) loadVideo();
  }, [id, supabase]);

  if (loading) {
    return <div className="video-watch-page"><div className="loading-state">Loading video lesson...</div></div>;
  }

  if (!video) {
    return (
      <div className="video-watch-page">
        <div className="empty-state">
          <p>Video not found.</p>
          <Link href="/dashboard/videos/overview" style={{ color: 'var(--primary-blue)', marginTop: '12px', display: 'inline-block' }}>Return to Videos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="video-watch-page">
      <Link href={`/dashboard/videos/${video.category}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--mid-gray)', textDecoration: 'none', marginBottom: '24px', fontWeight: 600 }}>
        <ArrowLeft size={16} /> Back to {video.category}
      </Link>
      
      <div className="video-title-header">
        <h1>{video.title}</h1>
        <div className="video-metadata">
          <span className="video-category-badge">{video.category}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {new Date(video.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="video-player-wrapper">
        <MuxPlayer
          playbackId={video.mux_playback_id}
          metadata={{
            video_id: video.id,
            video_title: video.title,
          }}
          primaryColor="#3498db"
          secondaryColor="#ffffff"
          accentColor="#e74c3c"
          style={{ width: '100%', height: '100%', aspectRatio: '16/9' }}
        />
      </div>

      <Card className="video-description-box premium-card">
        <h3>About this Lesson</h3>
        <p>{video.description || "No description provided for this lesson."}</p>
      </Card>
    </div>
  );
}
