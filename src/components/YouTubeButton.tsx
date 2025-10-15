'use client';

import React from 'react';

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
    <button onClick={handleOpenYouTube}> 
      {buttonText}
    </button>
  );
};

export default YouTubeButton;
