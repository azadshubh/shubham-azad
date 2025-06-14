
import React, { useState, useEffect } from 'react';
import TerminalHeader from './TerminalHeader';
import NavigationPanel from './NavigationPanel';
import ContentPanel from './ContentPanel';
import SystemPanel from './SystemPanel';

const TerminalInterface = () => {
  const [currentSection, setCurrentSection] = useState('about');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigation = (section: string) => {
    if (section !== currentSection) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSection(section);
        setIsTransitioning(false);
      }, 200);
    }
  };

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono overflow-hidden">
      {/* Main Grid Container */}
      <div className="h-screen flex flex-col p-2 gap-1">
        {/* Top Bar */}
        <div className="h-12 border border-cyan-500/30 bg-gray-900/50">
          <TerminalHeader />
        </div>
        
        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-12 gap-1 min-h-0">
          {/* Left Panel - Navigation/Stats */}
          <div className="col-span-3 border border-cyan-500/30 bg-gray-900/50 overflow-hidden">
            <NavigationPanel 
              currentSection={currentSection}
              onNavigate={handleNavigation}
            />
          </div>
          
          {/* Center Panel - Main Terminal */}
          <div className="col-span-6 border border-cyan-500/30 bg-gray-900/50 overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Terminal Label */}
              <div className="h-8 border-b border-cyan-500/30 bg-gray-800/50 flex items-center px-3">
                <span className="text-cyan-300 text-sm uppercase tracking-wider">MAIN SHELL</span>
              </div>
              {/* Terminal Content */}
              <div className="flex-1">
                <ContentPanel 
                  section={currentSection}
                  isTransitioning={isTransitioning}
                  onNavigate={handleNavigation}
                />
              </div>
            </div>
          </div>
          
          {/* Right Panel - System Info */}
          <div className="col-span-3 border border-cyan-500/30 bg-gray-900/50 overflow-hidden">
            <div className="h-full flex flex-col">
              {/* System Label */}
              <div className="h-8 border-b border-cyan-500/30 bg-gray-800/50 flex items-center px-3">
                <span className="text-cyan-300 text-sm uppercase tracking-wider">SYSTEM</span>
              </div>
              {/* System Content */}
              <div className="flex-1">
                <SystemPanel />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Panel - Status Bar */}
        <div className="h-8 border border-cyan-500/30 bg-gray-900/50 flex items-center px-3">
          <span className="text-cyan-500 text-xs">STATUS: ONLINE</span>
          <div className="ml-auto flex items-center space-x-4 text-xs text-cyan-400">
            <span>CPU: 45%</span>
            <span>MEM: 2.1GB</span>
            <span>NET: 127.0.0.1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalInterface;
