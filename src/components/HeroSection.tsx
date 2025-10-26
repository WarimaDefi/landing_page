import heroBackground from "/assets/hero-background.jpg";
import { useState } from "react";
import SurveyButton from '@/components/SurveyButton';
import YouTubeButton from '@/components/YouTubeButton';

const HeroSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  const handleClick = () => {
    setShowVideo(true);
  };

  const googleSurveyUrl = 'https://forms.gle/qnPtbkPNJiJgQDig8';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-earth/80 via-earth/60 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Build Wealth
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Together
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Transforming one of Africa’s authentic financial models -the Stokvel- into 
              an investment cooperative that builds wealth through real world assets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <SurveyButton surveyLink={googleSurveyUrl} buttonText="Take Warima Survey" />
            <YouTubeButton videoId="5SPJZQFCtw0" buttonText="Watch Demo" />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-tertiary mb-2">R50B</div>
              <div className="text-white/80">Stokvel Market Valuation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tertiary mb-2">800K+</div>
              <div className="text-white/80">Stokvels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tertiary mb-2">11M+</div>
              <div className="text-white/80">Stokvel Community Members</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
