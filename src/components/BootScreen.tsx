
import React, { useState, useEffect } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState('');

  const bootSequence = [
    'Initializing system...',
    'Loading kernel modules...',
    'Mounting filesystems...',
    'Starting network services...',
    'Loading user interface...',
    'Portfolio OS v2.1.0 ready.',
  ];

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < bootSequence.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepTimer);
          setTimeout(onComplete, 1000);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(stepTimer);
  }, [onComplete]);

  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 300);

    return () => clearInterval(dotTimer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono p-8">
      <div className="mb-8">
        <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
      
      <div className="text-center max-w-2xl">
        <h1 className="text-2xl mb-8 text-green-300">
          PORTFOLIO OS
        </h1>
        
        <div className="space-y-2 text-left">
          {bootSequence.slice(0, currentStep + 1).map((step, index) => (
            <div 
              key={index} 
              className={`transition-opacity duration-300 ${
                index === currentStep ? 'text-green-400' : 'text-green-600'
              }`}
            >
              [{new Date().toLocaleTimeString()}] {step}
              {index === currentStep && index < bootSequence.length - 1 && (
                <span className="inline-block w-4">{dots}</span>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 w-full bg-gray-800 rounded-full h-2">
          <div 
            className="bg-green-400 h-2 rounded-full transition-all duration-300 glow-green"
            style={{ width: `${((currentStep + 1) / bootSequence.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
