'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface YouTubeButtonProps {
  videoId: string;
  buttonText: string;
}

const YouTubeButton: React.FC<YouTubeButtonProps> = ({ videoId, buttonText }) => {
  const handleOpenYouTube = () => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(youtubeUrl, '_blank');
  };

  return (
    <Button variant="default" className="w-full" onClick={handleOpenYouTube}> 
      {buttonText}
    </Button>
  );
};

export default YouTubeButton;
