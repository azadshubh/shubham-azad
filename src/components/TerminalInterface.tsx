
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
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="max-w-7xl mx-auto">
        <TerminalHeader />
        
        <div className="grid grid-cols-12 gap-4 mt-4 h-[calc(100vh-120px)]">
          {/* Navigation Panel */}
          <div className="col-span-12 lg:col-span-3">
            <NavigationPanel 
              currentSection={currentSection}
              onNavigate={handleNavigation}
            />
          </div>
          
          {/* Main Content Panel */}
          <div className="col-span-12 lg:col-span-6">
            <ContentPanel 
              section={currentSection}
              isTransitioning={isTransitioning}
            />
          </div>
          
          {/* System Info Panel */}
          <div className="col-span-12 lg:col-span-3">
            <SystemPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalInterface;
