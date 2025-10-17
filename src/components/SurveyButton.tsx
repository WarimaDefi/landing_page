'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface SurveyButtonProps {
  surveyLink: string;
  buttonText: string;
}

const SurveyButton: React.FC<SurveyButtonProps> = ({ surveyLink, buttonText }) => {
  const handleOpenSurvey = () => {
    window.open(surveyLink, '_blank', 'noopener, noreferrer');
  };

  return (
    <Button variant="default" className="w-full" onClick={handleOpenSurvey}>
      {buttonText}
    </Button>
  );
};

export default SurveyButton;
