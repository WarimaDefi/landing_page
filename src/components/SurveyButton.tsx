'use client';

import React from 'react';

interface SurveyButtonProps {
  surveyLink: string;
  buttonText: string;
}

const SurveyButton: React.FC<SurveyButtonProps> = ({ surveyLink, buttonText }) => {
  const handleOpenSurvey = () => {
    window.open(surveyLink, '_blank', 'noopener, noreferrer');
  };

  return (
    <button onClick={handleOpenSurvey}>
      {buttonText}
    </button>
  );
};

export default SurveyButton;
