
import React, { useState } from 'react';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ResumeSection from './sections/ResumeSection';
import ContactSection from './sections/ContactSection';
import TerminalCommandInterface from './TerminalCommandInterface';

interface ContentPanelProps {
  section: string;
  isTransitioning: boolean;
  onNavigate?: (section: string) => void;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ section, isTransitioning, onNavigate }) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [showContent, setShowContent] = useState(false);

  const handleCommand = (command: string) => {
    setCurrentCommand(command);
    setShowContent(true);
  };

  const renderSection = () => {
    if (!showContent) return null;
    
    switch (section) {
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'skills':
        return <SkillsSection />;
      case 'resume':
        return <ResumeSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-black/50">
      <div className="flex-1 overflow-y-auto p-4">
        <div className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <TerminalCommandInterface 
            onCommand={handleCommand} 
            currentSection={section}
            onNavigate={onNavigate}
          />
          <div className="mt-4 border-t border-cyan-500/30 pt-4">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPanel;
