
import React, { useState, useEffect } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const consoleLines = [
    'PORTFOLIO OS v2.1.0 - Copyright (C) 2024',
    'Starting boot sequence...',
    '',
    '[    0.000000] Initializing kernel modules',
    '[    0.234567] CPU: Intel Core i7-12700K @ 3.60GHz',
    '[    0.456789] Memory: 32GB DDR4-3200',
    '[    0.678901] PCI: Scanning bus 0000:00',
    '[    1.123456] Loading filesystem drivers',
    '[    1.345678] ext4: mounting /dev/sda1',
    '[    1.567890] Network: Ethernet link up',
    '[    1.789012] Loading graphics drivers',
    '[    2.012345] GPU: NVIDIA GeForce RTX 4080',
    '[    2.234567] Audio: Realtek ALC1220',
    '[    2.456789] USB: 8 ports initialized',
    '[    2.678901] Bluetooth: Controller ready',
    '[    2.890123] WiFi: 802.11ax ready',
    '[    3.112345] Starting system services...',
    '[    3.334567] NetworkManager: started',
    '[    3.556789] SSH daemon: listening on port 22',
    '[    3.778901] Web server: nginx started',
    '[    3.990123] Database: PostgreSQL ready',
    '[    4.212345] Portfolio services: initializing',
    '[    4.434567] Loading user interface...',
    '[    4.656789] React components: compiled',
    '[    4.878901] CSS frameworks: loaded',
    '[    5.101123] JavaScript runtime: ready',
    '',
    'System ready. Welcome to Portfolio OS.',
    'Type "help" for available commands.',
    ''
  ];

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 300);

    return () => clearInterval(cursorInterval);
  }, []);

  // Typewriter effect with increased speed
  useEffect(() => {
    if (currentLineIndex >= consoleLines.length) {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 2000); // Longer wait after completion
      return;
    }

    const currentLine = consoleLines[currentLineIndex];
    
    if (currentCharIndex < currentLine.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, Math.random() * 25 + 10); // Slightly slower typing: 10-35ms

      return () => clearTimeout(typingTimeout);
    } else {
      // Line completed, move to next line
      const nextLineTimeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
        setDisplayedLines(prev => [...prev, '']);
      }, Math.random() * 100 + 50); // Longer pause between lines: 50-150ms

      return () => clearTimeout(nextLineTimeout);
    }
  }, [currentLineIndex, currentCharIndex, onComplete]);

  const progressPercentage = Math.min(Math.round((currentLineIndex / consoleLines.length) * 100), 100);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Console Header */}
        <div className="border-b border-green-500/30 pb-2 mb-4">
          <div className="text-green-300 text-sm">
            PORTFOLIO TERMINAL v2.1.0 - BOOT SEQUENCE
          </div>
        </div>

        {/* Console Output */}
        <div className="space-y-1 text-sm leading-relaxed">
          {displayedLines.map((line, index) => (
            <div key={index} className="min-h-[20px]">
              <span className="text-green-400">{line}</span>
              {index === currentLineIndex && showCursor && (
                <span className="bg-green-400 text-black ml-1">█</span>
              )}
            </div>
          ))}
        </div>

        {/* Progress Indicator - Always visible until complete */}
        <div className="fixed bottom-8 left-4 right-4 max-w-4xl mx-auto">
          <div className="bg-gray-900/90 border border-green-500/30 p-3 rounded backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-green-300 mb-2">
              <span>BOOT PROGRESS</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded overflow-hidden">
              <div 
                className="bg-green-500 h-2 transition-all duration-200 glow-green"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            {progressPercentage === 100 && (
              <div className="text-center text-green-300 text-xs mt-2 animate-pulse">
                SYSTEM READY - LOADING INTERFACE...
              </div>
            )}
          </div>
        </div>

        {/* Loading Dots Animation */}
        {!isComplete && (
          <div className="fixed top-4 right-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BootScreen;
